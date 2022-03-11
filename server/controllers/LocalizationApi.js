const router = require("express").Router();
const Localization = require("../models/Localization");
const passport = require("passport");

router.get(
  "/localization/:id",

  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Localization.findOne({ user: req.params.id }, (error, result) => {
      if (error) return next(err);
      if (result == null) res.send("no data");

      res.send(result);
    });
  }
);

router.post(
  "/update/:id",

  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Localization.findOne({ user: req.params.id }, (err1, result1) => {
      if (err1) return next(err1);
      if (result1 == null) {
        return res.status(401).json({
          success: false,
          message: "didin't find the user localization",
        });
      }
      const { latitude, longitude } = result1;
      let userUpdated = {
        latitude: req.body.latitude ? req.body.latitude : latitude,
        longitude: req.body.longitude ? req.body.longitude : longitude,
      };

      Localization.findOneAndUpdate(
        { user: req.params.id },
        userUpdated,
        (err2, result2) => {
          if (err2) return next(err2);
          res.status(200).json({
            success: true,
            message: "user localization successfuly updated",
          });
        }
      );
    });
  }
);
router.post(
  "/create/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    const { longitude, latitude } = req.body;
    // using condition to avoid object error and let the error handdled by server
    let localization = new Localization({
      longitude: req.body.longitude ? longitude : null,
      latitude: req.body.latitude ? latitude : null,
      user: req.params.id,
    });
    localization.save((err, result) => {
      if (err) return next(err);
      res.send({ latitude, longitude });
    });
  }
);

router.post(
  "/delete/:id",

  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.params);
    Localization.findOneAndRemove({ user: req.params.id }, (error, result) => {
      if (error) return next(err);
      res.send(result);
    });
  }
);

module.exports = router;
