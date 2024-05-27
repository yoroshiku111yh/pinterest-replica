import { JwtService } from '@nestjs/jwt';
import { HttpCode, HttpStatus, Injectable, Delete, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TokenDecodePayload, TokenPayload } from 'src/auth/dto/tokenPayload.dto';



@Injectable()
export class CategoryService {
    constructor(
        private readonly jwtService: JwtService
    ) { }
    prisma = new PrismaClient();
    async getAll() {
        const categories = await this.prisma.categories.findMany();
        return {
            statusCode: HttpStatus.OK,
            data: categories
        }
    }
    async getImagesByCate(idCate: number, page: number, payload : TokenPayload | null) {
        const pageSize = 10;
        let userId = payload ? payload.id : 0 ;
        const cate = await this.prisma.categories.findUnique({
            where: {
                id: idCate
            }
        });
        if (!cate) {
            throw new NotFoundException;
        }
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
        const list = await this.prisma.images.findMany({
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
        const imageList = list.map(image => {
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
            statusCode: HttpStatus.FOUND,
            message: " list images",
            currentPage: page,
            pageSize: pageSize,
            totalPage: Math.ceil(total / pageSize),
            cate : cate,
            data: imageList
        }
    }
}
