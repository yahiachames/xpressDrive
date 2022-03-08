const express = require("express");
const cors = require("cors");
const UserApi = require("./controllers/UserApis");
const passport = require("passport");
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

app.use("/", UserApi);

app.listen(process.env.PORT || 1999, () =>
  console.log("server is working on http://www.localhost:1999/")
);
