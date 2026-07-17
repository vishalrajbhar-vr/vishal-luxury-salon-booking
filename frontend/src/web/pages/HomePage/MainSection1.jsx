import React from "react";
import { Link } from "react-router-dom";
import {
  Scissors,
  UserRound,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

function MainSection1() {
  const services = [
    {
      icon: <Scissors size={35} />,
      title: "Haircut Style",
      desc: "Professional haircut services with modern styling and premium finishing.",
      link: "/hair-cut-gallery",
    },
    {
      icon: <BadgeCheck size={35} />,
      title: "Shaving Style",
      desc: "Luxury beard grooming and shaving services for a clean and stylish look.",
      link: "/shaving-gallery",
    },
    {
      icon: <UserRound size={35} />,
      title: "Hair Style",
      desc: "Trendy hair styling services crafted by experienced salon professionals.",
      link: "/hair-style-gallery",
    },
  ];

  return (
    <section className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Image */}
          <div className="overflow-hidden rounded-3xl">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxBHIR-m9kNb8BngztAbgYI2YfN9-yTq_ocfEl_z4R4Bh5OKKaYAFO259B&s=10"
              alt="Salon"
              className="w-full h-[650px] object-cover hover:scale-105 transition duration-700"
            />
          </div>

          {/* Right Content */}
          <div>
            <span className="uppercase tracking-[4px] text-red-500 font-semibold">
              What We Do
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
              Premium Salon Services
            </h2>

            <div className="w-20 h-1 bg-red-600 rounded-full mt-5"></div>

            <p className="text-zinc-400 mt-6 leading-8">
              We provide luxury grooming, modern haircuts, beard styling and
              premium salon treatments designed to elevate your personality.
            </p>

            {/* Services */}
            <div className="space-y-6 mt-10">
              {services.map((service, index) => (
                <Link
                  key={index}
                  to={service.link}
                  className="block"
                >
                  <div className="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 cursor-pointer">

                    {/* Hover Background */}
                    <div className="absolute inset-0 bg-red-600 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>

                    <div className="relative z-10 flex">

                      {/* Icon Box */}
                      <div className="bg-red-600 min-w-[100px] flex items-center justify-center text-white">
                        {service.icon}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-white">
                          {service.title}
                        </h3>

                        <p className="text-zinc-400 mt-2 group-hover:text-white/90 transition">
                          {service.desc}
                        </p>
                      </div>

                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Button */}
            <button className="mt-10 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full transition">
              View All Services
              <ArrowRight size={18} />
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}

export default MainSection1;