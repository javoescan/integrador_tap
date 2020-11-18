import { CallHandler, ExecutionContext } from '@nestjs/common';
import { cacheManagerMock } from 'cache/mocks/cache-manager.mock';
import { InvalidateGetUsersCacheInterceptor } from '../invalidate-get-users-cache.interceptor';
import { of } from 'rxjs';

describe('InvalidateGetUsersCacheInterceptor', () => {
	let interceptor: InvalidateGetUsersCacheInterceptor;

	beforeEach(async () => {
		interceptor = new InvalidateGetUsersCacheInterceptor(cacheManagerMock, {});
	});

	describe('intercept', () => {
		it('should return success', async () => {
			const id = '1';
			const res = { id };
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
			const next: CallHandler = {
				handle: jest.fn(() => of(res)),
			};
			expect(await (await interceptor.intercept(context, next)).toPromise()).toBe(res);
			expect(next.handle).toBeCalledTimes(1);
			expect(cacheManagerMock.del).toBeCalledTimes(1);
		});
	});
});
