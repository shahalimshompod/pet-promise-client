import { useContext, useEffect, useState } from "react";
import logo from "../../assets/logo/logo.png";
import { TfiMenuAlt } from "react-icons/tfi";
import { RxCross1 } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
import { LuSun } from "react-icons/lu";
import { FaMoon } from "react-icons/fa";
import { AuthContext } from "../../AuthContextProvider/AuthContextProvider";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Navbar = ({ handleDark, isDark }) => {
  const { user, userLogout, gettingUserLoading } = useContext(AuthContext);
  // user info
  const name = user?.displayName;
  const email = user?.email;
  const image = user?.photoURL;

  // handle logout user
  const handleLogout = () => {
    userLogout();
    // toast
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Logged out successfully",
    });
  };
  // menu dropdown states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Dropdown menu close when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      const dropdown = document.getElementById("profile-dropdown");
      if (dropdown && !dropdown.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    // Clean up the event listener when the component unmounts
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isProfileDropdownOpen]);

  return (
    <nav className="bg-white shadow-lg py-2 px-3 xl:px-0 dark:bg-[#111827] sticky top-0 z-[1050]">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Hamburger Menu for small devices */}
          <button
            className="md:hidden block text-black dark:text-white/70"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <RxCross1 size={20} /> : <TfiMenuAlt size={20} />}
          </button>
          {/* Logo and Brand */}
          <div className="flex items-center gap-2">
            <div className="bg-cyan-200 rounded-full p-2">
              <img src={logo} alt="Theme Logo" className="w-8 lg:w-12" />
            </div>
            <a href="/" className="text-4xl font-bold hidden lg:block">
              <span className="text-cyan-500 poppins font-normal">PET</span>
              <span className="text-cyan-600 poppins font-extralight">
                PROMISE
              </span>
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <ul
          className={`absolute bg-white dark:bg-[#111827] shadow-lg w-full md:w-auto left-0 top-16 md:top-0 md:hidden ${
            isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 hidden"
          }`}
        >
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `block px-4 py-2 md:p-0 text-sm poppins ${
                  isActive
                    ? "text-cyan-500 font-bold"
                    : "text-black/60 dark:text-white/70"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/pet-listing"
              className={({ isActive }) =>
                `block px-4 py-2 md:p-0 text-sm poppins ${
                  isActive
                    ? "text-cyan-500 font-bold"
                    : "text-black/60 dark:text-white/70"
                }`
              }
            >
              Pet Listing
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/donation-campaigns"
              className={({ isActive }) =>
                `block px-4 py-2 md:p-0 text-sm poppins ${
                  isActive
                    ? "text-cyan-500 font-bold"
                    : "text-black/60 dark:text-white/70"
                }`
              }
            >
              Donation Campaigns
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block px-4 py-2 md:p-0 text-sm poppins ${
                  isActive
                    ? "text-cyan-500 font-bold"
                    : "text-black/60 dark:text-white/70"
                }`
              }
            >
              About
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center gap-5">
          <div className="md:block hidden">
            <ul className="flex items-center gap-10">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block px-4 py-2 md:p-0 text-sm poppins ${
                      isActive
                        ? "text-cyan-500 font-bold"
                        : "text-black/60 dark:text-white/70"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/pet-listing"
                  className={({ isActive }) =>
                    `block px-4 py-2 md:p-0 text-sm poppins ${
                      isActive
                        ? "text-cyan-500 font-bold"
                        : "text-black/60 dark:text-white/70"
                    }`
                  }
                >
                  Pet Listing
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/donation-campaigns"
                  className={({ isActive }) =>
                    `block px-4 py-2 md:p-0 text-sm poppins ${
                      isActive
                        ? "text-cyan-500 font-bold"
                        : "text-black/60 dark:text-white/70"
                    }`
                  }
                >
                  Donation Campaigns
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block px-4 py-2 md:p-0 text-sm poppins ${
                      isActive
                        ? "text-cyan-500 font-bold"
                        : "text-black/60 dark:text-white/70"
                    }`
                  }
                >
                  About
                </NavLink>
              </li>

              {/* conditional route */}
              {user && (
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `block px-4 py-2 md:p-0 text-sm poppins ${
                        isActive
                          ? "text-cyan-500 font-bold"
                          : "text-black/60 dark:text-white/70"
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          {/* Login Button */}
          {user ? (
            ""
          ) : (
            <NavLink
              to="/login"
              type="button"
              className="text-white bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 hover:bg-gradient-to-br dark:focus:ring-blue-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center nunito"
            >
              Login
            </NavLink>
          )}

          {/* Profile Section */}
          <div className="relative">
            {gettingUserLoading ? (
              <Skeleton circle={true} height={44} width={44} />
            ) : (
              user && (
                <img
                  id="profile-dropdown"
                  src={image}
                  alt="Profile"
                  className="h-11 w-11 rounded-full object-cover cursor-pointer"
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                />
              )
            )}

            <div
              className={`absolute right-0 mt-2 w-48 bg-white dark:bg-[#111827] border  rounded shadow-md transform transition-all duration-300 ease-in-out ${
                isProfileDropdownOpen
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <div className="px-4 py-2">
                <p className="text-sm font-medium dark:text-white">{name}</p>
                <p className="text-sm text-gray-500 truncate dark:text-white/70">
                  {email}
                </p>
              </div>
              <div className="border-t border-gray-200">
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-sm text-black nunito dark:text-white hover:bg-cyan-50 dark:hover:bg-white/10"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block pl-4 pr-32 py-2 text-sm text-black nunito dark:text-white hover:bg-cyan-50 dark:hover:bg-white/10"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Dark Mode Button */}
          <button onClick={handleDark} className="bg-white/50 p-3 rounded-full">
            {isDark ? (
              <LuSun className="dark:text-white" size={20} />
            ) : (
              <FaMoon size={20} />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
