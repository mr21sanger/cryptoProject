import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Container from "./components/Container";
import "./css/responsive.css";
import "./css/common.css";
import "./css/animation.css";
import SignUp from "./Pages/SignUp";
import { useHomeContext } from "./reducers/homeReducer";
import { useCryptoReducer } from "./reducers/cryptoReducer";
import PortfolioPage from "./Pages/PortfolioPage";
import Navbar from "./components/Navbar";
import DetailPage from "./Pages/DetailPage";

function App() {
  const [backgroundColor, setBackgroundColor] = useState("");

  const { fetchUser } = useHomeContext();
  const { fetchCryptos, getPortfolio, fetchTrending,fetchNews } = useCryptoReducer();

  useEffect(() => {
    fetchUser();
    fetchCryptos();
    getPortfolio();
    fetchTrending();
    fetchNews()
  }, []);

  return (
    <>
      <Container className={`w-screen`} style={{}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<SignUp />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
