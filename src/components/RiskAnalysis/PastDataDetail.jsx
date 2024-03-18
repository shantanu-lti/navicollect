import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Chart from "chart.js/auto";
import { toast } from "react-toastify";
import Markdown from "react-markdown";

const PastDataDetail = () => {
  const { id } = useParams();
  const sentimentChartRef = useRef();
  const [data, setData] = useState(null);
  const getData = async () => {
    try {
      const url =
        import.meta.env.VITE_BACKEND_BASE_URL + "/risk-analysis/past-data/id";
      const response = await axios.get(url, {
        params: {
          id: id,
        },
      });
      if (response.data.status) setData(response.data.rows[0]);
      console.log(response.data.rows);
    } catch (err) {
      console.log(err);
      toast.error("Could get data at this moment. Please try again later.");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let chart;
    if (data) {
      const { negative, neutral, positive } = data?.sentiment;
      chart = new Chart(sentimentChartRef.current, {
        type: "doughnut",
        data: {
          labels: ["Positive", "Neutral", "Negative"],
          datasets: [
            {
              label: "%",
              data: [
                Math.round(positive * 100),
                Math.round(neutral * 100),
                Math.round(negative * 100),
              ],
              hoverOffset: 10,
              backgroundColor: ["#22c55e", "#14b8a6", "#ef4444"],
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              position: "right",
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
  }, [data]);

  if (!data)
    return (
      <div className="flex flex-col animate-pulse gap-4 lg:gap-6">
        <div className="flex flex-col md:flex-row gap-4 lg:gap-6">
          <div className="h-[400px] w-full rounded-md bg-slate-300"></div>
          <div className="h-[400px] w-full rounded-md bg-slate-300"></div>
        </div>
        <div className="h-[700px] w-full rounded-md bg-slate-300"></div>
      </div>
    );

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <div className="flex flex-col md:flex-row gap-4 lg:gap-6">
        <div className="w-full rounded-md bg-white shadow-md p-4 lg:p-6 2xl:p-8">
          <h2 className="text-xl font-bold">Info</h2>
          <div className="flex justify-center items-start mt-4">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="py-3 font-medium">Analysis Date:</td>
                  <td className="py-3">{data.timestampz}</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Genrated By:</td>
                  <td className="py-3">{data.name}</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Customer Group:</td>
                  <td className="py-3">{data.company_name}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full bg-white p-4 lg:p-6 2xl:p-8 rounded-md shadow-md">
          <h2 className="text-xl font-bold">Financial Risk Score</h2>
          <div className="flex h-full w-full justify-center items-center">
            <canvas
              className="w-full md:max-h-[200px] 2xl:max-h-[250px]"
              ref={sentimentChartRef}
            ></canvas>
          </div>
        </div>
      </div>
      <div className="h-full w-full rounded-md bg-white shadow-md  p-4 lg:p-6 2xl:p-8">
        <h2 className="text-xl font-bold">
          Error Analysis for {data.company_name}
        </h2>
        <Markdown className={"markdown"}>{data.analysis}</Markdown>
      </div>
    </div>
  );
};

export default PastDataDetail;
