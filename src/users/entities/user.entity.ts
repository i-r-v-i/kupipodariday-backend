import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';
import { CommonEntity } from 'src/common-entity/common-entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class User extends CommonEntity {
  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  username: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  @IsString()
  @Length(2, 200)
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsUrl()
  avatar: boolean;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @Exclude()
  password: string;
}
