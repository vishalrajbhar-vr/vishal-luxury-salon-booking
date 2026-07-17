import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config({ path: './config.env' })

const connectDB = () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDb connected successfully")
    }
    catch (error) {
        console.log("MongoDb is not connected")

    }
}
export default connectDB