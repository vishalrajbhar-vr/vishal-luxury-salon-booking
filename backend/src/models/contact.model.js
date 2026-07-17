import mongoose from 'mongoose';
const { Schema } = mongoose;

const contactSchema = new Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    phone: { type: Number, trim: true, required: true },
    service: { type: String, required: true },
    message: { type: String }
},
    { timestamps: true }
);

const contactModel = mongoose.model("contact_data", contactSchema)
export default contactModel;