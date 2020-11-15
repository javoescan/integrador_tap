import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  id: string;

  @IsEmail()
	@ApiProperty()
  email: string;
  
  @IsString()
	@ApiProperty()
  password: string;
}