import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  create(CreateUserDto: CreateUserDto) {
    return 'adds new User';
  }

  findAll() {
    return 'all users';
  }

  findOne(id: number) {
    return `retutns ${id} user`;
  }

  update(id: number, UpdateUserDto: UpdateUserDto) {
    return `update user with ${id}`;
  }

  remove(id: number) {
    return `delete user with ${id}`;
  }
}
//   constructor(
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,
//   ) {}
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
