import { IsEmail, IsString } from 'class-validator';

export class UserDto {
  id: string;

  @IsEmail()
  email: string;
  
  @IsString()
  password: string;
  
  @IsString()
  firstName: string;
  
  @IsString()
  lastName: string;

  @IsString()
  document: string;

  @IsString()
  role: string;
}