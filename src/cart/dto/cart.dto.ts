import { IsNumber } from 'class-validator';
import { User } from 'src/user/user.entity';

export class CartDto {
  user: User;
}
