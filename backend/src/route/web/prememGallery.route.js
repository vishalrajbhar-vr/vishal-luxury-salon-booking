import express from 'express'
import { addprememGallery, deletePrememGallery, fetchPrememGallery, getprememGallery, updateprememGallery } from '../../controller/web/prememGallery.controtter.js'
import upload from '../../middleware/uploade.js'

const prememGalleryRouter = express.Router()

prememGalleryRouter.post("/prememGallery/add", upload.single("image"),addprememGallery)
prememGalleryRouter.get("/prememGallery/get", getprememGallery)
prememGalleryRouter.patch("/prememGallery/update/:id",upload.single("image"), updateprememGallery)
prememGalleryRouter.delete("/prememGallery/delete/:id", deletePrememGallery)
prememGalleryRouter.get("/prememGallery/fetch/:id", fetchPrememGallery)

export default prememGalleryRouter