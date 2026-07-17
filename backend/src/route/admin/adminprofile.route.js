import express from 'express'
import { addprofile, fetchprofile, getAllprofile, updateprofile } from '../../controller/admin/adminprofile.controller.js';
import upload from '../../middleware/uploade.js';

const adminprofileRouter = express.Router();

adminprofileRouter.post("/add/profile/data",upload.single("image"), addprofile)
adminprofileRouter.get("/get/profile/data", getAllprofile)
adminprofileRouter.get("/fetch/profile/data/:id", fetchprofile)
adminprofileRouter.patch("/update/profile/data/:id",upload.single("image"), updateprofile)

export default adminprofileRouter;