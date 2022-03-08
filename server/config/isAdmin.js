function isAdmin(req, res, next) {
  if (req.body.role == "admin") {
    return next();
  }
  return res.redirect(403, "/error");
}

module.exports = isAdmin;
