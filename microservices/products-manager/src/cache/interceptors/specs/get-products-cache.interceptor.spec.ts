import { ExecutionContext } from '@nestjs/common';
import { GetProductsCacheInterceptor } from '../get-products-cache.interceptor';

describe('GetProductsCacheInterceptor', () => {
	let interceptor: GetProductsCacheInterceptor;

	beforeEach(async () => {
		interceptor = new GetProductsCacheInterceptor(null, null);
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
			expect(await interceptor.trackBy(context)).toBe('Products/GetAll');
		});
	});
});
