import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class SearchService {
    prisma = new PrismaClient();
    async findImageByName(nameImage: string) {
        const results = await this.prisma.images.findMany({
            where: {
                name: {
                    contains: nameImage,
                }
            },
            take : 10
        });
        return {
            statusCode: HttpStatus.OK,
            message: "Find image success",
            data: results
        }
    }
    async findCateByName(nameCate: string) {
        const results = await this.prisma.categories.findMany({
            where: {
                name: {
                    contains: nameCate,
                }
            },
            take : 10
        });
        return {
            statusCode: HttpStatus.OK,
            message: "Find categories success",
            data: results
        }
    }
}
