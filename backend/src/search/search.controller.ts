import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { ApiTags } from '@nestjs/swagger';

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
      statusCode : HttpStatus.OK,
      message : "search result",
      data : {
        images : imageResult.data,
        category : cateResult.data
      }
    }
  }
}
