import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheConfigService } from 'cache/cache-config.service';
import { ProductsController } from './products.controller';
import { Product } from './products.entity';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
		CacheModule.registerAsync({
			useClass: CacheConfigService,
		}),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}