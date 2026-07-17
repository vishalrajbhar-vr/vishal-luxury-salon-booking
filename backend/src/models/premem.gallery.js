import mongoose from "mongoose";

const prememGallerySchema = new mongoose.Schema({

    name: { type: String },
    paragraph: { type: String },
    image: { type: String, }

}, {
    timestamps: true
})

const prememGalleryModel = mongoose.model("prememGallery_data", prememGallerySchema);
export default prememGalleryModel;