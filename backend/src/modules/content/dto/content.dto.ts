import { GymStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateLandingDto {
  @IsOptional() @IsString() headline?: string;
  @IsOptional() @IsString() subheadline?: string;
  @IsOptional() @IsString() ctaPrimary?: string;
  @IsOptional() @IsString() ctaSecondary?: string;
  @IsOptional() @IsString() featured?: string;
}

export class UpdateAboutDto {
  @IsOptional() @IsString() intro?: string;
  @IsOptional() @IsString() history?: string;
  @IsOptional() @IsString() mission?: string;
  @IsOptional() @IsString() vision?: string;
}

export class UpdateGymStatusDto {
  @IsEnum(GymStatus) status!: GymStatus;
  @IsOptional() @IsString() message?: string;
}

export class CreateAchievementDto {
  @IsString() title!: string;
  @IsString() description!: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsString() imageUrl?: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) sortOrder?: number;
}

export class UpdateAchievementDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsString() imageUrl?: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) sortOrder?: number;
}

export class CreateCoachDto {
  @IsString() name!: string;
  @IsString() position!: string;
  @IsOptional() @IsString() biography?: string;
  @IsOptional() @IsString() specialty?: string;
  @IsOptional() @IsString() experience?: string;
  @IsOptional() @IsString() photoUrl?: string;
  @IsOptional() @IsString() instagram?: string;
  @IsOptional() @IsString() telegram?: string;
  @IsOptional() @IsBoolean() isActive?: boolean;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) sortOrder?: number;
}

export class UpdateCoachDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() position?: string;
  @IsOptional() @IsString() biography?: string;
  @IsOptional() @IsString() specialty?: string;
  @IsOptional() @IsString() experience?: string;
  @IsOptional() @IsString() photoUrl?: string;
  @IsOptional() @IsString() instagram?: string;
  @IsOptional() @IsString() telegram?: string;
  @IsOptional() @IsBoolean() isActive?: boolean;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) sortOrder?: number;
}

export class CreateFacilityDto {
  @IsString() title!: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() imageUrl?: string;
  @IsOptional() @IsString() videoUrl?: string;
  @IsOptional() @IsBoolean() hasVideo?: boolean;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) sortOrder?: number;
}

export class UpdateFacilityDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() imageUrl?: string;
  @IsOptional() @IsString() videoUrl?: string;
  @IsOptional() @IsBoolean() hasVideo?: boolean;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) sortOrder?: number;
}

export class CreateFaqDto {
  @IsString() question!: string;
  @IsString() answer!: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) sortOrder?: number;
}

export class UpdateFaqDto {
  @IsOptional() @IsString() question?: string;
  @IsOptional() @IsString() answer?: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) sortOrder?: number;
}
