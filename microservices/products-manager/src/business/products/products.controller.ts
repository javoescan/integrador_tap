import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Product } from './products.entity';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll(): Promise<Product[]> {
    return this.productsService.getAll();
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<Product> {
    return this.productsService.get(id);
  }

  @Post()
  create(@Body('product') product: Product): Promise<Product> {
    return this.productsService.create(product);
  }

  @Put(':id')
  update(@Body('product') product: Product): Promise<Product> {
    return this.productsService.update(product);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<string> {
    return this.productsService.delete(id);
  }
}
