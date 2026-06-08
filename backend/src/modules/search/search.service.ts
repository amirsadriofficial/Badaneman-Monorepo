import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async globalSearch(query: string, type = 'all') {
    const q = query.trim();
    if (!q) return { products: [], blog: [], coaches: [], facilities: [] };

    const searchProducts =
      type === 'all' || type === 'products'
        ? this.prisma.product.findMany({
            where: {
              deletedAt: null,
              isActive: true,
              OR: [
                { name: { contains: q, mode: 'insensitive' } },
                { description: { contains: q, mode: 'insensitive' } },
                { sku: { contains: q, mode: 'insensitive' } },
              ],
            },
            take: 10,
            select: {
              id: true,
              name: true,
              slug: true,
              featuredImageUrl: true,
              category: { select: { name: true, slug: true } },
            },
          })
        : [];

    const searchBlog =
      type === 'all' || type === 'blog'
        ? this.prisma.blogArticle.findMany({
            where: {
              deletedAt: null,
              isPublished: true,
              OR: [
                { title: { contains: q, mode: 'insensitive' } },
                { excerpt: { contains: q, mode: 'insensitive' } },
                { content: { contains: q, mode: 'insensitive' } },
              ],
            },
            take: 10,
            select: {
              id: true,
              title: true,
              slug: true,
              excerpt: true,
              featuredImageUrl: true,
              publishedAt: true,
            },
          })
        : [];

    const searchCoaches =
      type === 'all' || type === 'coaches'
        ? this.prisma.coach.findMany({
            where: {
              deletedAt: null,
              isActive: true,
              OR: [
                { name: { contains: q, mode: 'insensitive' } },
                { specialty: { contains: q, mode: 'insensitive' } },
                { position: { contains: q, mode: 'insensitive' } },
              ],
            },
            take: 10,
            select: {
              id: true,
              name: true,
              position: true,
              specialty: true,
              photoUrl: true,
            },
          })
        : [];

    const searchFacilities =
      type === 'all' || type === 'facilities'
        ? this.prisma.facility.findMany({
            where: {
              deletedAt: null,
              OR: [
                { title: { contains: q, mode: 'insensitive' } },
                { description: { contains: q, mode: 'insensitive' } },
              ],
            },
            take: 10,
            select: {
              id: true,
              title: true,
              description: true,
              imageUrl: true,
            },
          })
        : [];

    const [products, blog, coaches, facilities] = await Promise.all([
      searchProducts,
      searchBlog,
      searchCoaches,
      searchFacilities,
    ]);

    return { products, blog, coaches, facilities };
  }
}
