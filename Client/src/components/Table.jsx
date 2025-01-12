import React, { useEffect, useState, useMemo } from "react";
import { useCryptoReducer } from "../reducers/cryptoReducer";
import { formatNumber, shortName } from "../Pages/Logix";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useHomeContext } from "../reducers/homeReducer";

function Table() {
  const { allCryptoData, portfolioEdit, portfolio } = useCryptoReducer();
  const [portfolioState, setPortfolioState] = useState([]);
  const [previousPrices, setPreviousPrices] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10); // Customize rows per page
  const { isLoggedIn } = useHomeContext();
  const navigate = useNavigate();

  // Update portfolio state on portfolio change
  useEffect(() => {
    setPortfolioState(portfolio);
  }, [portfolio]);

  // Initialize previous prices
  useEffect(() => {
    if (allCryptoData) {
      setPreviousPrices((prev) => {
        const updatedPrices = { ...prev };
        allCryptoData.forEach((crypto) => {
          if (!updatedPrices[crypto.id]) {
            updatedPrices[crypto.id] = crypto.current_price;
          }
        });
        return updatedPrices;
      });
    }
  }, [allCryptoData]);

  // Update previous prices on price changes
  const updatePreviousPrices = () => {
    setPreviousPrices((prev) => {
      const updatedPrices = { ...prev };
      allCryptoData.forEach((crypto) => {
        updatedPrices[crypto.id] = crypto.current_price;
      });
      return updatedPrices;
    });
  };

  // Handle portfolio actions
  const checkPortfolioState = (val) =>
    portfolioState?.some((currElem) => currElem?.id === val);

  const handlePortFolioClick = (e, val) => {
    e.stopPropagation();
    portfolioEdit(val);

    if (checkPortfolioState(val)) {
      setPortfolioState(
        portfolioState.filter((currElem) => currElem.id !== val)
      );
    } else {
      setPortfolioState([...portfolioState, val]);
    }
  };

  // Filter and paginate data
  const filteredData = useMemo(() => {
    return allCryptoData?.filter((crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allCryptoData, searchTerm]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredData?.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  return (
    <div className="w-full my-12 overflow-x-auto">
      <div className="flex justify-between items-center w-[95%] mx-auto mb-4 px-4">
        <input
          type="text"
          placeholder="Search Cryptocurrency"
          className="w-full max-w-md px-4 py-2 rounded-xl border  bg-neutral-800 text-gray-200 placeholder-gray-400 text-lg shadow-lg focus:outline-none focus:border-orange-400 transition duration-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <p className="text-white">Page: {currentPage}</p>
      </div>

      <table className="m-auto my-2 w-[95%] rounded-xl border-collapse p-5 overflow-hidden ">
        <thead className="bg-orange-500 text-gray-200 bg-opacity-85 h-8">
          <tr>
            <th className="rounded-tl-lg">#</th>
            <th>Crypto</th>
            <th>Symbol</th>
            <th>Current Price</th>
            <th>Price Change (24h)</th>
            <th>High (24h)</th>
            <th>Low (24h)</th>
            <th>Market Cap</th>
            <th>Volume</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData?.map((crypto, index) => {
            const isAdded = checkPortfolioState(crypto?.id);
            const prevPrice =
              previousPrices[crypto?.id] || crypto?.current_price;
            const priceChangeDirection =
              crypto?.current_price > prevPrice
                ? "text-green-500"
                : crypto?.current_price < prevPrice
                ? "text-red-500"
                : "";

            return (
              <tr
                key={crypto?.id}
                onClick={() => navigate(`/detail/${crypto?.id}`)}
                className="hover:bg-neutral-900
                h-16 transition duration-200 text-center bg-neutral-950 text-gray-100 text-lg"
              >
                <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                <td className="flex items-center justify-start gap-2 h-16 px-2">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={crypto?.image}
                    alt={crypto?.name}
                  />
                  {shortName(crypto?.name, 10)}
                </td>
                <td>{crypto?.symbol}</td>
                <td
                  className={`${
                    crypto?.current_price > prevPrice
                      ? "text-green-500"
                      : crypto?.current_price < prevPrice
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  {crypto?.current_price.toFixed(3)}
                </td>

                <td
                  className={`${
                    crypto?.price_change_percentage_24h > 0
                      ? "text-green-500"
                      : crypto?.price_change_percentage_24h < 0
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  {crypto?.price_change_percentage_24h.toFixed(3)}%
                </td>
                <td>{crypto?.high_24h.toFixed(3)}</td>
                <td>{crypto?.low_24h.toFixed(3)}</td>
                <td>$ {formatNumber(crypto?.market_cap)}</td>
                <td>$ {formatNumber(crypto?.total_volume)}</td>
                <td>
                  <button
                    onClick={(e) => handlePortFolioClick(e, crypto)}
                    className="text-2xl"
                  >
                    {isAdded && isLoggedIn ? <FaStar /> : <CiStar />}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      {/* Pagination */}
      <div className="flex justify-between items-center gap-2 mt-4 w-[95%] mx-auto">
        {/* Previous Button */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg text-lg ${
            currentPage === 1
              ? "bg-neutral-700 text-gray-400 cursor-not-allowed"
              : "bg-orange-600 text-white"
          }`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        <div>
          {Array.from(
            {
              length: Math.min(
                3,
                Math.ceil(filteredData?.length / rowsPerPage)
              ),
            },
            (_, i) => {
              const pageNumber = i + 1;

              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`px-4 py-2 rounded-full ${
                    currentPage === pageNumber
                      ? "bg-orange-500 text-white"
                      : "bg-neutral-800 text-white"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            }
          )}
          {currentPage < Math.ceil(filteredData?.length / rowsPerPage) && (
            <>
              <span className="text-gray-400">...</span>
              <button
                onClick={() =>
                  setCurrentPage(Math.ceil(filteredData?.length / rowsPerPage))
                }
                className="px-3 py-2 rounded-full bg-neutral-800 text-white"
              >
                {Math.ceil(filteredData?.length / rowsPerPage)}
              </button>
            </>
          )}
        </div>
        {/* Next Button */}
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(filteredData?.length / rowsPerPage))
            )
          }
          disabled={
            currentPage === Math.ceil(filteredData?.length / rowsPerPage)
          }
          className={`px-4 py-2 rounded-lg text-lg ${
            currentPage === Math.ceil(filteredData?.length / rowsPerPage)
              ? "bg-neutral-700 text-gray-400 cursor-not-allowed"
              : "bg-orange-600 text-white"
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default Table;
