import { Injectable } from '@nestjs/common';
import { SaleProduct } from '../sale-products.entity';
import { saleProductMock } from './sale-products.mocks';

@Injectable()
export class SaleProductsRepositoryMock {
	async find(): Promise<SaleProduct[]> {
		return [saleProductMock];
	}
}