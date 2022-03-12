const router = require("express").Router();
const Region = require("../models/Region");
const passport = require("passport");

router.get(
  "/one/:id",

  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Region.findById(req.params.id, (error, result) => {
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
    Region.find({}, (error, result) => {
      if (error) return next(err);
      if (result == null) res.send("no data");

      res.send(result);
    });
  }
);

router.post(
  "/create/:id",

  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    const {} = req.body;

    const region = new Region({
      name: req.body.name,
      localization: [req.params.id],
      code_postale: req.body.code_postale,
    });

    region.save({}, (error, result) => {
      if (error) return next(error);
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
  (req, res) => {
    Ride.findById(req.params.id, (err1, result1) => {
      if (err1) res.status(500).json({ success: false, msg: err1.kind });
      if (result1.length == 0)
        res.status(404).json({ success: false, msg: "no ride found" });
      else {
        const { name, localization, code_postale } = result1._doc;

        const region = {
          name: req.body.name ? req.body.name : name,
          localization: req.body.localization
            ? localization.push(req.body.localization)
            : localization,
          code_postale: req.body.code_postale
            ? req.body.code.postale
            : code_postale,
        };

        Region.findByIdAndUpdate(req.params.id, region, (error, result) => {
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
    Region.findByIdAndRemove(req.params.id, (error, result) => {
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
