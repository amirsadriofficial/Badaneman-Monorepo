import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SearchQueryDto {
  @IsString() @IsNotEmpty() q!: string;
  @IsOptional() @IsString() type?: 'products' | 'blog' | 'coaches' | 'facilities' | 'all';
}
