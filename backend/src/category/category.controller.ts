import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Category")
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }
  @Get()
  getCategories(){
    return this.categoryService.getAll();
  }
  @Get("/:id(\\d+)/image")
  getImage(@Param("id", ParseIntPipe) id: number, @Query("page") page : number) {
    return this.categoryService.getImagesByCate(id, page || 1);
  }
}
