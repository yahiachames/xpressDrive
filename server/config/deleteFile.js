let resultHandler = function (err) {
  if (err) {
    console.log("unlink failed", err);
  } else {
    console.log("file deleted");
  }
};

module.exports = resultHandler;
