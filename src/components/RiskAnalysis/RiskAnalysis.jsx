import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import useReactSelectOptions from "../../utils/useReactSelectOptions";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";
const RiskAnalysis = () => {
  const { createOptions } = useReactSelectOptions();
  const [custGroup, setCustGroup] = useState("");
  const [riskReport, setRiskReport] = useState("");
  const [loading, setLoading] = useState(false);
  const getClients = (searchText) => {
    return new Promise(async (resolve, reject) => {
      const url =
        import.meta.env.VITE_BACKEND_BASE_URL + "/account-payable/get-clients";
      if (!searchText) return resolve([]);
      try {
        const {
          data: { result },
        } = await axios.post(url, { text: searchText });
        console.log(result);

        if (result.length === 0) resolve([]);
        const options = createOptions(result);
        resolve(options);
      } catch (err) {
        console.log(err);
        toast.error("Error Occured. Please try again later.");
        reject(err);
      }
    });
  };

  return (
    <div>
      <AsyncSelect
        cacheOptions
        defaultOptions
        placeholder="Search and Select Client Partner"
        classNamePrefix="react-select"
        loadOptions={getClients}
        onChange={(options) => {
          setCustGroup(options.value);
        }}
      />
      <div>
        <button className="w-[160px] mt-4 bg-blue-600 text-white font-bold  px-6 py-3 rounded-full">
          {loading ? (
            <PulseLoader color="#ffffff" speedMultiplier={0.5} size={6} />
          ) : (
            "Analyze Risk"
          )}
        </button>
        <button className="w-[160px] mt-4 bg-blue-600 text-white font-bold  px-6 py-3 rounded-full">
          Past Data
        </button>
      </div>
    </div>
  );
};

export default RiskAnalysis;
