import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInUserDto } from './dto/signin-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(signInUserDto: SignInUserDto) {
    const user = await this.usersService.findOne(signInUserDto.username);
    const passwordIsMatch = await bcrypt.compare(
      signInUserDto.password,
      user.password,
    );
    if (passwordIsMatch) {
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException();
  }
}
