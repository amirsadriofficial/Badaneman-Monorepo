import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminRole } from '@prisma/client';
import { CurrentAdmin } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAdminGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import {
  CreateArticleDto,
  CreateBlogCategoryDto,
  CreateBlogTagDto,
  UpdateArticleDto,
  UpdateBlogCategoryDto,
  UpdateBlogTagDto,
} from './dto/blog.dto';
import { BlogService } from './blog.service';

@ApiTags('Blog')
@Controller()
export class BlogController {
  constructor(private blog: BlogService) {}

  @Get('blog/posts')
  getPosts(
    @Query() query: PaginationDto,
    @Query('category') category?: string,
    @Query('tag') tag?: string,
  ) {
    return this.blog.getPosts(query, category, tag);
  }

  @Get('blog/posts/:slug')
  getPost(@Param('slug') slug: string) {
    return this.blog.getPost(slug);
  }

  @Get('blog/categories')
  getCategories() {
    return this.blog.getCategories();
  }

  @Get('blog/tags')
  getTags() {
    return this.blog.getTags();
  }

  @Get('admin/blog/articles')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  adminListArticles(@Query() query: PaginationDto) {
    return this.blog.adminListArticles(query);
  }

  @Post('admin/blog/articles')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  createArticle(@Body() dto: CreateArticleDto, @CurrentAdmin() admin: { id: string }) {
    return this.blog.createArticle(dto, admin.id);
  }

  @Patch('admin/blog/articles/:id')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  updateArticle(
    @Param('id') id: string,
    @Body() dto: UpdateArticleDto,
    @CurrentAdmin() admin: { id: string },
  ) {
    return this.blog.updateArticle(id, dto, admin.id);
  }

  @Delete('admin/blog/articles/:id')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  deleteArticle(@Param('id') id: string, @CurrentAdmin() admin: { id: string }) {
    return this.blog.deleteArticle(id, admin.id);
  }

  @Get('admin/blog/categories')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  adminListCategories() {
    return this.blog.getCategories();
  }

  @Post('admin/blog/categories')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  createCategory(@Body() dto: CreateBlogCategoryDto, @CurrentAdmin() admin: { id: string }) {
    return this.blog.createCategory(dto, admin.id);
  }

  @Patch('admin/blog/categories/:id')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  updateCategory(
    @Param('id') id: string,
    @Body() dto: UpdateBlogCategoryDto,
    @CurrentAdmin() admin: { id: string },
  ) {
    return this.blog.updateCategory(id, dto, admin.id);
  }

  @Delete('admin/blog/categories/:id')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  deleteCategory(@Param('id') id: string, @CurrentAdmin() admin: { id: string }) {
    return this.blog.deleteCategory(id, admin.id);
  }

  @Get('admin/blog/tags')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  adminListTags() {
    return this.blog.getTags();
  }

  @Post('admin/blog/tags')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  createTag(@Body() dto: CreateBlogTagDto, @CurrentAdmin() admin: { id: string }) {
    return this.blog.createTag(dto, admin.id);
  }

  @Patch('admin/blog/tags/:id')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  updateTag(
    @Param('id') id: string,
    @Body() dto: UpdateBlogTagDto,
    @CurrentAdmin() admin: { id: string },
  ) {
    return this.blog.updateTag(id, dto, admin.id);
  }

  @Delete('admin/blog/tags/:id')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager, AdminRole.content_manager)
  @ApiBearerAuth()
  deleteTag(@Param('id') id: string, @CurrentAdmin() admin: { id: string }) {
    return this.blog.deleteTag(id, admin.id);
  }
}
