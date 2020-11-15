import { Injectable } from '@nestjs/common';
import { SaleProduct } from '../sale-products.entity';
import { saleProductMock } from './sale-products.mocks';

@Injectable()
export class SaleProductsServiceMock {
	async getAll(id: string): Promise<SaleProduct[]> {
		return [saleProductMock];
	}
}