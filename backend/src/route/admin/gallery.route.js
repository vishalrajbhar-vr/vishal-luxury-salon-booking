import express from 'express'
import upload from '../../middleware/uploade.js'
import { addGallery, deleteGallery, fetchSingleGallery, getGallery, updateGallery } from '../../controller/admin/gallery.controller.js'

const galleryRouter = express.Router()

//------------------------- gallery routes-----------------------------
galleryRouter.post("/add/gallery",upload.single("image"), addGallery)
galleryRouter.get("/get/all/gallery", getGallery)
galleryRouter.get("/get/single/gallery/:id", fetchSingleGallery)
galleryRouter.patch("/update/gallery/:id", upload.single("image"), updateGallery)
galleryRouter.delete("/delete/gallery/:id", deleteGallery)

export default galleryRouter