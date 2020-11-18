import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheConfigService } from 'cache/cache-config.service';
import { AuthModule } from '../auth/auth.module';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule,
		CacheModule.registerAsync({
			useClass: CacheConfigService,
		}),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}