import { useEffect, useRef, useState } from "react";
import { getallappointment, createOrder, verifyPayment, cashPayment } from "../../../service/appointment";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { toast } from "react-toastify";

function MyAppointments() {

  const [appointments, setAppointments] = useState([])
  const [paymentDropdown, setPaymentDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setPaymentDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const featchappointments = async () => {
    try {
      const response = await getallappointment();
      console.log(response.data);
      setAppointments(response.data.founddata);
    }
    catch (error) {
      console.error("Error fetching appointments:", error);
    }
  }

  useEffect(() => {
    featchappointments();
    const interval = setInterval(() => {
      featchappointments();
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  const handlePayment = async (item) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first to make payment.");
      return;
    }

    try {
      const response = await createOrder({ amount: item.price, appointmentId: item._id });
      const order = response.data.order;

      const options = {
        key: "rzp_test_TE9q88i83uy2Y8",
        amount: order.amount,
        currency: order.currency,
        name: "Salon Booking",
        description: `Payment for ${item.service}`,
        order_id: order.id,
        handler: async function (response) {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            toast.success("Payment Successful!");
            featchappointments();
          } catch (error) {
            console.error("Payment verification failed:", error);
            toast.error("Payment verification failed!");
          }
        },
        modal: {
          ondismiss: function () {
            toast.info("Payment cancelled.");
          }
        }
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    }
    catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  const handleCashPayment = async (item) => {
    try {
      await cashPayment(item._id);
      toast.success("Cash payment recorded!");
      setPaymentDropdown(null);
      featchappointments();
    } catch (error) {
      console.error("Cash payment error:", error);
      toast.error("Failed to record cash payment!");
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white py-12 px-5">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-6">

            <div>
              <h1 className="text-5xl font-bold">
                My <span className="text-red-600">Appointments</span>
              </h1>

              <p className="text-gray-400 mt-3 text-lg">
                Track your appointments and payment status.
              </p>
            </div>

            <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl px-8 py-5 shadow-xl">
              <p className="text-red-100 text-sm">
                Total Appointments
              </p>

              <h2 className="text-4xl font-bold">
                {appointments.length}
              </h2>
            </div>

          </div>

          <div className="space-y-8">

            {appointments.map((item) => (
              <div
                key={item._id}
                className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black p-7 shadow-xl hover:border-red-500 hover:shadow-red-500/20 transition duration-300"
              >
                {/* Status Section */}
                <div className="grid lg:grid-cols-2 gap-6 mb-8">

                  {/* Appointment Status */}
                  <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-400 text-sm">
                          Appointment Status
                        </p>
                      </div>

                      <div className="text-5xl">
                        <span
                          className={`inline-flex mt-3 px-5 py-2 rounded-full font-bold text-sm
                        ${item.status === "Confirmed"
                              ? "bg-green-600 text-white"
                              : item.status === "Pending"
                                ? "bg-yellow-400 text-black"
                                : "bg-red-600 text-white"
                            }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Section - hide for Cash */}
                  {item.paymentStatus !== "Cash" && (
                    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-gray-400 text-sm">
                            Payment Status
                          </p>

                        </div>
                        <div>
                          <span className={`inline-flex mt-3 px-5 py-2 rounded-full font-bold text-sm
                            ${item.paymentStatus === "Paid"
                              ? "bg-green-600 text-white"
                              : "bg-yellow-500 text-black"
                            }`}
                          >
                            {item.paymentStatus}
                          </span>
                        </div>

                      </div>

                    </div>
                  )}

                </div>

                {/* Appointment Details */}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

                  <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-5 hover:border-red-500 transition">
                    <p className="text-gray-400 text-sm mb-2">
                      Customer Name
                    </p>

                    <h3 className="text-lg font-semibold">
                      {item.name}
                    </h3>
                  </div>

                  <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-5 hover:border-red-500 transition">
                    <p className="text-gray-400 text-sm mb-2">
                      Service
                    </p>

                    <h3 className="text-lg font-semibold">
                      {item.service}
                    </h3>
                  </div>

                  <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-5 hover:border-red-500 transition">
                    <p className="text-gray-400 text-sm mb-2">
                      Price
                    </p>

                    <h3 className="text-lg font-semibold text-green-500">
                      ₹{item.price}
                    </h3>
                  </div>

                  <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-5 hover:border-red-500 transition">
                    <p className="text-gray-400 text-sm mb-2">
                      Phone
                    </p>

                    <h3 className="text-lg font-semibold">
                      {item.phone}
                    </h3>
                  </div>

                  <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-5 hover:border-red-500 transition">
                    <p className="text-gray-400 text-sm mb-2">
                      Appointment Date
                    </p>

                    <h3 className="text-lg font-semibold">
                      {item.date}
                    </h3>
                  </div>

                  <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-5 hover:border-red-500 transition">
                    <p className="text-gray-400 text-sm mb-2">
                      Appointment Time
                    </p>

                    <h3 className="text-lg font-semibold">
                      {item.time}
                    </h3>
                  </div>
                </div>

                {/* Bottom Buttons */}

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-zinc-700">
                  <div className="text-sm text-gray-400">
                    Thank you for choosing our salon ❤️
                  </div>
                  {item.paymentStatus === "Unpaid" && (
                    <div className="relative" ref={dropdownRef}>
                      <button
                        onClick={() =>
                          setPaymentDropdown(
                            paymentDropdown === item._id ? null : item._id
                          )
                        }
                        className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 transition duration-300 font-semibold shadow-lg hover:scale-105"
                      >
                        💳 Pay Now - ₹{item.price}
                      </button>

                      {paymentDropdown === item._id && (
                        <div className="absolute right-0 mt-3 w-44 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden z-50">
                          <button
                            onClick={() => {
                              handlePayment(item);
                              setPaymentDropdown(null);
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-green-600 transition"
                          >
                            💳 Online Payment
                          </button>

                          <button
                            onClick={() => {
                              handleCashPayment(item);
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-yellow-500 hover:text-black transition"
                          >
                            💵 Cash Payment
                          </button>
                        </div>
                      )}

                    </div>
                  )}

                  {item.paymentStatus === "Paid" && (
                    <span className="px-6 py-3 rounded-xl bg-green-600 font-semibold text-white">
                      ✅ Paid - ₹{item.price}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
export default MyAppointments;
