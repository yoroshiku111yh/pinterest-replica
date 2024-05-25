import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class ImageSaveService {
    prisma = new PrismaClient();

    async toggleSave(idUser: number, idImage: number) {
        const image = await this.prisma.images.findUnique({ where: { id: idImage, deleted: false } });
        if (!image) {
            throw new HttpException("Image not found", HttpStatus.NOT_FOUND);
        }
        const likedImage = await this.prisma.images_save.findFirst({
            where: {
                user_id: idUser,
                image_id: idImage
            }
        });
        if (likedImage) {
            await this.prisma.images_save.delete({
                where: {
                    user_id_image_id: {
                        user_id: idUser,
                        image_id: idImage
                    }
                }
            });
            return {
                statusCode: HttpStatus.OK,
                message: "unsaved",
                data: false,
            }
        }
        else {
            await this.prisma.images_save.create({
                data: {
                    user_id: idUser,
                    image_id: idImage
                }
            });
            return {
                statusCode: HttpStatus.OK,
                message: "saved",
                data: true,
            }
        }
    }
    async isSaved(idImage: number, idUser: number) {
        const liked = await this.prisma.images_save.count({
            where: {
                user_id: idUser,
                image_id: idImage
            }
        });
        return {
            statusCode: HttpStatus.OK,
            data: liked ? true : false
        };
    }
    async getSavedImages(page: number, idUser: number) {
        const pageSize = 10;

        const total = await this.prisma.images_save.count({
            where: {
                user_id: idUser
            }
        });
        const index = (page - 1) * pageSize;
        const savedImages = await this.prisma.images_save.findMany({
            where: {
                user_id: idUser
            },
            take: pageSize,
            skip: index,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                images: {
                    include: {
                        images_like: {
                            where: {
                                user_id: idUser
                            }
                        }
                    }
                }
            }
        });
        const ar = [];
        for (let i = 0; i < savedImages.length; i++) {
            const img = savedImages[i]
            const isLiked = img.images.images_like.length > 0 ? true : false;
            delete img.images.images_like
            const modified = { ...savedImages[i].images, ...{ isSaved: true, isLiked: isLiked } };
            ar.push(modified);
        }
        return {
            statusCode: HttpStatus.OK,
            message: " list images",
            currentPage: page,
            pageSize: pageSize,
            totalPage: Math.ceil(total / pageSize),
            data: ar
        }
    }
    async getTotalSaveOfImage(idImage: number) {
        const totalSave = await this.prisma.images_save.count({
            where: {
                image_id: idImage
            }
        });
        return {
            statusCode: HttpStatus.OK,
            data: totalSave
        }
    }
}
