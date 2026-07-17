import {
  FaClock,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function MainSection2() {

 const navigate = useNavigate();
  const prices = [
    {
      title: "Hair Cut",
      desc: "Clean & Simple 30-40 Minutes",
      price: "₹ 70",
    },
    {
      title: "Skin Fade",
      desc: "Modern Fade Style",
      price: "₹ 145",
    },
    {
      title: "Buzz Cut",
      desc: "Clipper Cut All Over",
      price: "₹ 99",
    },
    {
      title: "Kids Haircut",
      desc: "Junior Under 14",
      price: "₹ 50",
    },
    {
      title: "Hair Coloring",
      desc: "Premium Color Service",
      price: "₹ 125",
    },
  ];

  const schedule = [
    {
      time: "10:00 AM - 11:00 AM",
      available: true,
    },
    {
      time: "11:00 AM - 12:00 PM",
      available: false,
    },
    {
      time: "01:00 PM - 02:00 PM",
      available: true,
    },
    {
      time: "03:00 PM - 04:00 PM",
      available: false,
    },
  ];

  return (
    <section className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-5">

        <div className="grid lg:grid-cols-2 gap-10">

          {/* ================= PRICE SECTION ================= */}

          <div>

            <span className="text-red-500 uppercase tracking-[4px] font-semibold">
              Pricing
            </span>

            <h2 className="text-4xl font-bold text-white mt-3">
              Our Fair Prices
            </h2>

            <div className="w-20 h-1 bg-red-600 mt-5 rounded-full"></div>

            <div
              className="mt-8 rounded-3xl overflow-hidden relative"
              style={{
                backgroundImage:
                  "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnLxecLy0dosYQ0LGSkhnsZarNkj0GYTged1ezWJhVnvv01OVnc6E1tafA&s=10')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="bg-black/80 p-8">

                {prices.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-5 border-b border-zinc-700"
                  >
                    <div>
                      <h3 className="text-white font-bold text-xl">
                        {item.title}
                      </h3>

                      <p className="text-zinc-400 text-sm mt-1">
                        {item.desc}
                      </p>
                    </div>

                    <h4 className="text-red-500 text-2xl font-bold">
                      {item.price}
                    </h4>
                  </div>
                ))}

                {/* <button className="mt-6 flex items-center gap-3 text-white font-semibold hover:text-red-500 transition">
                  More Prices
                  <FaArrowRight />
                </button> */}

              </div>
            </div>
          </div>

          {/* ================= SCHEDULE SECTION ================= */}

          <div>

            <span className="text-red-500 uppercase tracking-[4px] font-semibold">
              Appointment
            </span>

            <h2 className="text-4xl font-bold text-white mt-3">
              Our Schedule
            </h2>

            <div className="w-20 h-1 bg-red-600 mt-5 rounded-full"></div>

            <div
              className="mt-8 rounded-3xl overflow-hidden"
              style={{
                backgroundImage:
                  "url('https://content.jdmagicbox.com/comp/panchkula/p3/0172px172.x172.190130161821.u9p3/catalogue/bellerizza-panchkula-sector-5-panchkula-beauty-parlours-sa4y3vf4r4-250.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="bg-black/80 p-8">

                <h3 className="text-white font-semibold mb-8">
                  Available Appointments Today
                </h3>

                {schedule.map((slot, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-5 border-b border-zinc-700"
                  >
                    <div>

                      <div className="flex items-center gap-3 text-white">
                        <FaClock className="text-red-500" />

                        <span className="font-medium">
                          {slot.time}
                        </span>
                      </div>

                      <p className="text-zinc-400 text-sm mt-2">
                        5 Slots Available
                      </p>

                    </div>

                    {slot.available ? (
                      <button
                        onClick={() => navigate("/booking")}
                        className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-lg text-white font-medium transition">
                        Book Appointment
                      </button>
                    ) : (
                      <button className="bg-zinc-800 px-5 py-3 rounded-lg text-zinc-400 cursor-not-allowed">
                        Unavailable
                      </button>
                    )}

                  </div>
                ))}

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default MainSection2;