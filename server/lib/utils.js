const crypto = require("crypto");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

function issueJWT(user) {
  const _id = user._id;

  const expiresIn = "72h";

  const payload = {
    sub: _id,
    iat: Date.now(),
    role: user.role,
  };

  const signedToken = jsonwebtoken.sign(payload, process.env.PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}

module.exports.issueJWT = issueJWT;
