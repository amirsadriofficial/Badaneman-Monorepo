import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString() @IsNotEmpty() name!: string;
  @IsString() @IsNotEmpty() slug!: string;
  @IsOptional() @IsString() description?: string;
}

export class UpdateCategoryDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() slug?: string;
  @IsOptional() @IsString() description?: string;
}

export class ProductVariantDto {
  @IsString() name!: string;
  @IsString() sku!: string;
  @Type(() => Number) @IsInt() priceModifier!: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) stock?: number;
}

export class ProductImageDto {
  @IsString() url!: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) sortOrder?: number;
}

export class CreateProductDto {
  @IsString() @IsNotEmpty() name!: string;
  @IsString() @IsNotEmpty() slug!: string;
  @IsOptional() @IsString() description?: string;
  @IsString() @IsNotEmpty() sku!: string;
  @IsString() @IsNotEmpty() categoryId!: string;
  @IsOptional() @IsString() featuredImageUrl?: string;
  @IsOptional() @IsBoolean() isActive?: boolean;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) lowStockThreshold?: number;
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => ProductVariantDto)
  variants?: ProductVariantDto[];
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => ProductImageDto)
  images?: ProductImageDto[];
}

export class UpdateProductDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() slug?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() sku?: string;
  @IsOptional() @IsString() categoryId?: string;
  @IsOptional() @IsString() featuredImageUrl?: string;
  @IsOptional() @IsBoolean() isActive?: boolean;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) lowStockThreshold?: number;
}

export class UpdateInventoryDto {
  @Type(() => Number) @IsInt() @Min(0) stock!: number;
}

export class UpdateVariantDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() sku?: string;
  @IsOptional() @Type(() => Number) @IsInt() priceModifier?: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) stock?: number;
}

export class CreateVariantDto extends ProductVariantDto {}
