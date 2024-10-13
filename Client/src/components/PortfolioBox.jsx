import React from "react";
import { formatNumber } from "../Pages/Logix";

function PortfolioBox({ cryptoData }) {

  const {
    name,
    symbol,
    current_price,
    image,
    market_cap,
    price_change_percentage_24h,
    high_24h,
    low_24h,
    price_change_24h,
    total_supply,
    total_volume,
    circulating_supply,
    market_cap_rank,
  } = cryptoData;

  return (
    <div className="w-[100%] md:h-[15em] rounded-2xl p-3 bg-black bg-opacity-40 border-gray-500 portfolioCryptoBox ">
      {/* CRYPTO INTRO */}
      <div className="flex items-center">
        <img
          className="w-16 h-16 rounded-full object-cover border-2"
          src={image}
          alt="Rounded avatar"
        />
        <div className="w-full h-16 flex items-center justify-between">
          <div>
            <p className="px-3 text-2xl flex items-center">
              {name} • {symbol}
            </p>
            <p className="px-3 text-lg flex items-center gap-2">
              ${current_price.toFixed(4)}{" "} {/* Format to 4 decimal places */}
              <span className="bg-green-700 bg-opacity-55 px-1 rounded-lg">
                {price_change_percentage_24h.toFixed(2)}% {/* Format to 2 decimal places */}
              </span>
            </p>
          </div>
          <div>
            <button className="mx-5 bg-orange-500 text-black font-bold hover:bg-opacity-65 transition-all duration-300 px-3 py-1 text-lg rounded-lg ">
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* CRYPTO DETAILS */}
      <div className="h-auto w-full grid grid-cols-2 md:grid-cols-4 my-3 gap-3 p-3">
        <div className="h-[3em] w-[8em] text-center">
          <p className="text-sm leading-6">Market cap</p>
          <p>$ {formatNumber(market_cap)}</p>
        </div>

        <div className="h-[3em] w-[8em] text-center">
          <p className="text-sm leading-6">Market Cap Rank</p>
          <p>{formatNumber(market_cap_rank)}</p>
        </div>

        <div className="h-[3em] w-[8em] text-center">
          <p className="text-sm leading-6">High 24h</p>
          <p>$ {high_24h.toFixed(3)}</p> {/* Format to 3 decimal places */}
        </div>

        <div className="h-[3em] w-[8em] text-center">
          <p className="text-sm leading-6">Low 24h</p>
          <p>$ {low_24h.toFixed(3)}</p> {/* Format to 3 decimal places */}
        </div>

        <div className="h-[3em] w-[8em] text-center">
          <p className="text-sm leading-6">Price Change(24h)</p>
          <p>$ {price_change_24h.toFixed(4)}</p> {/* Format to 4 decimal places */}
        </div>

        <div className="h-[3em] w-[8em] text-center">
          <p className="text-sm leading-6">Total Supply</p>
          <p>{formatNumber(total_supply)}</p>
        </div>

        <div className="h-[3em] w-[8em] text-center">
          <p className="text-sm leading-6">Total Volume</p>
          <p>{formatNumber(total_volume)}</p>
        </div>

        <div className="h-[3em] w-[8em] text-center">
          <p className="text-sm leading-6">Circulating supply</p>
          <p>{formatNumber(circulating_supply)}</p>
        </div>
      </div>
    </div>
  );
}

export default PortfolioBox;
