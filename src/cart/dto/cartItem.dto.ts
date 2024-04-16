import { IsNumber } from 'class-validator';
import { Product } from 'src/product/product.entity';
import { Cart } from '../entities/cart.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CartItemDto {
  @ApiProperty()
  productId: number;
  @ApiProperty()
  cartId: number;
}
export class UpdateCartItemDto {
  @ApiProperty()
  quantity: number;
}
