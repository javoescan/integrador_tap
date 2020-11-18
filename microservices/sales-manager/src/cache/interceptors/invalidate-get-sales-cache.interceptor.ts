import { CallHandler, ExecutionContext } from '@nestjs/common';
import { GetSalesCacheInterceptor } from './get-sales-cache.interceptor';
import { map } from 'rxjs/operators';

export class InvalidateGetSalesCacheInterceptor extends GetSalesCacheInterceptor {
	async intercept(context: ExecutionContext, next: CallHandler) {
		const result = next.handle().pipe(map(res => res));
		this.cacheManager.del(this.trackBy(context), () => result);
		return result;
	}
}
