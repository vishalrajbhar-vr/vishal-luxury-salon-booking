import appointmentModel from "../../models/appointment.model.js"

// ---------------------------------add appointment----------------------------------------
export const addAppointment = async (req, res) => {
    try {

        const {
            name,
            phone,
            email,
            service,
            price,
            date,
            time,
            notes,
        } = req.body;

        const appointment = await appointmentModel.create({
            userId: req.user.id,
            name,
            phone,
            email,
            service,
            price,
            date,
            time,
            notes,
            status: "Pending",
            paymentStatus: "Unpaid"
        });

        return res.status(201).json({
            success: true,
            message: "Appointment Created",
            appointment
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Appointment not created"
        });
    }
};

// ------------------------------------------- get all appointment by token-----------------------------------
export const getAllAppointment = async (req, res) => {
    try {
        const founddata = await appointmentModel.find({ userId: req.user.id })// addd for token  userId: req.user.id
        res.status(200)
            .json({ success: true, message: "Appointment all data fuund", Total_count: founddata.length, founddata })
    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "Appointment not fount all data" })
    }
}

// ------------------------------------------- get single appointment-----------------------------------
export const fetchsingleAppointment = async (req, res) => {
    try {
        const { id } = req.params
        const singledata = await appointmentModel.findById(id)
        if (!singledata) {
            res.status(404)
                .json({ success: false, message: "wrong Id" })
        }
        res.status(200)
            .json({ success: true, message: "Appointment single data fuund", singledata })
    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "Appointment not fount single data" })
    }
}

// ------------------------------------------- update appointment-----------------------------------
export const updateAppointment = async (req, res) => {
    try {
        const updatedata = await appointmentModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedata) {
            res.status(404)
                .json({ success: false, message: "wrong Id" })
        }
        res.status(200)
            .json({ success: true, message: "Appointment updated successfully", updatedata })
    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "Appointment not updated" })
    }
}

// ------------------------------------------- delete appointment-----------------------------------
export const deleteAppointment = async (req, res) => {
    try {
        const deletedata = await appointmentModel.findByIdAndDelete(req.params.id)
        if (!deletedata) {
            res.status(404)
                .json({ success: false, message: "wrong Id" })
        }
        res.status(200)
            .json({ success: true, message: "Appointment deleted successfully", deletedata })
    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "Appointment not deleted" })
    }
}

// ------------------------------------------- get all appointment admin-----------------------------------
export const findAllAppointment = async (req, res) => {
    try {
        const founddata = await appointmentModel.find()// addd for token  userId: req.user.id
        res.status(200)
            .json({ success: true, message: "Appointment all data fuund", Total_count: founddata.length, founddata })
    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "Appointment not fount all data" })
    }
}

// ------------------------------------------appointment Status-------------------------------------------
export const updateAppointmentStatus = async (req, res) => {
    try {

        const { id } = req.params;
        const { status } = req.body;

        await appointmentModel.findByIdAndUpdate(
            id,
            {
                status: status
            },
            {
                new: true
            }
        );

        return res.status(200).json({
            success: true,
            message: "Appointment Status Updated"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Something Went Wrong"
        });

    }
};

// ------------------------------------------cash payment-------------------------------------------
export const cashPayment = async (req, res) => {
    try {
        const { id } = req.params;

        await appointmentModel.findByIdAndUpdate(
            id,
            { paymentStatus: "Cash" },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Cash payment recorded"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something Went Wrong"
        });
    }
};