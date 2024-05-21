import { Controller} from '@nestjs/common';
import { ImageSaveService } from './image-save.service';

@Controller('image-save')
export class ImageSaveController {
  constructor(private readonly imageSaveService: ImageSaveService) {}
}
