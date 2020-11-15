import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExternalModule } from 'business/external/external.module';
import { UsersModule } from './business/users/users.module';

@Module({
  imports: [ExternalModule, ConfigModule.forRoot({ isGlobal: true }), UsersModule],
})
export class AppModule {}
