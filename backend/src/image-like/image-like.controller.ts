import { Controller } from '@nestjs/common';
import { ImageLikeService } from './image-like.service';

@Controller('image-like')
export class ImageLikeController {
  constructor(private readonly imageLikeService: ImageLikeService) { }
}
