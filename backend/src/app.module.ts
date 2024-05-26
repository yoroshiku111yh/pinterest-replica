import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ImageModule } from './image/image.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ImageLikeModule } from './image-like/image-like.module';
import { ImageSaveModule } from './image-save/image-save.module';
import { UserFollowingModule } from './user-following/user-following.module';
import { CommentModule } from './comment/comment.module';
import { NotificationGateway } from './notification/notification.gateway';
import { CategoryModule } from './category/category.module';
import { ImageCategoryModule } from './image-category/image-category.module';
import { SearchModule } from './search/search.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    AuthModule,
    UserModule,
    ImageModule,
    JwtModule.register({}),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public")
    }),
    ImageLikeModule,
    ImageSaveModule,
    UserFollowingModule,
    CommentModule,
    CategoryModule,
    ImageCategoryModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, NotificationGateway],
})
export class AppModule { }
