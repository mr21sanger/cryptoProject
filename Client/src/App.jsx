import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Container from "./components/Container";
import "./css/responsive.css";
import "./css/common.css";
import "./css/animation.css";
import { useHomeContext } from "./reducers/homeReducer";
import { useCryptoReducer } from "./reducers/cryptoReducer";
import PortfolioPage from "./Pages/PortfolioPage";
import Navbar from "./components/Navbar";
import DetailPage from "./Pages/DetailPage";
import MoreInfo from "./Pages/MoreInfo";
import Footer from "./components/Footer";


function App() {
  const [backgroundColor, setBackgroundColor] = useState("");
  const location = useLocation();
  const { fetchUser } = useHomeContext();
  const { fetchCryptos, getPortfolio, fetchTrending, fetchNews } =
    useCryptoReducer();

  useEffect(() => {
    fetchUser();
    fetchCryptos();
    getPortfolio();
    fetchTrending();
    fetchNews();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling effect
    });
  }, [location]);

  return (
    <>
      <Container className={`w-screen scrollbar-none`} style={{}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/moreInfo" element={<MoreInfo />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
        </Routes>
        <Footer/>
      </Container>
    </>
  );
}

export default App;
