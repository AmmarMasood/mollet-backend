import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateStockDto {
  @IsString()
  @IsOptional()
  company_name?: string;

  @IsNumber()
  @IsOptional()
  expected_return?: number;

  @IsNumber()
  @IsOptional()
  portfolio_weight?: number;

  @IsNumber()
  @IsOptional()
  beta?: number;
}
