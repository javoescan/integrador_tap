import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ExternalService } from 'business/external/external.service';
import { ExternalServiceMock } from '../mocks/external.service.mock';
import { saleDtoMock } from '../mocks/sales.mocks';
import { SalesService } from '../sales.service';

describe('SalesService', () => {
	let salesService: SalesService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot()],
			providers: [SalesService, ExternalService],
		})
			.overrideProvider(ExternalService)
			.useClass(ExternalServiceMock)
			.compile();

      salesService = app.get<SalesService>(SalesService);
	});

	describe('getAll', () => {
		it('should return the sales collection', async () => {
			expect(await salesService.getAll()).toEqual([saleDtoMock]);
		});
	});

	describe('get', () => {
		it('should return the sale', async () => {
			expect(await salesService.get(saleDtoMock.id)).toEqual(saleDtoMock);
		});
	});

	describe('getByProduct', () => {
		it('should return the sales collection', async () => {
			expect(await salesService.getByProduct(saleDtoMock.userId, '', '')).toEqual([saleDtoMock]);
		});
	});

	describe('getByUser', () => {
		it('should return the sales collection', async () => {
			expect(await salesService.getByUser(saleDtoMock.userId, '', '')).toEqual([saleDtoMock]);
		});
	});

	describe('getUserComissions', () => {
		it('should return the user comissions', async () => {
			expect(await salesService.getUserComissions(saleDtoMock.userId, '', '')).toEqual(saleDtoMock.total);
		});
	});

	describe('create', () => {
		it('should return the created sale', async () => {
			expect(await salesService.create(saleDtoMock)).toEqual(saleDtoMock);
		});
	});

	describe('update', () => {
		it('should return the updated sale', async () => {
			expect(await salesService.update(saleDtoMock)).toEqual(saleDtoMock);
		});
	});

	describe('delete', () => {
		it('should return the deleted sale id', async () => {
			expect(await salesService.delete(saleDtoMock.id)).toEqual(saleDtoMock.id);
		});
	});
});
