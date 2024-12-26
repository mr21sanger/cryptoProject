import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function LoginCont() {
  const [activeButton, setActiveButton] = useState("login");

  return (
    <div className="w-full h-full rounded-xl z-50 ">
      {/* LOGIN/SIGNUP FORMS BUTTON */}
      <div className="w-full flex  justify-evenly items-center h-[10vh] lead z-50">
        <button
          className={`font-semibold text-2xl ${
            activeButton === "login" ? "border-b-4 border-white" : ""
          }`}
          onClick={() => setActiveButton("login")}
        >
          Login
        </button>
        <button
          className={`font-semibold text-2xl ${
            activeButton === "signup" ? "border-b-4 border-white" : ""
          }`}
          onClick={() => setActiveButton("signup")}
        >
          Signup
        </button>
      </div>

      <div className="">
        {activeButton === "login" ? <LoginForm/> : <SignupForm/> }
      </div>
    </div>
  );
}

export default LoginCont;
