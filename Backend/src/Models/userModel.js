const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("email not valid....");
        }
      },
    },

    phone: {
      type: Number,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      default: "https://randomuser.me/api/portraits/lego/5.jpg", // Replace with your demo link
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        let strongPassword = validator.isStrongPassword(value, {
          minLength: 6,
          minUppercase: 2,
          minSymbols: 1,
        });
        if (!strongPassword) {
          throw new Error("Password is not Strong...");
        }
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 16);
  }
  next();
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
