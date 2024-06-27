import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { v2 as cloudinary } from 'cloudinary';
import bodyParser from 'body-parser';
import imageRouter from './routes/imageRouter.js';

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(morgan('dev'));

dotenv.config();
// app.use(express.json());

app.use(cors());

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('DB connection established');
  })
  .catch((err) => {
    console.log(err);
  });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

app.use('/api', imageRouter);

app.listen(process.env.PORT, () => {
  console.log(`Serving on port ${process.env.PORT}`);
});
