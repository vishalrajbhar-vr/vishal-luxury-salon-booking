import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const images = [
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ36aNiF1KfgmC5jNNx57SkdA2c7sw6ZBG2rviE07CzEQt9kyGYW4KLZYd-&s=10",
    title: "Modern Fade",
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmRJ4OmRvvqqMtAdjOiRsVbDGpIZNb0EVr74SfH5V_zda89Z23WeYrxZ6q&s=10",
    title: "French Crop",
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbPwj_FRTl46oGqyGm2QRwtZcQmSK-61ukAFYdGaQOtvYyZqCwIDX-oUip&s=10",
    title: "Buzz Cut",
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWnBSPCo9OBpz1c53oi3SOw-h5tPlGwuP0HwmO5LyTwSLrP5V4nuhnB78&s=10",
    title: "Textured Crop",
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqAbJ7kPJLj9Lhw6niPlgFt7oHgYk-T1CYJT1LsUzQsOfyFSeBd3OLUl9q&s=10",
    title: "Low Fade",
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNHNa6A0nAPQFCl9Y9_uUOlVAfGXODP2hi1P0VSLvo60XTAaDU4lW4mtzJ&s=10",
    title: "Pompadour",
  },
  {
    image: "https://i.pinimg.com/736x/f6/ed/97/f6ed97069ddcf5a004db1965da570a56.jpg",
    title: "Undercut",
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTykFuq9IV_NnvCWoDqMlZKli5vLpOfm6Edg2DZLCuJ8RiMc43MCaKv6SoH&s=10",
    title: "Side Part",
  },
];

export default function HairCutGallery() {
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
                            Hair Cut Gallery
                        </h1>

                        <p className="text-zinc-300 mt-6 max-w-2xl mx-auto">
                            Discover modern haircut styles crafted by professional salon
                            artists for every personality.
                        </p>

                    </div>
                </div>

                {/* Gallery */}
                <div className="max-w-7xl mx-auto px-5 py-24">

                    <div className="text-center mb-16">

                        <p className="uppercase tracking-[4px] text-red-500">
                            Trending Collection
                        </p>

                        <h2 className="text-4xl md:text-5xl font-bold mt-4">
                            Choose Your Next Style
                        </h2>

                        <div className="w-20 h-1 bg-red-600 mx-auto mt-5 rounded-full"></div>

                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

                        {images.map((item, i) => (
                            <div
                                key={i}
                                className="group relative overflow-hidden rounded-[35px] bg-zinc-950 p-[3px] transition-all duration-500 hover:-translate-y-3"
                            >
                                {/* Border Effect */}
                                <div className="absolute inset-0 rounded-[35px] border-2 border-zinc-700 group-hover:border-red-600 transition-all duration-500"></div>

                                {/* Image Box */}
                                <div className="relative overflow-hidden rounded-[32px] bg-black">

                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-[420px] w-full object-cover transition-all duration-700 group-hover:scale-110"
                                    />

                                    {/* Black Overlay */}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-all duration-500"></div>

                                    {/* Bottom Title */}
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