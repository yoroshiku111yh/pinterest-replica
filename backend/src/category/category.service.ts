import { HttpCode, HttpStatus, Injectable, Delete } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';



@Injectable()
export class CategoryService {
    prisma = new PrismaClient();
    async getAll() {
        const categories = await this.prisma.categories.findMany();
        return {
            statusCode: HttpStatus.OK,
            data: categories
        }
    }
    async getImagesByCate(idCate: number, page: number) {
        const pageSize = 10;
        const total = await this.prisma.images.count({
            where: {
                deleted: false,
                images_category: {
                    some: {
                        cate_id: idCate
                    }
                }
            }
        });
        const index = (page - 1) * pageSize;
        const images = await this.prisma.images.findMany({
            where: {
                deleted: false,
                images_category: {
                    some: {
                        cate_id: idCate
                    }
                }
            },
            take: pageSize,
            skip: index,
            orderBy: {
                createdAt: 'desc'
            }
        });
        return {
            statusCode: HttpStatus.FOUND,
            message: " list images",
            currentPage: page,
            pageSize: pageSize,
            totalPage: Math.ceil(total / pageSize),
            data: images
        }
    }
}
