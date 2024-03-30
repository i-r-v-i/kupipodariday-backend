import { IsNumber, IsUrl, IsInt, IsBoolean } from 'class-validator';
import { CommonEntity } from 'src/common-entity/common-entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Offer extends CommonEntity {
  @Column({ type: 'decimal', scale: 2 })
  @IsInt()
  amount: number;

  @Column({ default: false })
  @IsBoolean()
  hidden: boolean;
}
