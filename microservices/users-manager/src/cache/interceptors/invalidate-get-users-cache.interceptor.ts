import { CallHandler, ExecutionContext } from '@nestjs/common';
import { GetUsersCacheInterceptor } from './get-users-cache.interceptor';
import { map } from 'rxjs/operators';

export class InvalidateGetUsersCacheInterceptor extends GetUsersCacheInterceptor {
	async intercept(context: ExecutionContext, next: CallHandler) {
		const result = next.handle().pipe(map(res => res));
		this.cacheManager.del(this.trackBy(context), () => result);
		return result;
	}
}
