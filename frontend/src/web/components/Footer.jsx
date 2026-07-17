import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer
      className="relative text-white"
      style={{
        backgroundImage: "url('https://images.fresha.com/lead-images/placeholders/barbershop-28.jpg?class=width-small')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/85"></div>

      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              Lux<span className="text-red-500">Salon.</span>
            </h2>

            <div className="text-center lg:text-left">
              <h3 className="text-xl font-semibold sm:text-2xl">Subscribe Newsletter</h3>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white px-5 py-4 text-black outline-none sm:w-[320px]"
              />
              <button className="bg-red-600 px-8 py-4 font-semibold transition hover:bg-red-700">Send</button>
            </div>
          </div>

          <div className="mt-10 border-t border-zinc-700"></div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-6 text-2xl font-bold">Contact Us</h3>
              <div className="space-y-5 text-zinc-300">
                <div className="flex gap-3">
                  <FaLocationDot className="mt-1 text-red-500" />
                  <p>Lucknow, Uttar Pradesh, India</p>
                </div>
                <div className="flex gap-3">
                  <FaEnvelope className="mt-1 text-red-500" />
                  <p>salon@gmail.com</p>
                </div>
                <div className="flex gap-3">
                  <FaPhone className="mt-1 text-red-500" />
                  <p>+91 9876543210</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-2xl font-bold">Best Services</h3>
              <ul className="space-y-4 text-zinc-300">
                <li className="cursor-pointer hover:text-red-500">Hair Cutting</li>
                <li className="cursor-pointer hover:text-red-500">Hair Styling</li>
                <li className="cursor-pointer hover:text-red-500">Beard Styling</li>
                <li className="cursor-pointer hover:text-red-500">Facial</li>
                <li className="cursor-pointer hover:text-red-500">Hair Colouring</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-6 text-2xl font-bold">Our Products</h3>
              <ul className="space-y-4 text-zinc-300">
                <li className="cursor-pointer hover:text-red-500">Shampoo</li>
                <li className="cursor-pointer hover:text-red-500">Conditioner</li>
                <li className="cursor-pointer hover:text-red-500">Hair Treatment</li>
                <li className="cursor-pointer hover:text-red-500">Styling Products</li>
                <li className="cursor-pointer hover:text-red-500">Brushes & Combs</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-6 text-2xl font-bold">Recent Posts</h3>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <img src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=200" alt="" className="h-20 w-20 rounded-lg object-cover" />
                  <div>
                    <p className="text-xs text-red-500">APRIL 8, 2026</p>
                    <h4 className="text-sm">Modern Haircut Trends</h4>
                  </div>
                </div>
                <div className="flex gap-4">
                  <img src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=200" alt="" className="h-20 w-20 rounded-lg object-cover" />
                  <div>
                    <p className="text-xs text-red-500">APRIL 5, 2026</p>
                    <h4 className="text-sm">Men's Fade Haircut Guide</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:px-6 md:flex-row lg:px-8">
            <p className="text-zinc-400">© 2026 Luxury Salon. All Rights Reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 transition hover:bg-red-600"><FaFacebookF /></a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 transition hover:bg-red-600"><FaInstagram /></a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 transition hover:bg-red-600"><FaXTwitter /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;