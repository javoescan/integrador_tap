import { ExecutionContext } from '@nestjs/common';
import { GetSaleCacheInterceptor } from '../get-sale-cache.interceptor';

describe('GetSaleCacheInterceptor', () => {
	let interceptor: GetSaleCacheInterceptor;

	beforeEach(async () => {
		interceptor = new GetSaleCacheInterceptor(null, null);
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
			expect(await interceptor.trackBy(context)).toBe(`Sales/Get/${id}`);
		});
	});
});
