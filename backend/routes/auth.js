const express = require('express');
const { register, login } = require('../controllers/userController');
const mapUser = require('../helpers/mapUser');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password);
    res
      .cookie('token', token, { httpOnly: true })
      .send({ error: null, payload: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password);
    res
      .cookie('token', token, { httpOnly: true })
      .send({ error: null, payload: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.post('/logout', (req, res) => {
  res.cookie('token', '', { httpOnly: true }).send({ error: null });
});

module.exports = router;
