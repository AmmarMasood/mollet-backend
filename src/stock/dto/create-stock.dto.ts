import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStockDto {
  @IsString()
  @IsOptional()
  company_name: string;

  @IsString()
  @IsNotEmpty()
  stock_name: string;

  @IsNumber()
  @IsNotEmpty()
  expected_return: number;

  @IsNumber()
  @IsNotEmpty()
  portfolio_weight: number;

  @IsNumber()
  @IsNotEmpty()
  beta: number;
}
