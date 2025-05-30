import Squares from "../../components/animationUi/Squares";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import logo from '../../assets/logo.png';

export default function Footer() {
  return (
    <>
    <div className="relative overflow-hidden bg-black text-white">
      {/* Background animation */}
      <Squares
        speed={0.5}
        squareSize={40}
        direction="diagonal"
        borderColor="#333"
        hoverFillColor="#666"
        className="absolute inset-0 z-0"
      />

      <footer className="text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand and Description */}
          <div className="sm:col-span-2 lg:col-span-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <div className="bg-green-500 p-2 rounded-full">
                <img src={logo} className="h-14 w-20" alt="" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                wastewise
              </h2>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed mx-auto md:mx-0 max-w-[300px] md:max-w-none">
              We are committed to providing dependable, eco-friendly waste
              management solutions...
            </p>
          </div>

          {/* Company Links */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-3 sm:mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors block"
                >
                  Homepage
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors block"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors block"
                >
                  Project
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors block"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors block"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors block"
                >
                  Our Service
                </a>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-3 sm:mb-4">
              Our Service
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors block"
                >
                  Waste Collection
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors block"
                >
                  Medical Waste
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors block"
                >
                  E-waste Disposal
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors block"
                >
                  Organic Waste
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors block"
                >
                  Dumpster Rental
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors block"
                >
                  Commercial Recycling
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className="sm:col-span-2 lg:col-span-1 text-center md:text-left">
            <h3 className="text-white font-semibold mb-3 sm:mb-4">
              Subscribe to Newsletter
            </h3>
            <div className="flex max-w-xs mx-auto md:mx-0">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="p-2 w-full bg-[#255F51] text-white text-sm sm:text-base border-none outline-none placeholder-gray-400 text-center md:text-left"
              />
              <button className="bg-green-500 px-4 py-2 hover:bg-green-600 transition-colors">
                <span className="text-white font-bold text-xl">→</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 mx-auto md:mx-0 max-w-[250px] md:max-w-none">
              Your email is safe with us. We don't spam.
            </p>

            <h3 className="mt-4 sm:mt-6 mb-2 font-semibold">Follow Us</h3>
            <div className="flex gap-3 sm:gap-4 text-lg sm:text-xl text-white justify-center md:justify-start">
              <a href="#" className="hover:text-green-500 transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-green-500 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-green-500 transition-colors">
                <FaYoutube />
              </a>
              <a href="#" className="hover:text-green-500 transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-green-500 transition-colors">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Large Background Brand Name */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-full text-[6rem] xs:text-[7rem] sm:text-[8rem] lg:text-[12rem] font-extrabold text-[#2C5F52] opacity-20 leading-none pointer-events-none text-center">
            wastewise
          </div>
        </div>
      </footer>
    </div>
      
      <footer className="bg-gray-800 text-white p-2">
        <div className="max-w-6xl mx-auto text-center">
          <p>© 2025 WasteWise. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-2">Making waste management simple and efficient</p>
        </div>
      </footer>

      </>

  );
}
