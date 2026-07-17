import express from "express";
import { addtestemonial, deletetestemonial, fetchtestemonial, getAlltestemonial, updatetestemonial } from "../../controller/admin/testemonial.controller.js";
import upload from "../../middleware/uploade.js";


const testemonialRouter = express.Router()
testemonialRouter.post("/add/testemonial", upload.single("image"), addtestemonial);
testemonialRouter.get("/get/all/testemonial", getAlltestemonial);
testemonialRouter.delete("/delete/testemonial/:id", deletetestemonial);
testemonialRouter.get("/fetch/testemonial/:id", fetchtestemonial);
testemonialRouter.patch("/update/testemonial/:id",upload.single("image"), updatetestemonial);

export default testemonialRouter;