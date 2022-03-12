const router = require("express").Router();
const Street = require("../models/Street");
const passport = require("passport");
const objectId = require("../config/objectId");

router.get(
  "/one/:id",

  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Street.findById(req.params.id, (error, result) => {
      if (error) return next(err);
      if (result == null) res.send("no data");

      res.send(result);
    });
  }
);

router.get(
  "/all",

  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Street.find({}, (error, result) => {
      if (error) return next(err);
      if (result == null) res.send("no data");

      res.send(result);
    });
  }
);

router.post(
  "/create/:id",

  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const {} = req.body;

    const street = new Street({
      name: req.body.name,
      localization: req.params.id,
      code_postale: req.body.code_postale,
      street_number: req.body.street_number,
    });

    street.save({}, (error, result) => {
      if (error) return next(err);
      if (result == null) res.send("no data");

      res.status(200).json({
        success: true,
        message: "successfuly created",
      });
    });
  }
);

router.post(
  "/update/:id",

  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Street.findById(req.params.id, (err1, result1) => {
      if (err1) res.status(500).json({ success: false, msg: err1.kind });
      if (result1 == null)
        res.status(404).json({ success: false, msg: "no ride found" });
      else {
        const { name, localization, code_postale, street_number } =
          result1._doc;
        localization.push(objectId(req.body.localization));
        console.log(localization);
        const street = {
          name: req.body.name ? req.body.name : name,
          localization: req.body.localization
            ? objectId(req.body.localization)
            : localization,
          code_postale: req.body.code_postale
            ? req.body.code_postale
            : code_postale,
          street_number: req.body.street_number
            ? req.body.street_number
            : street_number,
        };

        Street.findByIdAndUpdate(req.params.id, street, (error, result) => {
          if (error) return next(error);
          if (result == null) res.send("no data");

          res.status(200).json({
            success: true,
            message: "successfuly created",
          });
        });
      }
    });
  }
);

router.get(
  "/delete/:id",

  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Street.findByIdAndRemove(req.params.id, (error, result) => {
      if (error) return next(err);
      if (result == null) res.send("no data");

      res.status(200).json({
        success: true,
        message: "successfuly deleted",
      });
    });
  }
);

module.exports = router;
