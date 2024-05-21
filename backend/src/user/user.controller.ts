import { PrismaClient } from '@prisma/client';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { TokenPayload } from 'src/auth/dto/tokenPayload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { FileCompressed } from 'src/image/dto/create-image.dto';
import { CompressImagePipe } from 'src/pipes/compress-image/compress-image.pipe';
import { UserFollowingService } from 'src/user-following/user-following.service';
import { ImageLikeService } from 'src/image-like/image-like.service';
import { ImageSaveService } from 'src/image-save/image-save.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';


@ApiTags("User")
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userFollowingService: UserFollowingService,
    private readonly imageLikeService: ImageLikeService,
    private readonly imageSaveService: ImageSaveService
  ) { }
  prisma = new PrismaClient();

  @ApiParam({
    name: "id",
    example: 6
  })
  @Get("/:id")
  getUser(@Param("id", ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }

  @ApiBearerAuth("access-token")
  @UseGuards(JwtAuthGuard)
  @Get('')
  getYourself(@Req() req: Request) {
    const payload = req.user as TokenPayload
    return this.userService.getYourself(payload.id);
  }

  @ApiBearerAuth("access-token")
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
          description: 'Avatar image file'
        },
        fullname: {
          type: "string",
          example: "Update user fullname"
        },
        age: {
          type: "number",
          example: 40
        }
      },
    },
  })
  @UseInterceptors(FileInterceptor("avatar", {
    storage: memoryStorage()
  }))
  @Post("/edit")
  update(@UploadedFile(CompressImagePipe) avatar: FileCompressed[] | undefined, @Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
    const { user } = req;
    const pathAvatar = !avatar ? null : avatar[0]
    return this.userService.edit(updateUserDto, pathAvatar, user as TokenPayload)
  }

  @ApiParam({
    name: "id",
    example: 6
  })
  @ApiBearerAuth("access-token")
  @UseGuards(JwtAuthGuard)
  @Post("/follow/:id")
  follow(@Param("id", ParseIntPipe) id: number, @Req() req: Request) {
    const payload = req.user as TokenPayload;
    return this.userFollowingService.toggleFollow(payload.id, id);
  }

  @ApiParam({
    name: "id",
    example: 6
  })
  @Get(":id/image/like")
  getLikeImages(@Param("id", ParseIntPipe) id: number) {
    return this.imageLikeService.getLikedImages(id);
  }

  @ApiParam({
    name: "id",
    example: 6
  })
  @Get(":id/image/save")
  getSaveImages(@Param("id", ParseIntPipe) id: number) {
    return this.imageSaveService.getSavedImages(id);
  }
}
