import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleProduct } from './sale-products.entity';
import { SaleProductsService } from './sale-products.service';

@Module({
  imports: [TypeOrmModule.forFeature([SaleProduct])],
  providers: [SaleProductsService],
  exports: [SaleProductsService],
})
export class SaleProductsModule {}