import { CacheInterceptor, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class GetSaleCacheInterceptor extends CacheInterceptor {
	protected readonly prefix = 'Sales/Get/';

	trackBy(context: ExecutionContext): string {
		const cacheKey = context.getArgByIndex(0).id;
		return `${this.prefix}${cacheKey}`;
	}
}
