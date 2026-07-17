import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCut,
  FaCalendarAlt,
  FaImages,
  FaChevronDown,
  FaChevronRight,
  FaPlus,
  FaEdit,
  FaImage,
  FaStar,
  FaCommentDots,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function AdminSidebar({ activePage, setActivePage }) {
  const [serviceOpen, setServiceOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [testimonialOpen, setTestimonialOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <aside className="w-72 bg-zinc-950 border-r border-zinc-800 min-h-screen p-6">

      <h1 className="text-3xl font-bold text-red-600 mb-10">
        Salon Admin
      </h1>

      <div className="space-y-3">

        {/* Dashboard */}
        <button
          onClick={() => setActivePage("dashboard")}
          className={`w-full flex items-center gap-3 p-4 rounded-xl transition ${activePage === "dashboard"
            ? "bg-red-600"
            : "bg-zinc-900 hover:bg-zinc-800"
            }`}
        >
          <FaTachometerAlt />
          Dashboard
        </button>

        {/* Services */}
        <div>
          <button
            onClick={() => setServiceOpen(!serviceOpen)}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition"
          >
            <div className="flex items-center gap-3">
              <FaCut />
              Services
            </div>
            {serviceOpen ? <FaChevronDown /> : <FaChevronRight />}
          </button>
          {serviceOpen && (
            <div className="ml-6 mt-2 space-y-2">
              <button
                onClick={() => setActivePage("addService")}
                className={`w-full text-left flex items-center gap-3 p-3 rounded-lg ${activePage === "addService" ? "bg-red-600" : "bg-zinc-900 hover:bg-zinc-800"}`}
              >
                <FaPlus />
                Add Service
              </button>
              <button
                onClick={() => setActivePage("allService")}
                className={`w-full text-left flex items-center gap-3 p-3 rounded-lg ${activePage === "allService" ? "bg-red-600" : "bg-zinc-900 hover:bg-zinc-800"}`}
              >
                <FaEdit />
                All Service
              </button>
            </div>
          )}
        </div>

        {/* Appointments */}
        <button
          onClick={() => setActivePage("appointments")}
          className={`w-full flex items-center gap-3 p-4 rounded-xl transition ${activePage === "appointments"
            ? "bg-red-600"
            : "bg-zinc-900 hover:bg-zinc-800"
            }`}
        >
          <FaCalendarAlt />
          Appointments
        </button>

        {/* Gallery */}
        <div>
          <button
            onClick={() => setGalleryOpen(!galleryOpen)}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition"
          >
            <div className="flex items-center gap-3">
              <FaImages />
              Gallery
            </div>
            {galleryOpen ? <FaChevronDown /> : <FaChevronRight />}
          </button>
          {galleryOpen && (
            <div className="ml-6 mt-2 space-y-2">
              <button
                onClick={() => setActivePage("addGallery")}
                className={`w-full text-left flex items-center gap-3 p-3 rounded-lg ${activePage === "addGallery" ? "bg-red-600" : "bg-zinc-900 hover:bg-zinc-800"}`}
              >
                <FaPlus />
                Add Gallery
              </button>
              <button
                onClick={() => setActivePage("allGallery")}
                className={`w-full text-left flex items-center gap-3 p-3 rounded-lg ${activePage === "allGallery" ? "bg-red-600" : "bg-zinc-900 hover:bg-zinc-800"}`}
              >
                <FaImage />
                All Gallery
              </button>
              <button
                onClick={() => setActivePage("addPremiumGallery")}
                className={`w-full text-left flex items-center gap-3 p-3 rounded-lg ${activePage === "addPremiumGallery" ? "bg-red-600" : "bg-zinc-900 hover:bg-zinc-800"}`}
              >
                <FaPlus />
                Add Premium Gallery
              </button>
              <button
                onClick={() => setActivePage("allPremiumGallery")}
                className={`w-full text-left flex items-center gap-3 p-3 rounded-lg ${activePage === "allPremiumGallery" ? "bg-red-600" : "bg-zinc-900 hover:bg-zinc-800"}`}
              >
                <FaStar />
                All Premium Gallery
              </button>
            </div>
          )}
        </div>

        {/* Testimonial */}
        <div>
          <button
            onClick={() => setTestimonialOpen(!testimonialOpen)}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition"
          >
            <div className="flex items-center gap-3">
              <FaCommentDots />
              Testimonial
            </div>
            {testimonialOpen ? <FaChevronDown /> : <FaChevronRight />}
          </button>
          {testimonialOpen && (
            <div className="ml-6 mt-2 space-y-2">
              <button
                onClick={() => setActivePage("addTestimonial")}
                className={`w-full text-left flex items-center gap-3 p-3 rounded-lg ${activePage === "addTestimonial" ? "bg-red-600" : "bg-zinc-900 hover:bg-zinc-800"}`}
              >
                <FaPlus />
                Add Testimonial
              </button>
              <button
                onClick={() => setActivePage("allTestimonial")}
                className={`w-full text-left flex items-center gap-3 p-3 rounded-lg ${activePage === "allTestimonial" ? "bg-red-600" : "bg-zinc-900 hover:bg-zinc-800"}`}
              >
                <FaEdit />
                All Testimonial
              </button>
            </div>
          )}
        </div>

        {/* Contact */}
        <button
          onClick={() => setActivePage("allcontact")}
          className={`w-full flex items-center gap-3 p-4 rounded-xl transition ${activePage === "allcontact"
            ? "bg-red-600"
            : "bg-zinc-900 hover:bg-zinc-800"
            }`}
        >
          <FaCalendarAlt />
          Contact
        </button>


        {/* Settings */}
        <div className="absolute bottom-0 left-0 w-full p-4">
          <div className="w-full border-1 text-zinc-600"></div>
          <div className=" mt-5">
            <button
              onClick={() => setActivePage("Setting")}
              className={`w-full flex items-center gap-3 p-4 rounded-xl transition ${activePage === "Setting"
                ? "bg-red-600"
                : "bg-zinc-900 hover:bg-zinc-800"
                }`}
            >
              <FaCog />
              Setting
            </button>
          </div>
        </div>
      </div>

    </aside>
  );
}

export default AdminSidebar;