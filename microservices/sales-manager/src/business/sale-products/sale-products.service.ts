import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleProduct } from './sale-products.entity';

@Injectable()
export class SaleProductsService {
  constructor(@InjectRepository(SaleProduct) private saleProductsRepository: Repository<SaleProduct>) {}

  async getAll(): Promise<SaleProduct[]> {
    return this.saleProductsRepository.find();
  }
}