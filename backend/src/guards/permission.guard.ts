import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

export enum TABLE_NAME {
    IMAGE = "images"
}

@Injectable()
export class GuardPermission implements CanActivate {
    constructor(private readonly table: string) { }
    prisma = new PrismaClient();
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { user, params } = request;
        let resource;
        if (!this.table) {
            throw new HttpException("Table name can not be null", HttpStatus.NOT_FOUND);
        }
        if(!Number(params.id)){
            throw new HttpException("Image not found", HttpStatus.NOT_FOUND);
        }
        switch (this.table) {
            case TABLE_NAME.IMAGE:
                resource = this.prisma.images;
                break;
        }
        const data = await resource.findUnique({
            where: {
                id: Number(params.id)
            }
        });
        if (!data) {
            throw new HttpException("Image not found", HttpStatus.NOT_FOUND);
        }
        if (data.user_id !== user.id) {
            throw new HttpException("You don't have permission to do this", HttpStatus.FORBIDDEN);
        }
        return true;
    }
}