import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Hero() {
  const images = [
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1920",
    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1920",
    "https://images.unsplash.com/photo-1512690459411-b0fd1c86b8c8?q=80&w=1920",
    "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1920",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <style>{`
        @keyframes slideFromLeft {
          0% { opacity: 0; transform: translateX(-100px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideFromRight {
          0% { opacity: 0; transform: translateX(100px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        .animate-slide-left {
          animation: slideFromLeft 0.9s ease-out forwards;
        }
        .animate-slide-right {
          animation: slideFromRight 0.9s ease-out forwards;
        }
        .animate-float {
          animation: floatUpDown 3s ease-in-out infinite;
        }
      `}</style>

      {/* Background Images */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2500ms] ${
            currentImage === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl items-center px-4 sm:px-6 lg:px-8">

        {/* Left Side - Text */}
        <div className="max-w-3xl animate-slide-left">
          <span className="text-sm font-semibold uppercase tracking-[4px] text-red-500 sm:text-base">
            Luxury Salon & Spa
          </span>

          <h1 className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl md:text-7xl lg:text-8xl">
            Modern
            <span className="text-red-600"> Style</span>
            <br />
            Meets Luxury
          </h1>

          <p className="mt-6 max-w-2xl text-base text-zinc-300 sm:text-lg md:text-xl">
            Premium grooming, beauty treatments, spa experiences and
            professional styling crafted for modern lifestyles.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
            <Link
              to="/booking"
              className="rounded-xl bg-red-600 px-6 py-3 text-center font-semibold transition duration-300 hover:bg-red-700 sm:px-8 sm:py-4"
            >
              Book Appointment
            </Link>

            <Link
              to="/services"
              className="rounded-xl border border-white px-6 py-3 text-center font-semibold transition duration-300 hover:border-red-600 hover:text-red-500 sm:px-8 sm:py-4"
            >
              Explore Services
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-6">
            <div>
              <h2 className="text-3xl font-bold text-red-600">10+</h2>
              <p className="text-zinc-400">Years Experience</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-red-600">5000+</h2>
              <p className="text-zinc-400">Happy Clients</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-red-600">25+</h2>
              <p className="text-zinc-400">Experts</p>
            </div>
          </div>
        </div>

        {/* Right Side - Floating Rating Box */}
        <div className="ml-auto hidden animate-slide-right lg:block">
          <div className="animate-float rounded-3xl border border-white/10 bg-white/10 px-10 py-10 backdrop-blur-md w-[300px]">
            <div className="flex items-center gap-1 text-yellow-400 text-2xl">
              <span>&#9733;</span>
              <span>&#9733;</span>
              <span>&#9733;</span>
              <span>&#9733;</span>
              <span>&#9733;</span>
            </div>
            <p className="mt-4 text-4xl font-black text-white">4.9 / 5</p>
            <p className="mt-1 text-sm text-zinc-300">Customer Rating</p>
            <div className="mt-5 border-t border-white/20 pt-5">
              <p className="text-xs text-zinc-400">Based on</p>
              <p className="text-xl font-bold text-white">2,450+ Reviews</p>
            </div>

            {/* Service Highlights */}
            <div className="mt-5 border-t border-white/20 pt-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-red-500 text-lg">&#10003;</span>
                <p className="text-sm text-zinc-200">Hygienic & Premium Products</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500 text-lg">&#10003;</span>
                <p className="text-sm text-zinc-200">Certified Expert Stylists</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500 text-lg">&#10003;</span>
                <p className="text-sm text-zinc-200">100% Satisfaction Guarantee</p>
              </div>
            </div>

            {/* Reviewer */}
            <div className="mt-5 border-t border-white/20 pt-5 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-sm">
                RJ
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Rahul Rajbhar</p>
                <p className="text-xs text-zinc-400">Regular Client</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white">
          <div className="mt-2 h-3 w-1 animate-bounce rounded-full bg-red-500"></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
