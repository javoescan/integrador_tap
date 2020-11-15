import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleProductsModule } from 'business/sale-products/sale-products.module';
import { SalesController } from './sales.controller';
import { Sale } from './sales.entity';
import { SalesService } from './sales.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sale]), SaleProductsModule],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}