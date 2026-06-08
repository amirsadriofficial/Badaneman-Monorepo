import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSmsTemplateDto {
  @IsString() @IsNotEmpty() name!: string;
  @IsOptional() @IsString() category?: string;
  @IsString() @IsNotEmpty() body!: string;
  @IsOptional() @IsBoolean() isActive?: boolean;
}

export class UpdateSmsTemplateDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsString() body?: string;
  @IsOptional() @IsBoolean() isActive?: boolean;
}
