import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { JwtModule } from '@nestjs/jwt';
import { ImageSaveModule } from 'src/image-save/image-save.module';
import { ImageLikeModule } from 'src/image-like/image-like.module';
import { CommentModule } from 'src/comment/comment.module';
import { ImageCategoryModule } from 'src/image-category/image-category.module';

@Module({
  controllers: [ImageController],
  providers: [ImageService],
  imports: [JwtModule.register({}),
    ImageSaveModule,
    ImageLikeModule,
    ImageCategoryModule,
    CommentModule
  ],
  exports : [
    ImageService
  ]
})
export class ImageModule { }
