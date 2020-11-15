import { Injectable } from '@nestjs/common';
import { SaleDto } from '../sale.dto';
import { saleDtoMock } from './sales.mocks';

@Injectable()
export class SalesServiceMock {
	async getAll(id: string): Promise<SaleDto[]> {
		return [saleDtoMock];
	}

	async get(id: string): Promise<SaleDto> {
		return saleDtoMock;
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