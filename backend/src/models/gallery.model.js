import mongoose from 'mongoose';
const { Schema } = mongoose;

const gallerySchema = new Schema({
    image_title: { type: String, trim: true },
    category: { type: String, required: true },
    description: { type: String, trim: true },
    image: { type: String, trim: true },
},
    { timestamps: true }
);

const galleryModel = mongoose.model("gallery_data", gallerySchema)
export default galleryModel;