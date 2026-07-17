import uploadToCloudinary from "../../config/cloudinary.js"
import supeAdminModel from "../../models/adminsettingProfile.model.js"

export const addSuperAdmin = async (req, res) => {
    try {
        const { name, phone,} = req.body
        if (!req.file) {
            res.status(400)
                .json({ success: false, message: "image is required" })
        }

        const result = await uploadToCloudinary(req.file.buffer, { folder: 'super_admin_Data/superadmin' })
        const superImage = result.url

        const adddata = await supeAdminModel.create({ name, phone, image: superImage })
        res.status(200)
            .json({ success: true, message: "adding successfull", adddata })
    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "adding failed" })
    }
}

export const getAllSuperData = async (req, res) => {
    try {
        const getdata = await supeAdminModel.find();
        res.status(200)
            .json({ success: true, message: "find all data successfully", total_count: getdata.length, getdata })
    }
    catch (error) {
        console.log(error)
            .json({ success: false, message: "not find all data" })
    }
}

export const updateSuperdata = async (req, res) => {
    try {

        const { name,  phone, } = req.body
        const { id } = req.params

        const finddata = await supeAdminModel.findById(id)
        if (!finddata) {
            res.status(401)
                .json({ success: false, message: "wrong id" })
        }

        if (!req.file) {
            res.status(404)
                .json({ success: false, message: "image is required" })
        }

        const result = await uploadToCloudinary(req.file.buffer, { folder: 'super_admin_Data/superadmin' });
        const cloud_image = result.url

        const updatedata = await supeAdminModel.findByIdAndUpdate(id, { name, phone, image: cloud_image }, { new: true })
        if (!updatedata) {
            res.status(404)
                .json({ success: false, message: "data not updated" })
        }

        res.status(200)
            .json({ success: true, message: "data updated successfully", updatedata })

    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "not updated" })

    }
}