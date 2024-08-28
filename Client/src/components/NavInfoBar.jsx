import React from "react";

function NavInfoBar() {
  return (
    <>
      <div className="h-9 w-full border-b-2 infoBar bg-black bg-opacity-75 ">
        <div className="h-full">
          <ul className="flex justify-evenly h-full items-center text-lg font-light">
            <li>
              Active Cryptos :{" "}
              <span className="font-medium  highlight">495</span>
            </li>
            <li>
              Active Cryptos :{" "}
              <span className="font-medium highlight">495</span>
            </li>
            <li>
              Active Cryptos :{" "}
              <span className="font-medium highlight">495</span>
            </li>
            <li>
              Active Cryptos :{" "}
              <span className="font-medium highlight">495</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default NavInfoBar;
