import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchQueryDto } from './dto/search.dto';
import { SearchService } from './search.service';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private search: SearchService) {}

  @Get()
  globalSearch(@Query() query: SearchQueryDto) {
    return this.search.globalSearch(query.q, query.type ?? 'all');
  }
}
