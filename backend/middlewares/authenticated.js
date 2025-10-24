const { verify } = require('../helpers/token');
const User = require('../models/User');

module.exports = async function (req, res, next) {
  try {
    const tokenData = verify(req.cookies.token);
    const user = await User.findById(tokenData.id);

    if (!user) return res.send({ error: 'User not found' });

    req.user = user;
    next();
  } catch {
    res.send({ error: 'Unauthorized' });
  }
};
