import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AddBalanceDto } from './dto/add-balance.dto';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/guard/admin-auth-guard';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(AdminGuard)
  async findAll(@Query('q') query?: string) {
    return await this.userService.findWithQuery(query);
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Post('/:id/balance')
  @UseGuards(AdminGuard)
  addBalance(@Param('id') id: string, @Body() addBalanceDto: AddBalanceDto) {
    return this.userService.addBalance(id, addBalanceDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
