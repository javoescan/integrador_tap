import { CacheInterceptor, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class GetProductCacheInterceptor extends CacheInterceptor {
	protected readonly prefix = 'Products/Get/';

	trackBy(context: ExecutionContext): string {
		const cacheKey = context.getArgByIndex(0).id;
		return `${this.prefix}${cacheKey}`;
	}
}
