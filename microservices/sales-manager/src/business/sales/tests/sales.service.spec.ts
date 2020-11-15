import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { saleMock } from '../mocks/sales.mocks';
import { SalesRepositoryMock } from '../mocks/sales.repository.mock';
import { Sale } from '../sales.entity';
import { SalesService } from '../sales.service';

describe('SalesService', () => {
	let salesService: SalesService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			providers: [SalesService, {
				provide: getRepositoryToken(Sale),
				useClass: SalesRepositoryMock,
			}],
		}).compile();

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
