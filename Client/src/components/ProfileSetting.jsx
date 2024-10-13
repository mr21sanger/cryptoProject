import React, { useEffect, useState } from "react";

function ProfileSetting({ close }) {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger the transition when the component is mounted
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100); // Slight delay to trigger smooth transition
  }, []);

  return (
    <>
      <div
        className={`w-[30%] h-auto pb-5 rounded-lg bg-neutral-950 border-2  border-gray-800 border-opacity-35 absolute right-0 transition-transform duration-500 bg-opacity-100 ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* PROFILE  */}
        <div className="h-[15vh] flex items-center justify-start px-5 gap-2">
          <div className="w-20 h-20 bg-gray-600 rounded-full">
            <img src="" alt="" className="w-full h-full rounded-full" />
          </div>
          <div className="w-[70%] h-[80%] flex justify-center flex-col">
            <p className="text-xl">Hello, Shiwang</p>
            <p className="text-sm text-neutral-200">
              shiwang21sanger@gmail.com
            </p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="h-[10vh] w-[90%] my-2 bg-neutral-800 rounded-3xl mx-auto flex justify-center">
          <button className="border-r border-neutral-900 hover:bg-neutral-900 hover:bg-opacity-10 rounded-l-3xl w-full">
            Edit Profile
          </button>
          <button className="border-l border-neutral-900 hover:bg-neutral-900 hover:bg-opacity-10 rounded-r-3xl w-full">
            Your Portfolio
          </button>
        </div>

        {/* MORE OPTIONS */}
        <div className="h-auto w-[90%] flex-col flex items-start gap-3  mx-auto px-3">
          <button className="hover:bg-opacity-10 w-full rounded-2xl hover:bg-neutral-500 text-left h-10 px-5">Get Source Code</button>
          <button className="hover:bg-opacity-10 w-full rounded-2xl hover:bg-neutral-500 text-left h-10 px-5">Logout</button>
        </div>
      </div>
    </>
  );
}

export default ProfileSetting;
