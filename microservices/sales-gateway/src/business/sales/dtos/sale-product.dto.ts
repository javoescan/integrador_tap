import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaleProductDto {
	@IsString()
	@ApiProperty()
  productId: string;

	@IsInt()
	@ApiProperty()
	price: number;

	@IsInt()
	@ApiProperty()
	quantity: number;
}