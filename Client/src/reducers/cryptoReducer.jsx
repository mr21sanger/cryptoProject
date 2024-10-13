import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import axios from "axios";

const cryptoContext = createContext();

const initialState = {
  isLoading: false,
  allCryptoData: [],
  added: false,
  portfolio: [],
  graphData: [],
  cryptoData: [],
  showModal: false,
  trendingData: [],
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

    case "Set_Trending":
      return {
        ...state,
        isLoading: false,
        trendingData: action.payload,
      };

    case "Show_Login_Modal":
      return {
        ...state,
        isLoading: false,
        showModal: true,
      };
    case "Hide_Login_Modal":
      return {
        ...state,
        isLoading: false,
        showModal: false,
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
    console.log(val, token);
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
          console.log(res);
          dispatch({ type: "PortFolioAdd", payload: res?.data });
        }
      })
      .catch((e) => {
        console.log("Axios error", e);
        if (e?.response.status === 401) {
          showLoginModal();
        }
      });
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
      return null;
    }
  };

  const getGraphData = useCallback((days = 7, id) => {
    dispatch({ type: "Loading" });
    const cacheKey = `graphData_${id}_${days}`;
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      dispatch({ type: "Set_Graph_Data", payload: parsedData });
      return;
    }
    axios
      .get(`http://localhost:3000/api/cryptos/info/graph/${id}/${days}`)
      .then((res) => {
        dispatch({ type: "Set_Graph_Data", payload: res.data.data });
        localStorage.setItem(cacheKey, JSON.stringify(res.data.data));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  //FETCHING TRENDING DATA***********************
  const fetchTrending = () => {
    dispatch({ type: "Loading" });
    axios
      .get("http://localhost:3000/api/cryptos/trending")
      .then((res) => {
        dispatch({ type: "Set_Trending", payload: res?.data?.data });
      })
      .catch((e) => console.log(e));
  };

  // SHOW LOGIN MODAL TO THE UNAUTHORIZE PERSON
  const showLoginModal = () => {
    dispatch({ type: "Show_Login_Modal" });
  };
  //HIDE LOGIN MODAL AFTER CLICKING CLOSE BUTTON
  const hideLoginModal = () => {
    dispatch({ type: "Hide_Login_Modal" });
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
        hideLoginModal,
        fetchTrending,
      }}
    >
      {children}
    </cryptoContext.Provider>
  );
};

export const useCryptoReducer = () => {
  return useContext(cryptoContext);
};
