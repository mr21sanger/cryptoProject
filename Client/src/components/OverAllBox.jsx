import React from "react";

function OverAllBox() {
  return (
    <div className="h-auto flex flex-col items-center py-10 justify-cent">
      <div className="md:w-[70vw] w-[95%] text-center ">
        <h2 className="md:text-5xl font-semibold text-gray-200 md:p-3 tablePageHeading">
          Today's Crypto Prices by Market Cap
        </h2>
        <p className="text-gray-300 text-lg">
          The worldwide cryptocurrency market capitalization today stands at an
          estimated <span className="moreInfoSpan">$3.4T</span> , seeing a{" "}
          <span className="moreInfoSpan">1.41%</span> movement over the last 24
          hours. The total cryptocurrency trading volume in the past day is
          roughly <span className="moreInfoSpan">$171B</span>. Bitcoin's market
          dominance is at about <span className="moreInfoSpan">54.4%.</span>
        </p>
      </div>

      {/* CARD BLOCK */}
      {/* <div>

      </div> */}

      {/* <div>
        
      </div> */}
    </div>
  );
}

export default OverAllBox;
