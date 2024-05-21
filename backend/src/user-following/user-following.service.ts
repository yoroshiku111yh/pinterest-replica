import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserFollowingService {
    prisma = new PrismaClient();
    async toggleFollow(idUser: number, idFollower: number) {
        if (idUser === idFollower) {
            throw new HttpException("Dude, be yourself, not follow yourself", HttpStatus.FORBIDDEN);
        }
        const follower = await this.prisma.users.findUnique({
            where: {
                id: idFollower
            }
        });
        if (!follower) {
            throw new HttpException("Follwer not found", HttpStatus.NOT_FOUND);
        }
        const isFollowed = await this.prisma.following.findFirst({
            where: {
                following_id: idUser,
                user_id: idFollower
            }
        });
        if (isFollowed) {
            await this.prisma.following.delete({
                where: {
                    user_id_following_id: {
                        user_id: idUser,
                        following_id: idFollower
                    }
                }
            });
            return {
                statusCode: HttpStatus.OK,
                message: "Unfollowed"
            }
        }
        await this.prisma.following.create({
            data: {
                user_id: idUser,
                following_id: idFollower
            }
        });
        return {
            statusCode: HttpStatus.OK,
            message: "followed"
        }

    }
}
