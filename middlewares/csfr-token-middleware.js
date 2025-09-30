function addCSFRToken(req, res, next) {
  res.locals.csfrToken = req.csfrToken();
  next();
}

module.exports = addCSFRToken;
