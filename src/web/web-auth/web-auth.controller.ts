import { Controller, Post, Body, Res } from '@nestjs/common';
import { WebAuthService } from './web-auth.service';
import { ApiTags } from '@nestjs/swagger';
import { WebLoginDto } from './dto/web-login.dto';

@ApiTags('web-auth')
@Controller('web-auth')
export class WebAuthController {
  constructor(private readonly webAuthService: WebAuthService) {}

  @Post('/login')
  async create(@Body() LoginDto: WebLoginDto, @Res() res) {
    return await this.webAuthService.login(res, LoginDto);
  }

  @Post('/logout')
  async logout(@Res() res) {
    return await this.webAuthService.logout(res);
  }
}
