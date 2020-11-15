import { Sale } from '../sales.entity';

const saleMock = new Sale();
saleMock.id = 'test_id';
saleMock.total = 100;
saleMock.date = new Date('2020-10-10');

export {
  saleMock,
};