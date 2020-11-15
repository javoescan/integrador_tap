import { IsInt, IsString } from 'class-validator';

export class ProductDto {
  id: string;

	@IsString()
	name: string;

	@IsString()
	description: string;

	@IsInt()
	price: number;

	@IsInt()
	stock: number;
}