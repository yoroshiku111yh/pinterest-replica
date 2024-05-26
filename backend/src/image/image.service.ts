import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FileCompressed } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaClient } from '@prisma/client';
import { TokenDecodePayload, TokenPayload } from 'src/auth/dto/tokenPayload.dto';
import { ImageCategoryService } from 'src/image-category/image-category.service';
import { ResponseCateImageDto } from 'src/image-category/dto/responseCateImage.dto';



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
    const cates = await this.prisma.images_category.findMany({
      where: {
        image_id: id
      },
      include: {
        categories: true
      }
    });
    const catesAr = cates.reduce((result: ResponseCateImageDto[], cate) => {
      return result.concat(cate.categories);
    }, []);
    return {
      statusCode: HttpStatus.OK,
      message: "Image found",
      data: {
        ...image,
        ...{ cates: catesAr }
      }
    }
  }
  async findAll(page = 1, payload: TokenPayload | null) {
    const pageSize = 10;
    let userId = payload ? payload.id : 0;
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
              user_id: true
            }
          },
          images_like: {
            where: {
              user_id: userId
            },
            select: {
              user_id: true
            }
          }
        }
      });
      const imageList = list.map(image => {
        const obj = {
          ...image,
          isSaved: image.images_save.length > 0,
          isLiked: image.images_like.length > 0
        };
        delete obj.images_save;
        delete obj.images_like;
        return obj;
      });
      return {
        statusCode: HttpStatus.OK,
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
  async getListImageCreatedByUserId(page: number, idUser: number) {
    const pageSize = 10;
    const total = await this.prisma.images.count({
      where: {
        user_id: idUser
      }
    });
    const index = (page - 1) * pageSize;
    const listImage = await this.prisma.images.findMany({
      where: {
        user_id: idUser,
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
            user_id: idUser
          }
        },
        images_like: {
          where: {
            user_id: idUser
          }
        }
      }
    });
    const ar = [];
    for (let i = 0; i < listImage.length; i++) {
      const img = listImage[i]
      const isSaved = img.images_save.length > 0 ? true : false;
      const isLiked = img.images_like.length > 0 ? true : false;
      delete img.images_save;
      delete img.images_like;
      const modified = { ...listImage[i], ...{ isSaved: isSaved, isLiked: isLiked } };
      ar.push(modified);
    }
    return {
      statusCode: HttpStatus.OK,
      message: " list images",
      currentPage: page,
      pageSize: pageSize,
      totalPage: Math.ceil(total / pageSize),
      data: ar
    }
  }
}
