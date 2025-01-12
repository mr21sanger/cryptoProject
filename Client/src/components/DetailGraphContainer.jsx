import React, { useEffect, useState } from "react";
import { useCryptoReducer } from "../reducers/cryptoReducer";
import { useParams } from "react-router-dom";
import CryptoChart from "./CryptoChart";

function DetailGraphContainer({ graphData }) {
  // State to track the selected time range
  const [selectedRange, setSelectedRange] = useState("7");
  const { getGraphData, isLoading } = useCryptoReducer();
  const { id } = useParams();

  const handleRangeClick = (range) => {
    setSelectedRange(range);
    getGraphData(range, id);
  };

  useEffect(() => {
    getGraphData(7,id);
  }, []);

  return (
    <div className="h-auto bg-black md:w-[50%] bg-opacity-90">
      <div className=" md:h-16 mt-8 flex justify-evenly items-center">
        <button
          className={`py-2 px-5 ${
            selectedRange === "7" ? "bg-orange-600" : "bg-orange-800"
          } text-black font-bold rounded hover:ring-1 hover:ring-white`}
          onClick={() => handleRangeClick("7")}
        >
          7 days
        </button>
        <button
          className={`py-2 px-5 ${
            selectedRange === "30" ? "bg-orange-600" : "bg-orange-800"
          } text-black font-bold rounded hover:ring-1 hover:ring-white`}
          onClick={() => handleRangeClick("30")}
        >
          30 days
        </button>
        <button
          className={`py-2 px-5 ${
            selectedRange === "365" ? "bg-orange-600" : "bg-orange-800"
          } text-black font-bold rounded hover:ring-1 hover:ring-white`}
          onClick={() => handleRangeClick("365")}
        >
          365 days
        </button>
      </div>

      <div className="h-[35em]">
        {/* Add your graph rendering logic here based on selectedRange */}
        {isLoading ? (
          "Loading"
        ) : (
          <CryptoChart data={graphData?.prices} days={selectedRange} />
        )}
      </div>
    </div>
  );
}

export default DetailGraphContainer;
