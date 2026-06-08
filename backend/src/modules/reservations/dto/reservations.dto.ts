import { ReservationStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateReservationDto {
  @IsString() @IsNotEmpty() serviceId!: string;
  @IsDateString() date!: string;
  @IsString() @IsNotEmpty() timeSlot!: string;
  @IsOptional() @IsString() receiptUrl?: string;
  @IsOptional() @IsString() notes?: string;
}

export class UpdateReservationDto {
  @IsOptional() @IsEnum(ReservationStatus) status?: ReservationStatus;
  @IsOptional() @IsString() adminNotes?: string;
}

export class WorkingDayDto {
  @Type(() => Number) @IsInt() @Min(0) dayOfWeek!: number;
  @IsString() openTime!: string;
  @IsString() closeTime!: string;
  @IsOptional() @IsBoolean() isClosed?: boolean;
}

export class DisabledDateDto {
  @IsDateString() date!: string;
  @IsOptional() @IsString() reason?: string;
}

export class UpdateScheduleDto {
  @IsOptional() @Type(() => Number) @IsInt() @Min(5) slotDuration?: number;
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => WorkingDayDto)
  workingDays?: WorkingDayDto[];
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => DisabledDateDto)
  disabledDates?: DisabledDateDto[];
}

export class AvailabilityQueryDto {
  @IsDateString() date!: string;
  @IsString() @IsNotEmpty() serviceId!: string;
}

export class CalendarQueryDto {
  @IsOptional() @IsDateString() from?: string;
  @IsOptional() @IsDateString() to?: string;
}
