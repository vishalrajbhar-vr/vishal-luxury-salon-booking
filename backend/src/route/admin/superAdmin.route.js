import express from 'express'
import { addSuperAdmin, getAllSuperData, updateSuperdata } from '../../controller/admin/superAdmin.controller.js';
import upload from '../../middleware/uploade.js';

const superRouter = express.Router();
superRouter.post("/add/admin/data", upload.single("image"), addSuperAdmin)
superRouter.get("/get/admin/all/data", getAllSuperData)
superRouter.patch("/update/admin/data/:id",upload.single("image"), updateSuperdata)

export default superRouter