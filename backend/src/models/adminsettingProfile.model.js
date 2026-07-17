import mongoose from 'mongoose';
const { Schema } = mongoose;

const superAdminSchema = new Schema({
    name: { type: String, trim: true, required: true },
    phone: { type: Number, trim: true, required: true },
    image: { type: String }

},
    { timestamps: true }
);

const supeAdminModel = mongoose.model("superAdmin_data", superAdminSchema)
export default supeAdminModel;
