import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaHome, FaCalendarAlt } from "react-icons/fa";

function PaymentSuccess() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black flex items-center justify-center px-5">

      <div className="w-full max-w-2xl bg-zinc-900 border border-green-500 rounded-3xl shadow-2xl p-10 text-center">

        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-28 h-28 rounded-full bg-green-600 flex items-center justify-center shadow-lg shadow-green-500/40">
            <FaCheckCircle className="text-white text-6xl" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-bold text-white mt-8">
          Payment <span className="text-green-500">Successful!</span>
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          Thank you for your payment.
          <br />
          Your salon appointment has been confirmed successfully.
        </p>

        {/* Info Card */}
        <div className="mt-10 bg-zinc-800 border border-zinc-700 rounded-2xl p-6 text-left">

          <div className="flex justify-between py-3 border-b border-zinc-700">
            <span className="text-gray-400">Status</span>
            <span className="text-green-500 font-semibold">
              Paid
            </span>
          </div>

          <div className="flex justify-between py-3 border-b border-zinc-700">
            <span className="text-gray-400">Payment Method</span>
            <span className="text-white">
              Razorpay
            </span>
          </div>

          <div className="flex justify-between py-3">
            <span className="text-gray-400">Booking</span>
            <span className="text-white">
              Confirmed
            </span>
          </div>

        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-5 justify-center mt-10">

          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-semibold transition duration-300"
          >
            <FaHome />
            Go Home
          </Link>

          <Link
            to="/myappointments"
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-8 py-4 rounded-xl font-semibold transition duration-300"
          >
            <FaCalendarAlt />
            My Appointments
          </Link>

        </div>

      </div>

    </section>
  );
}

export default PaymentSuccess;