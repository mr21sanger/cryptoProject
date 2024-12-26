import React from "react";

function Loading({height, bar1H = 12, bar2H = 8}) {
  return (
    <>
      <div className={`flex justify-center items-center h-${height}`}>
        <div className="flex space-x-1">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`relative w-1.5 bg-green-500 flex flex-col items-center animate-flicker 
              ${index % 2 === 0 ? "animate-move-slow" : "animate-move-fast"}`}
            >
              <div className={`absolute top-0 w-1 bg-green-500 h-${bar1H}`}></div>
              {/* <div className={`absolute bottom-0 w-1 bg-red-500 h-${bar2H}`}></div> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Loading;
