import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from 'src/product/product.service';
import { CartItemDto, UpdateCartItemDto } from './dto/cartItem.dto';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly productService: ProductService,
  ) {}
  @Get('/:id')
  async getCart(@Param('id', ParseIntPipe) id: number) {
    return this.cartService.getCartDetail(id);
  }
  @Post('/add-item-to-cart')
  async addItemToCart(@Body() data: CartItemDto) {
    const { cartId, productId } = data;
    const product = await this.productService.getProductById(productId);
    const cart = await this.cartService.getCart(cartId);
    const cartItem = await this.cartService.addItemToCart(1, product, cart);
    return cartItem;
  }
  @Delete('/:id/delete-item')
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'Delete Successfully' })
  async deleteItemToCart(@Param('id', ParseIntPipe) id: number) {
    return this.cartService.deleteItemToCart(id);
  }

  @Patch('/:id/update-quantity')
  @ApiResponse({ status: 204, description: 'Update Quantity Successfully' })
  async updateQuantity(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCartItemDto,
  ) {
    return this.cartService.updateQuantity(id, data.quantity);
  }
}
