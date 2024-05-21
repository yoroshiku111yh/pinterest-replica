import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const pageSize = 10;

@Injectable()
export class CommentService {
    prisma = new PrismaClient();
    async getComment(idImage: number, page: number) {
        const total = await this.prisma.comment.count({
            where: {
                image_id: idImage
            }
        });
        const index = (page - 1) * pageSize;
        const comments = await this.prisma.comment.findMany({
            where: {
                image_id : idImage
            },
            include: {
                users: {
                    select: {
                        id: true,
                        fullname: true,
                        avatar: true
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
            statusCode: HttpStatus.OK,
            message: "list comment",
            data: {
                currentPage: index,
                pageSize: pageSize,
                totalPage: Math.ceil(total / pageSize),
                data: comments
            }
        }
    }
    async postComment(formComment: { content: string, idUser: number }, idImage: number) {
        const { idUser, content } = formComment;
        const user = await this.prisma.users.findUnique({
            where: {
                id: idUser
            }
        });
        if (!user) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
        const image = await this.prisma.images.findUnique({
            where: {
                id: idImage
            }
        });
        if (!image) {
            throw new HttpException("Image not found", HttpStatus.NOT_FOUND);
        }
        const comment = await this.prisma.comment.create({
            data: {
                user_id: idUser,
                image_id: idImage,
                content: content
            }
        });
        return {
            statusCode: HttpStatus.OK,
            message: "create comment",
            data: comment
        }
    }
}
