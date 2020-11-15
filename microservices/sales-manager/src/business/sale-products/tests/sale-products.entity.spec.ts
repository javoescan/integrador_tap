import { SaleProduct } from '../sale-products.entity';
import { v4 as uuid } from 'uuid';
jest.mock('uuid');

export const ManyToOne = jest.fn(callback => callback());

describe('SaleProduct', () => {
	const mockedUid = '1';
  uuid.mockImplementation(() => mockedUid);

	it('should return a sale product object', async () => {
		const saleProduct = new SaleProduct();
		await saleProduct.beforeInsert();
		expect(saleProduct.id).toEqual(mockedUid);
	});
});
