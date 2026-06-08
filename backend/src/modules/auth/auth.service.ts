import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuditAction } from '@prisma/client';
import { randomBytes } from 'crypto';
import { AuditService } from '../../common/services/audit.service';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private audit: AuditService,
  ) {}

  async requestOtp(mobile: string) {
    const normalized = this.normalizeMobile(mobile);
    const expiresMinutes = Number(this.config.get('OTP_EXPIRES_MINUTES', 5));
    const code =
      this.config.get('NODE_ENV') === 'production'
        ? String(Math.floor(100000 + Math.random() * 900000))
        : this.config.get('OTP_DEV_CODE', '123456');

    await this.prisma.otpCode.create({
      data: {
        mobile: normalized,
        code,
        expiresAt: new Date(Date.now() + expiresMinutes * 60 * 1000),
      },
    });

    // SMS integration placeholder — log for development
    console.log(`[OTP] ${normalized}: ${code}`);

    return { message: 'کد تأیید ارسال شد', expiresInMinutes: expiresMinutes };
  }

  async verifyOtp(mobile: string, code: string) {
    const normalized = this.normalizeMobile(mobile);
    const otp = await this.prisma.otpCode.findFirst({
      where: { mobile: normalized, code, usedAt: null, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: 'desc' },
    });

    if (!otp) throw new UnauthorizedException('کد تأیید نامعتبر یا منقضی شده است');

    await this.prisma.otpCode.update({ where: { id: otp.id }, data: { usedAt: new Date() } });

    let user = await this.prisma.user.findUnique({ where: { mobile: normalized } });
    if (!user) {
      user = await this.prisma.user.create({ data: { mobile: normalized } });
      await this.prisma.cart.create({ data: { userId: user.id } });
    }

    return this.issueUserTokens(user.id, user.mobile);
  }

  async adminLogin(username: string, password: string) {
    const admin = await this.prisma.adminUser.findFirst({
      where: { username, isActive: true, deletedAt: null },
    });
    if (!admin) throw new UnauthorizedException('نام کاربری یا رمز عبور اشتباه است');

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) throw new UnauthorizedException('نام کاربری یا رمز عبور اشتباه است');

    await this.audit.log({
      adminId: admin.id,
      action: AuditAction.login,
      entity: 'admin_user',
      entityId: admin.id,
    });

    return this.issueAdminTokens(admin.id, admin.username, admin.role);
  }

  async refreshUserToken(refreshToken: string) {
    const stored = await this.prisma.userRefreshToken.findFirst({
      where: { token: refreshToken, revokedAt: null, expiresAt: { gt: new Date() } },
      include: { user: true },
    });
    if (!stored) throw new UnauthorizedException('توکن نامعتبر است');

    await this.prisma.userRefreshToken.update({
      where: { id: stored.id },
      data: { revokedAt: new Date() },
    });

    return this.issueUserTokens(stored.user.id, stored.user.mobile);
  }

  async refreshAdminToken(refreshToken: string) {
    const stored = await this.prisma.adminRefreshToken.findFirst({
      where: { token: refreshToken, revokedAt: null, expiresAt: { gt: new Date() } },
      include: { admin: true },
    });
    if (!stored) throw new UnauthorizedException('توکن نامعتبر است');

    await this.prisma.adminRefreshToken.update({
      where: { id: stored.id },
      data: { revokedAt: new Date() },
    });

    return this.issueAdminTokens(stored.admin.id, stored.admin.username, stored.admin.role);
  }

  async logoutUser(refreshToken: string) {
    await this.prisma.userRefreshToken.updateMany({
      where: { token: refreshToken },
      data: { revokedAt: new Date() },
    });
    return { message: 'خروج موفق' };
  }

  async logoutAdmin(refreshToken: string, adminId?: string) {
    await this.prisma.adminRefreshToken.updateMany({
      where: { token: refreshToken },
      data: { revokedAt: new Date() },
    });
    if (adminId) {
      await this.audit.log({
        adminId,
        action: AuditAction.logout,
        entity: 'admin_user',
        entityId: adminId,
      });
    }
    return { message: 'خروج موفق' };
  }

  async getUserProfile(userId: string) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { id: true, fullName: true, mobile: true, gender: true, createdAt: true },
    });
  }

  async getAdminProfile(adminId: string) {
    return this.prisma.adminUser.findUniqueOrThrow({
      where: { id: adminId },
      select: {
        id: true,
        username: true,
        fullName: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  }

  private async issueUserTokens(userId: string, mobile: string) {
    const accessToken = await this.jwt.signAsync({ sub: userId, mobile, type: 'user' });
    const refreshToken = randomBytes(48).toString('hex');
    const refreshDays = 7;

    await this.prisma.userRefreshToken.create({
      data: {
        userId,
        token: refreshToken,
        expiresAt: new Date(Date.now() + refreshDays * 24 * 60 * 60 * 1000),
      },
    });

    return { accessToken, refreshToken, tokenType: 'Bearer' };
  }

  private async issueAdminTokens(adminId: string, username: string, role: string) {
    const accessToken = await this.jwt.signAsync({ sub: adminId, username, role, type: 'admin' });
    const refreshToken = randomBytes(48).toString('hex');
    const refreshDays = 7;

    await this.prisma.adminRefreshToken.create({
      data: {
        adminId,
        token: refreshToken,
        expiresAt: new Date(Date.now() + refreshDays * 24 * 60 * 60 * 1000),
      },
    });

    return { accessToken, refreshToken, tokenType: 'Bearer' };
  }

  private normalizeMobile(mobile: string) {
    const cleaned = mobile.replace(/\D/g, '');
    if (cleaned.length < 10) throw new BadRequestException('شماره موبایل نامعتبر است');
    return cleaned.startsWith('0') ? cleaned : `0${cleaned}`;
  }
}
