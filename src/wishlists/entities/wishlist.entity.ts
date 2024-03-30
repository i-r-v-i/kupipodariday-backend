import { IsInt, IsNumber, IsString, IsUrl, Length } from 'class-validator';
import { CommonEntity } from 'src/common-entity/common-entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Wishlist extends CommonEntity {
  @Column()
  @IsString()
  @Length(1, 250)
  name: string;

  @Column()
  @IsString()
  @Length(1, 1500)
  description: string;

  @Column()
  @IsUrl()
  image: string;
}
