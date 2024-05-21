import { Module } from '@nestjs/common';
import { ImageLikeService } from './image-like.service';
import { ImageLikeController } from './image-like.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ImageLikeController],
  providers: [ImageLikeService],
  exports : [ImageLikeService],
})
export class ImageLikeModule {}
