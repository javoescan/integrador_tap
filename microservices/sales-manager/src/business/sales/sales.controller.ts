import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { GetSaleCacheInterceptor } from 'cache/interceptors/get-sale-cache.interceptor';
import { GetSalesCacheInterceptor } from 'cache/interceptors/get-sales-cache.interceptor';
import { InvalidateGetSaleCacheInterceptor } from 'cache/interceptors/invalidate-get-sale-cache.interceptor';
import { InvalidateGetSalesCacheInterceptor } from 'cache/interceptors/invalidate-get-sales-cache.interceptor';
import { Sale } from './sales.entity';
import { SalesService } from './sales.service';

@Controller()
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  @UseInterceptors(GetSalesCacheInterceptor)
  getAll(): Promise<Sale[]> {
    return this.salesService.getAll();
  }

  @Get(':id')
  @UseInterceptors(GetSaleCacheInterceptor)
  get(@Param('id') id: string): Promise<Sale> {
    return this.salesService.get(id);
  }

  @Get('user/:userId')
  getByUser(
    @Param('userId') userId: string,
    @Query('from_date') fromDate: string,
    @Query('to_date') toDate: string,
  ): Promise<Sale[]> {
    return this.salesService.getByUser(userId, fromDate, toDate);
  }

  @Get('user/:userId/comissions')
  getUserComissions(
    @Param('userId') userId: string,
    @Query('from_date') fromDate: string,
    @Query('to_date') toDate: string,
  ): Promise<number> {
    return this.salesService.getUserComissions(userId, fromDate, toDate);
  }

  @Get('product/:productId')
  getByProduct(
    @Param('productId') productId: string,
    @Query('from_date') fromDate: string,
    @Query('to_date') toDate: string,
  ): Promise<Sale[]> {
    return this.salesService.getByProduct(productId, fromDate, toDate);
  }

  @Post()
  @UseInterceptors(InvalidateGetSalesCacheInterceptor)
  create(@Body('sale') sale: Sale): Promise<Sale> {
    return this.salesService.create(sale);
  }

  @Put(':id')
  @UseInterceptors(InvalidateGetSaleCacheInterceptor, InvalidateGetSalesCacheInterceptor)
  update(@Body('sale') sale: Sale): Promise<Sale> {
    return this.salesService.update(sale);
  }

  @Delete(':id')
  @UseInterceptors(InvalidateGetSaleCacheInterceptor, InvalidateGetSalesCacheInterceptor)
  delete(@Param('id') id: string): Promise<string> {
    return this.salesService.delete(id);
  }
}
