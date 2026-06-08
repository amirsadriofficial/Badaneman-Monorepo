import { IsBoolean, IsOptional } from 'class-validator';

export class MarkNotificationReadDto {
  @IsOptional() @IsBoolean() isRead?: boolean = true;
}

export class MarkAllReadDto {
  @IsOptional() @IsBoolean() isRead?: boolean = true;
}
