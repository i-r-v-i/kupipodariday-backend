import { IsBoolean, IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateOfferDto {
  @IsInt()
  @IsPositive()
  amount: number;

  @IsBoolean()
  hidden: boolean;

  @IsNumber()
  @IsPositive()
  itemId: number;
}
