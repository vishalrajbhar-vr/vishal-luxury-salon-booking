import { FaStar, FaQuoteRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { useEffect, useState } from "react";
import { gettestemonial } from "../../../service/testemonial.js";

function Testimonial() {
  const [testimonial, setTestimonial] = useState([]);

  const getAlltestemonial = async () => {
    try {
      const response = await gettestemonial();

      console.log(response.data);

      setTestimonial(response.data.getdata || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAlltestemonial();

    const interval = setInterval(() => {
    getAlltestemonial();
  }, 1000);

  return () => clearInterval(interval);

  }, []);

  return (
    <section className="relative overflow-hidden bg-black py-24">
      {/* Glow */}
      <div className="absolute left-0 top-0 h-96 w-96 bg-red-600/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 bg-red-600/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5">
        {/* Heading */}
        <div className="mb-16 text-center">
          <span className="font-semibold uppercase tracking-[4px] text-red-500">
            Testimonials
          </span>

          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            What Our Clients Say
          </h2>

          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-red-600"></div>

          <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
            Trusted by thousands of satisfied clients who choose our salon for
            premium grooming and styling.
          </p>
        </div>

        {testimonial.length > 0 ? (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {testimonial.map((item) => (
              <SwiperSlide key={item._id}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-lg transition-all duration-500 hover:-translate-y-3 hover:border-red-600">
                  {/* Quote */}
                  <div className="absolute right-6 top-6 text-5xl text-red-600 opacity-20">
                    <FaQuoteRight />
                  </div>

                  {/* Glow */}
                  <div className="absolute -right-20 -top-20 h-40 w-40 bg-red-600/20 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100"></div>

                  {/* Stars */}
                  <div className="mb-5 flex gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>

                  {/* Description */}
                  <p className="leading-8 text-zinc-300">
                    "{item.description}"
                  </p>

                  {/* User */}
                  <div className="mt-8 flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-full border-2 border-red-600 object-cover"
                    />

                    <div>
                      <h4 className="text-lg font-bold text-white">
                        {item.name}
                      </h4>

                      <p className="text-sm text-zinc-400">
                        {item.profession}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="py-20 text-center text-zinc-400">
            No testimonials available.
          </div>
        )}
      </div>
    </section>
  );
}

export default Testimonial;