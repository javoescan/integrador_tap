import { ExecutionContext } from '@nestjs/common';
import { GetUserCacheInterceptor } from '../get-user-cache.interceptor';

describe('GetUserCacheInterceptor', () => {
	let interceptor: GetUserCacheInterceptor;

	beforeEach(async () => {
		interceptor = new GetUserCacheInterceptor(null, null);
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
			expect(await interceptor.trackBy(context)).toBe(`Users/Get/${id}`);
		});
	});
});
