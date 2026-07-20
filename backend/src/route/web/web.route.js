import express from 'express'
import { changePassword, forgatePassword, getProfile, login, myAppointments, newPassword, signup, verifyOtp, googleCallback } from '../../controller/web/auth.controller.js'
import auth from '../../middleware/auth.js'
import passport from 'passport'
import { createOrder, verifyPayment } from '../../controller/web/payment.controller.js'
import sendEmail from '../../utils/sendemail.js'
const webRouter = express.Router()

webRouter.post("/signup", signup)
webRouter.post("/login", login)
webRouter.get("/profile", auth, getProfile)
webRouter.post("/email/otp", forgatePassword)
webRouter.post("/verify/otp", verifyOtp)
webRouter.post("/new/password", newPassword)
webRouter.post("/change/password/:id", changePassword)
webRouter.get("/my-appointments", auth, myAppointments);

webRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
webRouter.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: "/login-failed" }), googleCallback);

webRouter.post("/payment/create-order", auth, createOrder);
webRouter.post("/payment/verify", auth, verifyPayment);


webRouter.post('/sendemail', async (req, res) => {
    try {
        const emailSent = await sendEmail('anishkr2842003@gmail.com', "This is Testing Email", "Helllo, This is test email")
        res.status(200).json({message: "Working", emailSent})
    } catch (error) {
        res.status(500).json({message: "error aaya", error: error})
    }
})


export default webRouter