import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";


const images = [
  {
    image:
      "https://st2.depositphotos.com/3078691/6953/i/950/depositphotos_69535469-stock-photo-handsome-man-shaving.jpg",
    title: "Classic Beard",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVyJHhayi_QIFYqlTv09Zh6w61M8OXF6C2MWxfm-hQ4wD0u2S2i_Ytlx9l&s=10",
    title: "Royal Shave",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI20Mli4cGtXxv2RVdrxtmu4rnBVpYyaZ5mdlPwgsSUcUF1RlEnYMxBQ&s=10",
    title: "Sharp Beard Fade",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlIHb-2T9WR63ECZttz3aEmBxagFh_o5jC4VerNIW0ZTn0pcLTUPjdeTl9&s=10",
    title: "Premium Trim",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWeD7zZUyxF8cGlSSmyhZ1qaaxjDTO-vJVnJjGNoVaxs1P5uVrYv7hJfI&s=10",
    title: "Modern Beard",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKaUHn2FOUpCJRsnuJVN4Ca83Kfy_Jk2xFOBRE3eIdzYEq9s8AP2HzGK8&s=10",
    title: "Luxury Shave",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCD47umAIu_fVcVZbyV_d2kcaJVY8jychljVW_2QQD2f7YmHHJ4gSniziO&s=10",
    title: "Fade Beard",
  },
  {
    image:
      "https://thebeardclub.com/cdn/shop/articles/8_Pro_Tips_for_How_To_Trim_a_Beard_While_Growing_It_Out.jpg?v=1674482104&width=2000",
    title: "Stylish Look",
  },
];

export default function ShavingGallery() {
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
              Shaving Gallery
            </h1>

            <p className="text-zinc-300 mt-6 max-w-2xl mx-auto">
              Explore premium beard styling and luxury shaving looks crafted
              by professional barbers.
            </p>

          </div>
        </div>

        {/* Gallery */}
        <div className="max-w-7xl mx-auto px-5 py-24">

          <div className="text-center mb-16">

            <p className="uppercase tracking-[4px] text-red-500">
              Trending Beard Styles
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Premium Beard Collection
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