import adminAuthModel from "../../models/adminAuth.model.js"
import bcrypt, { compare } from 'bcrypt'
import jwt from "jsonwebtoken";


export const adminregister = async (req, res) => {
    try {
        const { email, password } = req.body
        const hashpassword = await bcrypt.hash(password, 10)
        const regdata = await adminAuthModel.create({ email, password: hashpassword })

        res.status(200)
            .json({ success: true, message: "register successfully", regdata })
    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "registation failed", error })
    }
}

export const adminlogin = async (req, res) => {
    try {

        const { email, password } = req.body
        const admin = await adminAuthModel.findOne({ email })
        if (!admin) {
            res.status(404)
                .json({ success: false, message: "admin not found" })
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            res.status(401)
                .json({ success: false, message: "wrong password" })
        }


        // Generate JWT Token
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.status(200)
            .json({ success: true, message: "login successfully", admin, token })
    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "login failed", error })
    }
}

export const changePassword = async (req, res) => {
    try {
        console.log(req.admin);
        console.log(req.body);

        const { password, newPassword, conformNewPassword } = req.body

        const admin = await adminAuthModel.findById(req.admin.id);
        if (!admin) {
            return res.status(404)
                .json({ success: false, message: "admin not found" })
        }

        const isMatch = await bcrypt.compare(password, admin.password)
        if (!isMatch) {
            return res.status(401)
                .json({ success: false, message: "old password is incorrect" })
        }


        // Password Match Check
        if (newPassword !== conformNewPassword) {
            return res.status(400).json({
                success: false,
                message: "New Password & Confirm Password do not match"
            });
        }

        const hashpassword = await bcrypt.hash(newPassword, 10)
        await adminAuthModel.findByIdAndUpdate(admin._id, { password: hashpassword })

        res.status(200)
            .json({ success: true, message: "password changed successfully" })
    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "password change failed" })
    }
}

export const getalladmindata = async (req, res) => {
    try {
        const finddata = await adminAuthModel.find()
        res.status(200)
            .json({ success: true, message: "data find successfully", total_connt: finddata.length, finddata })
    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "not find data", error })
    }
}