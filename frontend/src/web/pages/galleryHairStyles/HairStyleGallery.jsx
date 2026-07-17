import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const images = [
  {
    image:
      "https://i.pinimg.com/originals/8e/b4/86/8eb486e5f66a1fee8c751d60d16425a1.jpg",
    title: "Textured Quiff",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl-k2BVb6N2JXMVD2FFzO4pTUSPyXABPseRizhPMWFMQ&s=10",
    title: "Modern Pompadour",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRQKx-7BG4lPUvdpgUhMPWNkMa7q67JtpZtOgK5q_j9noWyLpxg1qgsOw&s=10",
    title: "Classic Side Part",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhy2gWLCZT4C_jCH1vpR0UIzQJLmxG3_9oIvIaCtkrL3hluKAXY_TDavg&s=10",
    title: "Spiky Hair",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRshryJWFK5wk1C2HWg6L2292t8v8IMgBtzDyaHZtTvME0dl3kTdfMsXT6a&s=10",
    title: "Messy Crop",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY8xPwHVysBa8TW17PyAnlcyCA_cYzn0XsaB94-7yLYZQbdYAC7ZKG8_g&s=10",
    title: "Comb Over",
  },
  {
    image:
      "https://st2.depositphotos.com/49204526/47202/i/450/depositphotos_472023428-stock-photo-attractive-male-model-long-hair.jpg",
    title: "Slick Back",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdr4lfqMo-s-RavI62VKDdh0oLh_ar8X72LtcfDvcLBy0hEWWfyZI4j0C4&s=10",
    title: "Wavy Hair Style",
  },
];

export default function HairStyleGallery() {
  return (
    <>
      <Navbar />

      <section className="bg-black text-white">
        {/* Hero */}
        <div
          className="relative h-[65vh] flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://thebeardclub.com/cdn/shop/articles/cutting_beard_growth_0a4f02d6-bceb-472e-9cad-b044b7bb81e6_1200x630.jpg?v=1773351151')",
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>

          <div className="relative z-10 text-center px-5">
            <p className="uppercase tracking-[6px] text-red-500 font-semibold">
              Premium Collection
            </p>

            <h1 className="text-5xl md:text-7xl font-black mt-5">
              Hair Style Gallery
            </h1>

            <p className="text-zinc-300 mt-6 max-w-2xl mx-auto">
              Explore the latest modern hairstyles created by professional
              salon experts for every personality.
            </p>
          </div>
        </div>

        {/* Gallery */}
        <div className="max-w-7xl mx-auto px-5 py-24">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[4px] text-red-500">
              Trending Hairstyles
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Find Your Perfect Look
            </h2>

            <div className="w-20 h-1 bg-red-600 mx-auto mt-5 rounded-full"></div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {images.map((item, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-[35px] bg-zinc-950 p-[3px] transition-all duration-500 hover:-translate-y-3"
              >
                {/* Border */}
                <div className="absolute inset-0 rounded-[35px] border-2 border-zinc-700 group-hover:border-red-600 transition-all duration-500"></div>

                {/* Image */}
                <div className="relative overflow-hidden rounded-[32px] bg-black">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-[420px] w-full object-cover transition-all duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-all duration-500"></div>

                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-md px-5 py-4">
                    <h3 className="text-xl font-bold text-white">
                      {item.title}
                    </h3>
                  </div>
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