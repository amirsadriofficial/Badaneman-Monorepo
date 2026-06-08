import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentAdmin, CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAdminGuard, JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import {
  AdminLoginDto,
  OtpRequestDto,
  OtpVerifyDto,
  RefreshTokenDto,
} from './dto/auth.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('auth/otp/request')
  requestOtp(@Body() dto: OtpRequestDto) {
    return this.auth.requestOtp(dto.mobile);
  }

  @Post('auth/otp/verify')
  verifyOtp(@Body() dto: OtpVerifyDto) {
    return this.auth.verifyOtp(dto.mobile, dto.code);
  }

  @Post('auth/refresh')
  refreshUser(@Body() dto: RefreshTokenDto) {
    return this.auth.refreshUserToken(dto.refreshToken);
  }

  @Post('auth/logout')
  logoutUser(@Body() dto: RefreshTokenDto) {
    return this.auth.logoutUser(dto.refreshToken);
  }

  @Get('auth/me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  me(@CurrentUser() user: { id: string }) {
    return this.auth.getUserProfile(user.id);
  }

  @Post('admin/auth/login')
  adminLogin(@Body() dto: AdminLoginDto) {
    return this.auth.adminLogin(dto.username, dto.password);
  }

  @Post('admin/auth/refresh')
  refreshAdmin(@Body() dto: RefreshTokenDto) {
    return this.auth.refreshAdminToken(dto.refreshToken);
  }

  @Post('admin/auth/logout')
  @UseGuards(JwtAdminGuard)
  @ApiBearerAuth()
  logoutAdmin(@Body() dto: RefreshTokenDto, @CurrentAdmin() admin: { id: string }) {
    return this.auth.logoutAdmin(dto.refreshToken, admin.id);
  }

  @Get('admin/me')
  @UseGuards(JwtAdminGuard)
  @ApiBearerAuth()
  adminMe(@CurrentAdmin() admin: { id: string }) {
    return this.auth.getAdminProfile(admin.id);
  }
}
