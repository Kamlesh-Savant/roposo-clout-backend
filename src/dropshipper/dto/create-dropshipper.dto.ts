import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateDropshipperDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
