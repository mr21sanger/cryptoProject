const express = require("express");
const router = express.Router();
const UserModel = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const PortfolioModel = require("../Models/portfolio");
const jwt = require("jsonwebtoken");
const verifyToken = require("../Middleware/token");
const SECRET_KEY = "shiwangsanger";

// CREATE USER **********************************************

router.route("/createUser").post(async (req, res) => {
  try {
    const { name, email, phone, age, password, cPassword } = req.body;

    if (password !== cPassword) {
      return res.status(404).json({
        success: false,
        error: "Password did not match",
      });
    }

    const data = await UserModel.create({
      name,
      email,
      phone,
      age,
      password,
      cPassword,
    });
    const userData = await data.save();
    console.log(process.env.TZ);

    jwt.sign({ userData }, SECRET_KEY, { expiresIn: "300s" }, (err, token) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          error: "Error generating token",
        });
      }
      return res.status(200).json({
        success: true,
        userData,
        token,
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// LOGIN USER*******************************

router.route("/login").post(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(404)
        .json({ success: false, error: "Please Provide credentials" });
    }
    let user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: "Email not found" });
    }

    let check = await bcrypt.compare(password, user.password);
    if (check) {
      jwt.sign({ user }, SECRET_KEY, { expiresIn: "3000s" }, (err, token) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            error: "Token generation failed",
          });
        } else {
          return res.status(200).json({
            success: true,
            token,
            data: user,
          });
        }
      });
    } else {
      return res.status(404).json({
        success: false,
        error: "Invalid Password",
      });
    }
  } catch (error) {
    console.error(error);
  }
});

// ADD TO PORTFOLIO********************************

router.route("/addToPortfolio").post(verifyToken, async (req, res) => {
  const { cryptoId } = req.body;
  try {
    if (req.user) {
      const userId = req.user.user._id;
      let userPortfolio = await PortfolioModel.findOne({ userId });
      console.log(userPortfolio);

      if (!userPortfolio) {
        // If the user does not have a portfolio, create a new one
        userPortfolio = new PortfolioModel({
          userId,
          portfolioItems: [cryptoId], // Initialize with the new cryptoId
        });
      } else {
        const inPortfolio = await PortfolioModel.findOne({
          userId,
          portfolioItems: { $elemMatch: { $eq: cryptoId } },
        });
        if (inPortfolio) {
          userPortfolio.portfolioItems.pop(cryptoId);
          // Save the portfolio
          await userPortfolio.save();

          return res.status(200).json({
            success: true,
            added: false,
            portfolio: userPortfolio.portfolioItems,

            message: "Removed successfully",
          });
        } else {
          userPortfolio.portfolioItems.push(cryptoId);
          // Save the portfolio

          await userPortfolio.save();
          return res.status(200).json({
            success: true,
            added: true,
            portfolio: userPortfolio.portfolioItems,
            message: "Added successfully",
          });
        }
      }
    } else {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get portfolio*******************************************

router.route("/getPortfolio").get(verifyToken, async (req, res) => {
  try {
    const userId = req.user.user._id;
    const portfolio = await PortfolioModel.findOne({ userId });
    const items = portfolio.portfolioItems;
    return res.status(200).json({ success: true, portfolio: items });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// FETCH USER ON LOAD*****************************
router.route("/getUser").get(verifyToken, async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error });
  }
});

module.exports = router;
