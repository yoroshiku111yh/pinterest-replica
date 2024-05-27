import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports : [
    JwtModule.register({}),
  ]
})
export class SearchModule {}
