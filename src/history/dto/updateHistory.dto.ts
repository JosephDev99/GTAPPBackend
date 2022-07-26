import { IsNotEmpty } from 'class-validator';

export class UpdateHistoryDto {
  @IsNotEmpty()
  Datetime: String;

  @IsNotEmpty()
  price: Number;

  @IsNotEmpty()
  start: String;

  @IsNotEmpty()
  dest: String;

}
