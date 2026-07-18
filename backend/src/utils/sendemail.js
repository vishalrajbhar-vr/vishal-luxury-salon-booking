import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// 👇 YAHAN ADD KARO
(async () => {
    try {
        await transporter.verify();
        console.log("✅ SMTP Server Ready");
    } catch (err) {
        console.log("❌ SMTP Verify Error:", err);
    }
})();

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