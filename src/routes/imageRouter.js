import express from 'express';
import {
  deleteImage,
  getImages,
  updateImage,
  uploadImage,
} from '../../controller/imageController.js';

const imageRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Images
 *   description: API endpoints for managing images
 *
 * /api/upload:
 *   post:
 *     summary: Upload an image
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 description: Base64 encoded image data
 *               title:
 *                 type: string
 *                 description: Image title
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *       400:
 *         description: Image is not provided or invalid request body
 *       500:
 *         description: Server Error
 */

imageRouter.post('/upload', uploadImage);

/**
 * @swagger
 * /api/images:
 *    get:
 *      summary: Get All Images
 *      tags: [Images]
 *      responses:
 *        200:
 *          description: A list of images
 *        404:
 *          description: No Images Found
 *        500:
 *          description: Server Error
 */

imageRouter.get('/images', getImages);

/**
 * @swagger
 * /api/image/{id}:
 *   put:
 *    summary: Update image title
 *    tags: [Images]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        Schema:
 *          type: string
 *        description: The image id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *    responses:
 *        200:
 *          description: Image title updated successfully
 *        404:
 *          description: Invalid Image Id
 *        500:
 *          description: Server Error
 */

imageRouter.put('/image/:id', updateImage);

/**
 * @swagger
 * /api/image/{id}:
 *    delete:
 *      summary: Delete an image
 *      tags: [Images]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *            description: The id of the image to be deleted
 *      responses:
 *        200:
 *          description: Image title deleted successfully
 *        404:
 *          description: Invalid Image Id
 *        500:
 *          description: Server Error
 */

imageRouter.delete('/image/:id', deleteImage);

export default imageRouter;
