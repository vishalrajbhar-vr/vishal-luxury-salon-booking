// import serviceModel from "../../models/service.model.js"

import uploadToCloudinary from "../../config/cloudinary.js";
import serviceModel from "../../models/service.model.js"

//----------------------------------------------------add service---------------------------------------
export const addService = async (req, res) => {
    try {

        const { service_name, price, duration, description } = req.body;

        if (!req.file) {
            return res.status(400)
                .json({ success: false, message: "service image is required" });
        }

        const result = await uploadToCloudinary(req.file.buffer, { folder: 'salon_service/service' });
        const cloud_image = result.url

        const adddata = await serviceModel.create({ service_name, price, duration, description, image: cloud_image });
        res.status(201)
            .json({ success: true, message: "Service Added Successfully", adddata, });
    }
    catch (error) {
        console.log(error);
        res.status(500)
            .json({ success: false, message: "Service Not Added", });

    }
};
//---------------------------------------------------------get all servise list-----------------------------------
export const getAllService = async (req, res) => {
    try {

        const getdata = await serviceModel.find()
        res.status(200)
            .json({ success: true, message: "data found successfull", Total_count: getdata.length, getdata })

    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "data not found" })

    }
}
// -------------------------------------------------------fetch singl service-------------------------------
export const featchServiceData = async (req, res) => {
    try {
        const { id } = req.params
        const fetchdata = await serviceModel.findById(id)

        if (!fetchdata) {
            res.status(404)
                .json({ success: false, message: "Data Id is wrong" })
        }

        res.status(200)
            .json({ success: true, message: "data fetch successfull", fetchdata })

    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "data not fetch" })

    }
}
//--------------------------------------------------------update service--------------------------------------
export const updateServiceData = async (req, res) => {
    try {
        const { id } = req.params;

        const { service_name, price, duration, description } = req.body;

        let updateData = {
            service_name,
            price,
            duration,
            description,
        };

        // 🔥 IF IMAGE EXISTS THEN UPDATE IT
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer,{ folder: 'salon_service/service' });
            updateData.image = result.url;
        }

        const updated = await serviceModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        res.json({
            success: true,
            message: "Service updated successfully",
            updated,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Update failed",
        });
    }
};

// -------------------------------------------------------delete service---------------------------------
export const deleteService = async (req, res) => {
    try {
        const { id } = req.params
        const deletedata = await serviceModel.findByIdAndDelete(id)

        if (!deletedata) {
            res.status(404)
                .json({ success: false, message: "deleted Id is wrong" })
        }

        res.status(200)
            .json({ success: true, message: "data deleted successfully", })
    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "data not deleted" })
    }
}