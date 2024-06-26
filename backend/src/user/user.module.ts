import { UserFollowingModule } from './../user-following/user-following.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ImageLikeModule } from 'src/image-like/image-like.module';
import { ImageSaveModule } from 'src/image-save/image-save.module';
import { ImageModule } from 'src/image/image.module';

@Module({
  controllers: [UserController],
  providers: [UserService, 
    {
      provide: 'UPLOAD_PATH',
      useValue : process.env.PATH_PUBLIC_IMAGE_AVATAR
    }
  ],
  imports: [
    AuthModule,
    UserFollowingModule,
    ImageLikeModule,
    ImageSaveModule,
    ImageModule,
    JwtModule.register({})]
})
export class UserModule { }
