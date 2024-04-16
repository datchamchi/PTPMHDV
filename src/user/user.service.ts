import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async signUp(userDto: UserDto) {
    const existUser = await this.userRepository.findOneBy({
      email: userDto.email,
    });
    if (existUser) throw new BadRequestException('Email is used');
    const user = await this.userRepository.save(userDto);
    return user;
  }
  async login(data: { email: string; password: string }) {
    try {
      const existUser = await this.userRepository.findOneBy({
        email: data.email,
      });
      if (!existUser) throw new UnauthorizedException('User is not exist');
      const checkPassword = existUser.password === data.password;
      if (!checkPassword)
        throw new UnauthorizedException('Password is invalid');
      return existUser;
    } catch (err) {
      console.log(err);
      throw new BadRequestException();
    }
  }
  async getUserById(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new BadRequestException('User is not exist ');
    return user;
  }
}
