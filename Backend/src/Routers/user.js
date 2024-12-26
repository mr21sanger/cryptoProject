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
          // Exclude password before sending the user data
          const { password, ...userWithoutPassword } = user.toObject();

          return res.status(200).json({
            success: true,
            token,
            data: userWithoutPassword,
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
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

// ADD TO PORTFOLIO********************************

router.route("/addToPortfolio").post(verifyToken, async (req, res) => {
  const { cryptoId } = req.body;

  try {
    if (req.user) {
      const userId = req.user.user._id;
      let userPortfolio = await PortfolioModel.findOne({ userId });

      if (!userPortfolio) {
        // If the user does not have a portfolio, create a new one
        userPortfolio = new PortfolioModel({
          userId,
          portfolioItems: [cryptoId], // Initialize with the new cryptoId
        });
        await userPortfolio.save();
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
    console.log("hii")
    console.log(user," user .........")
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error });
  }
});

//EDIT PROFILE
router.route("/editUser").post(verifyToken, async (req, res) => {
  try {
    const userId = req.user.user._id;
    const { name, email, img } = req.body;

    if (!name && !email && !img) {
      return res.status(400).json({ error: "No data provided to update." });
    }

    // Update user details in the database
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        ...(name && { name }),
        ...(email && { email }),
        ...(img && { img }),
      },
      { new: true } // Return the updated document
    );

    updatedUser.save()

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res
      .status(200)
      .json({ message: "User updated successfully.", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

//LOGOUT FUNCTION
router.post("/logout", (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
