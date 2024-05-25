import { PrismaClient } from '@prisma/client';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Req, UseInterceptors, UploadedFile, Put, Query } from '@nestjs/common';
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
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';


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
  @Get("/:id(\\d+)")
  getUser(@Param("id", ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }

  @ApiBearerAuth("access-token")
  @UseGuards(JwtAuthGuard)
  @Get('')
  getYourself(@Req() req: Request) {
    const payload = req.user as TokenPayload
    return this.userService.getUser(payload.id);
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
  @Put("")
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
  @Get("/follow/:id(\\d+)")
  checkIsFollowed(@Param("id", ParseIntPipe) id: number, @Req() req: Request) {
    const payload = req.user as TokenPayload;
    return this.userFollowingService.checkIsFollowed(payload.id, id);
  }

  @Get("/:id(\\d+)/follower")
  getFollower(@Param("id", ParseIntPipe) id: number) {
    return this.userFollowingService.getFollower(id);
  }

  @Get("/:id(\\d+)/following")
  getFollowing(@Param("id", ParseIntPipe) id: number) {
    return this.userFollowingService.getFollowing(id);
  }


  ////////LAST IN LINE

  @ApiParam({
    name: "id",
    example: 6
  })
  @ApiBearerAuth("access-token")
  @UseGuards(JwtAuthGuard)
  @Post("/follow/:id(\\d+)")
  follow(@Param("id", ParseIntPipe) id: number, @Req() req: Request) {
    const payload = req.user as TokenPayload;
    return this.userFollowingService.toggleFollow(payload.id, id);
  }

  @ApiQuery({ name: 'page', required: true, type: Number, description: 'Page number' })
  @ApiParam({
    name: "id",
    example: 6
  })
  @Get(":id(\\d+)/image/like")
  getLikeImages(@Param("id", ParseIntPipe) id: number, @Query("page", ParseIntPipe) page: number) {
    return this.imageLikeService.getLikedImages(page, id);
  }

  @ApiQuery({ name: 'page', required: true, type: Number, description: 'Page number' })
  @ApiParam({
    name: "id",
    example: 6
  })
  @Get(":id(\\d+)/image/save")
  getSaveImages(@Param("id", ParseIntPipe) id: number, @Query("page", ParseIntPipe) page: number) {
    return this.imageSaveService.getSavedImages(page, id);
  }

  @ApiQuery({ name: 'page', required: true, type: Number, description: 'Page number' })
  @ApiParam({
    name: "id",
    example: 6
  })
  @Get(":id(\\d+)/image/created")
  getCreatedImages(@Param("id", ParseIntPipe) id: number, @Query("page", ParseIntPipe) page: number) {
    return this.userService.getListImageCreatedByUserId(page, id);
  }
}
