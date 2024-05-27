import { ArgumentMetadata, BadRequestException, Inject, Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'path';
import generateRandomString from 'src/ultility/generatorRandomString';
const sharp = require('sharp');
import removeNonAlphanumeric from 'src/ultility/removeSpecialCharacter';


//process.cwd()

@Injectable()
export class CompressImagePipe implements PipeTransform {
  constructor(@Inject("UPLOAD_PATH") private readonly pathUpload : string){
    this.pathUpload = pathUpload
  }
  async transform(image: Express.Multer.File | Express.Multer.File[] | undefined) {
    if (image === undefined) {
      return null;
    }
    const files = Array.isArray(image) ? image : [image];
    const processedFiles = await Promise.all(
      files.map(async file => {
        const img = await compressImage(file, this.pathUpload);
        const thumb = await createThumbnail(file, this.pathUpload);
        return {
          original: img,
          thumb: thumb
        }
      })
    )
    return processedFiles;
  }
}

const compressImage = async (file, pathUrl : string) => {
  const originalName = removeNonAlphanumeric(path.parse(file.originalname).name);
  const fileExtension = path.extname(file.originalname).toLowerCase();
  const filename = Date.now() + '-' + generateRandomString(4) + '-' + originalName;
  let fileCompressed: any;
  switch (fileExtension) {
    case ".jpg":
    case ".jpeg":
      fileCompressed = await sharp(file.buffer)
        .jpeg({ quality: 75 })
        .toFile(path.join(process.cwd() + "/public/" + pathUrl, filename + fileExtension));
      break;
    case '.png':
      fileCompressed = await sharp(file.buffer)
        .png({ quality: 75 })
        .toFile(path.join(process.cwd() + "/public/" + pathUrl, filename + fileExtension));
      break;
    case '.webp':
      fileCompressed = await sharp(file.buffer)
        .webp({ quality: 75 })
        .toFile(path.join(process.cwd() + "/public/" + pathUrl, filename + fileExtension));
      break;
    default:
      fileCompressed = await sharp(file.buffer)
        .toFile(path.join(process.cwd() + "/public/" + pathUrl, filename + fileExtension))
      break;
  }
  return {
    path: pathUrl + "/" + filename + fileExtension,
    filename: filename,
    ...fileCompressed
  }
}

const createThumbnail = async (file, pathUrl : string ) => {
  const originalName = removeNonAlphanumeric(path.parse(file.originalname).name);
  const filename = Date.now() + '-' + generateRandomString(4) + '-thumbnail-' + originalName;
  const thumbnail = await sharp(file.buffer)
    .jpeg({ quality: 90 })
    .resize(600)
    .toFile(path.join(process.cwd() + "/public/" + pathUrl + "/thumbnail", filename + ".jpeg"));
  return {
    path: pathUrl + "/thumbnail/" + filename + ".jpeg",
    filename: filename,
    ...thumbnail
  }
}
