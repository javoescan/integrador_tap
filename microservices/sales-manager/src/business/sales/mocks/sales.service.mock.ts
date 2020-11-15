import { Injectable } from '@nestjs/common';
import { Sale } from '../sales.entity';
import { saleMock } from './sales.mocks';

@Injectable()
export class SalesServiceMock {
	async getAll(id: string): Promise<Sale[]> {
		return [saleMock];
	}

	async get(id: string): Promise<Sale> {
		return saleMock;
	}

	async getByUser(id: string): Promise<Sale[]> {
		return [saleMock];
	}

	async getByProduct(id: string): Promise<Sale[]> {
		return [saleMock];
	}

	async getUserComissions(id: string): Promise<number> {
		return saleMock.total;
	}

	async create(sale: Sale): Promise<Sale> {
		return saleMock;
	}

	async update(sale: Sale): Promise<Sale> {
		return saleMock;
	}

	async delete(id: string): Promise<string> {
		return id;
	}
}