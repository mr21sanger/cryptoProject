import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NavInfoBar from "../components/NavInfoBar";
import { NavLink } from "react-router-dom";
import TopInfoBox from "../components/TopInfoBox";
import Table from "../components/Table";
import { useHomeContext } from "../reducers/homeReducer";
import Modal from "../components/Modal";
import { useCryptoReducer } from "../reducers/cryptoReducer";
import LoginCont from "../components/LoginCont";
import NewsContainer from "../components/NewsContainer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "../components/Loading";
import TableContainer from "../components/TableContainer";
import ProfitBlock from "../components/ProfitBlock";

function HomePage() {
  const { isLoggedIn, user } = useHomeContext();
  const { trendingData, newsData } = useCryptoReducer();
  const [cryptoNews, setCryptoNews] = useState([]);
  useEffect(() => {
    setCryptoNews(newsData?.Data);
  }, [newsData]);

  console.log(cryptoNews, newsData);

  const topThings = [
    {
      id: 0,
      heading: "Trending Coins",
      data: trendingData.coins,
    },
    {
      id: 1,
      heading: "Trending NFTs",
      data: trendingData.nfts,
    },
    // {
    //   id: 2,
    //   heading: "Trending Categories",
    //   data: trendingData.categories,
    // },
    // {
    //   id: 3,
    //   heading: "Trending Coins",
    // },
  ];

  const [showLoginModal, setShowLoginModal] = useState(false);

  var settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false, // Keep arrows visible by default
    responsive: [
      {
        breakpoint: 768, // For devices smaller than 768px
        settings: {
          slidesToShow: 1, // Show only 1 slide
          slidesToScroll: 1,
          arrows: false, // Hide arrows on small screens
        },
      },
    ],
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  return (
    <>
      <div className="scrollbar-thin">
        {/* HEADER AND NAVBAR */}
        <div>
          {/* <Navbar /> */}
          <NavInfoBar />

          {/* LOGIN OR SINGUP ADVERTISEMENT */}

          {!isLoggedIn && (
            <div className="h-7 text-center bg-orange-400 bg-opacity-85 border-b-2 border-white font-bold text-black text-lg ">
              <p className="advertise">
                For better Experience and access Portfolio.{" "}
                <button
                  onClick={handleLoginClick}
                  className={"text-blue-600 font-bold"}
                >
                  Login/Signup
                </button>
              </p>
            </div>
          )}
        </div>

        {/* HERO SECTION */}
        <div>
          {/* HEADING SECTION */}
          <div className="h-auto my-2 text-center py-5 heroSec">
            <h1 className="text-3xl font-bold">
              Today's Cryptocurrency Price by Market Cap
            </h1>
            <p className="text-lg font-light py-1">
              The Active cryptos in market is{" "}
              <span className="highlight">8,985</span>, with
              <span class="highlight"> 1.73%</span> usd Market cap change over
              the last day.
            </p>
          </div>

          {/* NEWS CONTAINER */}
          <div className="w-[100vw] md:w-[95vw] mx-auto my-5 -z-10">
            {cryptoNews && cryptoNews.length > 0 ? (
              <Slider {...settings}>
                {cryptoNews.slice(0, 10).map((currElem, i) => (
                  <div
                    key={i}
                    className="h-[45vh] w-full items-center justify-center -z-0"
                  >
                    {" "}
                    <NewsContainer data={currElem} key={i} />
                  </div>
                ))}
              </Slider>
            ) : (
              <Loading height={16} /> // Fallback when no data is available
            )}
          </div>

          {/* TOP THINGS VIEW */}
          <div className="h-auto  my-16 flex justify-center w-[98vw] gap-2 md:gap-6 items-center topView">
            {topThings.map((currElem) => {
              return <TopInfoBox info={currElem} />;
            })}
          </div>

          {/* <Table /> */}
          <TableContainer />

          <ProfitBlock />

          {showLoginModal && (
            <Modal
              onclose={() => setShowLoginModal(false)}
              children={<LoginCont />}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
