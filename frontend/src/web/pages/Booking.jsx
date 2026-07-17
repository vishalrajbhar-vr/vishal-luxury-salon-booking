import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaPhoneAlt,
  FaCut,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { bookappointment } from "../../service/appointment";
import { getAllService } from "../../service/sevvise";
import { toast } from "react-toastify";

function Booking() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [services, setServices] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(0);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getAllService();
        setServices(response.data.getdata);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const handleServiceChange = (e) => {
    const serviceName = e.target.value;
    setService(serviceName);
    const found = services.find((s) => s.service_name === serviceName);
    setSelectedPrice(found ? found.price : 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first to book an appointment.");
      return;
    }

    const formData = {
      name,
      email,
      phone,
      service,
      price: selectedPrice,
      date,
      time,
      notes,
    };

    try {
      const response = await bookappointment(formData);
      console.log(response);
      toast.success("Appointment booked successfully!");

      setName("");
      setEmail("");
      setPhone("");
      setService("");
      setDate("");
      setTime("");
      setNotes("");
      setSelectedPrice(0);
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Failed to book appointment.");
    }
  };
  return (
    <>
      <Navbar />

      <section className="bg-black py-16 text-white sm:py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Heading */}

          <div className="mb-10 text-center sm:mb-16">

            <span className="text-sm font-semibold uppercase tracking-[4px] text-red-500 sm:text-base">
              Appointment
            </span>

            <h1 className="mt-4 text-4xl font-bold sm:text-5xl md:text-6xl">
              Book Your Appointment
            </h1>

            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-red-600"></div>

            <p className="mx-auto mt-6 max-w-2xl text-sm text-zinc-400 sm:text-base">
              Schedule your visit with our professional stylists
              and enjoy premium grooming services.
            </p>

          </div>

          <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">

            {/* Left Side */}

            <div className="space-y-6">

              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-red-600 transition">

                <FaCut className="text-red-600 text-3xl mb-4" />

                <h3 className="text-2xl font-bold">
                  Premium Services
                </h3>

                <p className="text-zinc-400 mt-3">
                  Haircut, Beard Styling, Facial,
                  Hair Spa and Grooming.
                </p>

              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-red-600 transition">

                <FaCalendarAlt className="text-red-600 text-3xl mb-4" />

                <h3 className="text-2xl font-bold">
                  Easy Scheduling
                </h3>

                <p className="text-zinc-400 mt-3">
                  Choose your preferred date and
                  time slot instantly.
                </p>

              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-red-600 transition">

                <FaClock className="text-red-600 text-3xl mb-4" />

                <h3 className="text-2xl font-bold">
                  Open Daily
                </h3>

                <p className="text-zinc-400 mt-3">
                  Mon - Sun | 9:00 AM - 9:00 PM
                </p>

              </div>

            </div>

            {/* Form */}

            <div className="lg:col-span-2">

              <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-red-600 sm:p-8 md:p-10">

                <h2 className="mb-6 text-2xl font-bold sm:text-3xl sm:mb-8">
                  Appointment Details
                </h2>

                <form className="grid gap-4 md:grid-cols-2 md:gap-5"
                  onSubmit={handleSubmit}>

                  <div className="relative">
                    <FaUser className="absolute left-4 top-5 text-red-500" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full bg-black border border-zinc-700 rounded-xl pl-12 p-4 outline-none focus:border-red-600"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="relative">
                    <FaPhoneAlt className="absolute left-4 top-5 text-red-500" />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full bg-black border border-zinc-700 rounded-xl pl-12 p-4 outline-none focus:border-red-600"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-black border border-zinc-700 rounded-xl p-4 outline-none focus:border-red-600"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <select
                    className="w-full bg-black border border-zinc-700 rounded-xl p-4 outline-none focus:border-red-600"
                    value={service}
                    onChange={handleServiceChange}
                  >
                    <option value="">Select Service</option>
                    {services.map((s) => (
                      <option key={s._id} value={s.service_name}>
                        {s.service_name} - ₹{s.price}
                      </option>
                    ))}
                  </select>

                  {selectedPrice > 0 && (
                    <div className="md:col-span-2 bg-zinc-800 border border-red-600 rounded-xl p-4 flex justify-between items-center">
                      <span className="text-zinc-400 text-sm">Selected Service Price</span>
                      <span className="text-2xl font-bold text-green-500">₹{selectedPrice}</span>
                    </div>
                  )}

                  <input
                    type="date"
                    className="w-full bg-black border border-zinc-700 rounded-xl p-4 outline-none focus:border-red-600"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />

                  <input
                    type="time"
                    className="w-full bg-black border border-zinc-700 rounded-xl p-4 outline-none focus:border-red-600"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />

                  <textarea
                    rows="5"
                    placeholder="Additional Notes"
                    className="w-full resize-none rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-red-600 md:col-span-2"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>

                  <button
                    type="submit"
                    className="rounded-xl bg-red-600 py-4 text-lg font-semibold transition-all duration-300 hover:bg-red-700 md:col-span-2"

                  >
                    Book Appointment
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Booking;
