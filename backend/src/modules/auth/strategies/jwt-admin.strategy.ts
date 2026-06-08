import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AdminRole } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_ACCESS_SECRET') ?? 'dev-secret',
    });
  }

  async validate(payload: { sub: string; role: AdminRole; type?: string }) {
    if (payload.type !== 'admin') throw new UnauthorizedException();
    const admin = await this.prisma.adminUser.findFirst({
      where: { id: payload.sub, isActive: true, deletedAt: null },
    });
    if (!admin) throw new UnauthorizedException();
    return { id: admin.id, username: admin.username, role: admin.role };
  }
}
