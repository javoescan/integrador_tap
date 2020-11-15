import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'business/auth/auth.module';
import { ExternalModule } from 'business/external/external.module';
import { ProductsModule } from 'business/products/products.module';
import { SalesModule } from 'business/sales/sales.module';
import { UsersModule } from './business/users/users.module';

@Module({
  imports: [
    AuthModule,
    ExternalModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    SalesModule,
    ProductsModule,
  ],
})
export class AppModule {}
