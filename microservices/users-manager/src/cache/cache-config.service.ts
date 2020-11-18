import * as redisStore from 'cache-manager-redis-store';
import { CacheModuleOptions, CacheOptionsFactory, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
	constructor(private readonly configService: ConfigService) {}

	createCacheOptions(): CacheModuleOptions {
		return {
			store: redisStore,
			host: this.configService.get('CACHE_HOST'),
			port: this.configService.get('CACHE_PORT'),
			ttl: parseInt(this.configService.get('CACHE_TTL')),
		};
	}
}
