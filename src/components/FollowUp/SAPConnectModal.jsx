import React from "react";

import { FaXmark } from "react-icons/fa6";
import { toast } from "react-toastify";

const SAPConnectModal = ({ setShowSapConnectModal }) => {
  const handelSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      toast.success("Data Saved");
    }, 300);
  };

  return (
    <div className="w-full relative top-0 left-0 z-20">
      <div
        className="h-screen w-full absolute top-0 left-0  backdrop-blur  bg-[#a8a8a88a] z-30"
        onClick={() => {
          setShowSapConnectModal(false);
        }}
      ></div>
      <div className=" h-screen w-full absolute top-0 flex justify-center items-center">
        <div className="w-4/5 p-4 lg:p-6 max-w-[800px] bg-white shadow-md rounded-sm z-50">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-lg font-bold">SAP Connect - </span>
              <span className="text-lg font-medium">GET API AR</span>
            </div>

            <span
              className="inline cursor-pointer p-2"
              onClick={() => {
                setShowSapConnectModal(false);
              }}
            >
              <FaXmark />
            </span>
          </div>
          <div className="mt-4 lg:mt-6 w-full">
            <form onSubmit={handelSubmit}>
              <div className="form-group">
                <label htmlFor="sapSID">SAP SID</label>
                <input
                  id="sapSID"
                  name="sapSID"
                  type="text"
                  className="block mt-2 w-full p-3 border  border-gray-300 rounded-sm outline-gray-300"
                  required
                />
              </div>
              <div className="form-group mt-4">
                <label htmlFor="apiEndpoint">API Endpoint</label>
                <input
                  id="apiEndpoint"
                  name="apiEndpoint"
                  type="text"
                  className="block mt-2 w-full p-3 border  border-gray-300 rounded-sm outline-gray-300"
                  required
                />
              </div>
              <div className="form-group mt-4">
                <label htmlFor="authentication">Authentication</label>
                <select
                  id="authentication"
                  name="authentication"
                  className="block mt-2 w-full p-3 border  border-gray-300 rounded-sm outline-gray-300"
                  required
                >
                  <option value="Basic">Basic</option>
                  <option value="OAuth">OAuth</option>
                </select>
              </div>
              <div className="form-group mt-4 flex gap-4">
                <input
                  type="checkbox"
                  name="fetchCredentials"
                  id="fetchCredentials"
                />
                <label htmlFor="fetchCredentials">Fetch Credentials </label>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <button className=" bg-blue-600 text-white font-bold  px-6 py-3 text-sm rounded-full">
                  Save
                </button>
                <button
                  type="button"
                  className=" text-blue-600 font-bold  text-sm rounded-full"
                >
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SAPConnectModal;
