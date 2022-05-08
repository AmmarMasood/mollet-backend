import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(dto: SignInDto) {
    try {
      //find user by email
      const user = await this.prismaService.user.findUnique({
        where: {
          email: dto.email,
        },
      });
      if (!user) {
        throw new ForbiddenException('Credentials Invalid');
      }
      //compare passwords
      const pwMatch = await argon.verify(user.hash, dto.password);
      if (!pwMatch) {
        throw new ForbiddenException('Credentials Invalid');
      }
      const { access_token } = await this.signToken(user.id, user.email);

      delete user.hash;
      return { jwtToken: access_token, user };
      //send user back
    } catch (e) {
      throw e;
    }
  }

  async signup(dto: SignUpDto) {
    try {
      // genedrate password hash
      const hash = await argon.hash(dto.password);
      //save the new user in db
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      delete user.hash;
      const { access_token } = await this.signToken(user.id, user.email);
      return { jwtToken: access_token, user };
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException(
            'Credential invalid, user already exist with these credentials',
          );
        }
      }
      throw e;
    }
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '60m',
      secret: this.configService.get('JWT_SECRET'),
    } as JwtSignOptions);
    return {
      access_token: token,
    };
  }
}
