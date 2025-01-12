import React from "react";
import { shortName } from "../Pages/Logix";
import {useNavigate} from "react-router-dom"

function TrendingCards({info}) {
  const thumb = info?.thumb || info?.item?.large || undefined;
  const navigate = useNavigate()
  console.log(info);
  


  return (
    <>
      <div className=" w-1/3 md:w-1/4 bg-neutral-900 border-black border hover:bg-neutral-800 p-6 rounded-lg shadow-sm flex flex-col items-center hover:border-orange-500 hover:shadow-orange-500 hover:translate-y-[-5px] transition-all duration-300 group"
      onClick={()=>navigate(`/detail/${info?.id}`)}>
        <div className="md:w-24 md:h-24 h-16 w-16 rounded-full overflow-hidden mb-4 transition-colors duration-300">
          <img
            src={thumb}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-center h-7 px-2 text-sm md:text-base md:h-10 font-medium text-gray-300 group-hover:text-orange-400 transition-colors duration-300">
          {shortName(info?.name || info?.item?.name, 15)}
        </p>
      </div>
    </>
  );
}

export default TrendingCards;
