import { ConfigService } from '@nestjs/config';
import { ExternalService } from 'business/external/external.service';
import { Injectable } from '@nestjs/common';
import { SaleDto } from './dtos/sale.dto';
import { HttpMethods } from 'business/external/external.enums';

@Injectable()
export class SalesService {
  private baseApiUrl: string;

  constructor(private externalService: ExternalService, private configService: ConfigService) {
    this.baseApiUrl = this.configService.get<string>('SALES_MANAGER_API');
  }

  async getAll(): Promise<SaleDto[]> {
    return this.externalService.call(HttpMethods.GET, this.baseApiUrl);
  }

  async get(id: string): Promise<SaleDto> {
    return this.externalService.call(HttpMethods.GET, `${this.baseApiUrl}${id}`);
  }

  async getByProduct(productId: string, fromDate: string, toDate: string): Promise<SaleDto[]> {
    const url = `${this.baseApiUrl}product/${productId}?from_date="${fromDate}"&to_date="${toDate}"`;
    return this.externalService.call(HttpMethods.GET, url);
  }

  async getByUser(userId: string, fromDate: string, toDate: string): Promise<SaleDto[]> {
    const url = `${this.baseApiUrl}user/${userId}?from_date="${fromDate}"&to_date="${toDate}"`;
    return this.externalService.call(HttpMethods.GET, url);
  }

  async getUserComissions(userId: string, fromDate: string, toDate: string): Promise<SaleDto[]> {
    const url = `${this.baseApiUrl}user/${userId}/comissions?from_date="${fromDate}"&to_date="${toDate}"`;
    return this.externalService.call(HttpMethods.GET, url);
  }

  async create(sale: SaleDto): Promise<SaleDto> {
    return this.externalService.call(HttpMethods.POST, this.baseApiUrl, { sale });
  }
  
  async update(sale: SaleDto): Promise<SaleDto> {
    return this.externalService.call(HttpMethods.PUT, `${this.baseApiUrl}${sale.id}`, { sale });
  }

  async delete(id: string): Promise<string> {
    return this.externalService.call(HttpMethods.DELETE, `${this.baseApiUrl}${id}`);
  }
}