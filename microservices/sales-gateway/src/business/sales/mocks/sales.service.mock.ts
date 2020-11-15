import { Injectable } from '@nestjs/common';
import { SaleDto } from '../dtos/sale.dto';
import { saleDtoMock } from './sales.mocks';

@Injectable()
export class SalesServiceMock {
	async getAll(id: string): Promise<SaleDto[]> {
		return [saleDtoMock];
	}

	async get(id: string): Promise<SaleDto> {
		return saleDtoMock;
	}

	async getByUser(id: string): Promise<SaleDto[]> {
		return [saleDtoMock];
	}

	async getByProduct(id: string): Promise<SaleDto[]> {
		return [saleDtoMock];
	}

	async getUserComissions(id: string): Promise<number> {
		return saleDtoMock.total;
	}

	async create(sale: SaleDto): Promise<SaleDto> {
		return saleDtoMock;
	}

	async update(sale: SaleDto): Promise<SaleDto> {
		return saleDtoMock;
	}

	async delete(id: string): Promise<string> {
		return id;
	}
}