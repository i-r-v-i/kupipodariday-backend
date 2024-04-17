import { CreateUserDto } from './dto/create-user.dto';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  async createUser(createUserDto: CreateUserDto) {
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

  findByUsername(username: string) {
    const user = this.userRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException('user not Found');
    }
    return user;
  }

  async findMany(query: string) {
    const queryString = Like(`%${query}%`);
    const user = await this.userRepository.findBy([
      { username: queryString },
      { email: queryString },
    ]);

    if (!user) {
      throw new NotFoundException(`Пользователь не существует`);
    }
    return user;
  }

  // async updateUser(id: number, updateUserDto: UpdateUserDto) {
  // if (updateUserDto.password) {
  //   updateUserDto.password = await this.hashService.hashPassword(
  //     updateUserDto.password,
  //   );
  // }
  // await this.userRepository.update(id, updateUserDto);
  // return this.findById(id);
  // }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
