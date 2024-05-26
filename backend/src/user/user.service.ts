import { HttpCode, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { TokenPayload } from 'src/auth/dto/tokenPayload.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { FileCompressed } from 'src/image/dto/create-image.dto';


const selectField = {
  id: true,
  email: true,
  fullname: true,
  avatar: true,
  age: true
}
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
          avatar: avatar ? avatar.original.path : user.avatar,
          age: Number(updateData.age) ? Number(updateData.age) : user.age
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
  async getUser(id: number) {
    const user = await this.prisma.users.findUnique({
      where: {
        id: id
      },
      select: selectField
    });
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    const follower = await this.prisma.following.count({
      where: {
        following_id: id
      }
    });
    const following = await this.prisma.following.count({
      where: {
        user_id: id
      }
    });
    return {
      statusCode: HttpStatus.OK,
      message: "data user",
      data: {
        info: user,
        follower: {
          total: follower
        },
        following: {
          total: following
        }
      }
    }
  }
}
