import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [
    JwtModule.register({})
  ],
})
export class CategoryModule {}
