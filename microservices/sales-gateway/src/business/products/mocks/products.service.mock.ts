import { Injectable } from '@nestjs/common';
import { ProductDto } from '../product.dto';
import { productDtoMock } from './products.mocks';

@Injectable()
export class ProductsServiceMock {
	async getAll(id: string): Promise<ProductDto[]> {
		return [productDtoMock];
	}

	async get(id: string): Promise<ProductDto> {
		return productDtoMock;
	}

	async create(product: ProductDto): Promise<ProductDto> {
		return productDtoMock;
	}

	async update(product: ProductDto): Promise<ProductDto> {
		return productDtoMock;
	}

	async delete(id: string): Promise<string> {
		return id;
	}
}