import nodemailer from "nodemailer";
import dotenv from 'dotenv'
dotenv.config({ path: './config.env' })

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

const sendEmail = async (to, subject, html) => {
    try {
        const mailOptions = { from: process.env.EMAIL_USER, to, subject, html };
        const info = await transporter.sendMail(mailOptions); return info;
    }
    catch (error) {
        console.log("Email Error:", error);
        throw new Error("Failed to send email");
    }finally{
        console.log(process.env.EMAIL_USER)
        console.log(process.env.EMAIL_PASS)
        console.log("send email function run huaaaa")
    }
};
export default sendEmail;