import express from "express";

import { addService, getAllService, featchServiceData, updateServiceData, deleteService, } from "../../controller/admin/serviseController.js";
import upload from "../../middleware/uploade.js";

const serviceRouter = express.Router();

serviceRouter.post("/add/service", upload.single("image"), addService);
serviceRouter.get("/find/data", getAllService);
serviceRouter.get("/fetch/data/:id", featchServiceData);
serviceRouter.patch("/update/data/:id",upload.single("image"), updateServiceData);
serviceRouter.delete("/delete/data/:id", deleteService);
export default serviceRouter;