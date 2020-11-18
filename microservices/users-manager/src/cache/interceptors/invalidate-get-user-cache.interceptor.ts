import { CallHandler, ExecutionContext } from '@nestjs/common';
import { GetUserCacheInterceptor } from './get-user-cache.interceptor';
import { map } from 'rxjs/operators';

export class InvalidateGetUserCacheInterceptor extends GetUserCacheInterceptor {
	async intercept(context: ExecutionContext, next: CallHandler) {
		const result = next.handle().pipe(map(res => res));
		this.cacheManager.del(this.trackBy(context), () => result);
		return result;
	}
}
