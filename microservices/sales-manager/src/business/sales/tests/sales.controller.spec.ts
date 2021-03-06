import { CacheModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { saleMock } from '../mocks/sales.mocks';
import { SalesServiceMock } from '../mocks/sales.service.mock';
import { SalesController } from '../sales.controller';
import { SalesService } from '../sales.service';

describe('SalesController', () => {
	let salesController: SalesController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			imports: [CacheModule.register({})],
			controllers: [SalesController],
			providers: [SalesService],
		})
			.overrideProvider(SalesService)
			.useClass(SalesServiceMock)
			.compile();

      salesController = app.get<SalesController>(SalesController);
	});

	describe('getAll', () => {
		it('should return the sales collection', async () => {
			expect(await salesController.getAll()).toEqual([saleMock]);
		});
	});

	describe('get', () => {
		it('should return the sale', async () => {
			expect(await salesController.get(saleMock.id)).toEqual(saleMock);
		});
	});

	describe('getByProduct', () => {
		it('should return the sales collection', async () => {
			expect(await salesController.getByProduct(saleMock.userId, '', '')).toEqual([saleMock]);
		});
	});

	describe('getByUser', () => {
		it('should return the sales collection', async () => {
			expect(await salesController.getByUser(saleMock.userId, '', '')).toEqual([saleMock]);
		});
	});

	describe('getUserComissions', () => {
		it('should return the user comissions', async () => {
			expect(await salesController.getUserComissions(saleMock.userId, '', '')).toEqual(saleMock.total);
		});
	});

	describe('create', () => {
		it('should return the created sale', async () => {
			expect(await salesController.create(saleMock)).toEqual(saleMock);
		});
	});

	describe('update', () => {
		it('should return the updated sale', async () => {
			expect(await salesController.update(saleMock)).toEqual(saleMock);
		});
	});

	describe('delete', () => {
		it('should return the deleted sale id', async () => {
			expect(await salesController.delete(saleMock.id)).toEqual(saleMock.id);
		});
	});
});
