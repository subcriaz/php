import { diskStorage } from 'multer';
import { MulterModuleOptions } from '@nestjs/platform-express';

const maxFileSize = 10 * 1024 * 1024; // 10MB limit

export const multerConfig: MulterModuleOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    },
  }),
  limits: { fileSize: maxFileSize },
};
