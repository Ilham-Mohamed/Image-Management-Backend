import { v2 as cloudinary } from 'cloudinary';
import Image from '../model/Image.js';

export const uploadImage = async (req, res) => {
  try {
    const { image, title } = req.body;

    if (!image) {
      return res.status(400).json({ message: 'Image not found' });
    }

    // Validate base64 format
    const base64Regex = /^data:image\/(jpeg|jpg|png|gif);base64,/;
    if (!base64Regex.test(image)) {
      return res.status(400).json({ message: 'Invalid base64 image format' });
    }

    const result = await cloudinary.uploader.upload(image);

    const file = await Image.create({
      title,
      imageUrl: result.secure_url,
      public_id: result.public_id,
    });

    res.status(200).json({ message: 'Image successfully uploaded', file });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getImages = async (req, res) => {
  try {
    const images = await Image.find();
    if (!images) {
      res.status(404).json({
        Message: 'No Images Found',
      });
    }
    res.status(200).json({
      Message: 'Images Fetched Successfully',
      images,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateImage = async (req, res) => {
  try {
    const id = req.params.id;
    const { title } = req.body;

    const updatedImage = await Image.findByIdAndUpdate(
      id,
      {
        title,
      },
      {
        new: true,
      }
    );
    if (updatedImage === null) {
      return res.status(404).json({ Message: 'Image not found' });
    }

    res.status(200).json({
      Message: 'Image title updated',
      updatedImage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedImage = await Image.findByIdAndDelete(id);

    if (!deleteImage === null) {
      return res.status(404).json({ Message: 'Image not found' });
    }

    await cloudinary.uploader.destroy(deletedImage.public_id);

    res.status(200).json({
      Message: 'Image deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
