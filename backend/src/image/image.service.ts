import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FileCompressed } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaClient } from '@prisma/client';
import { TokenDecodePayload, TokenPayload } from 'src/auth/dto/tokenPayload.dto';
import { ImageCategoryService } from 'src/image-category/image-category.service';

const pageSize = 10;

@Injectable()
export class ImageService {
  constructor(
    private readonly imageCategoryService: ImageCategoryService,
    private readonly jwtService: JwtService
  ) { }
  prisma = new PrismaClient();
  async findById(id: number) {
    const image = await this.prisma.images.findUnique({
      where: { id: id },
      include: {
        users: {
          select: {
            id: true,
            fullname: true,
            avatar: true,
            email: true,
          }
        }
      }
    });
    if (!image) {
      throw new HttpException("Image not found", HttpStatus.NOT_FOUND);
    }
    return {
      statusCode: HttpStatus.OK,
      message: "Image found",
      data: {
        data: {
          ...image
        }
      }
    }
  }
  async findAll(page = 1, token = "") {
    let userId = 0;
    try {
      const decodeToken: TokenDecodePayload = await this.jwtService.verify(token, {
        secret: process.env.SECRECT_KEY,
      });
      userId = decodeToken.id;
    }
    catch (err) {
      console.log(err)
    }
    try {
      const total = await this.prisma.images.count();
      const index = (page - 1) * pageSize;
      const list = await this.prisma.images.findMany({
        where: {
          deleted: false
        },
        take: pageSize,
        skip: index,
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          images_save: {
            where: {
              user_id: userId
            },
            select: {
              user_id : true
            }
          }
        }
      });
      const imageList = list.map(image => {
        const obj = {
          ...image,
          isSaved: image.images_save.length > 0
        };
        delete obj.images_save;
        return obj;
      });
      return {
        statusCode: HttpStatus.FOUND,
        message: " list images",
        currentPage: page,
        pageSize: pageSize,
        totalPage: Math.ceil(total / pageSize),
        data: imageList
      }
    }
    catch (error) {
      throw new HttpException("error", HttpStatus.NOT_FOUND);
    }
  }
  async uploadSingle(file: FileCompressed, user: TokenPayload, fileInfo: UpdateImageDto) {
    const arCate = JSON.parse(fileInfo.cates);
    const { original, thumb } = file;
    const uploaded = await this.prisma.images.create({
      data: {
        name: fileInfo.name,
        url: original.path,
        thumbnail_url: thumb.path,
        user_id: user.id,
        description: fileInfo.description,
        width: original.width,
        height: original.height,
      }
    });
    await this.imageCategoryService.addCateToImage(uploaded.id, arCate);
    const final = await this.prisma.images.findUnique({
      where: {
        id: uploaded.id
      },
      include: {
        images_category: {
          include: {
            categories: true
          }
        }
      }
    })
    return {
      statusCode: HttpStatus.OK,
      message: "Upload image success",
      data: final
    }
  }
  async uploadMulti(files: FileCompressed[], user: TokenPayload, cates: string) {
    const arCate = JSON.parse(cates);
    const uploaded = await Promise.all(
      files.map(async (file) => {
        const { original, thumb } = file;
        const uploadedImg = await this.prisma.images.create({
          data: {
            name: original.filename,
            url: original.path,
            thumbnail_url: thumb.path,
            user_id: user.id,
            description: "...",
            width: original.width,
            height: original.height,
          }
        });
        await this.imageCategoryService.addCateToImage(uploadedImg.id, arCate);
        const finalImage = this.prisma.images.findUnique({
          where: {
            id: uploadedImg.id
          },
          include: {
            images_category: {
              include: {
                categories: true
              }
            }
          }
        })
        return finalImage;
      })
    )
    //await this.imageCategoryService.addCateToImage(uploaded.id, arCate);
    return {
      statusCode: HttpStatus.OK,
      message: "Uploaded images success",
      data: uploaded
    };
  }
  async editInfoImage(editData: UpdateImageDto, id: number) {
    const arCate = JSON.parse(editData.cates);
    const image = await this.prisma.images.findUnique({
      where: {
        id: id
      }
    });
    if (image.deleted) {
      throw new HttpException("error", HttpStatus.NOT_FOUND);
    }
    await this.imageCategoryService.addCateToImage(id, arCate);
    const edited = await this.prisma.images.update({
      where: {
        id: id,
      },
      data: {
        name: editData.name,
        description: editData.description
      },
      include: {
        images_category: {
          include: {
            categories: true
          }
        }
      }
    });
    return {
      statusCode: HttpStatus.OK,
      message: "Edit image success",
      data: edited
    }
  }

  async deleteImage(idImage: number) {
    const image = await this.prisma.images.findUnique({
      where: {
        id: idImage
      }
    });
    if (image.deleted) {
      throw new HttpException("error", HttpStatus.NOT_FOUND);
    }
    const deletedImage = await this.prisma.images.update({
      where: {
        id: idImage
      },
      data: {
        deleted: true
      }
    });
    if (!deletedImage) {
      throw new HttpException("Image not found", HttpStatus.NOT_FOUND);
    }
    return {
      statusCode: HttpStatus.OK,
      message: "Delete image success",
    }
  }
}
