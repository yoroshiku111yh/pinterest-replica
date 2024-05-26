import { Controller, Get, Headers, Param, ParseIntPipe, Query, Req, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtDecodeNotRequired } from 'src/interceptors/decode-jwt-not-required';
import { Request } from 'express';
import { TokenPayload } from 'src/auth/dto/tokenPayload.dto';

@ApiTags("Category")
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }
  @Get()
  getCategories(){
    return this.categoryService.getAll();
  }

  @UseInterceptors(JwtDecodeNotRequired)
  @Get("/:id(\\d+)/image")
  getImage(@Param("id", ParseIntPipe) id: number, @Query("page") page : number, @Req() req : Request) {
    return this.categoryService.getImagesByCate(id, page || 1, req.user as TokenPayload | null);
  }
}
