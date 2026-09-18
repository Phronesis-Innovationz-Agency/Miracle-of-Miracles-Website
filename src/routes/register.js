const express = require('express');
const router = express.Router();
const { pool } = require('../db');
const church = require('../church');
const { REGISTERABLE_DEPARTMENTS } = require('../departments');
const { pickGalleryImage } = require('../gallery');

router.get('/register/foundation-school', (req, res) => {
  res.render('register/foundation-school', { church, page: 'register' });
});

router.post('/register/foundation-school', async (req, res) => {
  const { full_name, phone, email, area, notes } = req.body;
  if (!full_name || !phone) {
    return res.render('register/foundation-school', {
      church,
      page: 'register',
      error: 'Name and phone number are required.',
      values: req.body,
    });
  }
  await pool.query(
    `INSERT INTO registrations (reg_type, full_name, phone, email, area, notes)
     VALUES ('foundation_school', $1, $2, $3, $4, $5)`,
    [full_name, phone, email || null, area || null, notes || null]
  );
  res.render('register/confirmation', {
    church,
    page: 'register',
    heading: "You're registered for Foundation School",
    message: `Thank you, ${full_name}. We look forward to seeing you at Foundation School, Sunday 2:00–3:00 PM.`,
  });
});

router.get('/register/department', (req, res) => {
  res.render('register/department', {
    church,
    page: 'register',
    departments: REGISTERABLE_DEPARTMENTS,
    pageImage: pickGalleryImage('department'),
  });
});

router.post('/register/department', async (req, res) => {
  const { department, full_name, phone, email, area, notes } = req.body;
  const match = REGISTERABLE_DEPARTMENTS.find((d) => d.key === department);
  if (!full_name || !phone || !match) {
    return res.render('register/department', {
      church,
      page: 'register',
      departments: REGISTERABLE_DEPARTMENTS,
      pageImage: pickGalleryImage('department'),
      error: 'Please choose a department and fill in your name and phone number.',
      values: req.body,
    });
  }
  await pool.query(
    `INSERT INTO registrations (reg_type, department, full_name, phone, email, area, notes)
     VALUES ('department', $1, $2, $3, $4, $5, $6)`,
    [match.label, full_name, phone, email || null, area || null, notes || null]
  );
  res.render('register/confirmation', {
    church,
    page: 'register',
    heading: "You're registered",
    message: `Thank you, ${full_name}. We've noted your interest in ${match.label} — someone from that department will reach out to you.`,
  });
});

module.exports = router;
