import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ImageSaveService {
    prisma = new PrismaClient();

    async toggleSave(idUser: number, idImage: number) {
        const image = await this.prisma.images.findUnique({ where: { id: idImage, deleted : false } });
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
                message: "unsaved"
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
                message: "saved"
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
    async getSavedImages(idUser: number) {
        const savedImages = await this.prisma.images_save.findMany({
            where: {
                user_id: idUser
            },
            include: {
                images: true
            }
        });
        return {
            statusCode: HttpStatus.OK,
            data: savedImages
        }
    }
}
