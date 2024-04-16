import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { LoginDto, UserDto } from './user.dto';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { CartService } from 'src/cart/cart.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cartService: CartService,
  ) {}
  @Post('signup')
  @HttpCode(201)
  async signUp(@Body() userDto: UserDto) {
    const user = await this.userService.signUp(userDto);
    await this.cartService.create({ user }); /// create cart
    return user;
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() data: LoginDto) {
    return this.userService.login(data);
  }
  @Get('/:userId')
  async getUserById(@Param('userId', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }
}
