const express = require("express");
const cors = require("cors");
const rootRouter = require("./controllers/BgRouter");

const passport = require("passport");
const ErrorApi = require("./controllers/ErrorApi");
const isAdmin = require("./config/isAdmin");
const app = express();

require("dotenv").config();
require("./config/db");
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/static", express.static("static"));
app.use(ErrorApi);

app.use("/api", rootRouter);

app.listen(process.env.PORT || 1999, () =>
  console.log("server is working on http://www.localhost:1999/")
);
