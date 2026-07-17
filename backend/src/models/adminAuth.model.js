import mongoose from 'mongoose';
const { Schema } = mongoose;

const adminAuthSchema = new Schema({
    email: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    newPassword: { type: String, trim: true },
    conformNewPassword: { type: String, trim: true },
},
    { timestamps: true }
);
const adminAuthModel = mongoose.model("adminAuth_data", adminAuthSchema)
export default adminAuthModel;