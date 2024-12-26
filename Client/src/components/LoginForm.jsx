import React, { useEffect, useState } from "react";
import { useHomeContext } from "../reducers/homeReducer";
import Loading from "./Loading";



function LoginForm() {
  const { loginUser, isLoading } = useHomeContext();
  const [disable, setDisable] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false)

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    setButtonLoading(isLoading);
    console.log(isLoading, "loading");
    
  }, [isLoading]);


  useEffect(() => {
    if (loginData?.password.length >= 6 && loginData.email) setDisable(false);
    else setDisable(true);
  }, [loginData]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    loginUser(loginData);
  };

  return (
    <div className="">
      <div
        className="
    w-full h-auto bg-re-50"
      >
        <form onSubmit={handleLoginSubmit}>
          <div className="w-full flex flex-col justify-center items-center">
            {/* EMAIL************************************************ */}
            <div className="w-[90%] my-2">
              <label htmlFor="Email">Email:</label>
              <br />
              <input
                type="email"
                id="Email"
                className="w-[100%] mt-1 h-[5vh] p-5 rounded-lg bg-neutral-700 bg-opacity-70"
                value={loginData.email}
                required
                onChange={(e) => {
                  setLoginData({ ...loginData, email: e.target.value });
                }}
              />
            </div>

            {/* PASSWORD**************************************** */}
            <div className="w-[90%] my-2">
              <label htmlFor="Password">Password:</label>
              <br />
              <input
                type="password"
                id="Password"
                min={6}
                className="w-[100%] mt-1 h-[5vh] p-5 rounded-lg bg-neutral-700 bg-opacity-70"
                value={loginData.password}
                required
                onChange={(e) => {
                  setLoginData({ ...loginData, password: e.target.value });
                }}
              />
            </div>
            <button
              type="submit"
              className={`mt-4 px-6 py-2  text-black font-bold w-[90%]  rounded-lg ${
                !disable
                  ? "bg-orange-400 hover:shadow-2xl cursor-pointer"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
              disabled={disable}
            >
              {buttonLoading ? <Loading height={8} bar1H={7} bar2H={""}/> : "Sign in"}
            </button>
          </div>
        </form>
      </div>
      
    </div>
  );
}

export default LoginForm;
