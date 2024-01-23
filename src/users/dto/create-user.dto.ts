import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    default: 'MaksymY',
  })
  username: string;
  @ApiProperty({
    default: 'maxum_yuzva@ukr.net',
  })
  email: string;
  @ApiProperty({
    default: '12345678',
  })
  password: string;
  userId: string;
  @ApiProperty({})
  createdAt: Date = new Date();
}
