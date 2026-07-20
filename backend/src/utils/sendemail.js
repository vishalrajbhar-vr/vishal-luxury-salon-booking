import nodemailer from "nodemailer";
import dotenv from 'dotenv'
dotenv.config({ path: './config.env' })

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // 587 is generally more reliable on cloud hosts
  secure: false,
  requireTLS: true,
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
    }
};
export default sendEmail;