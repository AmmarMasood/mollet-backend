import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePortfolioDto {
  @IsNumber()
  @IsNotEmpty()
  yScore: number;
}
