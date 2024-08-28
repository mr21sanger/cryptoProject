import React from "react";
import Navbar from "../components/Navbar";
import NavInfoBar from "../components/NavInfoBar";
import { NavLink } from "react-router-dom";
import TopInfoBox from "../components/TopInfoBox";
import Table from "../components/Table";
import { useHomeContext } from "../reducers/homeReducer";

function HomePage() {
  const { isLoggedIn, user } = useHomeContext();
  const topThings = [
    {
      id: 0,
      heading: "Trending Coins",
    },
    {
      id: 1,
      heading: "Trending Coins",
    },
    {
      id: 2,
      heading: "Trending Coins",
    },
    // {
    //   id: 3,
    //   heading: "Trending Coins",
    // },
  ];

  return (
    <>
      <div>
        {/* HEADER AND NAVBAR */}
        <div>
          {/* <Navbar /> */}
          <NavInfoBar />

          {/* LOGIN OR SINGUP ADVERTISEMENT */}

          {!isLoggedIn && (
            <div className="h-7 text-center bg-yellow-200 bg-opacity-85 border-b-2 border-white font-bold text-black text-lg ">
              <p className="advertise">
                For better Experience and access Portfolio.{" "}
                <NavLink className={"text-blue-600 font-bold"}>
                  Login/Signup
                </NavLink>
              </p>
            </div>
          )}
        </div>

        {/* HERO SECTION */}
        <div>
          {/* HEADING SECTION */}
          <div className="h-auto text-center py-5 heroSec">
            <h1 className="text-3xl font-bold">
              Today's Cryptocurrency Price by Market Cap
            </h1>
            <p className="text-lg font-light py-1">
              The Active cryptos in market is{" "}
              <span className="highlight">14901</span>, with
              <span class="highlight"> 100%</span> usd Market cap change over
              the last day.
            </p>
          </div>

          {/* TOP THINGS VIEW */}
          <div className="h-auto b-red-600 flex justify-evenly items-center topView">
            {topThings.map((currElem) => {
              return <TopInfoBox info={currElem} />;
            })}
          </div>

          <Table />
        </div>
      </div>
    </>
  );
}

export default HomePage;
