import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { GetProductCacheInterceptor } from 'cache/interceptors/get-product-cache.interceptor';
import { GetProductsCacheInterceptor } from 'cache/interceptors/get-products-cache.interceptor';
import { InvalidateGetProductCacheInterceptor } from 'cache/interceptors/invalidate-get-product-cache.interceptor';
import { InvalidateGetProductsCacheInterceptor } from 'cache/interceptors/invalidate-get-products-cache.interceptor';
import { Product } from './products.entity';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @UseInterceptors(GetProductsCacheInterceptor)
  getAll(): Promise<Product[]> {
    return this.productsService.getAll();
  }

  @Get(':id')
  @UseInterceptors(GetProductCacheInterceptor)
  get(@Param('id') id: string): Promise<Product> {
    return this.productsService.get(id);
  }

  @Post()
  @UseInterceptors(InvalidateGetProductsCacheInterceptor)
  create(@Body('product') product: Product): Promise<Product> {
    return this.productsService.create(product);
  }

  @Put(':id')
  @UseInterceptors(InvalidateGetProductCacheInterceptor, InvalidateGetProductsCacheInterceptor)
  update(@Body('product') product: Product): Promise<Product> {
    return this.productsService.update(product);
  }

  @Delete(':id')
  @UseInterceptors(InvalidateGetProductCacheInterceptor, InvalidateGetProductsCacheInterceptor)
  delete(@Param('id') id: string): Promise<string> {
    return this.productsService.delete(id);
  }
}
