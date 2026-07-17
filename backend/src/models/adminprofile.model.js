import mongoose from 'mongoose';
const { Schema } = mongoose;

const profileSchema = new Schema({
    name: { type: String, trim: true, required: true },
    image: { type: String }
},
    { timestamps: true }
);

const adminprofiletModel = mongoose.model("adminProfile_data", profileSchema)
export default adminprofiletModel;