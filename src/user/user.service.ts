import { Injectable } from '@nestjs/common';
import { PORTFOLIO_TYPES } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async updateUserProfile(userId: number, dto: UpdateUserDto) {
    const user = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      include: {
        portfolio: true,
      },
      data: {
        ...dto,
      },
    });

    delete user.hash;

    return { user };
  }

  async deleteUser(userId: number) {
    return this.prismaService.user.delete({ where: { id: userId } });
  }

  async getAllUser() {
    return this.prismaService.user.findMany({ include: { portfolio: true } });
  }

  async getLoggedInUser(userId: number) {
    const user = await this.prismaService.user.findFirst({
      where: { id: userId },
      include: { portfolio: true },
    });
    delete user.hash;
    return user;
  }
}
