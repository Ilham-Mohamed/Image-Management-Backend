import express from 'express';
import {
  deleteImage,
  getImages,
  updateImage,
  uploadImage,
} from '../../controller/imageController.js';

const imageRouter = express.Router();

imageRouter.post('/upload', uploadImage);
imageRouter.get('/images', getImages);
imageRouter.put('/images/:id', updateImage);
imageRouter.delete('/image/:id', deleteImage);

export default imageRouter;
