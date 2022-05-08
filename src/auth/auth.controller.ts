import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  //depency injection:
  constructor(private authService: AuthService) {}
  // /auth/signup
  @Post('signup')
  signup(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }
  // /auth/signin
  @Post('signin')
  signin(@Body() dto: SignInDto) {
    return this.authService.login(dto);
  }
}
