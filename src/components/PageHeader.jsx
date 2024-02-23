import React from "react";
import { useAuth } from "../context/auth";
import { FaRightFromBracket, FaMagnifyingGlass } from "react-icons/fa6";
import useApi from "../utils/useApi";
import { useLocation } from "react-router-dom";

const PageHeader = ({ pageTitle }) => {
  const { user } = useAuth();
  const { logoutUser } = useApi();
  const { pathname } = useLocation();
  let title;
  if (pathname === "/") title = "Follow Up";
  if (pathname === "/risk-analysis") title = "Credit Risk Analysis";
  if (pathname.includes("/risk-analysis/past-data")) title = "Past Data";
  if (pathname.includes("/risk-report")) title = "Risk Report";

  return (
    <div className="flex justify-between items-center">
      {/* page title */}
      <span className="text-2xl xl:text-3xl font-bold text-slate-900">
        {title}
      </span>

      {/* search box */}
      <div className="hidden md:flex items-center relative w-full max-w-[250px] xl:max-w-[350px] 2xl:max-w-[500px]">
        <input
          type="text"
          className="bg-white py-4 px-6 rounded-full w-full inline outline-none border transition-all focus:border-slate-200 focus:shadow-md"
          placeholder="Search"
        />
        <FaMagnifyingGlass className="inline absolute right-6 fill-slate-400" />
      </div>

      {/* profile button */}
      <div className="hidden md:flex items-center xl:gap-4">
        <span
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Logout"
          data-tooltip-place="bottom"
          className="cursor-pointer p-3"
          onClick={logoutUser}
        >
          <FaRightFromBracket className="text-lg" />
        </span>

        <div
          data-tooltip-id="my-tooltip"
          data-tooltip-content="My Profile"
          data-tooltip-place="bottom"
          className="flex items-center gap-4 bg-white p-4 rounded-full cursor-pointer"
        >
          <div className="w-10 h-10 bg-slate-700 flex justify-center items-center rounded-full ">
            <span className="inline-block text-white font-bold">
              {user.name.charAt(0)}
            </span>
          </div>
          <div>
            <span className="block font-semibold text-xs xl:text-base">
              {user.name}
            </span>
            <span className="block text-xs">email@example.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
