import { IsDate, IsInt, IsString } from 'class-validator';

export class SaleDto {
  id: string;

  @IsString()
  userId: string;

	@IsInt()
	total: number;

	@IsDate()
	date: Date;
}