import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  id: string;

	@IsString()
	@ApiProperty()
	name: string;

	@IsString()
	@ApiProperty()
	description: string;

	@IsInt()
	@ApiProperty()
	price: number;

	@IsInt()
	@ApiProperty()
	stock: number;
}