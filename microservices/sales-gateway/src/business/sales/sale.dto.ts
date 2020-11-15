import { IsDate, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaleDto {
  id: string;

  @IsString()
	@ApiProperty()
  userId: string;

	@IsInt()
	@ApiProperty()
	total: number;

	@IsDate()
	@ApiProperty()
	date: Date;
}