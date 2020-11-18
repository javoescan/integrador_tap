import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExternalModule } from 'business/external/external.module';
import { SaleProductsModule } from 'business/sale-products/sale-products.module';
import { CacheConfigService } from 'cache/cache-config.service';
import { SalesController } from './sales.controller';
import { Sale } from './sales.entity';
import { SalesService } from './sales.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale]),
    SaleProductsModule,
    ExternalModule,
		CacheModule.registerAsync({
			useClass: CacheConfigService,
		}),
  ],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}