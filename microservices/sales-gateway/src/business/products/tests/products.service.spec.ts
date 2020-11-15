import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ExternalService } from 'business/external/external.service';
import { ExternalServiceMock } from '../mocks/external.service.mock';
import { productDtoMock } from '../mocks/products.mocks';
import { ProductsService } from '../products.service';

describe('ProductsService', () => {
	let productsService: ProductsService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot()],
			providers: [ProductsService, ExternalService],
		})
			.overrideProvider(ExternalService)
			.useClass(ExternalServiceMock)
			.compile();

      productsService = app.get<ProductsService>(ProductsService);
	});

	describe('getAll', () => {
		it('should return the products collection', async () => {
			expect(await productsService.getAll()).toEqual([productDtoMock]);
		});
	});

	describe('get', () => {
		it('should return the product', async () => {
			expect(await productsService.get(productDtoMock.id)).toEqual(productDtoMock);
		});
	});

	describe('create', () => {
		it('should return the created product', async () => {
			expect(await productsService.create(productDtoMock)).toEqual(productDtoMock);
		});
	});

	describe('update', () => {
		it('should return the updated product', async () => {
			expect(await productsService.update(productDtoMock)).toEqual(productDtoMock);
		});
	});

	describe('delete', () => {
		it('should return the deleted product id', async () => {
			expect(await productsService.delete(productDtoMock.id)).toEqual(productDtoMock.id);
		});
	});
});
