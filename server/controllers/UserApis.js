const router = require("express").Router();
const utils = require("../lib/utils");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const isAdmin = require("../config/isAdmin");

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
      const isValid = bcrypt.compareSync(password, user.hash);

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

router.post("/signup", (req, res) => {
  let user = new User({
    username: req.body.username,
    hash: bcrypt.hashSync(req.body.password, saltRounds),
  });
  user.save((err, result) => {
    if (err) res.send(err);
    res.send({ username: result.username, id: result._id });
  });
});

module.exports = router;
