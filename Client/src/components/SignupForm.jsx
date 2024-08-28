import React, { useEffect, useState } from "react";
import { useHomeContext } from "../reducers/homeReducer";

function SignupForm() {
  const [step, setStep] = useState(1);
  const [disable, setDisable] = useState(true);
  const { createUser } = useHomeContext();

  const [signupData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    phone: "",
    age: "",
  });

  useEffect(() => {
    if (signupData?.password.length >= 6 && signupData.cPassword)
      setDisable(false);
    else setDisable(true);
  }, [signupData]);

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    createUser(signupData);
  };

  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="slit-in-vertical">
      <div className="w-full h-auto bg-re-50">
        <form onSubmit={handleSignUpSubmit}>
          <div className="w-full flex flex-col justify-center items-center">
            {step === 1 && (
              <>
                {/* NAME */}
                <div className="w-[90%] my-2">
                  <label htmlFor="Name">Name:</label>
                  <br />
                  <input
                    type="text"
                    className="w-[100%] mt-1 h-[5vh] p-5 rounded-lg bg-neutral-700 bg-opacity-70"
                    value={signupData.name}
                    onChange={(e) =>
                      setSignUpData({ ...signupData, name: e.target.value })
                    }
                  />
                </div>

                {/* EMAIL */}
                <div className="w-[90%] my-2">
                  <label htmlFor="Email">Email:</label>
                  <br />
                  <input
                    type="email"
                    className="w-[100%] mt-1 h-[5vh] p-5 rounded-lg bg-neutral-700 bg-opacity-70"
                    value={signupData.email}
                    onChange={(e) =>
                      setSignUpData({ ...signupData, email: e.target.value })
                    }
                  />
                </div>

                {/* PHONE */}
                <div className="w-[90%] my-2">
                  <label htmlFor="Phone">Phone:</label>
                  <br />
                  <input
                    type="number"
                    className="w-[100%] mt-1 h-[5vh] p-5 rounded-lg bg-neutral-700 bg-opacity-70"
                    value={signupData.phone}
                    onChange={(e) =>
                      setSignUpData({ ...signupData, phone: e.target.value })
                    }
                  />
                </div>

                {/* AGE */}
                <div className="w-[90%] my-2">
                  <label htmlFor="Age">Age:</label>
                  <br />
                  <input
                    type="number"
                    max={100}
                    min={1}
                    className="w-[100%] mt-1 h-[5vh] p-5 rounded-lg bg-neutral-700 bg-opacity-70"
                    value={signupData.age}
                    onChange={(e) =>
                      setSignUpData({ ...signupData, age: e.target.value })
                    }
                  />
                </div>

                <button
                  type="button"
                  className="mt-4 px-6 py-2 bg-orange-400 text-black font-bold w-[90%] hover:shadow-2xl rounded-lg"
                  onClick={nextStep}
                >
                  Continue
                </button>
              </>
            )}

            {step === 2 && (
              <>
                {/* INTRO */}

                {/* PASSWORD */}
                <div className="w-[90%] my-2 ">
                  <label htmlFor="Password">Password:</label>
                  <br />
                  <input
                    type="password"
                    className="w-[100%] mt-1 h-[5vh] p-5 rounded-lg bg-neutral-700 bg-opacity-70"
                    value={signupData.password}
                    onChange={(e) =>
                      setSignUpData({ ...signupData, password: e.target.value })
                    }
                  />
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="w-[90%] my-2">
                  <label htmlFor="ConfirmPassword">Confirm Password:</label>
                  <br />
                  <input
                    type="password"
                    className="w-[100%] mt-1 h-[5vh] p-5 rounded-lg bg-neutral-700 bg-opacity-70"
                    value={signupData.cPassword}
                    onChange={(e) =>
                      setSignUpData({
                        ...signupData,
                        cPassword: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex justify-between w-[90%] mt-4 gap-2">
                  <button
                    type="button"
                    className="px-6 py-2 w-[50%] bg-gray-300 text-black font-bold rounded-lg"
                    onClick={prevStep}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className={`px-6 py-2 w-[50%] font-bold rounded-lg ${
                      !disable
                        ? "bg-orange-400 hover:shadow-2xl cursor-pointer text-black"
                        : "bg-gray-500 cursor-not-allowed"
                    }`}
                    disabled={disable}
                  >
                    Signup
                  </button>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
