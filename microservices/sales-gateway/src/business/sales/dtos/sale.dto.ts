import { IsDateString, IsInt, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SaleProductDto } from './sale-product.dto';

export class SaleDto {
  id: string;

  @IsString()
	@ApiProperty()
  userId: string;

	@IsInt()
	@ApiProperty()
	total: number;

	@IsDateString()
	@ApiProperty()
	date: Date;

	@ValidateNested()
	@ApiProperty({
		type: [SaleProductDto]
	})
	products: SaleProductDto[];
}