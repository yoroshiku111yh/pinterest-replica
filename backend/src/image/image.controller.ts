import { CompressImagePipe } from './../pipes/compress-image/compress-image.pipe';
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFiles, UseGuards, Req, Query, HttpException, HttpStatus, UploadedFile, Headers, Put, UsePipes } from '@nestjs/common';
import { ImageService } from './image.service';
import { FileCompressed } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { Request } from 'express';
import { TokenPayload } from 'src/auth/dto/tokenPayload.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { GuardPermission, TABLE_NAME } from 'src/guards/permission.guard';
import { ImageSaveService } from 'src/image-save/image-save.service';
import { ImageLikeService } from 'src/image-like/image-like.service';
import { CommentService } from 'src/comment/comment.service';
import { JwtDecodeNotRequired } from 'src/interceptors/decode-jwt-not-required';


@ApiTags("Image")
@Controller('image')
export class ImageController {
  constructor(
    private readonly imageService: ImageService,
    private readonly imageSaveService: ImageSaveService,
    private readonly imageLikeService: ImageLikeService,
    private readonly commentService: CommentService
  ) { }

  @ApiQuery({ name: 'page', required: true, type: Number, description: 'Page number' })
  @UseInterceptors(JwtDecodeNotRequired)
  @Get()
  findAll(@Query("page", ParseIntPipe) page: number,@Req() req : Request) {
    return this.imageService.findAll(page || 1, req.user as TokenPayload | null);
  }

  @Get("/:id(\\d+)")
  findById(@Param("id", ParseIntPipe) id: number) {
    return this.imageService.findById(id);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'image'
        },
        name: {
          type: 'string',
          description: "name",
        },
        description: {
          type: "string",
          description: "description"
        },
        cates: {
          type: "string",
          example: "[1,2,3,4]"
        }
      },
    },
  })
  @UseInterceptors(FileInterceptor("image", {
    storage: memoryStorage()
  }))
  @ApiBearerAuth("access-token")
  @UseGuards(JwtAuthGuard)
  @Post("/upload")
  uploadSingle(@UploadedFile(CompressImagePipe) file: FileCompressed[], @Req() req: Request, @Body() infoImage: UpdateImageDto) {
    if (!file || file.length === 0) {
      throw new HttpException("Image is require", HttpStatus.NOT_ACCEPTABLE);
    }
    return this.imageService.uploadSingle(file[0], req.user as TokenPayload, infoImage)
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        cates: {
          type: "string",
          example: "[1,2,3,4]"
        }
      },
    },
  })
  @UseInterceptors(FilesInterceptor("images", 10, {
    storage: memoryStorage()
  }))
  @ApiBearerAuth("access-token")
  @UseGuards(JwtAuthGuard)
  @Post("/upload/multi")
  upload(@UploadedFiles(CompressImagePipe) files: FileCompressed[], @Req() req: Request, @Body("cates") cates: string) {
    if (!files || files.length === 0) {
      throw new HttpException("Image(s) is require", HttpStatus.NOT_ACCEPTABLE);
    }
    return this.imageService.uploadMulti(files, req.user as TokenPayload, cates)
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: "string",
          description: "name of image"
        },
        description: {
          type: "string",
          description: "description of image"
        },
        cates: {
          type: "string",
          example: "[1,2,3,4]"
        }
      },
    },
  })
  @ApiBearerAuth("access-token")
  @UseGuards(JwtAuthGuard, new GuardPermission(TABLE_NAME.IMAGE))
  @Put("/:id(\\d+)")
  edit(@Body() formUpdate: UpdateImageDto,
    @Param("id", ParseIntPipe) id: number) {
    return this.imageService.editInfoImage(formUpdate, id);
  }

  @ApiBearerAuth("access-token")
  @UseGuards(JwtAuthGuard, new GuardPermission(TABLE_NAME.IMAGE))
  @Delete("/:id(\\d+)")
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.imageService.deleteImage(id);
  }

  @ApiBearerAuth("access-token")
  @UseGuards(JwtAuthGuard)
  @Post("/:id(\\d+)/like")
  likeImage(@Param("id", ParseIntPipe) id: number, @Req() req: Request) {
    const payload = req.user as TokenPayload;
    return this.imageLikeService.toggleLike(payload.id, id);
  }

  @ApiBearerAuth("access-token")
  @UseGuards(JwtAuthGuard)
  @Post("/:id(\\d+)/save")
  saveImage(@Param("id", ParseIntPipe) id: number, @Req() req: Request) {
    const payload = req.user as TokenPayload;
    return this.imageSaveService.toggleSave(payload.id, id);
  }

  @ApiBearerAuth("access-token")
  @UseGuards(JwtAuthGuard)
  @Get("/:id(\\d+)/interact")
  async getInteract(@Req() req: Request, @Param("id", ParseIntPipe) id: number){
    const payload = req.user as TokenPayload;
    const idUser = payload.id;
    const [isSaved, isLiked] = await Promise.all([
      this.imageSaveService.isSaved(id, idUser),
      this.imageLikeService.isLiked(id, idUser),
    ]);
    return {
      statusCode : HttpStatus.OK,
      data : {
        isSaved : isSaved.data,
        isLiked : isLiked.data
      }
    }
  }

  @Get("/:id(\\d+)/total/like")
  getTotalLike(@Param("id", ParseIntPipe) id: number) {
    return this.imageLikeService.getTotalLikesOfImage(id);
  }

  @Get("/:id(\\d+)/total/save")
  getTotalSave(@Param("id", ParseIntPipe) id: number) {
    return this.imageSaveService.getTotalSaveOfImage(id);
  }

  @Get("/:id(\\d+)/comment")
  getComments(@Param("id", ParseIntPipe) id: number, @Query("page", ParseIntPipe) page: number) {
    return this.commentService.getComment(id, page || 1)
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        content : {
          type : "string",
          example : "What do you think right now ?"
        }
      }
    }
  })
  @ApiBearerAuth("access-token")
  @UseGuards(JwtAuthGuard)
  @Post("/:id(\\d+)/comment")
  postComment(@Body() formComment: { content: string }, @Param("id", ParseIntPipe) id: number, @Req() req: Request) {
    const payload = req.user as TokenPayload;
    return this.commentService.postComment({
      content: formComment.content,
      idUser: Number(payload.id)
    }, id);
  }
}
