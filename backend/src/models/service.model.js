import mongoose from 'mongoose';
const { Schema } = mongoose;

const serviceSchema = new Schema({
    service_name: { type: String, trim: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    description: { type: String, trim: true },
    image: { type: String, required: true }
},
    { timestamps: true }
);

const serviceModel = mongoose.model("service_data", serviceSchema)
export default serviceModel;