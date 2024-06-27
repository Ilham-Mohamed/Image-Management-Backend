import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import imageRouter from './routes/imageRouter.js';

const app = express();

app.use(morgan('dev'));

dotenv.config();

app.use(cors());

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('DB connection established');
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/api', imageRouter);

app.listen(process.env.PORT, () => {
  console.log(`Serving on port ${process.env.PORT}`);
});
