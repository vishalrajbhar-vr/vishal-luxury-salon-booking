import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import { sendMessage } from "../../service/contact";
import { useState } from "react";
import { toast } from "react-toastify";

function Contact() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      phone,
      service,
      message,
    };

    try {
      const response = await sendMessage(formData);
      console.log(response);
      toast.success("Message sent successfully!");

      // Clear form fields after successful submission
      setName("");
      setEmail("");
      setPhone("");
      setService("");
      setMessage("");

    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message.");
    }

  };

  return (
    <>
      <Navbar />

      <section className="bg-black py-16 text-white sm:py-20">

        {/* Hero Section */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-10 text-center sm:mb-16">

            <span className="uppercase tracking-[4px] text-red-500 font-semibold">
              Contact Us
            </span>

            <h1 className="mt-4 text-4xl font-bold sm:text-5xl md:text-6xl">
              Get In Touch
            </h1>

            <div className="w-24 h-1 bg-red-600 mx-auto mt-5 rounded-full"></div>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-zinc-400 sm:text-base">
              Have questions or want to book an appointment?
              Contact our team and we'll get back to you as soon as possible.
            </p>

          </div>

          {/* Contact Section */}

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">

            {/* Left Side */}

            <div>

              <h2 className="text-3xl font-bold mb-8">
                Contact Information
              </h2>

              <div className="space-y-6">

                {/* Phone */}

                <div className="flex items-center gap-5 bg-zinc-900 p-6 rounded-2xl border border-zinc-800 hover:border-red-600 transition">

                  <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center text-white text-xl">
                    <FaPhoneAlt />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">
                      Phone Number
                    </h3>

                    <p className="text-zinc-400">
                      +91 9876543210
                    </p>
                  </div>

                </div>

                {/* Email */}

                <div className="flex items-center gap-5 bg-zinc-900 p-6 rounded-2xl border border-zinc-800 hover:border-red-600 transition">

                  <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center text-white text-xl">
                    <FaEnvelope />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">
                      Email Address
                    </h3>

                    <p className="text-zinc-400">
                      salon@gmail.com
                    </p>
                  </div>

                </div>

                {/* Location */}

                <div className="flex items-center gap-5 bg-zinc-900 p-6 rounded-2xl border border-zinc-800 hover:border-red-600 transition">

                  <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center text-white text-xl">
                    <FaMapMarkerAlt />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">
                      Location
                    </h3>

                    <p className="text-zinc-400">
                      Lucknow, Uttar Pradesh
                    </p>
                  </div>

                </div>

                {/* Hours */}

                <div className="flex items-center gap-5 bg-zinc-900 p-6 rounded-2xl border border-zinc-800 hover:border-red-600 transition">

                  <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center text-white text-xl">
                    <FaClock />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">
                      Working Hours
                    </h3>

                    <p className="text-zinc-400">
                      Mon - Sun : 9:00 AM - 9:00 PM
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* Right Side Form */}

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-red-600 sm:p-8">

              <h2 className="text-3xl font-bold mb-8">
                Send Message
              </h2>

              <form className="space-y-5"
                onSubmit={handleSubmit}
              >

                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-red-600"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-red-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-red-600"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Service"
                  className="w-full rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-red-600"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                />

                <textarea
                  rows="6"
                  placeholder="Your Message"
                  className="w-full resize-none rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-red-600"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-red-600 py-4 font-semibold transition-all duration-300 hover:bg-red-700"
                >
                  Send Message
                </button>

              </form>

            </div>

          </div>

          {/* Map Section */}

          <div className="mt-24">

            <div className="text-center mb-10">

              <span className="uppercase tracking-[4px] text-red-500 font-semibold">
                Find Us
              </span>

              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                Visit Our Salon
              </h2>

              <div className="w-24 h-1 bg-red-600 mx-auto mt-5 rounded-full"></div>

              <p className="text-zinc-400 mt-6 max-w-2xl mx-auto">
                Visit our salon and enjoy premium grooming,
                hairstyling and beauty services.
              </p>

            </div>

            {/* Address Bar */}

            <div className="mb-8 flex flex-col items-center justify-between gap-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:flex-row">

              <div>

                <h3 className="text-xl font-bold sm:text-2xl">
                  Luxury Salon & Spa
                </h3>

                <p className="text-zinc-400 mt-2">
                  Lucknow, Uttar Pradesh, India
                </p>

              </div>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-700"
              >
                Get Directions
              </a>

            </div>

            {/* Google Map */}

            <div className="overflow-hidden rounded-3xl border border-zinc-800 hover:border-red-600 transition-all duration-500 shadow-2xl">

              <iframe
                title="Salon Location"
                src="https://www.google.com/maps?q=Lucknow,Uttar%20Pradesh&output=embed"
                className="h-[280px] w-full sm:h-[350px] md:h-[500px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Contact;