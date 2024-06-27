import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { v2 as cloudinary } from 'cloudinary';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import imageRouter from './src/routes/imageRouter.js';

const CSS_URL =
  'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui.css';

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

// swagger options
const options = {
  defination: {
    openapi: '3.0.0',
    info: {
      title: 'Image Manager Api',
      version: '1.0.0',
      description: 'API documentation for image manager',
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Image Manager Api',
      },
    ],
  },
  apis: ['src/**/*'],
};

app.use('/api', imageRouter);

app.listen(process.env.PORT, () => {
  console.log(`Serving on port ${process.env.PORT}`);
});
