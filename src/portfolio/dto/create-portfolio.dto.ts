import { PORTFOLIO_TYPES } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePortfolioDto {
  @IsEnum(PORTFOLIO_TYPES)
  @IsNotEmpty()
  portfolio_type: PORTFOLIO_TYPES;

  @IsNumber()
  @IsNotEmpty()
  beta: number;
}
