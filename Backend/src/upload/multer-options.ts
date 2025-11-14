/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-call */
import { memoryStorage } from 'multer';

export const multerOptions = {
  storage: memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB
  },
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      req.fileValidationError = 'Only image files are allowed!';
      return callback(null, false, new Error('Only image files are allowed!'));
    }
    callback(null, true);
  },
};
