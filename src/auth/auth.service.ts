import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.findByEmail(email);
      console.log(user);
      if (!user) {
        throw new BadRequestException('User not found');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async register(dto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const userData = await this.userService.create({
        ...dto,
        password: hashedPassword,
      });
      const token = this.jwtService.sign({ id: userData.id });
      return { token };
    } catch (error) {
      console.error(error);
      throw new ForbiddenException('Registration error!');
    }
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    console.log(user);
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }
    return {
      token: this.jwtService.sign({ id: user.id }),
    };
  }
}
