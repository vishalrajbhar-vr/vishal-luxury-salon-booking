import express from 'express'
import { addContact, deletecontact, fetchSingleContact, getAllContact } from '../../controller/admin/contact.controller.js'

const contactRouter = express.Router()

contactRouter.post("/add/contact", addContact)
contactRouter.get("/get/all/contact", getAllContact)
contactRouter.get("/get/single/contact/:id", fetchSingleContact)
contactRouter.delete("/delete/contact/:id", deletecontact)

export default contactRouter