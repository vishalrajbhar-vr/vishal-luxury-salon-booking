import express from 'express'
import { addAppointment, deleteAppointment, fetchsingleAppointment, findAllAppointment, getAllAppointment, updateAppointment, updateAppointmentStatus, cashPayment } from '../../controller/admin/appointment.controller.js'
import auth from '../../middleware/auth.js'

const appointmentRouter = express.Router()

//-----------------------------------appointment route--------------------------
appointmentRouter.post("/add/appointment", auth, addAppointment)
appointmentRouter.get("/find/all/appointment", auth, getAllAppointment)
appointmentRouter.get("/find-all/appointment", findAllAppointment)
appointmentRouter.get("/fetch/single/appointment/:id", fetchsingleAppointment)
appointmentRouter.patch("/update/appointment/:id", updateAppointment)
appointmentRouter.delete("/delete/appointment/:id", deleteAppointment)
appointmentRouter.put("/appointment/status/:id", auth, updateAppointmentStatus);
appointmentRouter.put("/appointment/cash-payment/:id", auth, cashPayment);

export default appointmentRouter