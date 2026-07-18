import express from 'express'
import { adminlogin, adminregister, changePassword, getalladmindata } from "../../controller/admin/adminAuth.controller.js";
import adminAuth from '../../middleware/adminAuth.js';

const adminAuthModelRouter = express.Router();
adminAuthModelRouter.post("/add/Admin/register", adminregister)
adminAuthModelRouter.post("/add/Admin/login", adminlogin)
adminAuthModelRouter.get("/find/Admin/data", getalladmindata)
adminAuthModelRouter.post("/admin/change-password/:id", adminAuth, changePassword);

export default adminAuthModelRouter;