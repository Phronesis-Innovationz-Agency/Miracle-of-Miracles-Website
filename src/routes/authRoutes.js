const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const church = require('../church');

router.get('/login', (req, res) => {
  res.render('admin/login', { church, page: 'login' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const validUsername = username === process.env.ADMIN_USERNAME;
  const validPassword =
    process.env.ADMIN_PASSWORD_HASH &&
    (await bcrypt.compare(password || '', process.env.ADMIN_PASSWORD_HASH));

  if (validUsername && validPassword) {
    req.session.isAdmin = true;
    return res.redirect('/admin');
  }
  res.render('admin/login', { church, page: 'login', error: 'Incorrect username or password.' });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

module.exports = router;
