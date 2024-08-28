import React, { useEffect, useState } from "react";
import axios from "axios";

function PortfolioBox({ cryptoId }) {
  const [data, setData] = useState();
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3000/api/cryptos/search/info/${cryptoId}`)
  //     .then((res) => {
  //       console.log(res.data.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, []);
  return (
    <div className="w-[100%] md:h-[15em]  rounded-2xl p-3 bg-black bg-opacity-40 border-gray-500 portfolioCryptoBox ">
      {/* CRYPTO INTRO  */}
      <div className="flex items-center">
        <img
          className="w-16 h-16 rounded-full object-cover border-2"
          src="https://www.wrestlinginc.com/img/gallery/bully-ray-lays-out-how-the-bloodline-must-respond-to-roman-reigns-return-to-wwe/intro-1723042647.jpg"
          alt="Rounded avatar"
        />
        <div className="w-full  h-16 flex items-center justify-between">
          <div>
            <p className=" px-3 text-2xl flex items-center">Bitcoin • BTC</p>
            <p className=" px-3 text-lg flex items-center gap-2">
              $123456789{" "}
              <span className="bg-green-700 bg-opacity-55 px-1 rounded-lg">
                1.2%
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
      {/* **************************************** */}
      {/* CRYPTO DETAILS */}
      <div className="h-auto w-full grid grid-cols-2 md:grid-cols-4 my-3 gap-3 p-3">
        <div className="h-[3em] w-[8em]  text-center">
          <p className="text-lg leading-6">Market cap</p>
          <p>$ 15236548</p>
        </div>{" "}
        <div className="h-[3em] w-[8em]  text-center">
          <p className="text-lg leading-6">Market cap</p>
          <p>$ 15236548</p>
        </div>{" "}
        <div className="h-[3em] w-[8em]  text-center">
          <p className="text-lg leading-6">Market cap</p>
          <p>$ 15236548</p>
        </div>{" "}
        <div className="h-[3em] w-[8em]  text-center">
          <p className="text-lg leading-6">Market cap</p>
          <p>$ 15236548</p>
        </div>{" "}
        <div className="h-[3em] w-[8em]  text-center">
          <p className="text-lg leading-6">Market cap</p>
          <p>$ 15236548</p>
        </div>{" "}
        <div className="h-[3em] w-[8em]  text-center">
          <p className="text-lg leading-6">Market cap</p>
          <p>$ 15236548</p>
        </div>{" "}
        <div className="h-[3em] w-[8em]  text-center">
          <p className="text-lg leading-6">Market cap</p>
          <p>$ 15236548</p>
        </div>{" "}
        <div className="h-[3em] w-[8em]  text-center">
          <p className="text-lg leading-6">Market cap</p>
          <p>$ 15236548</p>
        </div>
      </div>
    </div>
  );
}

export default PortfolioBox;
