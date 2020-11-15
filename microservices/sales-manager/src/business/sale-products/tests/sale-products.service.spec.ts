import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { saleProductMock } from '../mocks/sale-products.mocks';
import { SaleProductsRepositoryMock } from '../mocks/sale-products.repository.mock';
import { SaleProduct } from '../sale-products.entity';
import { SaleProductsService } from '../sale-products.service';

describe('SaleProductsService', () => {
	let saleProductService: SaleProductsService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			providers: [SaleProductsService, {
				provide: getRepositoryToken(SaleProduct),
				useClass: SaleProductsRepositoryMock,
			}],
		}).compile();

      saleProductService = app.get<SaleProductsService>(SaleProductsService);
	});

	describe('getAll', () => {
		it('should return the saleProduct collection', async () => {
			expect(await saleProductService.getAll()).toEqual([saleProductMock]);
		});
	});
});
