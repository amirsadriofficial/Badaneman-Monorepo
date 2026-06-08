import { MembershipStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateMembershipPlanDto {
  @IsString() name!: string;
  @IsOptional() @IsString() description?: string;
  @Type(() => Number) @IsInt() @Min(1) durationDays!: number;
  @Type(() => Number) @IsInt() @Min(0) price!: number;
  @IsOptional() @IsBoolean() isActive?: boolean;
  @IsOptional() @IsBoolean() isPromotional?: boolean;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) sortOrder?: number;
}

export class UpdateMembershipPlanDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) durationDays?: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) price?: number;
  @IsOptional() @IsBoolean() isActive?: boolean;
  @IsOptional() @IsBoolean() isPromotional?: boolean;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) sortOrder?: number;
}

export class CreateMembershipRequestDto {
  @IsString() @IsNotEmpty() planId!: string;
  @IsOptional() @IsString() receiptUrl?: string;
  @IsOptional() @IsString() notes?: string;
}

export class UpdateMembershipRequestDto {
  @IsOptional() @IsEnum(MembershipStatus) status?: MembershipStatus;
  @IsOptional() @IsString() adminNotes?: string;
}

export class ListMembershipRequestsDto {
  @IsOptional() @IsEnum(MembershipStatus) status?: MembershipStatus;
}
