import express from "express";
import cors from "cors";
import passport from "passport";
import "./config/passport.js"

import galleryRouter from "./route/admin/gallery.route.js";
import appointmentRouter from "./route/admin/appointment.route.js";
import serviceRouter from "./route/admin/service.route.js";
import contactRouter from "./route/admin/contact.route.js";
import webRouter from "./route/web/web.route.js";
import testemonialRouter from "./route/admin/testemonial.route.js";
import prememGalleryRouter from "./route/web/prememGallery.route.js";
import adminAuthModelRouter from "./route/admin/adminAuth.route.js";
import superRouter from "./route/admin/superAdmin.route.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use("/admin/service/api", serviceRouter);
app.use("/admin/gallery/api", galleryRouter);
app.use("/admin/appointment/api", appointmentRouter);
app.use("/admin/contact/api", contactRouter);
app.use("/web/register/api", webRouter);
app.use("/admin/testimonial/api", testemonialRouter);
app.use("/web/prememGallery/api", prememGalleryRouter);
app.use("/admin/auth/api", adminAuthModelRouter)
app.use("/super/admin/api", superRouter)


export default app;