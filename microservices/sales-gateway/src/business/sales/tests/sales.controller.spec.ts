import { Test, TestingModule } from '@nestjs/testing';
import { saleDtoMock } from '../mocks/sales.mocks';
import { SalesServiceMock } from '../mocks/sales.service.mock';
import { SalesController } from '../sales.controller';
import { SalesService } from '../sales.service';

describe('SalesController', () => {
	let salesController: SalesController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
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
			expect(await salesController.getAll()).toEqual([saleDtoMock]);
		});
	});

	describe('get', () => {
		it('should return the sale', async () => {
			expect(await salesController.get(saleDtoMock.id)).toEqual(saleDtoMock);
		});
	});

	describe('getByProduct', () => {
		it('should return the sales collection', async () => {
			expect(await salesController.getByProduct(saleDtoMock.userId, '', '')).toEqual([saleDtoMock]);
		});
	});

	describe('getByUser', () => {
		it('should return the sales collection', async () => {
			expect(await salesController.getByUser(saleDtoMock.userId, '', '')).toEqual([saleDtoMock]);
		});
	});

	describe('getUserComissions', () => {
		it('should return the user comissions', async () => {
			expect(await salesController.getUserComissions(saleDtoMock.userId, '', '')).toEqual(saleDtoMock.total);
		});
	});

	describe('create', () => {
		it('should return the created sale', async () => {
			expect(await salesController.create(saleDtoMock)).toEqual(saleDtoMock);
		});
	});

	describe('update', () => {
		it('should return the updated sale', async () => {
			expect(await salesController.update(saleDtoMock.id, saleDtoMock)).toEqual(saleDtoMock);
		});
	});

	describe('delete', () => {
		it('should return the deleted sale id', async () => {
			expect(await salesController.delete(saleDtoMock.id)).toEqual(saleDtoMock.id);
		});
	});
});
