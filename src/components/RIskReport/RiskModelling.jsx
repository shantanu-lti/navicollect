import React, { useEffect, useRef, useState } from "react";
import AsyncSelect from "react-select/async";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";
import useReactSelectOptions from "../../utils/useReactSelectOptions";
import reymondReport from "../../assets/reports/REYNOLDS_SMITH_&_HILLS_INC__2024-02-22_11-30-38.pdf";
// import PDFViewer from "./PDFViewer";
const RiskModelling = () => {
  const [custGroup, setCustGroup] = useState(null);
  const [loading, setLoading] = useState(false);
  const { createOptions } = useReactSelectOptions();
  const [showPfd, setShowPdf] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const __dirname = new URL(".", import.meta.url).pathname;
  const getClients = (searchText) => {
    return new Promise(async (resolve, reject) => {
      const url =
        import.meta.env.VITE_BACKEND_BASE_URL +
        "/account-receivable/get-clients";
      if (!searchText) return resolve([]);
      try {
        const {
          data: { result },
        } = await axios.post(url, { text: searchText });

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

  const handleGenerateReport = (e) => {
    e.preventDefault();
    console.log("generateReport called");
    setLoading(true);
    setShowPdf(false);
    setShowSummary(false);
    setTimeout(() => {
      setShowSummary(true);
    }, 100000);
    setTimeout(() => {
      setShowPdf(true);
      setLoading(false);
    }, 200000);
  };
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="w-full">
        <form onSubmit={handleGenerateReport}>
          <AsyncSelect
            cacheOptions
            defaultOptions
            isDisabled={loading}
            placeholder="Search and Select Customer Group Description"
            classNamePrefix="react-select"
            loadOptions={getClients}
            value={custGroup}
            isClearable
            required
            onChange={setCustGroup}
          />
          <div className="mt-4 flex justify-start items-center">
            <button
              disabled={loading}
              name="analyseRisk"
              className="w-[180px] outline-0 bg-blue-600 text-white font-bold  px-4 py-3 rounded-sm"
            >
              {loading ? (
                <PulseLoader color="#ffffff" speedMultiplier={0.5} size={6} />
              ) : (
                "Generate Report"
              )}
            </button>
          </div>
        </form>
      </div>

      {showSummary ? (
        <div className="p-4 rounded-sm bg-white shadow-md">
          <div className="flex justify-around">
            <div className="">
              <span className="block font-medium">Risk Score</span>
              <span className="block text-center text-green-600 font-bold">
                90
              </span>
            </div>
            <div>
              <span className="block font-medium">Credit Limit</span>
              <span className="block text-center text-green-600 font-bold">
                $1M
              </span>
            </div>
            <div>
              <span className="block font-medium">Possible OFAC</span>
              <span className="block text-center text-green-600 font-bold">
                No
              </span>
            </div>
            <div>
              <span className="block font-medium">Derogatory Legal</span>
              <span className="block text-center text-yellow-600 font-bold">
                2 ($3.6K)
              </span>
            </div>
            <div>
              <span className="block font-medium">Internation Score</span>
              <span className="block text-center text-green-600 font-bold">
                A
              </span>
            </div>
          </div>
        </div>
      ) : (
        loading && (
          <div className="w-full animate-pulse">
            <div className="h-24 w-full bg-slate-200 flex justify-center items-center">
              <PulseLoader color="#1e293b" speedMultiplier={0.5} size={12} />
              <span className="inline-block pl-4"> Generating Summary</span>
            </div>
          </div>
        )
      )}

      {showPfd && !loading && (
        <div className="flex-grow h-full w-full">
          <embed src={reymondReport} className="w-full h-full"></embed>
        </div>
      )}
      {!showPfd && loading && (
        <div className="flex-grow h-full w-full animate-pulse">
          <div className="h-full w-full bg-slate-200 flex justify-center items-center">
            <PulseLoader color="#1e293b" speedMultiplier={0.5} size={12} />
            <span className="inline-block pl-4"> Generating AI Report</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskModelling;
