import React, { useEffect, useState } from "react";
import DetailContainer1 from "../components/DetailContainer1";
import DetailGraphContainer from "../components/DetailGraphContainer";
import { useParams } from "react-router-dom";
import { useCryptoReducer } from "../reducers/cryptoReducer";

function DetailPage() {
  const { id } = useParams();
  const { getCryptoData, isLoading, graphData, getGraphData } =
    useCryptoReducer();
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCryptoData(id);
      setCryptoData(data);
    };
    fetchData();
    console.log(id);
    getGraphData(7, id);
  }, [id]);

  if (!cryptoData || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="text-white w-full h-auto p-5">
        {/* CONTAINER----1 ******************************************** */}
        <div className="flex w-full gap-5 items-center">
          {" "}
          {/* Corrected className */}
          <DetailContainer1 cryptoData={cryptoData || {}} />
          {/* <DetailGraphContainer /> */}
          <DetailGraphContainer graphData = {graphData}/>
        </div>

        {/* Description container ************************* */}
        <div className="w-[95%] border-2 h-auto mx-auto my-10 border-neutral-800 border-opacity-60 rounded-2xl p-5 px-10 bg-black bg-opacity-55">
          <h1 className="font-semibold text-3xl">About :-</h1>
          <div className="h-auto my-5 px-4 text-gray-200 text-wrap text-justify leading-7 text-lg">
            {cryptoData?.description?.en
              .replace(/<[^>]*>/g, "")
              .replace(/(\r\n|\n|\r)/gm, "")
              .trim()}
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailPage;
