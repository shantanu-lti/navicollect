const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const authRouter = require("./routers/authRouter");
const accountPayableRouter = require("./routers/accountPayableRouter");
const EXPRESS_PORT = process.env.EXPRESS_PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);

app.use("/account-payable", accountPayableRouter);

app.get("/health", (req, res) => {
  res.json({ message: "All OK" });
});

app.listen(EXPRESS_PORT, () => {
  console.log("Navicollect Backend listening on " + EXPRESS_PORT);
});
