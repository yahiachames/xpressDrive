const router = require("express").Router();
const utils = require("../lib/utils");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const isAdmin = require("../config/isAdmin");
const { findById } = require("../models/User");
var _ = require("lodash");
const eliminate = require("../lib/reduceObject");

const saltRounds = 10;

router.get(
  "/hello",

  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    res.send("heelo");
  }
);

router.post("/login", (req, res, next) => {
  console.log(req.body);
  User.findOne({ username: req.body.username })
    .then((user) => {
      const { username, password, rememberMe } = req.body;
      if (!username)
        return res
          .status(401)
          .json({ success: false, msg: "could not find user" });

      // Function defined at bottom of app.js
      const isValid = bcrypt.compareSync(password, String(user.hash));

      if (isValid) {
        const tokenObject = utils.issueJWT(user);

        res.status(200).json({
          success: true,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
        });
      } else {
        res
          .status(401)
          .json({ success: false, msg: "wrong username or password" });
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/signup", (req, res, next) => {
  const { username, phone, email, password, role } = req.body;
  // using condition to avoid object error and let the error handdled by server
  let user = new User({
    username: req.body.username ? username : null,
    hash: req.body.password
      ? bcrypt.hashSync(req.body.password, saltRounds)
      : null,
    phone: req.body.phone ? phone : null,
    role: req.body.role ? role : null,
    email: req.body.email ? email : null,
  });
  user.save((err, result) => {
    if (err) return next(err);
    res.send({ username: result.username, id: result._id });
  });
});

router.get(
  "/users",
  isAdmin,
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    User.find({}, (err, result) => {
      if (err) return next(err);
      res.send(result);
    });
  }
);

router.post(
  "/delete/:id",
  isAdmin,
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.params);
    User.findByIdAndDelete(req.params.id, (error, result) => {
      if (error) return next(err);
      res.send(result);
    });
  }
);

router.post(
  "/update/:id",

  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    User.findById(req.params.id, (err1, result1) => {
      if (err1) return next(err1);
      if (result1 == null) {
        return res
          .status(401)
          .json({ success: false, message: "didin't find the user" });
      }
      const { username, email, phone, role, hash } = result1;
      let userUpdated = {
        username: req.body.username ? req.body.username : username,
        phone: req.body.phone ? req.body.phone : phone,
        role: req.body.role ? req.body.role : role,
        email: req.body.email ? req.body.email : email,
        hash,
      };

      User.findByIdAndUpdate(req.params.id, userUpdated, (err2, result2) => {
        if (err2) return next(err2);
        res
          .status(200)
          .json({ success: true, message: "user successfuly updated" });
      });
    });
  }
);

router.get(
  "/user/:id",

  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.params.id, (error, result) => {
      if (error) return next(err);

      let post_result = { ...result._doc };
      delete post_result.hash;

      res.send(post_result);
    });
  }
);

module.exports = router;
