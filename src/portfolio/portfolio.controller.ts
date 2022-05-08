import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PORTFOLIO_TYPES } from '@prisma/client';
import { CreatePortfolioDto, UpdatePortfolioDto } from './dto';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(private portfolioService: PortfolioService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createPortfolio(@Body() dto: CreatePortfolioDto) {
    console.log(dto);
    return this.portfolioService.createPortfolio(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':type')
  updatePortfolio(
    @Param('type') portfolio_type: PORTFOLIO_TYPES,
    @Body() dto: UpdatePortfolioDto,
  ) {
    return this.portfolioService.updatePortfolio(dto, portfolio_type);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deletePortfolio(@Param('type') portfolio_type: PORTFOLIO_TYPES) {
    return this.portfolioService.deletePortfolio(portfolio_type);
  }

  @Get()
  getAllPortfolios() {
    return this.portfolioService.getAllPortfolios();
  }

  @Get(':type')
  getPortfolioById(@Param('type') portfolio_type: PORTFOLIO_TYPES) {
    return this.portfolioService.getPortfolioByType(portfolio_type);
  }
}
