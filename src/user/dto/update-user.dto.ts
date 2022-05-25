import { PORTFOLIO_TYPES } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  first_name: string;

  @IsString()
  @IsOptional()
  last_name: string;

  @IsString()
  @IsOptional()
  phone_number: string;

  @IsNumber()
  @IsOptional()
  risk_score?: number;

  @IsNumber()
  @IsOptional()
  invested_amount?: number;

  @IsNumber()
  @IsOptional()
  portfolio_id?: number;
}
