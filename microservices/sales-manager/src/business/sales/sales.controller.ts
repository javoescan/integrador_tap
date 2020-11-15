import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
