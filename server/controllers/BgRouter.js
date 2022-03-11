var express = require("express");
var rootRouter = express.Router();
const UserApi = require("./UserApis");
const LocalizationApi = require("./LocalizationApi");
const DocumentsApi = require("./DocumentsApis");
const CarApis = require("./CarApi");

rootRouter.use("/users", UserApi);
rootRouter.use("/localization", LocalizationApi);
rootRouter.use("/documents", DocumentsApi);
rootRouter.use("/car", CarApis);

module.exports = rootRouter;
