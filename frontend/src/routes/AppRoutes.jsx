import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Home from "../web/pages/Home";
import Contact from "../web/pages/Contact";
import Services from "../web/pages/Services";
import Booking from "../web/pages/Booking";
import Gallery from "../web/pages/Gallery";

import Login from "../web/pages/acount/Login";
import SignUp from "../web/pages/acount/SignUp";
import Logout from "../web/pages/acount/Logout";
import ForgotPassword from "../web/pages/acount/ForgotPassword";
import VerifyOtp from "../web/pages/acount/VerifyOtp";
import ResetPassword from "../web/pages/acount/ResetPassword";
import Profile from "../web/pages/acount/Profile";
import MyAppointments from "../web/pages/acount/MyAppointments";
import ChangePassword from "../web/pages/acount/ChangePassword";

import ScrollToTopButton from "../web/components/ScrollToTopButton";
import AdminLayout from "../layouts/AdminLayout";
import AdminLogin from "../admin/components/AdminLogin";


// hair cut gallery-------------------
import HairCutGallery from "../web/pages/galleryHairStyles/HairCutGallery";
import HairStyleGallery from "../web/pages/galleryHairStyles/HairStyleGallery";
import ShavingGallery from "../web/pages/galleryHairStyles/ShavingGallery";


// errror page-------------------------
import Error404 from "../web/pages/Error404";
import GoogleSuccess from "../web/pages/acount/GoogleSuccess";
import PaymentSuccess from "../web/pages/PaymentSuccess";



function AppRoutes() {
  return (
    <BrowserRouter>
      <RoutesWrapper />
    </BrowserRouter>
  );
}

function RoutesWrapper() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <>
      <Routes>
        {/* Website */}

        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/myprofile" element={<Profile />} />
        <Route path="/myappointments" element={<MyAppointments />} />
        <Route path="/changepassword" element={<ChangePassword />} />

        <Route path="/hair-cut-gallery" element={<HairCutGallery />} />
        <Route path="/hair-style-gallery" element={<HairStyleGallery />} />
        <Route path="/shaving-gallery" element={<ShavingGallery />} />

         <Route path="/Payment-success" element={<PaymentSuccess />} />

        {/* Admin */}

        <Route path="/adminLayout" element={<AdminLayout />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/google-success"
          element={<GoogleSuccess />}
        />

        <Route path="*" element={<Error404 />} />


      </Routes>

      {!location.pathname.startsWith("/admin") && (
        <ScrollToTopButton />
      )}
    </>
  );
}

export default AppRoutes;