import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { ProductDto } from './product.dto';
import { ProductService } from './product.service';
import { UpdateProductDto } from './update-product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProduct() {
    return this.productService.getAllProduct();
  }
  @Get('/:id')
  async getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getProductById(id);
  }
  @Post()
  @HttpCode(201)
  async createProduct(@Body() productDto: ProductDto) {
    return this.productService.createProduct(productDto);
  }

  @Patch('/:id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, updateProductDto);
  }
  @Delete('/:id')
  @HttpCode(204)
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
  }
}
