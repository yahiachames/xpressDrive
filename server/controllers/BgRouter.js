var express = require("express");
var rootRouter = express.Router();
const UserApi = require("./UserApis");
const LocalizationApi = require("./LocalizationApi");

rootRouter.use("/users", UserApi);
rootRouter.use("/localization", LocalizationApi);

module.exports = rootRouter;
