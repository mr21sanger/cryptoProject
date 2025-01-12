import React, { useEffect, useState } from "react";
import { CiGlobe } from "react-icons/ci";
import { FaSheetPlastic } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaReddit } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useCryptoReducer } from "../reducers/cryptoReducer";

function DetailContainer1({ cryptoData }) {
  

  // Early return for loading state
  if (!cryptoData) {
    return <div>Loading...</div>;
  }
  

  const {
    current_price,
    high_24h,
    low_24h,
    max_supply,
    price_change_24h,
    total_supply,
    market_cap,
    market_cap_change_24h,
    total_volume,
  } = cryptoData?.market_data || {}; // Ensure these fields are correctly destructured

  return (
    <>
      <div className="md:w-[50%] h-auto border-gray-950 py-5 bg-black bg-opacity-55">
        {/* INFO BLOCK */}
        <div className="flex items-center gap-3 h-[5em] w-full px-5">
          <img
            className="w-16 h-16 rounded-full object-cover border-2"
            src={cryptoData?.image?.large}
            alt={`${cryptoData?.name} logo`}
          />

          <div>
            <h1 className="font-medium text-xl flex items-center gap-2">
              {cryptoData?.name}
              <span className="font-normal text-base text-gray-50">
                • {cryptoData?.symbol?.toUpperCase()}
              </span>
            </h1>
            <p className="text-3xl gap-2 flex items-center">
              ${current_price?.usd?.toLocaleString()}
              <span className={` bg-opacity-55 px-1 text-lg rounded-lg ${ price_change_24h > 0 ? "bg-green-700 text-green-400 font-bold" : "bg-red-700 text-red-400 font-bold"}`}>
                {price_change_24h?.toFixed(2)}%
              </span>
            </p>
          </div>
        </div>

        {/* Other details block */}
        <h1 className="text-2xl px-5 my-5">Market Stats</h1>
        <div className="my-5 w-full h-[13em] grid grid-cols-3 gap-5 items-center bg-neutral-900 rounded-lg bg-opacity-55 border border-neutral-800">
          <div className="text-center">
            <h4 className="text-gray-400 text-xl font-medium">Market Cap</h4>
            <p>{market_cap?.usd?.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <h4 className="text-gray-400 text-xl font-medium">High (24h)</h4>
            <p>{high_24h?.usd?.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <h4 className="text-gray-400 text-xl font-medium">Low (24h)</h4>
            <p>{low_24h?.usd?.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <h4 className="text-gray-400 text-xl font-medium">Max Supply</h4>
            <p>{max_supply?.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <h4 className="text-gray-400 text-xl font-medium">Total Volume</h4>
            <p>{total_volume?.usd?.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <h4 className="text-gray-400 text-xl font-medium">Total Supply</h4>
            <p>{total_supply?.toLocaleString()}</p>
          </div>
        </div>

        {/* Official Links Block */}
        <h1 className="text-2xl px-5 mt-10">Official Links</h1>
        <div className="flex px-16 justify-start my-2 gap-5 items-center">
          {cryptoData?.links?.homepage && (
            <a
              href={cryptoData.links.homepage[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-600 font-medium p-1 flex justify-center items-center gap-1 rounded text-gray-50 text-center cursor-pointer"
            >
              <CiGlobe /> Website
            </a>
          )}
          {cryptoData?.links?.whitepaper && (
            <a
              href={cryptoData.links.whitepaper}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-600 font-medium p-1 flex justify-center items-center gap-1 rounded text-gray-50 text-center cursor-pointer"
            >
              <FaSheetPlastic /> Whitepaper
            </a>
          )}
          {cryptoData?.links?.github && (
            <a
              href={cryptoData.links.github[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-600 font-medium p-1 flex justify-center items-center gap-1 rounded text-gray-50 text-center cursor-pointer"
            >
              <FaGithub /> Github
            </a>
          )}
        </div>

        {/* Social Links */}
        <h1 className="text-2xl px-5 mt-10">Social Links</h1>
        <div className="flex px-16 justify-start my-2 gap-5 items-center">
          {cryptoData?.links?.subreddit_url && (
            <a
              href={cryptoData.links.subreddit_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-600 font-medium p-1 flex justify-center items-center gap-1 rounded text-gray-50 text-center cursor-pointer"
            >
              <FaReddit /> Reddit
            </a>
          )}
        </div>
      </div>
    </>
  );
}

export default DetailContainer1;
