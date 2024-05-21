import { Controller } from '@nestjs/common';
import { ImageCategoryService } from './image-category.service';

@Controller('image-category')
export class ImageCategoryController {
  constructor(private readonly imageCategoryService: ImageCategoryService) {}
}
