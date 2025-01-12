import React, { useEffect, useState } from "react";
import { useCryptoReducer } from "../reducers/cryptoReducer";
import { formatNumber, shortName } from "../Pages/Logix";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { useHomeContext } from "../reducers/homeReducer";
import { FaBitcoin } from "react-icons/fa";
import {useNavigate} from "react-router-dom"

function TableContainer() {
  const { allCryptoData, portfolioEdit, portfolio } = useCryptoReducer();
  const [topData, setTopData] = useState([]);
  const [portfolioState, setPortfolioState] = useState([]);
  const { isLoggedIn } = useHomeContext();

  const navigate = useNavigate();

  useEffect(() => {
    setPortfolioState(portfolio);
  }, [portfolio]);

  useEffect(() => {
    if (allCryptoData) {
      setTopData(allCryptoData.slice(0, 5));
    }
  }, [allCryptoData]);

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

  const handleSeeMore = () => {
    navigate("/moreInfo")
  };

  return (
    <>
      <div className="h-[80vh] my-10 w-full bg-rd-300 flex flex-col gap-5 justify-center items-center">
        <div className="h-10  md:w-[70vw] px-5 flex">
          <button className="text-2xl md:w-[10%] h-full flex gap-2 justify-center items-center hover:border-b-2 hover:border-orange-400 transition-all duration-300 mx-5">
            <FaBitcoin /> Coins
          </button>
          {/* <button className="text-2xl  md:w-[15%] h-full hover:border-b-2 flex items-center justify-center gap-1 hover:border-orange-400 transition-all duration-300">
            <FaStar /> Portfolio
          </button> */}
        </div>

        <div className="bg-neutral-900 md:h-auto bg-opacity-95 md:w-[70vw] w-[95vw] rounded-2xl overflow-x-auto md:overflow-hidden ">
          <table className="w-[130vw] md:w-[95%] m-auto  md:h-[95%] my-4 text-center px-5 ">
            <thead className="md:p-5 p-2 text-gray-400">
              <th></th>
              <th className="text-base w-[8%]">#</th>
              <th className="text-base w-[40%] text-left">Name</th>
              <th className="text-base">Price</th>
              <th className="text-base">Change (24h)</th>
              <th className="text-base">Market Cap </th>
            </thead>
            <tbody className="p-5">
              {topData?.map((currElem, i) => {
                const isAdded = checkPortfolioState(currElem?.id);
                return (
                  <tr className=" hover:bg-neutral-800 transition-all duration-300 h-16"
                  onClick={() => navigate(`/detail/${currElem?.id}`)}>
                    <td className="md:text-xl">
                      <button
                        onClick={(e) => handlePortFolioClick(e, currElem)}
                      >
                        {isAdded && isLoggedIn ? <FaStar /> : <CiStar />}
                      </button>
                    </td>
                    <td className="text-sm">{i + 1}</td>
                    <td className="md:text-xl">
                      <div className="flex justify-start items-center gap-2 h-full my-2">
                        <img
                          className="w-12 h-12 rounded-full object-cover border-2"
                          src={currElem.image}
                          alt="Rounded avatar"
                        />
                        <p className="w-20">{shortName(currElem?.name, 8)}</p>
                      </div>
                    </td>

                    <td className="md:text-xl">
                      ${(currElem?.current_price).toFixed(3)}
                    </td>
                    <td className="md:text-xl">
                      {(currElem?.price_change_24h).toFixed(3)}
                    </td>
                    <td className="md:text-xl">${formatNumber(currElem?.market_cap)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="w-full h-[10vh] flex items-center justify-center my-5">
          <button
            className="border rounded-3xl md:w-[15vw] py-3 border-gray-500 hover:bg-neutral-700 hover:bg-opacity-40 transition-all duration-300 md:text-xl px-5"
            onClick={handleSeeMore}
          >
            See More
          </button>
        </div>
      </div>
    </>
  );
}

export default TableContainer;
