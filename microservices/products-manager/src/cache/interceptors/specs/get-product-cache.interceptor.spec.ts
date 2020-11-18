import { ExecutionContext } from '@nestjs/common';
import { GetProductCacheInterceptor } from '../get-product-cache.interceptor';

describe('GetProductCacheInterceptor', () => {
	let interceptor: GetProductCacheInterceptor;

	beforeEach(async () => {
		interceptor = new GetProductCacheInterceptor(null, null);
	});

	describe('trackBy', () => {
		it('should return the cache key by id', async () => {
			const id = '1';
			const context: ExecutionContext = {
				getArgByIndex: (index): any => ({ id }),
				switchToHttp: jest.fn(),
				getClass: jest.fn(),
				getHandler: jest.fn(),
				getArgs: jest.fn(),
				switchToRpc: jest.fn(),
				switchToWs: jest.fn(),
				getType: jest.fn(),
			};
			expect(await interceptor.trackBy(context)).toBe(`Products/Get/${id}`);
		});
	});
});
