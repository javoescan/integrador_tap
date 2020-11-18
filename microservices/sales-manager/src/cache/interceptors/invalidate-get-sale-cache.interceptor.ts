import { CallHandler, ExecutionContext } from '@nestjs/common';
import { GetSaleCacheInterceptor } from './get-sale-cache.interceptor';
import { map } from 'rxjs/operators';

export class InvalidateGetSaleCacheInterceptor extends GetSaleCacheInterceptor {
	async intercept(context: ExecutionContext, next: CallHandler) {
		const result = next.handle().pipe(map(res => res));
		this.cacheManager.del(this.trackBy(context), () => result);
		return result;
	}
}
