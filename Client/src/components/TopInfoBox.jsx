import React from "react";
import { MdTrendingUp } from "react-icons/md";
import { shortName } from "../Pages/Logix";
import TrendingCards from "./TrendingCards";

function TopInfoBox({ info }) {
  return (
    <>
      <div className="md:w-[45%] h-[95%] bg-neutral-900 bg-opacity-35  rounded-lg px-5 py-3 border-gray-200 border-opacity-15 border topViewBox">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <MdTrendingUp />
          {info.heading}
        </h1>
        {/* CARDS************************ */}

        <div className="flex h-auto gap-5 my-5 items-center justify-evenly ">
          {info?.data?.slice(0, 3).map((currElem, i) => {
            return (
            <TrendingCards info={currElem} key={i}/>
            );
          })}
        </div>
      </div>
    </>
    // <>
    //   <div className="md:w-[30%] h-[95%] bg-neutral-900 bg-opacity-35 rounded-lg px-5 py-3 border-gray-200 border-opacity-15 border topViewBox">
    //     <h1 className="text-3xl font-bold flex items-center gap-3">
    //       <MdTrendingUp />
    //       {info.heading}
    //     </h1>

    //     <div className="h-auto w-full">
    //       <table className="w-[90%] m-auto text-base md:my-3 table">
    //         <tbody className="">
    //           {info?.data?.map((currElem, i) => {
    //             if (i < 5) {
    //               const thumb =
    //                 currElem?.thumb || currElem?.item?.large || undefined;
    //               const sparkline =
    //                 currElem?.data?.sparkline ||
    //                 currElem?.item?.sparkline ||
    //                 undefined;

    //               return (
    //                 <tr className="h-12">
    //                   <td className="px-2">{i + 1}.</td>
    //                   {thumb ? (
    //                     <td className="float-left mx-3 w-10 h-10">
    //                       <img
    //                         src={`${thumb}`}
    //                         alt=""
    //                         className="h-10 w-full rounded-full"
    //                       />
    //                     </td>
    //                   ) : null}
    //                   <td className="w-full text-base ">
    //                     {shortName(currElem?.name || currElem?.item?.name, 15)}{" "}
    //                   </td>
    //                   <td className="float-right">
    //                     {sparkline ? (
    //                       <img
    //                         src={sparkline}
    //                         alt="sparkline"
    //                         className="h-10 w-full"
    //                       />
    //                     ) : (
    //                       <span>hii</span> // This fallback ensures something renders even if sparkline is missing.
    //                     )}
    //                   </td>
    //                 </tr>
    //               );
    //             }
    //           })}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </>
  );
}

export default TopInfoBox;
