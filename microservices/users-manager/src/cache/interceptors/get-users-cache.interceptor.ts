import { CacheInterceptor, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class GetUsersCacheInterceptor extends CacheInterceptor {
	protected readonly prefix = 'Users/GetAll';

	trackBy(context: ExecutionContext): string {
		return this.prefix;
	}
}
