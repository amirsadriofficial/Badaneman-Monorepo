import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class AddCartItemDto {
  @IsString() @IsNotEmpty() productId!: string;
  @IsOptional() @IsString() variantId?: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) quantity?: number;
}

export class UpdateCartItemDto {
  @Type(() => Number) @IsInt() @Min(1) quantity!: number;
}
