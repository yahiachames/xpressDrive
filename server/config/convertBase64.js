const fs = require("fs");
const convert = (filepath) => {
  return new Buffer.from(fs.readFileSync(filepath)).toString("base64");
};

module.exports = convert;
