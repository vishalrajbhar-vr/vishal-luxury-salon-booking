import { uploadToCloudinary } from "../../config/cloudinary.js"
import galleryModel from "../../models/gallery.model.js"

export const addGallery = async (req, res) => {
    try {
        const { image_title, category, description } = req.body

        if (!req.file) {
            return res.status(400)
                .json({ success: false, message: "Product image is required" });
        }

        const result = await uploadToCloudinary(req.file.buffer, { folder: 'salon_gallery/gallery' });
        const cloud_image = result.url

        const adddata = await galleryModel.create({ image_title, category, description, image: cloud_image })
        res.status(200)
            .json({ success: true, message: "gallery added successfully", adddata })
    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "gallery not added" })
    }
}

export const getGallery = async (req, res) => {
    try {

        const getdata = await galleryModel.find()
        res.status(200)
            .json({ success: true, message: "find all gallery data successfully", Total_count: getdata.length, getdata })
    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "gallery data not added" })
    }
}

export const fetchSingleGallery = async (req, res) => {
    try {
        const { id } = req.params
        const fetchdata = await galleryModel.findById(id)

        if (!fetchdata) {
            res.status(404)
                .json({ success: false, message: "wrong id....." })
        }

        res.status(200)
            .json({ success: true, message: "fetch single gallery data successfully", fetchdata })
    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "gallery data not fetch" })
    }
}


export const updateGallery = async (req, res) => {
    try {
        const updatadata = await galleryModel.findById(req.params.id)
        if (!updatadata) {
            res.status(404)
                .json({ success: false, message: "wrong id....." })
        }
        let image_cloud = updatadata.image;

        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, {
                folder: "salon_gallery/gallery",
            });

            image_cloud = result.url;
        }

        const updatedata = await galleryModel.findByIdAndUpdate(req.params.id,
            {
                image_title: req.body.image_title,
                category: req.body.category,
                description: req.body.description,
                image: image_cloud,
            }, { new: true })

        res.status(200)
            .json({ success: true, message: "update gallery data successfully", updatedata })
    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "gallery data not update" })
    }
}

export const deleteGallery = async (req, res) => {
    try {
        const { id } = req.params
        const deletedata = await galleryModel.findByIdAndDelete(id)

        if (!deletedata) {
            res.status(404)
                .json({ success: false, message: "wrong id....." })
        }

        res.status(200)
            .json({ success: true, message: "delete gallery data successfully", deletedata })
    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "gallery data not delete" })
    }
}