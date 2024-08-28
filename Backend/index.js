const cors = require("cors");
const express = require("express");
const app = express();
require("./src/Models/database");
const userRouter = require("./src/Routers/user");
const cryptoRouter = require("./src/Routers/cryptoRouter")

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api", userRouter);
app.use("/api/cryptos", cryptoRouter);

app.listen(3000, () => {
  console.log("server is running");
});
