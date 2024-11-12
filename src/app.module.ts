import { Module } from '@nestjs/common';
import { ScraperController } from './scraper/scraper.controller';
import { ScraperService } from './scraper/scrapper.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [ScraperController],
  providers: [ScraperService],
})
export class AppModule {}
