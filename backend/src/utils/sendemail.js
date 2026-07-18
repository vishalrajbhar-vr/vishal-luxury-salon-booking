import nodemailer from "nodemailer";
import dotenv from 'dotenv'
dotenv.config({ path: './config.env' })


console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");

const transporter = nodemailer.createTransport(
    {
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

const sendEmail = async (to, subject, html) => {
    try {
        const mailOptions = { from: process.env.EMAIL_USER, to, subject, html };
        const info = await transporter.sendMail(mailOptions); return info;
    }
    catch (error) {
        console.log("Email Error:", error);
        throw new Error("Failed to send email");
    }
};
export default sendEmail;