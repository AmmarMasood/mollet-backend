import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateStockDto,
  UpdateStockDto,
  UpdateStockToPortfolioDto,
} from './dto';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(private stockService: StockService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createStock(@Body() dto: CreateStockDto) {
    return this.stockService.createStock(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/add')
  addStockToPortfolio(@Body() dto: UpdateStockToPortfolioDto) {
    return this.stockService.addStockToPortfolio(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/remove')
  removeStockFromPortfolio(@Body() dto: UpdateStockToPortfolioDto) {
    return this.stockService.removeStockFromPortfolio(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':name')
  updateStock(@Param('name') stock_name: string, @Body() dto: UpdateStockDto) {
    return this.stockService.updateStock(dto, stock_name);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':name')
  deleteStock(@Param('name') stock_name: string) {
    return this.stockService.deleteStock(stock_name);
  }

  @Get()
  getAllStocks() {
    return this.stockService.getAllStocks();
  }

  @Get(':name')
  getStockById(@Param('name') stock_name: string) {
    return this.stockService.getStockById(stock_name);
  }
}
