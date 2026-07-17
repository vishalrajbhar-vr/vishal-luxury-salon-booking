import uploadToCloudinary from "../../config/cloudinary.js";
import prememGalleryModel from "../../models/premem.gallery.js";


export const addprememGallery = async (req, res) => {
    try {

        const { name, paragraph } = req.body;

        if (!req.file) {
            return res.status(400)
                .json({ success: false, message: "gallery image is required" });
        }

        const result = await uploadToCloudinary(req.file.buffer, { folder: 'salon_prememGallery/prememGallery' });
        const cloud_image = result.url

        const adddata = await prememGalleryModel.create({ name, paragraph, image: cloud_image });

        res.status(201).json({
            success: true, message: "prememGallery created successfully", adddata
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "prememGallery create failed" });

    }
};

export const getprememGallery = async (req, res) => {
    try {

        const finddata = await prememGalleryModel.find();
        res.status(201).json({
            success: true, message: "prememGallery find", total_count: finddata.length, finddata
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "prememGallery failed" });

    }
};

export const deletePrememGallery = async (req, res) => {
    try {
        const { id } = req.params
        const deleteddata = await prememGalleryModel.findByIdAndDelete(id);
        res.status(201)
            .json({ success: true, message: "prememGallery delete" });

    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ success: false, message: "deleted failed" });
    }
};

export const updateprememGallery = async (req, res) => {
    try {
        const { name, paragraph } = req.body
        const { id } = req.params

        let updateData = {
            name,
            paragraph,
        };

        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, { folder: 'salon_prememGallery/prememGallery' });
            updateData.image = result.url;
        }

        const updated = await prememGalleryModel.findByIdAndUpdate(id, updateData, { new: true });

        res.status(201).json({
            success: true, message: "prememGallery update", updated,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "update failed" });

    }
};

export const fetchPrememGallery = async (req, res) => {
    try {
        const { id } = req.params
        const fetchddata = await prememGalleryModel.findById(id);
        res.status(201)
            .json({ success: true, message: "prememGallery fetch", fetchddata });

    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ success: false, message: "fetch failed" });
    }
};