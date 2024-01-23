import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './users.controller';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule.forFeature([UserEntity])],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UsersModule {}
