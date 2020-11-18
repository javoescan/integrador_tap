import { CacheInterceptor, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class GetSalesCacheInterceptor extends CacheInterceptor {
	protected readonly prefix = 'Sales/GetAll';

	trackBy(context: ExecutionContext): string {
		return this.prefix;
	}
}
