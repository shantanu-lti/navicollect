import React, { useState } from "react";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { FaXmark } from "react-icons/fa6";
import PulseLoader from "react-spinners/PulseLoader";

const ChatBot = () => {
  const [showChatBox, setShowChatBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const chatbotUrl = "http://13.127.183.113:8015/";
  return (
    <>
      {showChatBox && (
        <div className="fixed z-10 rounded-lg bottom-2 right-2 w-[350px] h-[80vh] border shadow-md flex justify-center items-center lg:h-[84vh] lg:w-[350px] xl:w-[400px] 2xl:w-[460px] bg-[#0E1117]">
          {loading && (
            <PulseLoader size={5} color="#fff" speedMultiplier={0.5} />
          )}

          <iframe
            src={chatbotUrl}
            className={loading ? "hidden" : "rounded-lg h-full w-full"}
            onLoad={() => setLoading(false)}
          />

          <div
            className="absolute cursor-pointer top-[-0.6rem] left-[-0.6rem] bg-red-500 p-2 flex rounded-full"
            onClick={() => {
              setShowChatBox(false);
              setLoading(false);
            }}
          >
            <FaXmark className="inline fill-white" />
          </div>
        </div>
      )}
      {!showChatBox && (
        <div
          className="fixed right-8 bottom-8 2xl:right-10 2xl:bottom-10 cursor-pointer"
          onClick={() => {
            setShowChatBox(true);
            setLoading(true);
          }}
        >
          <BiSolidMessageSquareDots className="text-5xl 2xl:text-7xl fill-slate-800" />
          <div className="bg-red-600 h-7 w-7 flex justify-center items-center text-white rounded-full absolute top-[-0.5rem] right-[-0.4rem]">
            <span className="text-sm font-bold">1</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
