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
                message: "unliked",
                data : false
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
                message: "liked",
                data : true
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
    async getLikedImages(page : number, idUser: number) {
        const pageSize = 10;

        const total = await this.prisma.images_like.count({
            where: {
                user_id: idUser
            }
        });
        const index = (page - 1) * pageSize;
        const savedImages = await this.prisma.images_like.findMany({
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
                        images_save: {
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
            const isSaved = img.images.images_save.length > 0 ? true : false;
            delete img.images.images_save;
            const modified = { ...savedImages[i].images, ...{ isSaved: isSaved, isLiked: true } };
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
    async getTotalLikesOfImage(idImage: number){
        const totalLikes = await this.prisma.images_like.count({
            where : {
                image_id : idImage
            }
        });
        return {
            statusCode : HttpStatus.OK,
            data : totalLikes
        }
    }
}
