import {
  DefaultValuePipe,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PORTFOLIO_TYPES } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePortfolioDto, UpdatePortfolioDto } from './dto';

@Injectable()
export class PortfolioService {
  constructor(private prismaService: PrismaService) {}
  async createPortfolio(dto: CreatePortfolioDto) {
    try {
      const portfolio = await this.prismaService.portfolio.create({
        data: { ...dto },
      });
      return portfolio;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException(
            `portfolio with name type ${dto.portfolio_type} already exist`,
          );
        }
      }
      throw e;
    }
  }

  async updatePortfolio(dto: UpdatePortfolioDto, portfolio_type) {
    try {
      const portfolio = await this.prismaService.portfolio.findUnique({
        where: {
          portfolio_type: portfolio_type,
        },
      });
      if (portfolio) {
        return this.prismaService.portfolio.update({
          where: {
            portfolio_type: portfolio_type,
          },
          data: { ...dto },
        });
      } else {
        throw new ForbiddenException('Access to the source denied');
      }
    } catch (e) {
      throw e;
    }
  }

  async deletePortfolio(portfolio_type: PORTFOLIO_TYPES) {
    try {
      const res = await this.prismaService.portfolio.deleteMany({
        where: { portfolio_type: portfolio_type },
      });
      if (res.count > 1) {
        return {
          message: 'Success',
        };
      } else {
        throw new NotFoundException(
          'Unable to delete the portfolio, not found',
        );
      }
    } catch (e) {
      throw e;
    }
  }

  getPortfolioByType(portfolio_type: PORTFOLIO_TYPES) {
    try {
      const portfolio = this.prismaService.portfolio.findUnique({
        where: {
          portfolio_type,
        },
        include: {
          stocks: true,
        },
      });
      if (portfolio) {
        return portfolio;
      } else {
        throw new NotFoundException(`${portfolio_type} portfolio not found`);
      }
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  getAllPortfolios() {
    return this.prismaService.portfolio.findMany({ include: { stocks: true } });
  }
}
