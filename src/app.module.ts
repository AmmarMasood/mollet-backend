// this file is like index.js of react, the main file that imports all other modules
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { StockModule } from './stock/stock.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { NewsModule } from './news/news.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    PortfolioModule,
    StockModule,
    PrismaModule,
    NewsModule,
  ],
})
export class AppModule {}
