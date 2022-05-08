import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { UpdateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  // users/current
  @UseGuards(AuthGuard('jwt')) //this is a nest js guard, they are use to secure routes before sending request to controller, read more on in on offical nest js docs
  @Get('current')
  getCurrentLoggedInUser(@GetUser() user: User) {
    //get user is a custom decorator which basically return req.user

    return this.userService.getLoggedInUser(user.id);
  }

  @UseGuards(AuthGuard('jwt')) //this is a nest js guard, they are use to secure routes before sending request to controller, read more on in on offical nest js docs
  @Patch()
  updateUser(@GetUser() user: User, @Body() dto: UpdateUserDto) {
    return this.userService.updateUserProfile(user.id, dto);
  }

  @UseGuards(AuthGuard('jwt')) //this is a nest js guard, they are use to secure routes before sending request to controller, read more on in on offical nest js docs
  @Delete()
  deleteUser(@GetUser() user: User) {
    return this.userService.deleteUser(user.id);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUser();
  }
}
