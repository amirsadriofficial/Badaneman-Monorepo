import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class OtpRequestDto {
  @IsString()
  @IsNotEmpty()
  mobile!: string;
}

export class OtpVerifyDto {
  @IsString()
  @IsNotEmpty()
  mobile!: string;

  @IsString()
  @IsNotEmpty()
  code!: string;
}

export class AdminLoginDto {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @MinLength(4)
  password!: string;
}

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  refreshToken!: string;
}
