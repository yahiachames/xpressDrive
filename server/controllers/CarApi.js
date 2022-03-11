const router = require("express").Router();
const utils = require("../lib/utils");
const Car = require("../models/Car");
const Documents = require("../models/Documents");
const passport = require("passport");
const upload = require("../config/multer");
const fs = require("fs");
const convertToBase64 = require("../config/convertBase64");
const mongoose = require("mongoose");
const objectId = require("../config/objectId");
const checkKeyinObject = require("../config/checkKeyinObject");
const { type, get } = require("express/lib/response");
const req = require("express/lib/request");

router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Car.find({}, (err, result) => {
      if (err) next(err);
      if (result.length == 0)
        res.status(404).json({ success: false, msg: "no car found" });
      else res.status(200).json({ success: true, data: result });
    });
  }
);

router.post(
  "/create/:id",
  passport.authenticate("jwt", { session: false }),
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "vignettes", maxCount: 8 },
    { name: "assurance", maxCount: 8 },
    { name: "visite", maxCount: 8 },
  ]),
  (req, res, next) => {
    const {
      type,
      chv,
      marque,
      serial_number,
      air_conditioner,
      heating,
      level,
    } = req.body;
    const car = new Car({
      photo: convertToBase64(req.files["photo"][0].path),
      type,
      chv,
      marque,
      serial_number,
      air_conditioner,
      heating,
      vignettes: convertToBase64(req.files["vignettes"][0].path),
      assurance: convertToBase64(req.files["assurance"][0].path),
      visite: convertToBase64(req.files["visite"][0].path),
      level,
      owner_id: req.params.id,
      rider_id: req.params.id,
    });
    car.save({}, (err, result) => {
      if (err) res.status(500).json({ success: false, msg: err.kind });
      res.status(200).json({ success: true, msg: "registred successfuly" });
    });
  }
);

router.post(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "vignettes", maxCount: 8 },
    { name: "assurance", maxCount: 8 },
    { name: "visite", maxCount: 8 },
  ]),
  (req, res, next) => {
    Car.findOne({ owner_id: req.params.id }, (err1, result1) => {
      if (err1) res.status(500).json({ success: false, msg: err1.kind });
      else if (result1.length == 0)
        res.status(404).json({ success: false, msg: "no car found" });
      else {
        const {
          photo,
          type,
          chv,
          marque,
          serial_number,
          air_conditioner,
          heating,
          vignettes,
          assurance,
          visite,
          level,
          owner_id,
          rider_id,
        } = result1;
        let updateCar = {
          photo: checkKeyinObject(req.files, "photo")
            ? convertToBase64(req.files["photo"][0].path)
            : photo,
          type: req.body.type ? req.body.type : type,
          chv: req.body.chv ? req.body.chv : chv,
          marque: req.body.marque ? req.body.marque : marque,
          serial_number: req.body.serial_number
            ? req.body.serial_number
            : serial_number,
          air_conditioner: req.body.air_conditioner
            ? req.body.air_conditioner
            : air_conditioner,
          heating: req.body.heating ? req.body.heating : heating,
          vignettes: checkKeyinObject(req.files, "vignettes")
            ? convertToBase64(req.files["vignettes"][0].path)
            : vignettes,
          assurance: checkKeyinObject(req.files, "assurance")
            ? convertToBase64(req.files["assurance"][0].path)
            : assurance,
          visite: checkKeyinObject(req.files, "visite")
            ? convertToBase64(req.files["visite"][0].path)
            : visite,
          level,
          owner_id: req.params.id ? req.params.id : owner_id,
          rider_id: req.params.id ? req.params.id : rider_id,
        };

        Car.updateOne(
          { owner_id: req.params.id },
          updateCar,
          (err2, result2) => {
            if (err2) res.status(500).json({ success: false, msg: err2.kind });
            res
              .status(200)
              .json({ success: true, msg: "updated car successfully" });
          }
        );
      }
    });
  }
);

router.get("/one/:id", (req, res, next) => {
  Car.findOne({ owner_id: req.params.id }, (err1, result1) => {
    if (err1) res.status(500).json({ success: false, msg: err1.kind });
    else if (result1.length == 0)
      res.status(404).json({ success: false, msg: "no car found" });
    else res.status(200).json({ success: true, data: result1 });
  });
});
router.post("/delete/:id", (req, res, next) => {
  Car.findOneAndRemove({ owner_id: req.params.id }, (err1, result1) => {
    if (err1) res.status(500).json({ success: false, msg: err1.kind });
    else if (result1.length == 0)
      res.status(404).json({ success: false, msg: "no car found" });
    else res.status(200).json({ success: true, data: "deleted successfuly" });
  });
});

module.exports = router;
