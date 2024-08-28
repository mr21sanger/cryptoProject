const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    portfolioItems: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const PortfolioModel = mongoose.model("portfolio", portfolioSchema);

module.exports = PortfolioModel;
