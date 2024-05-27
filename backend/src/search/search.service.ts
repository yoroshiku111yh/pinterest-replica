import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TokenPayload } from 'src/auth/dto/tokenPayload.dto';

@Injectable()
export class SearchService {
    prisma = new PrismaClient();
    async findImageByName(nameImage: string, payload?: TokenPayload | null, page = 1) {
        const pageSize = 10;
        let userId = payload ? payload.id : 0;
        const total = await this.prisma.images.count({
            where: {
                deleted: false,
                name: {
                    contains: nameImage,
                }
            }
        });
        const index = (page - 1) * pageSize;
        const results = await this.prisma.images.findMany({
            where: {
                deleted: false,
                name: {
                    contains: nameImage,
                }
            },
            take: pageSize,
            skip: index,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                images_save: {
                    where: {
                        user_id: userId
                    },
                    select: {
                        user_id: true
                    }
                },
                images_like: {
                    where: {
                        user_id: userId
                    },
                    select: {
                        user_id: true
                    }
                }
            }
        });
        const imageList = results.map(image => {
            const obj = {
                ...image,
                isSaved: image.images_save.length > 0,
                isLiked: image.images_like.length > 0
            };
            delete obj.images_save;
            delete obj.images_like;
            return obj;
        });
        return {
            statusCode: HttpStatus.OK,
            message: "Find image success",
            currentPage: page,
            pageSize: pageSize,
            totalPage: Math.ceil(total / pageSize),
            data: imageList
        }
    }
    async findCateByName(nameCate: string) {
        const results = await this.prisma.categories.findMany({
            where: {
                name: {
                    contains: nameCate,
                }
            },
            take: 10
        });
        return {
            statusCode: HttpStatus.OK,
            message: "Find categories success",
            data: results
        }
    }
}

