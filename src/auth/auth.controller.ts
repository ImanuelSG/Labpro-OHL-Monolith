import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/guard/admin-auth-guard';
@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() createAuthDto: LoginDto) {
    return this.authService.login(createAuthDto);
  }

  @Get('/self')
  @UseGuards(AdminGuard)
  async findSelf(@Req() req) {
    const userId = req.user.sub;
    const token = req.headers.authorization.split(' ')[1];
    return this.authService.getSelf(userId, token);
  }

  @Post('/logout')
  @UseGuards(AdminGuard)
  async logout() {
    return this.authService.logout();
  }
}
