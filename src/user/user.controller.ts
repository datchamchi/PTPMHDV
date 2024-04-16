import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('signup')
  async signUp(@Body() userDto: UserDto) {
    return this.userService.signUp(userDto);
  }

  @Post('login')
  async login(@Body() data: { email: string; password: string }) {
    return this.userService.login(data);
  }
  @Get('/:userId')
  async getUserById(@Param('userId', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }
}
