import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}
  @Get('latest-news')
  getLatestNews(@Query() query: { channel: string }) {
    if (query.channel === 'dawn') {
      return this.newsService.getDawnNews();
    } else if (query.channel === 'br') {
      return this.newsService.getBrNews();
    } else if (query.channel === 'nation') {
      return this.newsService.getNationNews();
    } else if (query.channel === 'profit') {
      return this.newsService.getProfitNews();
    } else {
      return this.newsService.noChannelFound();
    }
  }
  @Get('market-condition')
  marketCondition() {
    return this.newsService.getMarketPerformance();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('market-sentiment')
  marketSentiment() {
    return this.newsService.getMarketSentiment();
  }
}
