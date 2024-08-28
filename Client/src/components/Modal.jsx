import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

function Modal({ children, onclose }) {
  return (
    <div className="fixed inset-0 bg-black  bg-opacity-15 backdrop-blur-sm flex justify-center items-center">
      <div className="flex flex-col gap-2 text-white">
        <button
          onClick={onclose}
          className="text-4xl hover:bg-white hover:text-black rounded-full h-12 w-12 justify-center flex items-center transition-colors duration-300"
        >
          <RxCross2 />
        </button>
        <div className="bg-neutral-900 rounded-3xl h-[80vh] w-[35vw]">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
