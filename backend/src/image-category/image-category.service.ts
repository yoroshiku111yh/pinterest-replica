import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

interface ResObj {
    image_id: number,
    cate_id: number
}

@Injectable()
export class ImageCategoryService {
    prisma = new PrismaClient();
    async addCateToImage(idImage: number, listIdCate: number[]) {
        const image = this.prisma.images.findUnique({
            where: {
                id: idImage
            }
        })
        if (!image) {
            throw new HttpException("Image not found", HttpStatus.NOT_FOUND);
        }
        await this.prisma.images_category.deleteMany({
            where: {
                image_id: idImage
            }
        })
        const existingCategories = await this.prisma.categories.findMany({
            where: {
                id: { in: listIdCate },
            },
            select: { id: true },
        });
        const generateAr = (res: ResObj[], cate: { id: number }) => {
            res.push({ image_id: idImage, cate_id: cate.id })
            return res;
        }
        let cateOfimage = existingCategories.reduce(generateAr, [])
        await this.prisma.images_category.createMany({
            data: cateOfimage
        })
        return {
            statusCode: HttpStatus.OK
        }
    }
}
