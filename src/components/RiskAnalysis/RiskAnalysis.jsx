import React, { useEffect, useRef, useState } from "react";
import AsyncSelect from "react-select/async";
import useReactSelectOptions from "../../utils/useReactSelectOptions";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";
import Chart from "chart.js/auto";
import Markdown from "react-markdown";
import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
const RiskAnalysis = () => {
  const { createOptions } = useReactSelectOptions();
  const [custGroup, setCustGroup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savingData, setSavingData] = useState(false);
  const [dataSaved, setDataSaved] = useState(false);
  const sentimentChartRef = useRef();
  const [analysis, setAnalysis] = useState(null);

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

  const handleAnalyzeRisk = async (e) => {
    e.preventDefault();
    if (!custGroup || custGroup === "") return;
    setLoading(true);
    setAnalysis(null);
    setDataSaved(false);
    const url =
      import.meta.env.VITE_BACKEND_BASE_URL +
      "/account-receivable/risk-analysis";
    try {
      const response = await axios.post(
        url,
        { company: custGroup.value },
        { headers: { "Access-Control-Allow-Origin": "*" } }
      );
      setAnalysis(response?.data?.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Could not analyse at this moment. Please try again later.");
    }
  };

  const handleSaveData = async (e) => {
    setSavingData(true);
    try {
      const url =
        import.meta.env.VITE_BACKEND_BASE_URL +
        "/account-receivable/risk-analysis/save";
      const payload = {
        sentiment: analysis.sentiment,
        analysis: analysis.llm_analysis,
        company: custGroup.value,
      };

      const response = await axios.post(url, payload, {
        headers: { "Access-Control-Allow-Origin": "*" },
      });
      if (response.data.status) {
        setDataSaved(true);
        toast.success("Data Saved Successfully");
      } else {
        toast.error("Could not save at this moment. Please tr again later");
      }
      setSavingData(false);
    } catch (err) {
      console.log(err);
      toast.error("Could not save at this moment. Please tr again later");
      setSavingData(false);
    }
  };
  useEffect(() => {
    let chart;
    console.log(analysis);
    if (analysis) {
      const { negative, neutral, positive } = analysis?.sentiment;
      chart = new Chart(sentimentChartRef.current, {
        type: "doughnut",
        data: {
          labels: ["Positive", "Neutral", "Negative"],
          datasets: [
            {
              label: "%",
              data: [
                Math.round(positive * 100),
                Math.round(negative * 100),
                Math.round(neutral * 100),
              ],
              hoverOffset: 10,
              backgroundColor: ["#22c55e", "#14b8a6", "#ef4444"],
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              position: "bottom",
              align: "center",
            },
          },
        },
      });
    } else {
      chart && chart.destroy();
    }

    return () => {
      chart && chart.destroy();
    };
  }, [analysis]);

  return (
    <>
      <div className="mt-4 w-full">
        <form onSubmit={handleAnalyzeRisk}>
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
          <div className="mt-4 flex justify-start items-center gap-6 ">
            <button
              disabled={loading}
              className="w-[160px] outline-0 bg-blue-600 text-white font-bold  px-4 py-3 rounded-sm"
            >
              {loading ? (
                <PulseLoader color="#ffffff" speedMultiplier={0.5} size={6} />
              ) : (
                "Analyze Risk"
              )}
            </button>
            <Link to="/risk-analysis/past-data">
              <button
                type="button"
                className="text-blue-600 font-bold rounded-full"
              >
                Past Data
              </button>
            </Link>
          </div>
        </form>
      </div>
      <div className="mt-4 lg:mt-12 w-full h-full flex flex-wrap lg:flex-nowrap justify-between gap-4 lg:gap-6">
        {analysis && !loading && custGroup ? (
          <>
            <div className="w-full 2xl:w-2/5  bg-white p-4 lg:p-6 2xl:p-8 rounded-sm shadow-md">
              <h2 className="text-xl font-bold">Sentiment Score</h2>
              <div className="flex h-full w-full justify-center items-center">
                <canvas
                  className="w-full md:max-h-[200px] 2xl:max-h-[350px]"
                  ref={sentimentChartRef}
                ></canvas>
              </div>
            </div>
            <div className="w-full h-full bg-white p-4 lg:p-6 2xl:p-8 rounded-sm shadow-md overflow-auto max-h-[550px]">
              <h2 className="text-xl font-bold">
                Analysis Report for {custGroup.value}
              </h2>

              <Markdown
                className={"markdown"}
              >{`${analysis.llm_analysis}`}</Markdown>
            </div>
          </>
        ) : (
          loading && (
            <>
              <div className="w-full  bg-gray-200 p-4 lg:p-6 2xl:p-8 h-[500px] rounded-sm  animate-pulse"></div>
              <div className="w-full  bg-gray-200 p-4 lg:p-6 2xl:p-8 h-[500px] rounded-sm animate-pulse"></div>
            </>
          )
        )}
      </div>

      {analysis && custGroup && (
        <div className="mt-4 flex justify-start items-center gap-6 ">
          {!dataSaved && (
            <button
              className="w-[160px] bg-blue-600 text-white font-bold  px-4 py-3 rounded-sm"
              onClick={handleSaveData}
            >
              {savingData ? (
                <PulseLoader color="#ffffff" speedMultiplier={0.5} size={6} />
              ) : (
                "Save Data"
              )}
            </button>
          )}
          {dataSaved && (
            <span className="block font-bold text-green-600 p-4 bg-green-100">
              <FaCheck className="text-green-600 inline mr-2" /> Data Saved
              Successfully
            </span>
          )}
          <button
            type="button"
            className="text-blue-600 font-bold rounded-full"
          >
            Send Email
          </button>
        </div>
      )}
    </>
  );
};

export default RiskAnalysis;
