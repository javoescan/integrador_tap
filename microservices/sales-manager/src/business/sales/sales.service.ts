import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpMethods } from 'business/external/external.enums';
import { ExternalService } from 'business/external/external.service';
import { Between, Repository } from 'typeorm';
import { Sale } from './sales.entity';

@Injectable()
export class SalesService {
  private usersManagerApi: string;
  private productsManagerApi: string;
  
  constructor(
    @InjectRepository(Sale) private salesRepository: Repository<Sale>,
    private externalService: ExternalService,
    private configService: ConfigService,
  ) {
    this.usersManagerApi = this.configService.get<string>('USERS_MANAGER_API');
    this.productsManagerApi = this.configService.get<string>('PRODUCTS_MANAGER_API');
  }

  async getAll(): Promise<Sale[]> {
    return this.salesRepository.find({ relations: ['products'] });
  }

  async get(id: string): Promise<Sale> {
    const sale = await this.salesRepository.findOne({ 
      where: { id },
      relations: ['products']
    });
    if (!sale) {
			throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return sale;
  }

  async getByUser(userId: string, fromDate: string, toDate: string): Promise<Sale[]> {
    try {
      await this.externalService.call(HttpMethods.GET, `${this.usersManagerApi}${userId}`);
      if (fromDate && toDate) {
        return this.salesRepository.find({
          where: {
            userId,
            date: Between(new Date(fromDate), new Date(toDate))
          }
        });
      }
      return this.salesRepository.find({ userId });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async getByProduct(productId: string, fromDate: string, toDate: string): Promise<Sale[]> {
    try {
      await this.externalService.call(HttpMethods.GET, `${this.productsManagerApi}${productId}`);
      let query = this.salesRepository
        .createQueryBuilder('sale')
        .innerJoinAndSelect('sale.products', 'product')
        .where('product.id = :id', { id: productId });
      if (fromDate && toDate) {
        query = query.where('sale.date > :fromDate AND sale.date < :toDate', { fromDate: new Date(fromDate), toDate: new Date(toDate) });
      }
      return query.getMany();
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async getUserComissions(userId: string, fromDate: string, toDate: string): Promise<number> {
    try {
      const userSales = await this.getByUser(userId, fromDate, toDate);
      const totalSold = userSales.reduce((acc, sale) => acc + sale.total, 0);
      if (userSales.length > 10) {
        return totalSold * 0.07;
      } else {
        return totalSold * 0.04;
      }
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async create(sale: Sale): Promise<Sale> {
    try {
      await this.externalService.call(HttpMethods.GET, `${this.usersManagerApi}${sale.userId}`);
      await Promise.all(sale.products.map(product => {
        return this.externalService.call(HttpMethods.GET, `${this.productsManagerApi}${product.productId}`);
      }));
      const entity = new Sale();
      entity.userId = sale.userId;
      entity.total = sale.total;
      entity.date = sale.date;
      entity.products = sale.products;
      return this.salesRepository.save(entity);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
  
  async update(sale: Sale): Promise<Sale> {
    try {
      const existingSale = await this.get(sale.id);
      await this.externalService.call(HttpMethods.GET, `${this.usersManagerApi}${sale.userId}`);
      await Promise.all(sale.products.map(product => {
        return this.externalService.call(HttpMethods.GET, `${this.productsManagerApi}${product.productId}`);
      }));
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