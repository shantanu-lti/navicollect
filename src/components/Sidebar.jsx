import React from "react";
import {
  FaHouse,
  FaChartSimple,
  FaUser,
  FaCircleQuestion,
} from "react-icons/fa6";
import useApi from "../utils/useApi";
import ltiMlogo from "../assets/LTIMindtree_logo.svg";
import naviLogo from "../assets/NaviIcon.png";
const Sidebar = () => {
  const { logoutUser } = useApi();
  return (
    <div className="hidden lg:flex flex-col w-[20%] max-w-[220px] 2xl:max-w-[250px] justify-between items-center bg-image-ai h-full">
      <div className="flex flex-col bg-slate-900/60 backdrop-blur-sm w-full h-full">
        <div className="flex py-8 justify-center items-center gap-1">
          <img src={naviLogo} className="block w-8 xl:w-10 2xl:w-12" />
          <span className="font-bold text-white lg:text-lg xl:text-xl ">
            Navicollect.AI
          </span>
        </div>
        <ul className="md:flex flex-col">
          <li
            className="list-none bg-slate-950 px-6 py-8 2xl:py-8 2xl:p-8 cursor-pointer"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="My Space"
            data-tooltip-place="right"
          >
            <FaHouse className="fill-gray-100 mx-auto xl:text-lg inline" />{" "}
            <span className="text-white pl-4 text-sm xl:text-base">
              Follow Up
            </span>
          </li>
          <li
            className="list-none px-6 py-6 2xl:py-8 2xl:p-8 cursor-pointer"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Reports"
            data-tooltip-place="right"
          >
            <FaChartSimple className="fill-gray-100 mx-auto xl:text-lg inline" />
            <span className="text-white pl-4 text-sm xl:text-base">
              Analytics
            </span>
          </li>

          <li
            className="list-none px-6 py-6 2xl:py-8 2xl:p-8 cursor-pointer"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Help?"
            data-tooltip-place="right"
          >
            <FaCircleQuestion className="fill-gray-100 mx-auto xl:text-lg inline" />
            <span className="text-white pl-4 text-sm xl:text-base">Help</span>
          </li>
          <li
            className="list-none px-6 py-6 2xl:py-8 2xl:p-8 cursor-pointer"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Support ?"
            data-tooltip-place="right"
          >
            <FaUser className="fill-gray-100 mx-auto xl:text-lg inline" />
            <span className="text-white pl-4 text-sm xl:text-base">
              Support
            </span>
          </li>
        </ul>
      </div>
      <div className="bg-slate-900/60 backdrop-blur-sm">
        <img src={ltiMlogo} className="block w-3/5 mx-auto mb-8" />
      </div>
    </div>
  );
};

export default Sidebar;
