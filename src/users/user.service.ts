import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    return this.userRepository.find();
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepository.create({
      username: data.username,
      email: data.email,
      password: data.password,
      createdAt: data.createdAt,
    });

    return this.userRepository.save(newUser);
  }

  async user(id: number) {
    return this.userRepository.find({
      where: { id },
    });
  }

  async createUser(data: CreateUserDto) {
    const newUser = this.userRepository.create(data);
    return this.userRepository.save(newUser);
  }

  async updateUser(params: { where; data }) {
    const { where, data } = params;
    await this.userRepository.update(where, data);
    return this.userRepository.findOne(where);
  }
}
