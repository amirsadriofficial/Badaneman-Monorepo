import { ApplicationStatus } from '@prisma/client';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePositionDto {
  @IsString() @IsNotEmpty() title!: string;
  @IsOptional() @IsString() department?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsBoolean() isActive?: boolean;
}

export class UpdatePositionDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() department?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsBoolean() isActive?: boolean;
}

export class CreateApplicationDto {
  @IsString() @IsNotEmpty() fullName!: string;
  @IsString() @IsNotEmpty() mobile!: string;
  @IsString() @IsNotEmpty() positionId!: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() resumeUrl?: string;
}

export class UpdateApplicationDto {
  @IsOptional() @IsEnum(ApplicationStatus) status?: ApplicationStatus;
  @IsOptional() @IsString() adminNotes?: string;
}
