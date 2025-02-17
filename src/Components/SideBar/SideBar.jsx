import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AuthContext } from "../../AuthContextProvider/AuthContextProvider";
import { data, NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { PiUsersThreeFill } from "react-icons/pi";
import {
  MdAddCircle,
  MdCampaign,
  MdCreateNewFolder,
  MdOutlinePets,
} from "react-icons/md";
import { FcDonate } from "react-icons/fc";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { CiSquareQuestion } from "react-icons/ci";
import { FaDonate } from "react-icons/fa";
import useRole from "../../hooks/useRole";

const SideBar = () => {
  // getting current user role
  const { data: role } = useRole();
  // getting user data from auth
  const { user } = useContext(AuthContext);
  const image = user.photoURL;
  const name = user.displayName;
  const email = user.email;
  
  if (role == undefined) {
    console.log('oleeeeeeeeeeeeee');
    return
  }

  return (
    <div
      className={`bg-cyan-100 dark:bg-[#111827] text-white w-full lg:max-w-72 p-5 flex flex-col items-center rounded-xl border-2 border-cyan-500 ${
        role === "Admin" ? "h-[800px]" : "h-[600px]"
      } `}
    >
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-4">
        <img
          src={image}
          alt="Profile"
          className="h-20 w-20 rounded-full border-4 border-cyan-400 object-cover object-top"
        />
        {role === "Admin" ? (
          <p className="dark:bg-cyan-50 bg-[#111827] dark:text-[#111827] text-cyan-50 px-4 my-2 rounded-lg nunito font-semibold border-2 border-cyan-500">
            Admin
          </p>
        ) : (
          ""
        )}
        <h2 className="mt-4 text-xl font-semibold poppins text-cyan-900 dark:text-cyan-50">
          {name}
        </h2>
        <p className="text-sm opacity-80 nunito text-cyan-900 dark:text-cyan-50">
          {email}
        </p>
      </div>

      {/* Menu Items */}
      <div className="w-full">
        {/* Profile tab */}
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex items-center p-3 rounded-md mb-1 gap-3 ${
              isActive
                ? "bg-cyan-600 text-white"
                : "hover:bg-cyan-300 dark:hover:bg-cyan-50/50 text-cyan-950 dark:text-cyan-50"
            }`
          }
        >
          <CgProfile size={20} />
          <span className="font-semibold text-lg nunito">My Profile</span>
        </NavLink>

        {/* users tab (admin only) */}
        {role === "Admin" && (
          <NavLink
            to="/dashboard/users"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md mb-1 gap-3 ${
                isActive
                  ? "bg-cyan-600 text-white"
                  : "hover:bg-cyan-300 dark:hover:bg-cyan-50/50 text-cyan-950 dark:text-cyan-50"
              }`
            }
          >
            <PiUsersThreeFill size={20} />
            <span className="font-semibold text-lg nunito">Users</span>
          </NavLink>
        )}

        {/* all pets tab (admin only) */}
        {role === "Admin" && (
          <NavLink
            to="/dashboard/all-pets"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md mb-1 gap-3 ${
                isActive
                  ? "bg-cyan-600 text-white"
                  : "hover:bg-cyan-300 dark:hover:bg-cyan-50/50 text-cyan-950 dark:text-cyan-50"
              }`
            }
          >
            <MdOutlinePets size={20} />
            <span className="font-semibold text-lg nunito">All pets</span>
          </NavLink>
        )}

        {/* All donation (admin only) */}
        {role === "Admin" && (
          <NavLink
            to="/dashboard/all-donation"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md mb-1 gap-3 ${
                isActive
                  ? "bg-cyan-600 text-white"
                  : "hover:bg-cyan-300 dark:hover:bg-cyan-50/50 text-cyan-950 dark:text-cyan-50"
              }`
            }
          >
            <MdCampaign size={20} />
            <span className="font-semibold text-lg nunito">All campaigns</span>
          </NavLink>
        )}

        {/* Add a pet */}
        <NavLink
          to="/dashboard/add-a-pet"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-md mb-1 gap-3 ${
              isActive
                ? "bg-cyan-600 text-white"
                : "hover:bg-cyan-300 dark:hover:bg-cyan-50/50 text-cyan-950 dark:text-cyan-50"
            }`
          }
        >
          <MdAddCircle size={20} />
          <span className="font-semibold text-lg nunito">Add a pet</span>
        </NavLink>

        {/* my added pets */}
        <NavLink
          to="/dashboard/my-added-pets"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-md mb-1 gap-3 ${
              isActive
                ? "bg-cyan-600 text-white"
                : "hover:bg-cyan-300 dark:hover:bg-cyan-50/50 text-cyan-950 dark:text-cyan-50"
            }`
          }
        >
          <FaHeartCircleCheck size={20} />
          <span className="font-semibold text-lg nunito">My added pets</span>
        </NavLink>

        {/* Adoption requests */}
        <NavLink
          to="/dashboard/adoption-request"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-md mb-1 gap-3 ${
              isActive
                ? "bg-cyan-600 text-white"
                : "hover:bg-cyan-300 dark:hover:bg-cyan-50/50 text-cyan-950 dark:text-cyan-50"
            }`
          }
        >
          <CiSquareQuestion size={20} />
          <span className="font-semibold text-lg nunito">
            Adoption requests
          </span>
        </NavLink>

        {/* Create donation campaign */}
        <NavLink
          to="/dashboard/create-donation-campaign"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-md mb-1 gap-3 ${
              isActive
                ? "bg-cyan-600 text-white"
                : "hover:bg-cyan-300 dark:hover:bg-cyan-50/50 text-cyan-950 dark:text-cyan-50"
            }`
          }
        >
          <MdCreateNewFolder size={20} />
          <span className="font-semibold text-lg nunito">Create campaigns</span>
        </NavLink>

        {/* my donation campaigns */}
        <NavLink
          to="/dashboard/my-donation-campaigns"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-md mb-1 gap-3 ${
              isActive
                ? "bg-cyan-600 text-white"
                : "hover:bg-cyan-300 dark:hover:bg-cyan-50/50 text-cyan-950 dark:text-cyan-50"
            }`
          }
        >
          <MdCampaign size={20} />
          <span className="font-semibold text-lg nunito">My campaigns</span>
        </NavLink>

        {/* my donation */}
        <NavLink
          to="/dashboard/my-donation"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-md mb-1 gap-3 ${
              isActive
                ? "bg-cyan-600 text-white"
                : "hover:bg-cyan-300 dark:hover:bg-cyan-50/50 text-cyan-950 dark:text-cyan-50"
            }`
          }
        >
          <FcDonate size={20} />
          <span className="font-semibold text-lg nunito">My donations</span>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
