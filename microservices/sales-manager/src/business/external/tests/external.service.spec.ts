import { HttpException, HttpService, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ExternalService } from 'business/external/external.service';
import { HttpMethods } from '../external.enums';
import { HttpServiceMock } from '../mocks/http.service.mock';

describe('ExternalService', () => {
	let externalService: ExternalService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			providers: [ExternalService, HttpService],
		})
			.overrideProvider(HttpService)
			.useClass(HttpServiceMock)
			.compile();

      externalService = app.get<ExternalService>(ExternalService);
	});

	describe('call', () => {
		it('should return the data', async () => {
			expect(await externalService.call(HttpMethods.POST, '')).toEqual('');
		});

		it('should throw an exception', async () => {
      jest.spyOn(externalService['httpService'], 'post').mockImplementationOnce(() => {
        throw new HttpException({ data: { message: 'error' } }, HttpStatus.BAD_REQUEST);
      });
			expect(async() => await externalService.call(HttpMethods.POST, '')).rejects.toThrowError(HttpException);
		});
	});
});
