const express = require("express");
const router = express.Router();
const axios = require("axios");

// CRYPTO CURRENCY API FETCH**************************************
router.route("/info").get(async (req, res) => {
  try {
    const currency = req.query.currency || "usd";
    const url = "https://api.coingecko.com/api/v3/coins/markets";
    const parameters = {
      vs_currency: currency,
      order: "market_cap_desc",
      per_page: 100,
      page: 1,
      sparkline: "false",
    };

    const queryParams = new URLSearchParams(parameters).toString();
    const response = await axios.get(`${url}?${queryParams}`);
    let { data } = response;

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
});

router.route("/search/info/:id").get(async (req, res) => {
  const searchCrypto = req.params.id;
  console.log(searchCrypto);

  try {
    const crypto = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${searchCrypto}`
    );

    return res.json({ success: true, data: crypto.data });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
});

router.route("/info/graph/:id/:days").get(async (req, res) => {
  const cryptoId = req.params.id;
  const days = req.params.days;
  console.log(cryptoId, 1);
  console.log(days, 2);
  try {
    const graphData = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=${days}`
    );
    console.log(graphData.data);
    return res.status(200).json({ success: true, data: graphData.data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error });
  }
});

module.exports = router;
