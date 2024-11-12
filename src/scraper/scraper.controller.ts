import { Controller, Get, Query, Param } from '@nestjs/common';
import { ScraperService } from './scrapper.service';

@Controller('leetcode')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Get('problems')
  async getProblems(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('difficulty') difficulty?: string,
  ) {
    return this.scraperService.fetchProblems(page, size, difficulty);
  }

  @Get('problems/:slug')
  async getProblemDetails(@Param('slug') slug: string) {
    return this.scraperService.fetchProblemDetails(slug);
  }
}
