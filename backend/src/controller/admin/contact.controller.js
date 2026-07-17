import contactModel from "../../models/contact.model.js"



// ---------------------------------add contact----------------------------------------
export const addContact = async (req, res) => {
    try {

        const { name, email, phone, service, message } = req.body
        const adddata = await contactModel.create({ name, email, phone, service, message })
        res.status(200)
            .json({ success: true, message: "contact added successfully", adddata })

    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "contact not added" })
    }
}

// ------------------------------------------- get all contact-----------------------------------
export const getAllContact = async (req, res) => {
    try {
        const founddata = await contactModel.find()
        res.status(200)
            .json({ success: true, message: "contact all data fuund", Total_count: founddata.length, founddata })
    }
    catch (error) {
        onsole.log(error)
        res.status(500)
            .json({ success: false, message: "Contact not fount all data" })
    }
}

// ------------------------------------------- get single contact-----------------------------------
export const fetchSingleContact = async (req, res) => {
    try {
        const { id } = req.params
        const singledata = await contactModel.findById(id)
        if (!singledata) {
            res.status(404)
                .json({ success: false, message: "wrong Id" })
        }
        res.status(200)
            .json({ success: true, message: "Contact single data fuund", singledata })
    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "Contact not fount single data" })
    }
}

// ------------------------------------------- update appointment-----------------------------------
// export const updateContact = async (req, res) => {
//     try {
//         const updatedata = await contactModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
//         if (!updatedata) {
//             res.status(404)
//                 .json({ success: false, message: "wrong Id" })
//         }
//         res.status(200)
//             .json({ success: true, message: "contact updated successfully", updatedata })
//     }
//     catch (error) {
//         console.log(error)
//         res.status(500)
//             .json({ success: false, message: "Contact not updated" })
//     }
// }

// ------------------------------------------- delete appointment-----------------------------------
export const deletecontact = async (req, res) => {
    try {
        const deletedata = await contactModel.findByIdAndDelete(req.params.id)
        if (!deletedata) {
            res.status(404)
                .json({ success: false, message: "wrong Id" })
        }
        res.status(200)
            .json({ success: true, message: "contact deleted successfully"})
    }
    catch (error) {
        console.log(error)
        res.status(500)
            .json({ success: false, message: "contact not deleted" })
    }
}