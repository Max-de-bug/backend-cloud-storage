export class CreateFileDto {
  filename: string;
  originalname: string;
  mimetype: string;
  userId: string;
  deletedAt: Date = new Date();
  user: {
    create?: string;
    connectOrCreate?: string;
    connect?: string;
  };
}
