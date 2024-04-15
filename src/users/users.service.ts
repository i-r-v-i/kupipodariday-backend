import { CreateUserDto } from './dto/create-user.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findBy([
      { username: createUserDto.username },
      { email: createUserDto.email },
    ]);
    if (existUser.length > 0)
      throw new ConflictException(
        'Пользователь с таким email или username уже зарегистрирован',
      );
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    const newUser = await this.userRepository.save({
      ...createUserDto,
      password: hash,
    });
    return newUser;
  }

  findAll() {
    return 'all users';
  }

  async findOne(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `update user with ${id}`;
  }

  remove(id: number) {
    return `delete user with ${id}`;
  }
}

//   async findAll(): Promise<User[]> {
//     return this.userRepository.find();
//   }
//   async findlOne(id: number): Promise<User> {
//     return this.userRepository.findOneBy({ id });
//   }
//   async create(User: User): Promise<User> {
//     return this.userRepository.save(User);
//   }
//   async updateOne(User: User): Promise<User> {
// return this.userRepository.update(User);
//   }
//   async removeOne(User: User): Promise<User> {
//     return this.userRepository.remove(User);
//   }
