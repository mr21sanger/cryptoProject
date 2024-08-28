import React from "react";
import { MdTrendingUp } from "react-icons/md";

function TopInfoBox({ info }) {
  return (
    <>
      <div className="md:w-[30%] h-[95%] bg-neutral-900 bg-opacity-35 rounded-lg px-5 py-3 border-gray-200 border-opacity-15 border topViewBox">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <MdTrendingUp />
          {info.heading}
        </h1>

        <div className="h-auto w-full">
          <table className="w-[90%] m-auto text-base md:my-1 table">
            <tbody className="">
              <tr className="h-9">
                <td className="w-">1.</td>
                <td className="w-auto">TonCoin</td>
                <td className="float-right">15%</td>
              </tr>
              <tr className="h-9">
                <td className="w-">1.</td>
                <td className="w-auto">TonCoin</td>
                <td className="float-right">15%</td>
              </tr>
              <tr className="h-9">
                <td className="w-">1.</td>
                <td className="w-auto">TonCoin</td>
                <td className="float-right">15%</td>
              </tr>
              <tr className="h-9">
                <td className="w-">1.</td>
                <td className="w-auto">TonCoin</td>
                <td className="float-right">15%</td>
              </tr>
              <tr className="h-9">
                <td className="w-">1.</td>
                <td className="w-auto">TonCoin</td>
                <td className="float-right">15%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default TopInfoBox;
