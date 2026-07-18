import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Render me ye hi use karo

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    family: 4,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.log("SMTP Error:", error);
    } else {
        console.log("SMTP Server Ready");
    }
});

const sendEmail = async (to, subject, html) => {
    try {
        return await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html,
        });
    } catch (error) {
        console.log("Email Error:", error);
        throw error;
    }
};

export default sendEmail;