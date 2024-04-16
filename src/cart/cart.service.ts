import { BadRequestException, Injectable } from '@nestjs/common';
import { CartDto } from './dto/cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';

import { CartItemDto } from './dto/cartItem.dto';
import { Product } from 'src/product/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}
  async create(cartDto: CartDto) {
    const cart = await this.cartRepository.save(cartDto);
    return cart;
  }
  async getCart(id: number) {
    const cart = await this.cartRepository.findOneBy({ id });
    if (!cart)
      throw new BadRequestException('Not found cart with cartId ' + id);
    return cart;
  }
  async getCartDetail(id: number) {
    const cart = await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.cartItems', 'cartItem')
      .leftJoinAndSelect('cartItem.product', 'product')
      .where('cart.id = :id', { id })
      .getOne();
    if (!cart) throw new BadRequestException('Cart is not exist ');
    return cart;
  }
  async addItemToCart(quantity: number, product: Product, cart: Cart) {
    //  create cartItem with quantity =1
    const cartItem = await this.cartItemRepository.save({
      quantity,
      product,
      cart,
    });
    // save repo
    return cartItem;
  }
  async deleteItemToCart(id: number) {
    await this.cartItemRepository.delete({ id });
    return {
      message: 'Remove item from cart successfully',
    };
  }
  async updateQuantity(id: number, quantity: number) {
    const cartItem = await this.cartItemRepository.findOneBy({ id });
    cartItem.quantity = quantity;
    const updateQuantity = await this.cartItemRepository.save(cartItem);
    return updateQuantity;
  }
}
