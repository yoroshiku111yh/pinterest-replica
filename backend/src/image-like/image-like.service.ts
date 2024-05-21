import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ImageLikeService {
    prisma = new PrismaClient();

    async toggleLike(idUser: number, idImage: number) {
        const image = await this.prisma.images.findUnique({ where: { id: idImage, deleted : false } });
        if (!image) {
            throw new HttpException("Image not found", HttpStatus.NOT_FOUND);
        }
        const likedImage = await this.prisma.images_like.findFirst({
            where: {
                user_id: idUser,
                image_id: idImage
            }
        });
        if (likedImage) {
            await this.prisma.images_like.delete({
                where: {
                    user_id_image_id: {
                        user_id: idUser,
                        image_id: idImage
                    }
                }
            });
            return {
                statusCode: HttpStatus.OK,
                message: "unliked"
            }
        }
        else {
            await this.prisma.images_like.create({
                data: {
                    user_id: idUser,
                    image_id: idImage
                }
            });
            return {
                statusCode: HttpStatus.OK,
                message: "liked"
            }
        }
    }
    async isLiked(idImage: number, idUser: number) {
        const liked = await this.prisma.images_like.count({
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
    async getLikedImages(idUser: number) {
        const likedImages = await this.prisma.images_like.findMany({
            where: {
                user_id: idUser
            },
            include: {
                images: true
            }
        });
        return {
            statusCode : HttpStatus.OK,
            data: likedImages
        }
    }
}
