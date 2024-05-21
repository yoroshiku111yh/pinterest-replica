import { HttpCode, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { TokenPayload } from 'src/auth/dto/tokenPayload.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { FileCompressed } from 'src/image/dto/create-image.dto';

@Injectable()
export class UserService {
  constructor(private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) { }
  prisma = new PrismaClient();

  async edit(updateData: UpdateUserDto, avatar: FileCompressed | null, payload: TokenPayload) {
    const user = await this.prisma.users.findUnique({
      where: {
        id: payload.id
      }
    });
    if (user) {
      const tokenRefreshDecode: TokenPayload = this.jwtService.decode(user.refresh_token);
      if (tokenRefreshDecode.keyPair !== payload.keyPair) {
        throw new UnauthorizedException();
      }
      const updatedUser = await this.prisma.users.update({
        where: {
          id: payload.id
        },
        data: {
          fullname: updateData.fullname,
          avatar: avatar ? avatar.original.path : null,
          age: Number(updateData.age)
        }
      });
      const _payload: TokenPayload = {
        id: updatedUser.id,
        email: updatedUser.email,
        fullname: updatedUser.fullname,
        avatar: updatedUser.avatar,
        keyPair: ""
      };
      const _accessToken = await this.authService.createPairAccessAndRefreshToken(_payload, updatedUser.id);
      return {
        statusCode: HttpStatus.CREATED,
        message: "User updated successfully",
        data: _accessToken
      };
    }
    throw new HttpException("Not found", HttpStatus.NOT_FOUND);
  }

  async getYourself(id: number) {
    const user = await this.prisma.users.findUnique({
      where: {
        id: id
      },
      select: {
        id: true,
        email: true,
        fullname: true,
        avatar: true,
      }
    });
    if (!user) {
      throw new HttpException("Not found", HttpStatus.NOT_FOUND);
    }
    const follower = await this.prisma.following.findMany({
      where: {
        following_id : id
      },
      include: {
        users_following_user_idTousers: {
          select: {
            id: true,
            fullname: true,
            avatar: true,
            email : true
          }
        }
      }
    });
    const following = await this.prisma.following.findMany({
      where: {
        user_id: id
      },
      include: {
        users_following_following_idTousers: {
          select: {
            id: true,
            fullname: true,
            avatar: true,
            email : true
          }
        }
      }
    });
    return {
      statusCode: HttpStatus.OK,
      message: "Get your self successfully",
      data: {
        info: user,
        follower: {
          list: follower,
          total: follower.length
        },
        following: {
          list: following,
          total: following.length
        }
      }
    }
  }
  async getUser(id: number) {
    const user = await this.prisma.users.findUnique({
      where: {
        id: id
      },
      select: {
        id: true,
        fullname: true,
        avatar: true,
        email: true,
      }
    });
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    const follower = await this.prisma.following.findMany({
      where: {
        following_id : id
      },
      include: {
        users_following_user_idTousers: {
          select: {
            id: true,
            fullname: true,
            avatar: true,
            email : true
          }
        }
      }
    });
    const following = await this.prisma.following.findMany({
      where: {
        user_id: id
      },
      include: {
        users_following_following_idTousers: {
          select: {
            id: true,
            fullname: true,
            avatar: true,
            email : true
          }
        }
      }
    });
    return {
      statusCode: HttpStatus.OK,
      message: "data user",
      data: {
        info: user,
        follower: {
          list: follower,
          total: follower.length
        },
        following: {
          list: following,
          total: following.length
        }
      }
    }
  }
}
