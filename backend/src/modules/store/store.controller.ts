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
  CreateCategoryDto,
  CreateProductDto,
  CreateVariantDto,
  UpdateCategoryDto,
  UpdateInventoryDto,
  UpdateProductDto,
  UpdateVariantDto,
} from './dto/store.dto';
import { StoreService } from './store.service';

@ApiTags('Store')
@Controller()
export class StoreController {
  constructor(private store: StoreService) {}

  @Get('store/categories')
  getCategories() {
    return this.store.getCategories();
  }

  @Get('store/products')
  getProducts(@Query() query: PaginationDto, @Query('category') category?: string) {
    return this.store.getProducts(query, category);
  }

  @Get('store/products/:slug')
  getProduct(@Param('slug') slug: string) {
    return this.store.getProduct(slug);
  }

  @Get('admin/store/categories')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager)
  @ApiBearerAuth()
  adminListCategories() {
    return this.store.adminListCategories();
  }

  @Post('admin/store/categories')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager)
  @ApiBearerAuth()
  createCategory(@Body() dto: CreateCategoryDto, @CurrentAdmin() admin: { id: string }) {
    return this.store.createCategory(dto, admin.id);
  }

  @Patch('admin/store/categories/:id')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager)
  @ApiBearerAuth()
  updateCategory(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
    @CurrentAdmin() admin: { id: string },
  ) {
    return this.store.updateCategory(id, dto, admin.id);
  }

  @Delete('admin/store/categories/:id')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager)
  @ApiBearerAuth()
  deleteCategory(@Param('id') id: string, @CurrentAdmin() admin: { id: string }) {
    return this.store.deleteCategory(id, admin.id);
  }

  @Get('admin/store/products')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager)
  @ApiBearerAuth()
  adminListProducts(@Query() query: PaginationDto) {
    return this.store.adminListProducts(query);
  }

  @Post('admin/store/products')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager)
  @ApiBearerAuth()
  createProduct(@Body() dto: CreateProductDto, @CurrentAdmin() admin: { id: string }) {
    return this.store.createProduct(dto, admin.id);
  }

  @Patch('admin/store/products/:id')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager)
  @ApiBearerAuth()
  updateProduct(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
    @CurrentAdmin() admin: { id: string },
  ) {
    return this.store.updateProduct(id, dto, admin.id);
  }

  @Delete('admin/store/products/:id')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager)
  @ApiBearerAuth()
  deleteProduct(@Param('id') id: string, @CurrentAdmin() admin: { id: string }) {
    return this.store.deleteProduct(id, admin.id);
  }

  @Post('admin/store/products/:productId/variants')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager)
  @ApiBearerAuth()
  addVariant(
    @Param('productId') productId: string,
    @Body() dto: CreateVariantDto,
    @CurrentAdmin() admin: { id: string },
  ) {
    return this.store.addVariant(productId, dto, admin.id);
  }

  @Patch('admin/store/variants/:id')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager)
  @ApiBearerAuth()
  updateVariant(
    @Param('id') id: string,
    @Body() dto: UpdateVariantDto,
    @CurrentAdmin() admin: { id: string },
  ) {
    return this.store.updateVariant(id, dto, admin.id);
  }

  @Patch('admin/store/inventory/:variantId')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager)
  @ApiBearerAuth()
  updateInventory(
    @Param('variantId') variantId: string,
    @Body() dto: UpdateInventoryDto,
    @CurrentAdmin() admin: { id: string },
  ) {
    return this.store.updateInventory(variantId, dto, admin.id);
  }

  @Get('admin/store/inventory')
  @UseGuards(JwtAdminGuard, RolesGuard)
  @Roles(AdminRole.super_admin, AdminRole.manager)
  @ApiBearerAuth()
  getInventoryReport() {
    return this.store.getInventoryReport();
  }
}
