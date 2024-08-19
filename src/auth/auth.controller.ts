import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() createAuthDto: LoginDto) {
    return this.authService.Login(createAuthDto);
  }

  @Get('/self')
  async findSelf() {
    return this.authService.getSelf();
  }

  @Post('/logout') async logout() {
    return this.authService.logout();
  }
}
