import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AuthController {
  @Get('login')
  @Render('login')
  getLogin() {
    return {};
  }
}
