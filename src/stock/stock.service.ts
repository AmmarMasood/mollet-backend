import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  UpdateStockToPortfolioDto,
  CreateStockDto,
  UpdateStockDto,
} from './dto';

@Injectable()
export class StockService {
  constructor(private prismaService: PrismaService) {}

  getAllStocks() {
    return this.prismaService.stock.findMany();
  }

  async createStock(dto: CreateStockDto) {
    try {
      const stock = await this.prismaService.stock.create({
        data: { ...dto },
      });
      return stock;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException(
            `stock with name ${dto.stock_name} already exist`,
          );
        }
      }
      throw e;
    }
  }

  async getStockById(stock_name: string) {
    console.log('ammar', stock_name);
    const stock = await this.prismaService.stock.findFirst({
      where: {
        stock_name,
      },
    });
    if (stock) {
      return stock;
    } else {
      throw new NotFoundException(`stock not found with name ${stock_name}`);
    }
  }

  async deleteStock(stock_name: string) {
    try {
      await this.prismaService.stock.delete({ where: { stock_name } });
    } catch (e) {
      throw e;
    }
  }

  async updateStock(dto: UpdateStockDto, stock_name: string) {
    try {
      const stock = await this.prismaService.stock.findUnique({
        where: {
          stock_name,
        },
      });
      if (stock) {
        return this.prismaService.stock.update({
          where: {
            stock_name,
          },
          data: { ...dto },
        });
      } else {
        throw new ForbiddenException(`stock not found with name ${stock_name}`);
      }
    } catch (e) {
      throw e;
    }
  }

  // async removeStockFromPortfolio(dto: UpdateStockToPortfolioDto) {
  //   try {
  //     const portfolio = await this.prismaService.portfolio.findFirst({
  //       where: { portfolio_type: dto.portfolio_type },
  //     });
  //     const stock = await this.prismaService.stock.findFirst({
  //       where: { stock_name: dto.stock_name },
  //     });

  //     if (portfolio && stock) {
  //       await this.prismaService.stock.update({
  //         where: {
  //           stock_name: dto.stock_name,
  //         },
  //         data: {
  //           portfolios: {
  //             disconnect: { id: portfolio.id },
  //           },
  //         },
  //       });
  //       await this.prismaService.portfolio.update({
  //         where: {
  //           portfolio_type: dto.portfolio_type,
  //         },
  //         data: {
  //           stocks: {
  //             disconnect: { id: stock.id },
  //           },
  //         },
  //       });
  //       return {
  //         message: 'Success',
  //       };
  //     } else {
  //       throw new NotFoundException(
  //         'Portfolio or Stock not found with provided credentials',
  //       );
  //     }
  //   } catch (e) {
  //     throw new BadRequestException(e.message);
  //   }
  // }

  // async addStockToPortfolio(dto: UpdateStockToPortfolioDto) {
  //   try {
  //     const portfolio = await this.prismaService.portfolio.findFirst({
  //       where: { portfolio_type: dto.portfolio_type },
  //     });
  //     const stock = await this.prismaService.stock.findFirst({
  //       where: { stock_name: dto.stock_name },
  //     });

  //     if (portfolio && stock) {
  //       await this.prismaService.stock.update({
  //         where: {
  //           stock_name: dto.stock_name,
  //         },
  //         data: {
  //           portfolios: {
  //             connect: { id: portfolio.id },
  //           },
  //         },
  //       });
  //       await this.prismaService.portfolio.update({
  //         where: {
  //           portfolio_type: dto.portfolio_type,
  //         },
  //         data: {
  //           stocks: {
  //             connect: { id: stock.id },
  //           },
  //         },
  //       });
  //       return {
  //         message: 'Success',
  //       };
  //     } else {
  //       throw new NotFoundException(
  //         'Portfolio or Stock not found with provided credentials',
  //       );
  //     }
  //   } catch (e) {
  //     throw new BadRequestException(e.message);
  //   }
  // }
}
