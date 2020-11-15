import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ExternalService } from 'business/external/external.service';
import { ExternalServiceMock } from '../mocks/external.service.mock';
import { saleMock } from '../mocks/sales.mocks';
import { SalesRepositoryMock } from '../mocks/sales.repository.mock';
import { Sale } from '../sales.entity';
import { SalesService } from '../sales.service';

describe('SalesService', () => {
	let salesService: SalesService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot({})],
			providers: [SalesService, ExternalService, {
				provide: getRepositoryToken(Sale),
				useClass: SalesRepositoryMock,
			}],
		})
			.overrideProvider(ExternalService)
			.useClass(ExternalServiceMock)
			.compile();

      salesService = app.get<SalesService>(SalesService);
	});

	describe('getAll', () => {
		it('should return the sales collection', async () => {
			expect(await salesService.getAll()).toEqual([saleMock]);
		});
	});

	describe('get', () => {
		it('should return the sale', async () => {
			expect(await salesService.get(saleMock.id)).toEqual(saleMock);
		});
	});

	describe('getByProduct', () => {
		it('should return the sales collection', async () => {
			expect(await salesService.getByProduct(saleMock.userId, '', '')).toEqual([saleMock]);
		});
		it('should return the products collection filtered by date', async () => {
			expect(await salesService.getByProduct(saleMock.userId, '2020-11-09', '2020-11-12')).toEqual([saleMock]);
		});
		it('should throw an exception because the product does not exist', async () => {
			jest.spyOn(salesService['externalService'], 'call').mockImplementationOnce(() => {
				throw new HttpException({ data: { message: 'error' } }, HttpStatus.BAD_REQUEST);
			});
			expect(async() => await salesService.getByProduct(saleMock.userId, '', '')).rejects.toThrowError(HttpException);
		});
	});

	describe('getByUser', () => {
		it('should return the sales collection', async () => {
			expect(await salesService.getByUser(saleMock.userId, '', '')).toEqual([saleMock]);
		});
		it('should return the sales collection filtered by date', async () => {
			expect(await salesService.getByUser(saleMock.userId, '2020-11-09', '2020-11-12')).toEqual([saleMock]);
		});
		it('should throw an exception because the user does not exist', async () => {
			jest.spyOn(salesService['externalService'], 'call').mockImplementationOnce(() => {
				throw new HttpException({ data: { message: 'error' } }, HttpStatus.BAD_REQUEST);
			});
			expect(async() => await salesService.getByUser(saleMock.userId, '', '')).rejects.toThrowError(HttpException);
		});
	});

	describe('getUserComissions', () => {
		it('should return the user comissions', async () => {
			expect(await salesService.getUserComissions(saleMock.userId, '', '')).toEqual(0);
		});
	});

	describe('create', () => {
		it('should return the created sale', async () => {
			jest.spyOn(salesService['salesRepository'], 'findOne').mockImplementationOnce(() => null);
			expect(await salesService.create(saleMock)).toEqual(saleMock);
		});
	});

	describe('update', () => {
		it('should return the updated sale', async () => {
			expect(await salesService.update(saleMock)).toEqual(saleMock);
		});
		it('should throw an error because the sale does not exist', async () => {
			jest.spyOn(salesService['salesRepository'], 'findOne').mockImplementationOnce(() => null);
			expect(async() => await salesService.update(saleMock)).rejects.toThrowError(HttpException);
		});
	});

	describe('delete', () => {
		it('should return the deleted sale id', async () => {
			expect(await salesService.delete(saleMock.id)).toEqual(saleMock.id);
		});
  });
});
