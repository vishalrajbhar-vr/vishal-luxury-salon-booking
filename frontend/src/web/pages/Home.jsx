import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import AboutSection from "./HomePage/AboutSection";
import MainSection1 from "./HomePage/MainSection1";
import MainSection2 from "./HomePage/MainSection2";
import Testimonial from "./HomePage/Testimonial";
import TransparentBox from "./HomePage/TransparentBox";

function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <AboutSection/>
            <MainSection1/>
            <MainSection2/>
            <TransparentBox/>
            <Testimonial/>
            <Footer />
        </>
    );
}

export default Home;