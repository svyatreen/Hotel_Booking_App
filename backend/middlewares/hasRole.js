module.exports = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.send({ error: 'Access denied' });
  }
  next();
};
