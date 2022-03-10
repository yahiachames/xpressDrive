module.exports = (err, req, res, next) => {
  res.status(500).send("An unknown error occurred.");
  next();
};