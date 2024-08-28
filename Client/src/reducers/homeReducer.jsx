import { createContext, useContext, useReducer } from "react";
import axios from "axios";

const homeReducer = createContext();

const initialState = {
  isLoggedIn: false,
  userData: [],
  isLoading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "Loading":
      return {
        ...state,
        isLoading: true,
      };

    case "setUserData":
      return {
        ...state,
        user: action?.payload,
        isLoading: false,
        isLoggedIn: true,
      };

    case "Logout":
      return {
        ...state,
        user: [],
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

export const HomeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // FETCH THE USER*********************

  const fetchUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const header = {
          Authorization: `Bearer ${token}`,
        };
        console.log(header);
        axios
          .get("http://localhost:3000/api/getUser", { headers: header })
          .then((res) => {
            console.log(res?.data?.user);
            dispatch({ type: "setUserData", payload: res?.data?.user });
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error("error", error);
      }
    }
  };

  // LOGIN FUNCTION********************
  const loginUser = (data) => {
    dispatch({ type: "Loading" });
    axios
      .post("http://localhost:3000/api/login", data)
      .then((res) => {
        if (res.status === 200) {
          const token = res?.data?.token;
          localStorage.setItem("token", token);
          dispatch({ type: "setUserData", payload: res.data.data });
        }
      })
      .catch((e) => {
        console.error("axios error", e);
      });
  };

  // CREATE USER***************
  const createUser = (data) => {
    axios
      .post("http://localhost:3000/api/createUser", data)
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: "setUserData", payload: res.data });
        }
      })
      .catch((e) => {
        console.error("Axios error", e);
      });
  };


  return (
    <homeReducer.Provider
      value={{ ...state, loginUser, createUser, fetchUser }}
    >
      {children}
    </homeReducer.Provider>
  );
};

export const useHomeContext = () => {
  return useContext(homeReducer);
};
