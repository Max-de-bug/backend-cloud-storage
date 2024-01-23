import { UserEntity } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  filename: string;

  @Column({ length: 255 })
  originalname: string;

  @Column({ length: 255 })
  mimetype: string;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => UserEntity, (user) => user.files)
  user: UserEntity;

  // @Column()
  // userId: string;
}

export enum FileType {
  PHOTOS = 'photos',
  TRASH = 'trash',
}
