import { PORTFOLIO_TYPES } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateStockToPortfolioDto {
  @IsNotEmpty()
  @IsString()
  stock_name: string;

  @IsNotEmpty()
  @IsEnum(PORTFOLIO_TYPES)
  portfolio_type: PORTFOLIO_TYPES;
}
