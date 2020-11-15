import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Sale } from './sales.entity';
import { SalesService } from './sales.service';

@Controller()
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  getAll(): Promise<Sale[]> {
    return this.salesService.getAll();
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<Sale> {
    return this.salesService.get(id);
  }

  @Get('user/:id')
  getByUser(
    @Param('id') id: string,
    @Query('from_date') fromDate: string,
    @Query('to_date') toDate: string,
  ): Promise<Sale[]> {
    return this.salesService.getByUser(id, fromDate, toDate);
  }

  @Get('user/:id/comissions')
  getUserComissions(
    @Param('id') id: string,
    @Query('from_date') fromDate: string,
    @Query('to_date') toDate: string,
  ): Promise<number> {
    return this.salesService.getUserComissions(id, fromDate, toDate);
  }

  @Get('product/:id')
  getByProduct(
    @Param('id') id: string,
    @Query('from_date') fromDate: string,
    @Query('to_date') toDate: string,
  ): Promise<Sale[]> {
    return this.salesService.getByProduct(id, fromDate, toDate);
  }

  @Post()
  create(@Body('sale') sale: Sale): Promise<Sale> {
    return this.salesService.create(sale);
  }

  @Put(':id')
  update(@Body('sale') sale: Sale): Promise<Sale> {
    return this.salesService.update(sale);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<string> {
    return this.salesService.delete(id);
  }
}
