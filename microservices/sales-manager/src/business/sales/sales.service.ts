import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './sales.entity';

@Injectable()
export class SalesService {
  constructor(@InjectRepository(Sale) private salesRepository: Repository<Sale>) {}

  async getAll(): Promise<Sale[]> {
    return this.salesRepository.find();
  }

  async get(id: string): Promise<Sale> {
    const sale = await this.salesRepository.findOne({ id });
    if (!sale) {
			throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return sale;
  }

  async create(sale: Sale): Promise<Sale> {
    const entity = new Sale();
    return this.salesRepository.save(entity);
  }
  
  async update(sale: Sale): Promise<Sale> {
    try {
      const existingSale = await this.get(sale.id);
      const updatedSale = {
        ...existingSale,
        ...sale,
      };
      return this.salesRepository.save(updatedSale);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async delete(id: string): Promise<string> {
    await this.salesRepository.softDelete({ id });
    return id;
  }
}