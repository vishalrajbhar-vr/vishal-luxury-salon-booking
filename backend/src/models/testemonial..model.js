import mongoose from "mongoose";

const { Schema } = mongoose;

const testemonialSchema = new Schema({
    name: { type: String, trim: true, required: true },
    profession: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    image: { type: String }
},
    { timestamps: true }
)

const testemonialModel = mongoose.model("testemonial_data", testemonialSchema)
export default testemonialModel;