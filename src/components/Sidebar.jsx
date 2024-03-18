import React from "react";
import {
  FaHouse,
  FaGauge,
  FaUser,
  FaCircleQuestion,
  FaRegFileLines,
} from "react-icons/fa6";
import useApi from "../utils/useApi";
import ltiMlogo from "../assets/LTIMindtree_logo.svg";
import naviLogo from "../assets/NaviIcon.png";
import { Link, useLocation } from "react-router-dom";
const Sidebar = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div className="hidden lg:flex flex-col w-[20%] max-w-[220px] 2xl:max-w-[250px] justify-between items-center bg-image-ai h-full">
      <div className="flex flex-col backdrop-blur-sm w-full h-full bg-slate-900/60">
        <div className="flex py-8 justify-center items-center gap-1">
          <img src={naviLogo} className="block w-8 xl:w-10 2xl:w-12" />
          <span className="font-bold text-white lg:text-lg xl:text-xl ">
            Navicollect.AI
          </span>
        </div>
        <ul className="md:flex flex-col">
          <li className="list-none">
            <Link
              to="/"
              className={
                pathname === "/"
                  ? "block list-none bg-slate-950 px-6 py-8 2xl:py-8 2xl:p-8 cursor-pointer"
                  : "block list-none px-6 py-8 2xl:py-8 2xl:p-8 cursor-pointer"
              }
            >
              <FaHouse className="fill-gray-100 mx-auto xl:text-lg inline" />{" "}
              <span className="text-white pl-4 text-sm xl:text-base">
                Follow Up
              </span>
            </Link>
          </li>
          <li className="list-noneblock ">
            <Link
              to="/risk-analysis"
              className={
                pathname.includes("risk-analysis")
                  ? "block list-none bg-slate-950 px-6 py-8 2xl:py-8 2xl:p-8 cursor-pointer"
                  : "block list-none px-6 py-8 2xl:py-8 2xl:p-8 cursor-pointer"
              }
            >
              <FaGauge className="fill-gray-100 mx-auto xl:text-lg inline" />
              <span className="text-white pl-4 text-sm xl:text-base">
                Risk Feed
              </span>
            </Link>
          </li>
          <li className="list-none">
            <Link
              to="/risk-modelling"
              className={
                pathname.includes("risk-modelling")
                  ? "block list-none bg-slate-950 px-6 py-8 2xl:py-8 2xl:p-8 cursor-pointer"
                  : "block list-none px-6 py-8 2xl:py-8 2xl:p-8 cursor-pointer"
              }
            >
              <FaRegFileLines className="fill-gray-100 mx-auto xl:text-lg inline" />
              <span className="text-white pl-4 text-sm xl:text-base">
                Risk Modelling
              </span>
            </Link>
          </li>
          <li className="list-none px-6 py-6 2xl:py-8 2xl:p-8 cursor-pointer">
            <FaCircleQuestion className="fill-gray-100 mx-auto xl:text-lg inline" />
            <span className="text-white pl-4 text-sm xl:text-base">Help</span>
          </li>
          <li className="list-none px-6 py-6 2xl:py-8 2xl:p-8 cursor-pointer">
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
