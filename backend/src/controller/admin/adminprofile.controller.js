import uploadToCloudinary from "../../config/cloudinary.js"
import adminprofiletModel from "../../models/adminprofile.model.js"

export const addprofile = async (req, res) => {
    try {

        const { name } = req.body

        const result = await uploadToCloudinary(req.file.buffer, { folder: "profile_cloud/adminprofile" })
        const cloud_image = result.url

        const adddata = await adminprofiletModel.create({ name, image: cloud_image, })
        res.status(200)
            .json({ success: true, message: "profile add successfull", adddata })

    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "profile error" })
    }
}

export const getAllprofile = async (req, res) => {
    try {
        const getdata = await adminprofiletModel.find();
        res.status(200)
            .json({ success: true, message: "find data succcessfull", total_count: getdata.length, getdata })
    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "profile get error" })
    }
}

export const fetchprofile = async (req, res) => {
    try {
        const { id } = req.params
        const fetchdata = await adminprofiletModel.findById(id)

        if (!fetchdata) {
            res.status(404)
                .json({ success: false, message: "wrong id" })
        }

        res.status(200)
            .json({ success: true, message: "profile fetch successfully", fetchdata })

    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "profile fetch error" })
    }
}

export const updateprofile = async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body
        const finddata = await adminprofiletModel.findById(id)

        if (!finddata) {
            res.status(404)
                .json({ success: false, message: "profile id wrong" })
        }
        const urlimage = finddata.image

        const result = await uploadToCloudinary(req.file.buffer, { folder: "profile_cloud/adminprofile" })
        const cloud_image = result.url

        const updatedata = await adminprofiletModel.findByIdAndUpdate(id, { name, image:cloud_image }, { new: true })
        res.status(200)
            .json({ success: true, message: "profile updating successfully",updatedata })

    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "profile updating error" })
    }
}