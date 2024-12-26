import React, { useEffect, useState } from "react";
import { useCryptoReducer } from "../reducers/cryptoReducer";
import { shortName } from "../Pages/Logix";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useHomeContext } from "../reducers/homeReducer";

function Table() {
  const { allCryptoData, portfolioEdit, portfolio } = useCryptoReducer();
  const [portfolioState, setPortfolioState] = useState([]);
  const [previousPrices, setPreviousPrices] = useState({});
  const { isLoggedIn } = useHomeContext();
  const navigate = useNavigate();

  useEffect(() => {
    setPortfolioState(portfolio);
  }, [portfolio]);

  useEffect(() => {
    if (allCryptoData) {
      setPreviousPrices((prev) => {
        const updatedPrices = { ...prev };
        allCryptoData.forEach((crypto) => {
          if (!updatedPrices[crypto.id]) {
            // Only initialize if not already tracked
            updatedPrices[crypto.id] = crypto.current_price;
          }
        });
        return updatedPrices;
      });
    }
  }, [allCryptoData]);

  const updatePreviousPrices = () => {
    setPreviousPrices((prev) => {
      const updatedPrices = { ...prev };
      allCryptoData.forEach((crypto) => {
        updatedPrices[crypto.id] = crypto.current_price; // Update to latest price
      });
      return updatedPrices;
    });
  };

  const navigateToPage = (id) => {
    navigate(`/detail/${id}`);
  };

  const checkPortfolioState = (val) => {
    return portfolioState?.some((currElem) => currElem?.id === val);
  };

  const handlePortFolioClick = (e, val) => {
    e.stopPropagation();
    portfolioEdit(val);

    if (checkPortfolioState(val)) {
      setPortfolioState(portfolioState.filter((currElem) => currElem !== val));
    } else {
      setPortfolioState([...portfolioState, val]);
    }
  };

  useEffect(() => {
    // Update previous prices only after rendering
    const timer = setTimeout(updatePreviousPrices, 0);
    return () => clearTimeout(timer); // Cleanup timer
  }, [allCryptoData]);

  return (
    <>
      <div className="w-full my-12 overflow-x-auto">
        <table className="m-auto my-2 w-[95%]">
          <thead className="w-full bg-white h-8 text-black mx-auto">
            <tr>
              <th>sr.no.</th>
              <th>Crypto</th>
              <th>Symbol</th>
              <th>Current Price</th>
              <th>Price Change (24h)</th>
              <th>High (24h)</th>
              <th>Low (24h)</th>
              <th>Market Cap</th>
              <th>Market Cap Change (24h)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {allCryptoData &&
              allCryptoData.map((currElem, i) => {
                const isAdded = checkPortfolioState(currElem?.id);
                const prevPrice = previousPrices[currElem?.id] || currElem?.current_price;
                const priceChangeDirection =
                  currElem?.current_price > prevPrice ? "text-green-500" : currElem?.current_price < prevPrice ?  "text-red-500" : "text-white";

                return (
                  <tr
                    onClick={() => navigateToPage(currElem?.id)}
                    key={currElem?.id}
                    className="h-16 bg-neutral-900 bg-opacity-55 hover:bg-opacity-80 border-b hover:bg-neutral-800 transition-all duration-300 "
                  >
                    <td>{i + 1}</td>
                    <td className="gap-5 items-center my-2 px-2">
                      <div className="flex justify-start items-center gap-2 h-full my-2">
                        <img
                          className="w-12 h-12 rounded-full object-cover border-2"
                          src={currElem.image}
                          alt="Rounded avatar"
                        />
                        <p className="w-20">{shortName(currElem?.name, 8)}</p>
                      </div>
                    </td>
                    <td>{currElem?.symbol}</td>
                    <td className={`${priceChangeDirection}`}>
                      {(currElem?.current_price).toFixed(3)}
                    </td>
                    <td>{(currElem?.price_change_24h).toFixed(3)}</td>
                    <td>{(currElem?.high_24h).toFixed(3)}</td>
                    <td>{(currElem?.low_24h).toFixed(3)}</td>
                    <td>{currElem?.market_cap}</td>
                    <td>{(currElem?.market_cap_change_24h).toFixed(3)}</td>
                    <td className="font-bold text-2xl">
                      <button onClick={(e) => handlePortFolioClick(e, currElem)}>
                        {isAdded && isLoggedIn ? <FaStar /> : <CiStar />}
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
