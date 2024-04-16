import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './product.dto';
import { UpdateProductDto } from './update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async getAllProduct() {
    const products = await this.productRepository.find();
    return products;
  }
  async getProductById(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product)
      throw new BadRequestException('Cannot find product with id ' + id);
    return product;
  }
  async createProduct(productDto: ProductDto) {
    const product = await this.productRepository.save(productDto);
    return product;
  }
  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({ id });
    const newProduct = { ...product, ...updateProductDto };
    const updated = await this.productRepository.save(newProduct);
    return updated;
  }
  async deleteProduct(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new BadRequestException('Product is not exist');
    await this.productRepository.delete({ id });
    return { message: `Delete product id ${id} successfully` };
  }
}
