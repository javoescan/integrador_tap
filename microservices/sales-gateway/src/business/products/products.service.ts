import { ConfigService } from '@nestjs/config';
import { ExternalService } from 'business/external/external.service';
import { Injectable } from '@nestjs/common';
import { ProductDto } from './dtos/product.dto';
import { HttpMethods } from 'business/external/external.enums';

@Injectable()
export class ProductsService {
  private baseApiUrl: string;

  constructor(private externalService: ExternalService, private configService: ConfigService) {
    this.baseApiUrl = this.configService.get<string>('PRODUCTS_MANAGER_API');
  }

  async getAll(): Promise<ProductDto[]> {
    return this.externalService.call(HttpMethods.GET, this.baseApiUrl);
  }

  async get(id: string): Promise<ProductDto> {
    return this.externalService.call(HttpMethods.GET, `${this.baseApiUrl}${id}`);
  }

  async create(product: ProductDto): Promise<ProductDto> {
    return this.externalService.call(HttpMethods.POST, this.baseApiUrl, { product });
  }
  
  async update(product: ProductDto): Promise<ProductDto> {
    return this.externalService.call(HttpMethods.PUT, `${this.baseApiUrl}${product.id}`, { product });
  }

  async delete(id: string): Promise<string> {
    return this.externalService.call(HttpMethods.DELETE, `${this.baseApiUrl}${id}`);
  }
}