import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
const PastData = () => {
  const [data, setData] = useState(null);
  const { custGroup } = useParams();
  const getData = async () => {
    try {
      const url =
        import.meta.env.VITE_BACKEND_BASE_URL +
        "/account-receivable/risk-analysis/past-data";
      const response = await axios.get(url, {
        params: {
          custGroup: custGroup,
        },
      });
      if (response.data.status) setData(response.data.rows);
    } catch (err) {
      console.log(err);
      toast.error("Could get data at this moment. Please try again later.");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!custGroup) return <Link to="/risk-analysis" />;

  if (!data)
    return (
      <div className="flex flex-col justify-center animate-pulse">
        <div className="bg-slate-200 h-16 w-full"></div>
        <div className="bg-slate-50 h-16 w-full"></div>
        <div className="bg-slate-200 h-16 w-full"></div>
        <div className="bg-slate-50 h-16 w-full"></div>
        <div className="bg-slate-200 h-16 w-full"></div>
        <div className="bg-slate-50 h-16 w-full"></div>
        <div className="bg-slate-200 h-16 w-full"></div>
        <div className="bg-slate-50 h-16 w-full"></div>
        <div className="bg-slate-200 h-16 w-full"></div>
        <div className="bg-slate-50 h-16 w-full"></div>
        <div className="bg-slate-200 h-16 w-full"></div>
        <div className="bg-slate-50 h-16 w-full"></div>
        <div className="bg-slate-200 h-16 w-full"></div>
      </div>
    );
  console.log(data);
  return (
    <div className="w-full overflow-auto">
      <table className="w-full border-collapse rounded-sm past-data-table ">
        <thead className="bg-slate-800">
          <tr>
            <th rowSpan={2}>#</th>
            <th rowSpan={2}>Timestamp</th>
            <th rowSpan={2}>Customer Group</th>
            <th colSpan={3}>Risk Score</th>
            <th rowSpan={2}>Analysis</th>
            <th rowSpan={2}>View</th>
          </tr>
          <tr>
            <th>Positive</th>
            <th>Neutral</th>
            <th>Negative</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => {
              console.log(row);
              return (
                <tr
                  key={index}
                  className={index % 2 == 0 ? "bg-slate-50" : "bg-slate-300"}
                >
                  <td className="text-center">{index + 1}</td>
                  <td>{row.timestampz}</td>
                  <td>{row.company_name}</td>
                  <td className="text-center">
                    {Math.round(row.sentiment.positive * 100)}
                  </td>
                  <td className="text-center">
                    {Math.round(row.sentiment.neutral * 100)}
                  </td>
                  <td className="text-center">
                    {Math.round(row.sentiment.negative * 100)}
                  </td>
                  <td>{row.analysis.substring(0, 50) + "..."}</td>
                  <td className="text-center">
                    {
                      <Link to={"/risk-analysis/past-data/" + row.id}>
                        <FaArrowUpRightFromSquare className="mx-auto fill-slate-800" />
                      </Link>
                    }
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="bg-slate-50">
              <td className="text-center" colSpan={8}>
                No Record Found for {custGroup}. Click{" "}
                <Link to="/risk-analysis" className="text-blue-500">
                  here
                </Link>{" "}
                to go back
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PastData;
