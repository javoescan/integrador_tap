import { CacheInterceptor, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class GetUserCacheInterceptor extends CacheInterceptor {
	protected readonly prefix = 'Users/Get/';

	trackBy(context: ExecutionContext): string {
		const cacheKey = context.getArgByIndex(0).id;
		return `${this.prefix}${cacheKey}`;
	}
}
