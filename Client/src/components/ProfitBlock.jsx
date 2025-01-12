import React from "react";
import { MdTrendingUp } from "react-icons/md";


function ProfitBlock() {
  return (
    <div className="flex flex-col lg:flex-row my- items-center justify-between bg-neutral-950  px-6 rounded-lg shadow-lg text-gray-300">
      {/* Left Section: Chart and Stats */}
      <div className="w-full h-full lg:w-1/2 rounded-lg hide">
        <img
          src="src/background/download (1).png"
          alt=""
          className="w-full h-full"
        />
      </div>

      {/* Right Section: Call to Action */}
      <div className="w-full lg:w-1/2 lg:pl-8 mt-8 lg:mt-0">
        <div className="mb-4">
          <h1
           className="bg-transparent  text-white w-8 h-8 flex items-center justify-center rounded-full mr-4 text-9xl">
           <MdTrendingUp/>
          </h1>
          <h3 className="text-5xl centerText md:w-2/3 font-bold text-white">
            Get In-Depth Profit & Loss Analysis
          </h3>
        </div>
        <p className="text-gray-400 leading-relaxed centerText mb-6 md:w-2/3 text-lg">
          Connect your wallet to get 24h, daily, weekly, and cumulative Profit &
          Loss analysis. Level up your crypto investing strategy.
        </p>
        
      </div>
    </div>
  );
}

export default ProfitBlock;
