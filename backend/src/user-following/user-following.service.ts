import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


const selectField = {
    id: true,
    email: true,
    fullname: true,
    avatar: true,
    age: true
}
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
                user_id: idUser,
                following_id: idFollower
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
                message: "Unfollowed",
                data : false,
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
            message: "followed",
            data : true
        }

    }
    async checkIsFollowed(idUser: number, idFollowing: number) {
        const isFollowed = await this.prisma.following.findFirst({
            where: {
                user_id: idUser,
                following_id: idFollowing
            }
        });
        return {
            statusCode: HttpStatus.OK,
            message: "is followed",
            data: isFollowed ? true : false
        }
    }

    async getFollower(idUser: number) {
        const follower = await this.prisma.following.findMany({
            where: {
                following_id: idUser
            },
            include: {
                users_following_user_idTousers: {
                    select: selectField
                }
            }
        });
        return {
            statusCode : HttpStatus.OK,
            message: "get follower",
            data : {
                total : follower.length,
                list : follower
            }
        }
    }

    async getFollowing(idUser: number) {
        const following = await this.prisma.following.findMany({
            where: {
                user_id: idUser
            },
            include: {
                users_following_following_idTousers: {
                    select: selectField
                }
            }
        });
        return {
            statusCode : HttpStatus.OK,
            message: "get following",
            data : {
                total : following.length,
                list : following
            }
        }
    }
}
