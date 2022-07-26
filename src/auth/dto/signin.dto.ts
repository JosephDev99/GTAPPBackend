import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  phoneNumber: Number;

  @IsNotEmpty()
  password: string;
}
