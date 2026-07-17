import uploadToCloudinary from "../../config/cloudinary.js"
import testemonialModel from "../../models/testemonial..model.js"

export const addtestemonial = async (req, res) => {
    try {
        const { name, profession, description } = req.body

        if (!req.file) {
            return res.status(400)
                .json({ success: false, message: "testemonial image is required" });
        }

        const result = await uploadToCloudinary(req.file.buffer, { folder: 'testemonial_data/testemonial' })

        const image_cloud = result.url

        const adddata = await testemonialModel.create({ name, profession, description, image: image_cloud })
        res.status(200)
            .json({ success: true, message: "testemonial added successfully", adddata })
    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "testemonial not add" })
    }
}

export const getAlltestemonial = async (req, res) => {
    try {
        const getdata = await testemonialModel.find()
        res.status(200)
            .json({ success: true, message: "testemonial find successfully", Total_count: getdata.length, getdata })

    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "testemonial not find" })
    }
}

export const deletetestemonial = async (req, res) => {
    try {
        const { id } = req.params
        const deletedata = await testemonialModel.findByIdAndDelete(id)

        if (!deletedata) {
            res.status(404)
                .json({ success: false, message: "deleted Id is wrong" })
        }

        res.status(200)
            .json({ success: true, message: "testemonial deleted successfully", deletedata })

    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "testemonial not deleted" })
    }
}

export const fetchtestemonial = async (req, res) => {
    try {
        const { id } = req.params
        const fetchdata = await testemonialModel.findById(id)

        if (!fetchdata) {
            res.status(404)
                .json({ success: false, message: "Id is wrong" })
        }
        res.status(200)
            .json({ success: true, message: "testemonial find successfully", fetchdata })

    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "testemonial not find" })
    }
}

export const updatetestemonial = async (req, res) => {
    try {
        const { id } = req.params
        const { name, profession, description } = req.body

        const testemonial = await testemonialModel.findById(id)

        if (!testemonial) {
            return res.status(404).json({
                success: false,
                message: "Testimonial not found",
            });
        }

        // Purani image rakho
        let cloud_image = testemonial.image;

        // Agar nayi image aayi hai tabhi upload karo
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, {
                folder: "testemonial_data/testemonial",
            });

            cloud_image = result.url;
        }
        const fetchdata = await testemonialModel.findByIdAndUpdate(id, { name, profession, description, image: cloud_image }, { new: true })
        res.status(200)
            .json({ success: true, message: "testemonial find successfully", fetchdata })

    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "testemonial not find" })
    }
}