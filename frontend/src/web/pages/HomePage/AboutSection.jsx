import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AboutSection() {
    const navigate = useNavigate();
    return (
        <section className="bg-black text-white py-24">
            <div className="max-w-7xl mx-auto px-5">

                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div>

                        <span className="text-red-500 uppercase tracking-[4px] font-semibold">
                            About Us
                        </span>

                        <h2 className="text-4xl md:text-5xl font-bold mt-4">
                            Luxury Salon &
                            <span className="text-red-600"> Grooming</span>
                        </h2>

                        <div className="w-20 h-1 bg-red-600 mt-5 rounded-full"></div>

                        <p className="text-zinc-400 mt-8 leading-8">
                            We provide premium grooming services with modern
                            styling techniques, luxury salon treatments and
                            personalized care to help you look your best.
                        </p>

                        <p className="text-zinc-400 mt-6 leading-8">
                            Our expert stylists are dedicated to delivering
                            exceptional haircuts, beard styling, facials,
                            spa treatments and complete grooming solutions.
                        </p>

                        <button
                        onClick={()=>navigate("/contact")} 
                        className="mt-10 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-semibold flex items-center gap-3 transition-all duration-300 hover:scale-105">
                            Contact Us
                            <ArrowRight size={20} />
                        </button>

                    </div>

                    {/* Right Images */}
<div className="relative flex items-center justify-center h-[650px]">

    {/* Main Large Image */}
    <div className="overflow-hidden rounded-[35px] border-4 border-zinc-800 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
        <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7JNbDkeRzyho7YfWDYD7bQqDJ72b0eAdgtN78bFa_-FH6lv5tZTMzLP4&s=10"
            alt="Salon"
            className="w-[500px] h-[620px] object-cover hover:scale-105 transition duration-700"
        />
    </div>

    {/* Circle Image 1 */}
    <div className="absolute -top-5 -left-5 w-36 h-36 rounded-full overflow-hidden border-[6px] border-white shadow-2xl hover:scale-110 transition duration-500">
        <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL2pS_d8agj-OeNyWA7vII2P7jzX8zGwigz6CMeDP-GXT3fHMKsmH5Jno0&s=10"
            alt=""
            className="w-full h-full object-cover"
        />
    </div>

    {/* Circle Image 2 */}
    <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-40 h-40 rounded-full overflow-hidden border-[6px] border-red-600 shadow-2xl hover:scale-110 transition duration-500">
        <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm8szWjzx2R2jTZrTos4hGMJEIxEFdoZNO2JxeYKEEXB9hv-Rg_ihmjQly&s=10"
            alt=""
            className="w-full h-full object-cover"
        />
    </div>

    {/* Circle Image 3 */}
    <div className="absolute -bottom-5 left-16 w-32 h-32 rounded-full overflow-hidden border-[6px] border-white shadow-2xl hover:scale-110 transition duration-500">
        <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQaZRCmdsXD9PqUYe5Vr4V7Swg-DSaS6ebI7aGf8m3DwY2sBUabNmXItRh&s=10"
            alt=""
            className="w-full h-full object-cover"
        />
    </div>

</div>

                </div>

            </div>
        </section>
    );
}

export default AboutSection;