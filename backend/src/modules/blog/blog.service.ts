import { Injectable, NotFoundException } from '@nestjs/common';
import { AuditAction } from '@prisma/client';
import { paginate, paginatedResult, PaginationDto } from '../../common/dto/pagination.dto';
import { AuditService } from '../../common/services/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateArticleDto,
  CreateBlogCategoryDto,
  CreateBlogTagDto,
  UpdateArticleDto,
  UpdateBlogCategoryDto,
  UpdateBlogTagDto,
} from './dto/blog.dto';

const articleInclude = {
  category: true,
  tags: { include: { tag: true } },
  faqs: { orderBy: { sortOrder: 'asc' as const } },
};

@Injectable()
export class BlogService {
  constructor(
    private prisma: PrismaService,
    private audit: AuditService,
  ) {}

  async getPosts(query: PaginationDto, categorySlug?: string, tag?: string) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const { take, skip } = paginate(page, limit);
    const where = {
      deletedAt: null,
      isPublished: true,
      ...(categorySlug ? { category: { slug: categorySlug, deletedAt: null } } : {}),
      ...(tag ? { tags: { some: { tag: { name: tag, deletedAt: null } } } } : {}),
      ...(query.search
        ? {
            OR: [
              { title: { contains: query.search, mode: 'insensitive' as const } },
              { excerpt: { contains: query.search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      this.prisma.blogArticle.findMany({
        where,
        skip,
        take,
        orderBy: { publishedAt: 'desc' },
        include: {
          category: true,
          tags: { include: { tag: true } },
        },
      }),
      this.prisma.blogArticle.count({ where }),
    ]);

    return paginatedResult(items, total, page, limit);
  }

  async getPost(slug: string) {
    const article = await this.prisma.blogArticle.findFirst({
      where: { slug, deletedAt: null, isPublished: true },
      include: articleInclude,
    });
    if (!article) throw new NotFoundException('مقاله یافت نشد');

    await this.prisma.blogArticle.update({
      where: { id: article.id },
      data: { views: { increment: 1 } },
    });

    return article;
  }

  getCategories() {
    return this.prisma.blogCategory.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
    });
  }

  getTags() {
    return this.prisma.blogTag.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
    });
  }

  async adminListArticles(query: PaginationDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const { take, skip } = paginate(page, limit);
    const where = {
      deletedAt: null,
      ...(query.search
        ? { title: { contains: query.search, mode: 'insensitive' as const } }
        : {}),
    };

    const [items, total] = await Promise.all([
      this.prisma.blogArticle.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: articleInclude,
      }),
      this.prisma.blogArticle.count({ where }),
    ]);

    return paginatedResult(items, total, page, limit);
  }

  async createArticle(dto: CreateArticleDto, adminId: string) {
    const { tagIds, faqs, publishedAt, ...data } = dto;
    const result = await this.prisma.blogArticle.create({
      data: {
        ...data,
        publishedAt: publishedAt ? new Date(publishedAt) : dto.isPublished ? new Date() : null,
        tags: tagIds?.length
          ? { create: tagIds.map((tagId) => ({ tagId })) }
          : undefined,
        faqs: faqs?.length ? { create: faqs } : undefined,
      },
      include: articleInclude,
    });
    await this.audit.log({
      adminId,
      action: AuditAction.create,
      entity: 'blog_article',
      entityId: result.id,
    });
    return result;
  }

  async updateArticle(id: string, dto: UpdateArticleDto, adminId: string) {
    await this.ensureArticle(id);
    const { tagIds, faqs, publishedAt, ...data } = dto;

    if (tagIds) {
      await this.prisma.blogArticleTag.deleteMany({ where: { articleId: id } });
      if (tagIds.length) {
        await this.prisma.blogArticleTag.createMany({
          data: tagIds.map((tagId) => ({ articleId: id, tagId })),
        });
      }
    }

    if (faqs) {
      await this.prisma.blogArticleFaq.deleteMany({ where: { articleId: id } });
      if (faqs.length) {
        await this.prisma.blogArticleFaq.createMany({
          data: faqs.map((f) => ({ ...f, articleId: id })),
        });
      }
    }

    const result = await this.prisma.blogArticle.update({
      where: { id },
      data: {
        ...data,
        ...(publishedAt !== undefined ? { publishedAt: publishedAt ? new Date(publishedAt) : null } : {}),
      },
      include: articleInclude,
    });

    await this.audit.log({
      adminId,
      action: AuditAction.update,
      entity: 'blog_article',
      entityId: id,
      changes: dto,
    });
    return result;
  }

  async deleteArticle(id: string, adminId: string) {
    await this.ensureArticle(id);
    const result = await this.prisma.blogArticle.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    await this.audit.log({
      adminId,
      action: AuditAction.delete,
      entity: 'blog_article',
      entityId: id,
    });
    return result;
  }

  async createCategory(dto: CreateBlogCategoryDto, adminId: string) {
    const result = await this.prisma.blogCategory.create({ data: dto });
    await this.audit.log({
      adminId,
      action: AuditAction.create,
      entity: 'blog_category',
      entityId: result.id,
    });
    return result;
  }

  async updateCategory(id: string, dto: UpdateBlogCategoryDto, adminId: string) {
    await this.ensureCategory(id);
    const result = await this.prisma.blogCategory.update({ where: { id }, data: dto });
    await this.audit.log({
      adminId,
      action: AuditAction.update,
      entity: 'blog_category',
      entityId: id,
      changes: dto,
    });
    return result;
  }

  async deleteCategory(id: string, adminId: string) {
    await this.ensureCategory(id);
    const result = await this.prisma.blogCategory.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    await this.audit.log({
      adminId,
      action: AuditAction.delete,
      entity: 'blog_category',
      entityId: id,
    });
    return result;
  }

  async createTag(dto: CreateBlogTagDto, adminId: string) {
    const result = await this.prisma.blogTag.create({ data: dto });
    await this.audit.log({
      adminId,
      action: AuditAction.create,
      entity: 'blog_tag',
      entityId: result.id,
    });
    return result;
  }

  async updateTag(id: string, dto: UpdateBlogTagDto, adminId: string) {
    await this.ensureTag(id);
    const result = await this.prisma.blogTag.update({ where: { id }, data: dto });
    await this.audit.log({
      adminId,
      action: AuditAction.update,
      entity: 'blog_tag',
      entityId: id,
      changes: dto,
    });
    return result;
  }

  async deleteTag(id: string, adminId: string) {
    await this.ensureTag(id);
    const result = await this.prisma.blogTag.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    await this.audit.log({
      adminId,
      action: AuditAction.delete,
      entity: 'blog_tag',
      entityId: id,
    });
    return result;
  }

  private async ensureArticle(id: string) {
    const item = await this.prisma.blogArticle.findFirst({ where: { id, deletedAt: null } });
    if (!item) throw new NotFoundException('مقاله یافت نشد');
  }

  private async ensureCategory(id: string) {
    const item = await this.prisma.blogCategory.findFirst({ where: { id, deletedAt: null } });
    if (!item) throw new NotFoundException('دسته‌بندی یافت نشد');
  }

  private async ensureTag(id: string) {
    const item = await this.prisma.blogTag.findFirst({ where: { id, deletedAt: null } });
    if (!item) throw new NotFoundException('برچسب یافت نشد');
  }
}
