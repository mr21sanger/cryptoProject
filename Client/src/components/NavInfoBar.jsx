import React from "react";

function NavInfoBar() {
  return (
    <>
      <div className="h-9 w-full border-b-2 infoBar bg-black bg-opacity-75 ">
        <div className="h-full">
          <ul className="flex justify-evenly h-full items-center text-lg font-light">
            <li>
              Active Cryptos :{" "}
              <span className="font-medium  highlight">2.4m+</span>
            </li>
            <li>
              Exchanges :{" "}
              <span className="font-medium highlight">773
              </span>
            </li>
            <li>
              Market Cap :{" "}
              <span className="font-medium highlight">$3.27T+</span>
            </li>
            <li>
              24h Vol:{" "}
              <span className="font-medium highlight">$111.24B+</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default NavInfoBar;
