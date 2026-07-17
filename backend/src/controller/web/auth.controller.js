import userModel from "../../models/user.model.js"
import bcrypt from 'bcrypt'
import generateToken from "../../utils/generateToken.js"
import generateOtp from "../../utils/generateOtp.js"
import sendEmail from "../../utils/sendemail.js"
import { use } from "react"
import { callbackPromise } from "nodemailer/lib/shared/index.js"


//--------------------------------------signUp----------------------------------------
export const signup = async (req, res) => {
    try {
        const { name, email, phone, address, password, conformPassword } = req.body

        const exist = await userModel.findOne({ email })
        if (exist) {
            return res.status(401)
                .json({ success: false, message: "user alredy exist" })
        }
        if (password !== conformPassword) {
            return res.status(401)
                .json({ success: false, message: "password & conformPassword  is nat match" })
        }

        const hashpassword = await bcrypt.hash(password, 10)

        const reg = await userModel.create({ name, email, phone, address, password: hashpassword, conformPassword: hashpassword })
        const token = generateToken(reg)
        const userData = { id: reg._id, name: reg.name, email: reg.email, phone: reg.phone, image: reg.image || null }
        res.status(200)
            .json({ success: true, message: "user SignUp successfully", token, user: userData })
    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "user not register" })
    }
}

//------------------------------------------login----------------------------------
export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            res.status(404)
                .json({ success: false, message: "user not found" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(404)
                .json({ success: false, message: "wrong password" })
        }

        const token = generateToken(user)
        const userData = { id: user._id, name: user.name, email: user.email, phone: user.phone, image: user.image || null }

        res.status(200)
            .json({ success: true, message: "user login successfully", token, user: userData })
    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "user not login" })
    }
}

// ---------------------------------get profile---------------------------------
export const getProfile = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await userModel.findById(userId)
        res.status(200)
            .json({ success: true, message: "user profile find successfully", user })
    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: " something wrong..............." })
    }
}

// -----------------------------------------------forgate password send  otp ---------------------------------------------------------------------
export const forgatePassword = async (req, res) => {
    try {
        const { email } = req.body

        if (email == "") {
            return res.status(400)
                .json({ success: false, message: "email fields are required" });
        }

        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            return res.status(400)
                .json({ success: false, message: "User not exists" });
        }

        const otp = generateOtp();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        existingUser.otp = otp;
        existingUser.otpExpiry = otpExpiry;
        await existingUser.save();

        const html =
            `  <h2>Email Verification testing by:</h2> 
               <h1>VISHAL RAJBHAR </h1>
               <p>Your OTP is:</p> 
               <h1>${otp}</h1>
               <p> This OTP is valid for 10 minutes. </p> `;

        await sendEmail(email, "Email Verification OTP", html);

        res.status(200).json({ success: true, message: "OTP sent successfully" });
    }

    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "otp not send" })
    }
}

//------------------------verifying otp-------------------------
export const verifyOtp = async (req, res) => {
    try {

        const { email, otp } = req.body
        if (email == "" || otp == "") {
            res.status()
                .json({ success: false, message: "otp field are required" })
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404)
                .json({ success: false, message: "User not found" });

        }

        if (user.otp !== otp) {
            return res.status(400)
                .json({ success: false, message: "Invalid OTP" });
        }

        if (user.otpExpiry < new Date()) {
            return res.status(400)
                .json({ success: false, message: "OTP expired" });
        }
        user.isVerified = true; user.otp = null;
        user.otpExpiry = null; await user.save();
        res.status(200)
            .json({ success: true, message: "Account verified successfully" });
    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "otp not verifying" })
    }
}

// -------------------------------New password----------------
export const newPassword = async (req, res) => {
    try {
        const { email, newPassword, conformPassword } = req.body;

        // User Find
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Password Match Check
        if (newPassword !== conformPassword) {
            return res.status(400).json({
                success: false,
                message: "New Password & Confirm Password do not match"
            });
        }

        // Hash Password
        const hashPassword = await bcrypt.hash(newPassword, 10);

        // Update Password
        user.password = hashPassword;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Password not changed"
        });
    }
};

export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body
        if (!oldPassword || !newPassword) {
            res.status(500)
                .json({ success: false, message: "all field are requored" })
        }

        const user = await userModel.findById(req.user.id);

        const isMatch = await bcrypt.compare(oldPassword, user.password)

        if (!isMatch) {
            return res.status(400)
                .json({ success: false, message: "Old password is incorrect" });
        }

        user.password = await bcrypt.hash(newPassword, 10);

        await user.save();
        res.status(200)
            .json({ success: true, message: "Password changed successfully" });
    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "password not change" })
    }
}

// ------------------------find appointmentsby id--------------------------
export const myAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({
            userId: req.user.id,
        });

        res.status(200).json({
            success: true,
            founddata: appointments,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const googleCallback = (req, res) => {
    try {

        const user = req.user;
        const token = generateToken(user);

        const userData = encodeURIComponent(
            JSON.stringify(user)
        );

        res.redirect(
            `http://localhost:5173/google-success?token=${token}&user=${userData}`
        );

    } catch (error) {
        console.log(error);

        res.redirect(
            "http://localhost:5173/login"
        );
    }
};