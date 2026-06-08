import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class UpdateGeneralSettingsDto {
  @IsOptional() @IsString() gymName?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() email?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() logoUrl?: string;
}

export class UpdateSocialSettingsDto {
  @IsOptional() @IsString() instagram?: string;
  @IsOptional() @IsString() telegram?: string;
  @IsOptional() @IsString() whatsapp?: string;
  @IsOptional() @IsString() youtube?: string;
}

export class UpdatePaymentSettingsDto {
  @IsOptional() @IsString() bankName?: string;
  @IsOptional() @IsString() accountNumber?: string;
  @IsOptional() @IsString() cardNumber?: string;
  @IsOptional() @IsString() accountHolder?: string;
  @IsOptional() @IsString() instructions?: string;
}

export class UpdateDeliverySettingsDto {
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) courierFee?: number;
  @IsOptional() @IsString() pickupInstructions?: string;
  @IsOptional() @IsString() deliveryInstructions?: string;
}

export class WorkingHoursDayDto {
  @Type(() => Number) @IsInt() @Min(0) dayOfWeek!: number;
  @IsString() openTime!: string;
  @IsString() closeTime!: string;
  @IsOptional() @IsBoolean() isClosed?: boolean;
}

export class UpdateWorkingHoursDto {
  @IsOptional() @Type(() => Number) @IsInt() @Min(5) slotDuration?: number;
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => WorkingHoursDayDto)
  workingDays?: WorkingHoursDayDto[];
}

export class UpdateAllSettingsDto {
  @IsOptional() @ValidateNested() @Type(() => UpdateGeneralSettingsDto)
  general?: UpdateGeneralSettingsDto;
  @IsOptional() @ValidateNested() @Type(() => UpdateSocialSettingsDto)
  social?: UpdateSocialSettingsDto;
  @IsOptional() @ValidateNested() @Type(() => UpdatePaymentSettingsDto)
  payment?: UpdatePaymentSettingsDto;
  @IsOptional() @ValidateNested() @Type(() => UpdateDeliverySettingsDto)
  delivery?: UpdateDeliverySettingsDto;
  @IsOptional() @ValidateNested() @Type(() => UpdateWorkingHoursDto)
  hours?: UpdateWorkingHoursDto;
}
