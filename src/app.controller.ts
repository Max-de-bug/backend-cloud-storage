// import {
//   Controller,
//   Get,
//   Param,
//   Post,
//   Body,
//   Put,
//   Delete,
// } from '@nestjs/common';
// import { AppService } from './app.service';
// import { UserService } from './users/user.service';
// import { User } from '@prisma/client';
// import { ApiTags } from '@nestjs/swagger';

// @ApiTags('users')
// @Controller('users')
// export class AppController {
//   constructor(private readonly userService: UserService) {}

//   @Get()
//   async getUsers(): Promise<User[]> {
//     // Call the users method from the UserService
//     const users = await this.userService.findAll();

//     // Return the retrieved users
//     return users;
//   }

//   @Get(':id')
//   async getUserById(@Param('id') id: string): Promise<User[]> {
//     // Call the user method from the UserService with the provided id
//     const users = await this.userService.user(id);

//     // Return the retrieved user
//     return users;
//   }

//   @Post()
//   async createUser(@Body() data: any): Promise<User> {
//     // Call the createUser method from the UserService with the provided data
//     const user = await this.userService.createUser(data);

//     // Return the created user
//     return user;
//   }

//   @Put(':id')
//   async updateUser(@Param('id') id: string, @Body() data: any): Promise<User> {
//     // Call the updateUser method from the UserService with the provided id and data
//     const user = await this.userService.updateUser(data);

//     // Return the updated user
//     return user;
//   }

//   @Delete(':id')
//   async deleteUser(@Param('id') id: string): Promise<User> {
//     // Call the deleteUser method from the UserService with the provided id
//     const user = await this.userService.deleteUser({ id });

//     // Return the deleted user
//     return user;
//   }
// }
