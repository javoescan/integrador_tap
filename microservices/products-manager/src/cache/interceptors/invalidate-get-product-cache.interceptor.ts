import { CallHandler, ExecutionContext } from '@nestjs/common';
import { GetProductCacheInterceptor } from './get-product-cache.interceptor';
import { map } from 'rxjs/operators';

export class InvalidateGetProductCacheInterceptor extends GetProductCacheInterceptor {
	async intercept(context: ExecutionContext, next: CallHandler) {
		const result = next.handle().pipe(map(res => res));
		this.cacheManager.del(this.trackBy(context), () => result);
		return result;
	}
}
