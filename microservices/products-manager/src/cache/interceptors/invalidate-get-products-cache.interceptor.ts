import { CallHandler, ExecutionContext } from '@nestjs/common';
import { GetProductsCacheInterceptor } from './get-products-cache.interceptor';
import { map } from 'rxjs/operators';

export class InvalidateGetProductsCacheInterceptor extends GetProductsCacheInterceptor {
	async intercept(context: ExecutionContext, next: CallHandler) {
		const result = next.handle().pipe(map(res => res));
		this.cacheManager.del(this.trackBy(context), () => result);
		return result;
	}
}
