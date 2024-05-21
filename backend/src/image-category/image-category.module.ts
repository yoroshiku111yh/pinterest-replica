import { Module } from '@nestjs/common';
import { ImageCategoryService } from './image-category.service';
import { ImageCategoryController } from './image-category.controller';

@Module({
  controllers: [ImageCategoryController],
  providers: [ImageCategoryService],
  exports : [ImageCategoryService]
})
export class ImageCategoryModule {}
