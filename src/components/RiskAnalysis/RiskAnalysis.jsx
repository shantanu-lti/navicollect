import React, { useEffect, useRef, useState } from "react";
import AsyncSelect from "react-select/async";
import useReactSelectOptions from "../../utils/useReactSelectOptions";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";
import Chart from "chart.js/auto";

const RiskAnalysis = () => {
  const { createOptions } = useReactSelectOptions();
  const [custGroup, setCustGroup] = useState(null);
  const [riskReport, setRiskReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [savingData, setSavingData] = useState(false);
  const [dataSaved, setDataSaved] = useState(false);
  const sentimentChartRef = useRef();
  const [analysis, setAnalysis] = useState(null);

  // const [analysis, setAnalysis] = useState({
  //   llm_analysis:
  //     "- **Analysis of Dell Technologies' Financial News:**\n\n  - **Debt Tender Offers:**\n    - Dell Technologies has announced pricing terms for a cash tender offer for certain securities.\n    - This indicates active debt management, potentially aiming to reduce interest expenses or improve the maturity profile of the company's debt.\n    - The company's obligation to accept and pay for the tendered securities could impact its cash reserves and liquidity position.\n\n  - **Credit Rating Concerns:**\n    - Moody's warning about a potential downgrade due to operating challenges or declining demand suggests that Dell's profitability and cash flow generation are under scrutiny.\n    - A credit rating downgrade could increase borrowing costs and affect investor confidence.\n\n  - **Legal Settlement:**\n    - The proposed settlement of $23.9 billion related to the 2018 stock conversion deal could resolve legal uncertainties.\n    - However, the financial impact of the settlement on Dell's balance sheet and potential cash outflows needs to be assessed.\n\n  - **Q3 Fiscal 2024 Financial Results:**\n    - Dell reported a 6% decline in revenue to $24.7 billion for the third quarter, indicating a potential slowdown in sales.\n    - Operating income figures were not provided, which could be a concern for profitability analysis.\n    - The slower-than-expected recovery in the hardware sector could signal ongoing demand challenges.\n\n  - **Sustainability and ESG Reporting:**\n    - Dell's preparation for the EU's reporting requirements shows a commitment to corporate sustainability and ESG (Environmental, Social, and Governance) factors.\n    - This could enhance the company's reputation and appeal to socially responsible investors.\n\n- **Recommendations and Cautionary Measures:**\n\n  - **Debt Management:**\n    - Monitor the outcome of the tender offers and assess the impact on Dell's debt profile and interest savings.\n    - Ensure that liquidity is maintained at a healthy level post-tender offer execution.\n\n  - **Credit Rating and Profitability:**\n    - Dell should focus on operational efficiencies and cost management to mitigate the risk of a credit rating downgrade.\n    - Diversify product offerings and explore new markets to counteract declining demand in specific segments.\n\n  - **Legal and Settlement Implications:**\n    - Dell should transparently communicate the financial implications of the legal settlement to stakeholders.\n    - Set aside adequate reserves or financing arrangements to cover the settlement without significantly impacting operations.\n\n  - **Sales and Market Position:**\n    - Investigate the causes of the revenue decline and develop strategies to stimulate growth.\n    - Enhance marketing efforts and customer engagement to boost sales in a competitive hardware market.\n\n  - **ESG and Regulatory Compliance:**\n    - Continue investing in sustainability initiatives to meet ESG reporting requirements and attract a broader investor base.\n    - Stay ahead of regulatory changes to avoid compliance risks and potential fines.\n\n- **Overall Financial Position:**\n  - Dell's current financial news reflects a mix of strategic financial management actions and challenges in the operating environment.\n  - The company must balance its debt obligations, legal settlements, and operational performance while maintaining a strong focus on sustainability and market demand.\n  - Investors and stakeholders should watch for further developments, particularly regarding the company's response to market conditions and credit rating agency assessments.",
  //   sentiment: {
  //     negative: "0.9013759",
  //     neutral: "0.08520444",
  //     positive: "0.013419623",
  //   },
  // });
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
    setRiskReport(null);
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
      const response = await axios.post(url, analysis, {
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
            <button className="w-[160px]  bg-blue-600 text-white font-bold  px-4 py-3 rounded-sm">
              {loading ? (
                <PulseLoader color="#ffffff" speedMultiplier={0.5} size={6} />
              ) : (
                "Analyze Risk"
              )}
            </button>
            <button
              type="button"
              className="text-blue-600 font-bold rounded-full"
            >
              Past Data
            </button>
          </div>
        </form>
      </div>
      <div className="mt-4 lg:mt-12 w-full h-full flex flex-wrap lg:flex-nowrap justify-between gap-4 lg:gap-6">
        {analysis && !loading && custGroup ? (
          <>
            <div className="w-full  bg-white p-4 lg:p-6 2xl:p-8 rounded-sm shadow-md">
              <h2 className="text-xl font-bold">Sentiment Score</h2>
              <div className="flex h-full w-full justify-center items-center">
                <canvas
                  className="w-full md:max-h-[200px] 2xl:max-h-[350px]"
                  ref={sentimentChartRef}
                ></canvas>
              </div>
            </div>
            <div className="w-full h-full bg-white p-4 lg:p-6 2xl:p-8 rounded-sm shadow-md overflow-auto max-h-[500px]">
              <h2 className="text-xl font-bold">
                Analysis Report for {custGroup.value}
              </h2>
              {analysis.llm_analysis.split("\n").map((line, index) => {
                if (line.includes("**"))
                  return (
                    <h3 className="text-lg font-semibold my-4">
                      {line
                        .replace("**", "")
                        .replace("- ", "")
                        .replace(":**", "")}
                    </h3>
                  );
                else return <p>{line}</p>;
              })}
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
