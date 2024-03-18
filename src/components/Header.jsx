import React from "react";
import { FaRightFromBracket } from "react-icons/fa6";
import logo from "../assets/NaviIcon.png";
import { FaCircleUser } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";
import useApi from "../utils/useApi";
const Header = () => {
  const { user } = useAuth();
  const { logoutUser } = useApi();
  return (
    <header>
      <nav className="lg:hidden p-4 bg-slate-800 flex justify-between items-center">
        <div className="flex justify-start items-center gap-1">
          <img
            src={logo}
            alt="Navicollect Logo"
            className="block h-8 2xl:h-10 w-auto"
          />
          <span className="text-white text-lg font-bold">Navicollect.AI</span>
        </div>
        {user.isLoggedIn && (
          <div className="hidden md:flex items-center gap-8">
            <div
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Logout"
              data-tooltip-place="bottom"
            >
              <FaRightFromBracket
                className="fill-gray-50 text-lg transition-all cursor-pointer"
                onClick={logoutUser}
              />
            </div>
            <div
              data-tooltip-id="my-tooltip"
              data-tooltip-content="My Profile"
              data-tooltip-place="bottom"
            >
              <FaCircleUser className="fill-gray-50 text-3xl transition-all cursor-pointer" />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
