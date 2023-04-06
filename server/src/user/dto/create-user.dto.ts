import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 32, { message: 'Incorrect password' })
  password: string;

  @IsNotEmpty()
  username: string;
}
