import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { HomeProvider } from "./reducers/homeReducer.jsx";
import { CryptoProvider } from "./reducers/cryptoReducer.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HomeProvider>
      <CryptoProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CryptoProvider>
    </HomeProvider>
  </React.StrictMode>
);
