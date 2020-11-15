import { Injectable } from '@nestjs/common';
import { Sale } from '../sales.entity';
import { saleMock } from './sales.mocks';

@Injectable()
export class SalesRepositoryMock {
	createQueryBuilder = () => ({
		innerJoinAndSelect: () => ({
			where: () => ({
				getMany: () => [saleMock],
				where: () => ({
					getMany: () => [saleMock],
				})
			})
		})
	})

	async find(): Promise<Sale[]> {
		return [saleMock];
	}

	async findOne(id: string): Promise<Sale> {
		return saleMock;
	}

	async save(sale: Sale): Promise<Sale> {
		return saleMock;
	}

	async softDelete(id: string): Promise<string> {
		return id;
	}
}