import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config({ path: './config.env' })


const generateToken = (user) => {

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
    return token;
}


export default generateToken;