import { SaleDto } from '../sale.dto';

const saleDtoMock = new SaleDto();
saleDtoMock.id = 'test_id';
saleDtoMock.userId = 'test_user_id';
saleDtoMock.total = 100;
saleDtoMock.date = new Date();

export {
  saleDtoMock,
};