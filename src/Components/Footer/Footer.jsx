import { FaFacebook } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";
import logo from "../../assets/logo/logo.png";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div>
      <footer className="bg-white shadow dark:bg-gray-900">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex justify-between flex flex-col lg:flex-row items-center gap-5 lg:gap-0 ">
            {/* Logo and Brand */}
            <div className="flex items-center gap-2">
              <div className="bg-cyan-200 rounded-full p-2">
                <img src={logo} alt="Theme Logo" className="w-5 lg:w-8" />
              </div>
              <h1 className="text-2xl font-bold">
                <span className="text-cyan-500 poppins font-normal">PET</span>
                <span className="text-cyan-600 poppins font-extralight">
                  PROMISE
                </span>
              </h1>
            </div>
            <ul className="flex flex-wrap items-center text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a
                  href="/about"
                  className="hover:underline me-4 md:me-6 poppins font-light"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="hover:underline me-4 md:me-6 poppins font-light"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline me-4 md:me-6 poppins font-light"
                >
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline poppins font-light">
                  Contact
                </a>
              </li>
            </ul>

            <div className="flex items-center gap-7">
              <a href="https://www.facebook.com/" target="_blank">
                <FaFacebook className="dark:text-white/70" size={23} />
              </a>
              <a href="https://www.instagram.com/" target="_blank">
                <RiInstagramFill className="dark:text-white/70" size={25} />
              </a>
              <a href="https://www.youtube.com/" target="_blank">
                <IoLogoYoutube className="dark:text-white/70" size={25} />
              </a>
              <a href="https://x.com/" target="_blank">
                <FaXTwitter className="dark:text-white/70" size={25} />
              </a>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 text-center roboto dark:text-gray-400">
            © 2025 <span className="uppercase text-cyan-500">Petpromise.</span>{" "}
            All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
