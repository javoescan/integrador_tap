import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  id: string;

  @IsEmail()
	@ApiProperty()
  email: string;
  
  @IsString()
	@ApiProperty()
  password: string;
  
  @IsString()
	@ApiProperty()
  firstName: string;
  
  @IsString()
	@ApiProperty()
  lastName: string;

  @IsString()
	@ApiProperty()
  document: string;

  @IsString()
	@ApiProperty()
  role: string;
}