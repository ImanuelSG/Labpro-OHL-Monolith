import { Controller, Get, Post, Body, Param, Delete, Res } from '@nestjs/common';
import { WebAuthService } from './web-auth.service';
import { ApiTags } from '@nestjs/swagger';
import { WebLoginDto } from './dto/web-login.dto';
import { Response } from 'express';

@ApiTags('web-auth')
@Controller('web-auth')
export class WebAuthController {
  constructor(private readonly webAuthService: WebAuthService) {}

  @Post('/login')
  create(@Body() LoginDto: WebLoginDto, @Res() res: Response) {
    return this.webAuthService.login(res, LoginDto);
  }

  @Get()
  findAll() {
    return this.webAuthService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.webAuthService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.webAuthService.remove(+id);
  }
}
