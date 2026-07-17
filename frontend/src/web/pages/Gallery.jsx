import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaSearchPlus } from "react-icons/fa";
import { getAllGallery } from "../../service/gallery";
import { useEffect, useState } from "react";
import { getpremgly } from "../../service/premumGallery.js";

function Gallery() {

  const [gallery, setGallery] = useState([]);

  const uploadGallery = async () => {
    try {
      const response = await getAllGallery();
      setGallery(response.data.getdata);
    }
    catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    uploadGallery();
  }, []);

  const [premumGallery, setPremumGallery] = useState([]);

  const uploadPremumGallery = async () => {
    try {
      const response = await getpremgly();
      setPremumGallery(response.data.finddata);

    }
    catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    uploadPremumGallery();
  }, []);

  const categories = [
    "Kids Haircut",
    "Teen Fade",
    "Modern Fade",
    "French Crop",
    "Pompadour",
    "Textured Quiff",
    "Undercut",
    "Beard Styling",
  ];

  return (
    <>
      <Navbar />

      <section className="overflow-hidden bg-black text-white">

        {/* Hero Banner */}
        <div
          className="relative flex min-h-[75vh] items-center justify-center bg-cover bg-center sm:min-h-[85vh]"
          style={{
            backgroundImage:
              "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWzOd9qF_nZz7TqglZCpwzHvs7Umt7OnChih2p_XD0dFEkgvDalTiDPmg&s=10')",
          }}
        >
          <div className="absolute inset-0 bg-black/75"></div>

          <div className="relative z-10 px-4 text-center sm:px-5">
            <span className="uppercase tracking-[5px] text-red-500 font-semibold">
              Premium Salon Gallery
            </span>

            <h1 className="mt-5 text-4xl font-black sm:text-5xl md:text-7xl">
              Modern Hair
              <span className="text-red-600"> Styles</span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base text-zinc-300 sm:text-lg">
              Explore trending hairstyles, beard styling,
              grooming transformations and luxury salon looks.
            </p>
          </div>
        </div>

        {/* Trending Hairstyles */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">

          <div className="text-center mb-16">
            <span className="text-red-500 uppercase tracking-[4px]">
              Trending Hairstyles
            </span>

            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Choose Your Next Look
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">

            {gallery.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-[300px] w-full object-cover transition duration-700 group-hover:scale-110 sm:h-[360px] lg:h-[420px]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                <h3 className="absolute bottom-5 left-5 text-2xl font-bold">
                  {item.image_title}
                </h3>
              </div>
            ))}

          </div>

        </div>

        {/* Gallery Grid */}
        <div className="max-w-7xl mx-auto px-5 pb-24">

          <div className="text-center mb-16">

            <span className="uppercase tracking-[4px] text-red-500 font-semibold">
              Our Collection
            </span>

            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Premium Hair Gallery
            </h2>

          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">

            {premumGallery.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-zinc-800 break-inside-avoid"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full ${item.height} object-cover transition duration-700 group-hover:scale-110`}
                />

                <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col items-center justify-center">

                  <FaSearchPlus className="text-red-500 text-4xl mb-4" />

                  <h3 className="text-2xl font-bold">
                    {item.name}
                  </h3>

                  <p className="text-zinc-300 mt-2">
                    {item.paragraph}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* Categories */}
        <div className="max-w-7xl mx-auto px-5 pb-24">

          <div className="mb-10 text-center sm:mb-12">

            <h2 className="text-3xl font-bold sm:text-4xl">
              Popular Categories
            </h2>

          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">

            {categories.map((style, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-center"
              >
                <div className="absolute inset-0 bg-red-600 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>

                <div className="relative z-10">

                  <h3 className="text-xl font-bold">
                    {style}
                  </h3>

                  <p className="text-zinc-400 group-hover:text-white mt-3">
                    Trending 2026 Style
                  </p>

                </div>
              </div>
            ))}

          </div>

        </div>

        {/* CTA */}
        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">

          <div className="relative overflow-hidden rounded-[32px] border border-red-600/30 bg-gradient-to-r from-zinc-900 to-black p-8 text-center sm:p-12 md:p-20">

            <div className="absolute top-0 right-0 w-72 h-72 bg-red-600/20 blur-[120px]" />

            <h2 className="text-3xl font-bold sm:text-4xl md:text-6xl">
              Transform Your Style Today
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-sm text-zinc-400 sm:text-base">
              Experience luxury grooming, modern hairstyles
              and premium salon services.
            </p>

            <button className="mt-8 rounded-xl bg-red-600 px-8 py-3 font-semibold transition hover:scale-105 hover:bg-red-700 sm:px-10 sm:py-4">
              Book Appointment
            </button>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Gallery;