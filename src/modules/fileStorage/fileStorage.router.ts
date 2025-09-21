import { Router } from 'express';
import { FileStorageController } from './fileStorage.controller';

const fileStorageRouter = Router();
const controller = new FileStorageController();

fileStorageRouter.post('/presigned-url', controller.generatePresignedUrl);
fileStorageRouter.get('/download-url', controller.getDownloadUrl);

export default fileStorageRouter;