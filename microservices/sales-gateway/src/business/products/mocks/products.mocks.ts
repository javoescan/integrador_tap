import { ProductDto } from '../dtos/product.dto';

const productDtoMock = new ProductDto();
productDtoMock.id = 'test_id';
productDtoMock.name = 'test_user_id';
productDtoMock.description = 'test_user_id';
productDtoMock.price = 100;
productDtoMock.stock = 100;

export {
  productDtoMock,
};