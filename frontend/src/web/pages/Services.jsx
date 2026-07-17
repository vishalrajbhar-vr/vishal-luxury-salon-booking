import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getAllService } from "../../service/sevvise";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Services() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  const uploadservices = async () => {
    try {
      const response = await getAllService();
      setServices(response.data.getdata);

      console.log(response.data.getdata[0]);

      uploadservices();
    }
    catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    uploadservices();
  }, []);

  return (
    <>
      <Navbar />

      <section className="bg-black text-white py-16 sm:py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="text-center">

            <span className="text-sm font-semibold uppercase tracking-[4px] text-red-500 sm:text-base">
              Our Services
            </span>

            <h1 className="mt-4 text-4xl font-bold sm:text-5xl md:text-6xl">
              Premium Salon Services
            </h1>

            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-red-600"></div>

            <p className="mx-auto mt-6 max-w-3xl text-sm text-zinc-400 sm:text-base">
              Discover our complete range of grooming,
              beauty and wellness services crafted for
              modern lifestyles.
            </p>

          </div>

          {/* Service Sections */}

          <div className="mt-24 space-y-32">

            {services.map((service, index) => (
              <section
                key={service.id}
                id={service.id}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
              >

                {/* Image */}

                <div
                  className={`${index % 2 !== 0
                    ? "lg:order-2"
                    : ""
                    }`}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-[280px] w-full rounded-3xl border border-zinc-800 object-cover sm:h-[360px] lg:h-[500px]"
                  />
                </div>

                {/* Content */}

                <div>

                  <span className="text-sm font-semibold uppercase tracking-[4px] text-red-500 sm:text-base">
                    Premium Service
                  </span>

                  <h2 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
                    {service.service_name}
                  </h2>

                  <h3 className="mt-4 text-xl font-semibold text-red-600 sm:text-2xl">
                    Starting From {service.price}
                  </h3>


                  <p className="mt-6 text-sm leading-8 text-zinc-400 sm:text-base">
                    {service.description}
                  </p>

                  <button
                    onClick={() => navigate("/booking")}
                    className="mt-8 rounded-xl bg-red-600 px-6 py-3 font-semibold transition duration-300 hover:bg-red-700 sm:px-8 sm:py-4"
                  >
                    Book Appointment
                  </button>

                </div>

              </section>
            ))}

          </div>

          {/* CTA */}

          <div className="mt-20 rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-center sm:mt-24 sm:p-12 lg:mt-32">

            <span className="uppercase tracking-[4px] text-red-500 font-semibold">
              Book Today
            </span>

            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Ready For Your New Look?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-sm text-zinc-400 sm:text-base">
              Experience premium grooming and beauty services
              from our professional team. Book your appointment
              today and transform your style.
            </p>

            <button
              onClick={() => navigate("/booking")}
              className="mt-8 rounded-xl bg-red-600 px-8 py-3 font-semibold transition duration-300 hover:bg-red-700 sm:px-10 sm:py-4">
              Book Now
            </button>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Services;