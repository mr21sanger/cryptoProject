import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

const cryptoContext = createContext();

const initialState = {
  isLoading: false,
  allCryptoData: [],
  added: false,
  portfolio: [],
  graphData: [],
  cryptoData: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "Loading":
      return {
        ...state,
        isLoading: true,
      };
    case "setCryptoData":
      return {
        ...state,
        isLoading: false,
        allCryptoData: action?.payload,
      };

    case "PortFolioAdd":
      return {
        ...state,
        isLoading: false,
        portfolio: action?.payload?.portfolio,
      };

    case "Set_Graph_Data":
      return {
        ...state,
        isLoading: false,
        graphData: action.payload,
      };

    case "Set_Crypto_detail":
      return {
        ...state,
        isLoading: false,
        cryptoData: action.payload,
      };

    default:
      return state;
  }
};

export const CryptoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const token = localStorage.getItem("token");

  const fetchCryptos = () => {
    dispatch({ type: "Loading" });
    axios
      .get("http://localhost:3000/api/cryptos/info")
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          dispatch({ type: "setCryptoData", payload: res?.data?.data });
        }
      })
      .catch((e) => console.error("axios error", e));
  };

  const portfolioEdit = (val) => {
    const data = {
      cryptoId: val,
    };
    dispatch({ type: "Loading" });
    axios
      .post("http://localhost:3000/api/addToPortfolio", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data?.success === true) {
          dispatch({ type: "PortFolioAdd", payload: res?.data });
        }
      })
      .catch((e) => console.log("Axios error", e));
  };

  const getPortfolio = () => {
    dispatch({ type: "Loading" });
    axios
      .get("http://localhost:3000/api/getPortfolio", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({ type: "PortFolioAdd", payload: res.data });
      })
      .catch((e) => {
        console.log("Axios error", e);
      });
  };

  const getCryptoData = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/cryptos/search/info/${id}`
      );
      return response?.data?.data; // Return the relevant data directly
    } catch (error) {
      console.error("Axios Error", error);
      return null; // Return null or handle the error as needed
    }
  };
  const getGraphData = (days = 7, id) => {
    // setTimeout(() => {
    // }, 3000);
    dispatch({ type: "Loading" });
    console.log(id);
    console.log("hii");
    

    try {
      axios
        .get(`http://localhost:3000/api/cryptos/info/graph/${id}/${days}`)
        .then((res) => {
          dispatch({ type: "Set_Graph_Data", payload: res.data.data });
          console.log(res.data);
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <cryptoContext.Provider
      value={{
        ...state,
        fetchCryptos,
        portfolioEdit,
        getPortfolio,
        getGraphData,
        getCryptoData,
      }}
    >
      {children}
    </cryptoContext.Provider>
  );
};

export const useCryptoReducer = () => {
  return useContext(cryptoContext);
};
