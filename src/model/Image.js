import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  title: String,
  imageUrl: String,
  public_id: String,
});

const Image = mongoose.model('Image', ImageSchema);

export default Image;
