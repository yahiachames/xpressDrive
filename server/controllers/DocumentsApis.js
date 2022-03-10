const router = require("express").Router();
const utils = require("../lib/utils");
const User = require("../models/User");
const Documents = require("../models/Documents");
const passport = require("passport");
const upload = require("../config/multer");
const fs = require("fs");
const convertToBase64 = require("../config/convertBase64");
const mongoose = require("mongoose");
const objectId = require("../config/objectId");
const checkKeyinObject = require("../config/checkKeyinObject");

router.post(
  "/upload/:id",
  passport.authenticate("jwt", { session: false }),
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "cin", maxCount: 8 },
    { name: "permis", maxCount: 8 },
  ]),
  (req, res, next) => {
    // console.log(convertToBase64(req.files["avatar"][0].path));

    // res.json({ avatar: req.files["avatar"], gallery: req.files["gallery"] });

    const document = new Documents({
      cin: req.files["cin"][0].path
        ? convertToBase64(req.files["cin"][0].path)
        : null,
      photo: req.files["photo"][0].path
        ? convertToBase64(req.files["photo"][0].path)
        : null,
      permis: req.files["permis"][0].path
        ? convertToBase64(req.files["permis"][0].path)
        : null,
      user: req.params.id,
    });

    document.save({}, (err, result) => {
      if (err) next(err);
      res
        .status(200)
        .json({ success: true, msg: "files uploaded successfuly" });
    });
  }
);

router.get(
  "/get/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Documents.findOne({ user: objectId(req.params.id) }, (err, result) => {
      if (err) next(err);
      res.send(result);
    });
  }
);

router.post(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "cin", maxCount: 8 },
    { name: "permis", maxCount: 8 },
  ]),
  (req, res, next) => {
    Documents.findOne({ user: objectId(req.params.id) }, (err, result) => {
      if (err) next(err);
      else {
        if (!req.files)
          res.status(404).json({ success: false, msg: "no files found" });
        const { cin, _id, permis, photo, user } = result._doc;
        const document = {
          cin: checkKeyinObject(req.files, "cin")
            ? convertToBase64(req.files["cin"][0].path)
            : cin,
          photo: checkKeyinObject(req.files, "photo")
            ? convertToBase64(req.files["photo"][0].path)
            : photo,
          permis: checkKeyinObject(req.files, "permis")
            ? convertToBase64(req.files["permis"][0].path)
            : permis,
          user: user,
        };

        Documents.findByIdAndUpdate(_id, document, (err2, res2) => {
          if (err2) next(err2);
          res.status(200).json({ success: true, msg: "updated successfuly" });
        });
      }
    });
  }
);

router.post(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Documents.findOneAndDelete(
      { user: objectId(req.params.id) },
      (err, result) => {
        console.log(err);
        if (err) {
          let msg = err.path + " " + err.kind;
          res.status(404).json({ success: false, msg });
        } else
          res.status(200).json({ success: true, msg: "deleted successfully" });
      }
    );
  }
);

module.exports = router;
