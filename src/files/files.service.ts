import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { UserId } from 'src/decorators/user-id.decorator';
import { FileEntity, FileType } from './entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  async findAll(userId: number, fileType: FileType) {
    const qb = this.fileRepository.createQueryBuilder('file');
    qb.where('file.userId = :userId', { userId });
    if ((fileType = FileType.PHOTOS)) {
      qb.andWhere('file.mimetype ILIKE :type', { type: '%image%' });
    }
    if ((fileType = FileType.TRASH)) {
      qb.withDeleted().andWhere('file.deletedAt IS NOT NULL');
    }
    return qb.getMany();
  }

  async create(file: Express.Multer.File, userId: number) {
    console.log(file);
    const newFile = {
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      user: {
        id: userId,
      },
    };
    await this.fileRepository.save(newFile);
  }

  async remove(userId: number, ids: string) {
    const idsArray = ids.split(',');
    const qb = this.fileRepository.createQueryBuilder('file');
    qb.where('id IN (:...ids) AND userId = :userId', {
      ids: idsArray,
      userId,
    });
    return qb.softDelete().execute();
  }

  async findById(id: number) {
    return this.fileRepository.findOne({ where: { id } });
  }
}

export default FilesService;
