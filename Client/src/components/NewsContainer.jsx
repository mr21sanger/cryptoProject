import React from "react";
import { convertDate, shortName } from "../Pages/Logix";

function NewsContainer({ data }) {
  const { imageurl, title, published_on, guid } = data;

  return (
    <>
      <div className="h-full rounded  mx-auto bg-neutral-900 text-white bg-opacity-95 w-[95%] -z-20">
        <img src={imageurl} alt={title} className="w-full h-[30vh] object-cover" />

        {/* News Content */}
        <div className="px-4 py-2">
          {/* Title */}
          <h2 className="text-lg font-semibold text-white mb-2">{shortName(title,50)} <a
            href={guid}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-normal   text-sm hover:underline"
          >
            Read More 
          </a></h2>

          {/* Description */}
          {/* <p className="text-sm text-gray-600 mb-4 line-clamp-3">{body}</p> */}

          {/* Published Date */}
          <p className="text-xs text-gray-300">
            Published on:  <span className="font-medium">{convertDate(published_on)}</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default NewsContainer;
