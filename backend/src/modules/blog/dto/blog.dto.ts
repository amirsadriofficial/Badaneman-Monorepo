import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateBlogCategoryDto {
  @IsString() @IsNotEmpty() name!: string;
  @IsString() @IsNotEmpty() slug!: string;
}

export class UpdateBlogCategoryDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() slug?: string;
}

export class CreateBlogTagDto {
  @IsString() @IsNotEmpty() name!: string;
}

export class UpdateBlogTagDto {
  @IsString() @IsNotEmpty() name!: string;
}

export class ArticleFaqDto {
  @IsString() question!: string;
  @IsString() answer!: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) sortOrder?: number;
}

export class CreateArticleDto {
  @IsString() @IsNotEmpty() title!: string;
  @IsString() @IsNotEmpty() slug!: string;
  @IsOptional() @IsString() excerpt?: string;
  @IsString() @IsNotEmpty() content!: string;
  @IsOptional() @IsString() author?: string;
  @IsOptional() @IsString() featuredImageUrl?: string;
  @IsOptional() @IsString() categoryId?: string;
  @IsOptional() @IsString() seoTitle?: string;
  @IsOptional() @IsString() metaDescription?: string;
  @IsOptional() @IsString() canonicalUrl?: string;
  @IsOptional() @IsString() ogImageUrl?: string;
  @IsOptional() @IsBoolean() isPublished?: boolean;
  @IsOptional() @IsDateString() publishedAt?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) tagIds?: string[];
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => ArticleFaqDto)
  faqs?: ArticleFaqDto[];
}

export class UpdateArticleDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() slug?: string;
  @IsOptional() @IsString() excerpt?: string;
  @IsOptional() @IsString() content?: string;
  @IsOptional() @IsString() author?: string;
  @IsOptional() @IsString() featuredImageUrl?: string;
  @IsOptional() @IsString() categoryId?: string;
  @IsOptional() @IsString() seoTitle?: string;
  @IsOptional() @IsString() metaDescription?: string;
  @IsOptional() @IsString() canonicalUrl?: string;
  @IsOptional() @IsString() ogImageUrl?: string;
  @IsOptional() @IsBoolean() isPublished?: boolean;
  @IsOptional() @IsDateString() publishedAt?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) tagIds?: string[];
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => ArticleFaqDto)
  faqs?: ArticleFaqDto[];
}
