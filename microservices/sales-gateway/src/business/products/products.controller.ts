import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AdminAuthGuard } from 'business/auth/admin.auth.guard';
import { BasicAuthGuard } from 'business/auth/basic.auth.guard';
import { ProductDto } from './product.dto';
import { ProductsService } from './products.service';

@ApiTags('products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(BasicAuthGuard)
  @Get()
  getAll(): Promise<ProductDto[]> {
    return this.productsService.getAll();
  }

  @UseGuards(BasicAuthGuard)
  @Get(':id')
  get(@Param('id') id: string): Promise<ProductDto> {
    return this.productsService.get(id);
  }

  @UseGuards(AdminAuthGuard)
  @Post()
  create(@Body() productDto: ProductDto): Promise<ProductDto> {
    return this.productsService.create(productDto);
  }

  @UseGuards(AdminAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() productDto: ProductDto): Promise<ProductDto> {
    productDto.id = id;
    return this.productsService.update(productDto);
  }

  @UseGuards(AdminAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<string> {
    return this.productsService.delete(id);
  }
}
