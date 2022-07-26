import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  Username: string;

  @IsNotEmpty()
  phoneNumber: Number;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
