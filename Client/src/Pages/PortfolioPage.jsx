import React, { useEffect } from "react";
import PortfolioBox from "../components/PortfolioBox";
import { useCryptoReducer } from "../reducers/cryptoReducer";
import axios from "axios";

function PortfolioPage() {
  const { portfolio } = useCryptoReducer();

  useEffect(() => {
    portfolio.map((currElem) => {
      axios
        .get(`http://localhost:3000/api/cryptos/search/info/${currElem}`)
        .then((res) => console.log(res.data, currElem))
        .catch((e) => console.log(e, currElem));
    });
  }, []);
  return (
    <>
      <div className="w-[90%] mx-auto my-2 py-5  border rounded-xl bg-neutral-900 bg-opacity-80">
        <div className="w-full h-auto border-b-2">
          <h1 className="font-normal text-4xl my-2 mx-5  w-full">
            My Portfolio
          </h1>
        </div>
        <div className="h-auto w-full md:p-5 p-2 md:grid grid-cols-2 gap-5">
          {portfolio &&
            portfolio.map((currElem) => {
              return <PortfolioBox key={currElem} cryptoId={currElem} />;
            })}
        </div>
      </div>
    </>
  );
}

export default PortfolioPage;
