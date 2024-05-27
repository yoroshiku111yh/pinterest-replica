import { Controller, Get, HttpStatus, ParseIntPipe, Query, Req, UseInterceptors } from '@nestjs/common';
import { SearchService } from './search.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtDecodeNotRequired } from 'src/interceptors/decode-jwt-not-required';
import { TokenPayload } from 'src/auth/dto/tokenPayload.dto';
import { Request } from 'express';

@ApiTags("Search")
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) { }
  @Get("/")
  async find(@Query("search") searchKeyword: string) {
    const [imageResult, cateResult] = await Promise.all([
      this.searchService.findImageByName(searchKeyword),
      this.searchService.findCateByName(searchKeyword)
    ])
    return {
      statusCode: HttpStatus.OK,
      message: "search result",
      data: {
        images: imageResult.data,
        category: cateResult.data
      }
    }
  }

  @UseInterceptors(JwtDecodeNotRequired)
  @Get("/image")
  async findImageByName(@Query("search") searchKeyword : string, @Query("page", ParseIntPipe) page: number,@Req() req : Request){
    return this.searchService.findImageByName(searchKeyword, req.user as TokenPayload | null, page);
  }

  @Get("/categories")
  async findCate(@Query("search") searchKeyword: string) {
    return this.searchService.findCateByName(searchKeyword);
  }
}
