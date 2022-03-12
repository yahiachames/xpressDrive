var express = require("express");
var rootRouter = express.Router();
const UserApi = require("./UserApis");
const LocalizationApi = require("./LocalizationApi");
const DocumentsApi = require("./DocumentsApis");
const CarApis = require("./CarApi");
const RideApis = require("./RideApi");
const RegionApis = require("./RegionApi");
const SubRegionApi = require("./SubRegionApi");
const StreetApi = require("./StreetApi");

rootRouter.use("/user", UserApi);
rootRouter.use("/localization", LocalizationApi);
rootRouter.use("/documents", DocumentsApi);
rootRouter.use("/car", CarApis);
rootRouter.use("/ride", RideApis);
rootRouter.use("/region", RegionApis);
rootRouter.use("/subregion", SubRegionApi);
rootRouter.use("/street", StreetApi);



module.exports = rootRouter;
