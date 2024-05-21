import { Module } from '@nestjs/common';
import { ImageSaveService } from './image-save.service';
import { ImageSaveController } from './image-save.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ImageSaveController],
  providers: [ImageSaveService],
  exports : [ImageSaveService],
})
export class ImageSaveModule {}
