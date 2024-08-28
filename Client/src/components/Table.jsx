import React, { useEffect, useState } from "react";
import { useCryptoReducer } from "../reducers/cryptoReducer";
import { shortName } from "../Pages/Logix";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Table() {
  const { allCryptoData, portfolioEdit, portfolio, getPortfolio } =
    useCryptoReducer();
  const [portfolioState, setPortfolioState] = useState([]);

  useEffect(() => {
    setPortfolioState(portfolio);
  }, [portfolio]);

  const navigate = useNavigate();

  const navigateToPage = (id) => {
    navigate(`/detail/${id}`);
  };

  const checkPortfolioState = (val) => {
    return portfolioState.includes(val) ? true : false;
  };

  const handlePortFolioClick = (val) => {
    portfolioEdit(val);
    if (checkPortfolioState(val)) {
      setPortfolioState(portfolioState.filter((currElem) => currElem !== val));
    } else {
      setPortfolioState([...portfolioState, val]);
    }
  };

  return (
    <>
      <div className="w-full my-12 overflow-x-auto">
        <table className="m-auto my-2 w-[95%] ">
          <thead className="w-full bg-white h-8 text-black mx-auto">
            <tr className="">
              <th>sr.no.</th>
              <th>Crypto</th>
              <th>Symbol</th>
              <th>Current Price</th>
              <th>Price Change(24h)</th>
              <th>high(24h)</th>
              <th>low(24h)</th>
              <th>Market Cap</th>
              <th>Market Cap Change(24h)</th>
              <th>action</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {allCryptoData &&
              allCryptoData.map((currElem, i) => {
                const isAdded = checkPortfolioState(currElem?.id);
                return (
                  <tr
                    onClick={() => navigateToPage(currElem?.id)}
                    key={currElem?.id}
                    className="h-16 bg-neutral-900 bg-opacity-55 hover:bg-opacity-80 border-b hover:bg-neutral-800 transition-all duration-300 "
                  >
                    <td>{i + 1}</td>
                    <td className="flex justify-start gap-5 items-center h-full my-2 px-2">
                      <img
                        className="w-12 h-12 rounded-full object-cover border-2"
                        src={currElem.image}
                        alt="Rounded avatar"
                      />
                      {shortName(currElem?.name)}
                    </td>
                    <td>{currElem?.symbol}</td>
                    <td>{(currElem?.current_price).toFixed(3)}</td>
                    <td>{(currElem?.price_change_24h).toFixed(3)}</td>
                    <td>{(currElem?.high_24h).toFixed(3)}</td>
                    <td>{(currElem?.low_24h).toFixed(3)}</td>
                    <td>{currElem?.market_cap}</td>
                    <td>{(currElem?.market_cap_change_24h).toFixed(3)}</td>
                    <td className="font-bold text-2xl">
                      <button onClick={() => handlePortFolioClick(currElem.id)}>
                        {isAdded ? <FaStar /> : <CiStar />}
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
