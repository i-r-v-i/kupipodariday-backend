import { IsInt, IsNumber, IsString, IsUrl, Length } from 'class-validator';
import { CommonEntity } from 'src/common-entity/common-entity';
import { Offer } from 'src/offers/entities/offer.entity';
import { User } from 'src/users/entities/user.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';
import { Entity, Column, ManyToOne, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class Wish extends CommonEntity {
  @Column()
  @IsString()
  @Length(1, 250)
  username: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column({ type: 'decimal', scale: 2 })
  @IsInt()
  price: number;

  @Column({ type: 'decimal', scale: 2 })
  @IsInt()
  raised: number;

  @Column()
  @IsString()
  @Length(1, 1024)
  description: string;

  @Column()
  @IsNumber()
  copied: number;

  //   @ManyToOne(() => User, (user) => user.wishes)
  //   owner: User;

  //   @ManyToMany(() => Wishlist, (wishlist) => wishlist.items)
  //   wishlists: Wishlist[];

  //   @OneToMany(() => Offer, (offer) => offer.item)
  //   offers: Offer[];
}
