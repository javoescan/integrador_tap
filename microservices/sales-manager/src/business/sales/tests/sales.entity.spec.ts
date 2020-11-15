import { Sale } from '../sales.entity';
import { v4 as uuid } from 'uuid';
jest.mock('uuid');

describe('Sale', () => {
	const mockedUid = '1';
  uuid.mockImplementation(() => mockedUid);

	it('should return a sale object', async () => {
		const sale = new Sale();
		await sale.beforeInsert();
		expect(sale.id).toEqual(mockedUid);
	});
});
