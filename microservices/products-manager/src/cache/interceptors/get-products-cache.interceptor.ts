import { CacheInterceptor, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class GetProductsCacheInterceptor extends CacheInterceptor {
	protected readonly prefix = 'Products/GetAll';

	trackBy(context: ExecutionContext): string {
		return this.prefix;
	}
}
