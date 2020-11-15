import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AdminAuthGuard } from 'business/auth/admin.auth.guard';
import { BasicAuthGuard } from 'business/auth/basic.auth.guard';
import { SaleDto } from './sale.dto';
import { SalesService } from './sales.service';

@ApiTags('sales')
@ApiBearerAuth()
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}
  
  @UseGuards(BasicAuthGuard)
  @Get()
  getAll(): Promise<SaleDto[]> {
    return this.salesService.getAll();
  }

  @UseGuards(BasicAuthGuard)
  @Get(':id')
  get(@Param('id') id: string): Promise<SaleDto> {
    return this.salesService.get(id);
  }

  @UseGuards(BasicAuthGuard)
  @Post()
  create(@Body() saleDto: SaleDto): Promise<SaleDto> {
    return this.salesService.create(saleDto);
  }

  @UseGuards(BasicAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() saleDto: SaleDto): Promise<SaleDto> {
    saleDto.id = id;
    return this.salesService.update(saleDto);
  }

  @UseGuards(AdminAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<string> {
    return this.salesService.delete(id);
  }
}
