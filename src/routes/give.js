const express = require('express');
const router = express.Router();
const { pool } = require('../db');
const church = require('../church');
const { pickGalleryImage } = require('../gallery');

const FUND_LABELS = {
  tithe: 'Tithe',
  offering: 'Offering',
  partnership: 'Partnership',
  building_fund: 'Building Fund',
  other: 'Other',
};

router.get('/give', (req, res) => {
  res.render('give/give', { church, page: 'give', pageImage: pickGalleryImage('give') });
});

router.post('/give', async (req, res) => {
  const { giver_name, phone, fund_type, amount_ugx, momo_reference } = req.body;
  if (!giver_name || !FUND_LABELS[fund_type]) {
    return res.render('give/give', {
      church,
      page: 'give',
      pageImage: pickGalleryImage('give'),
      error: 'Please tell us your name and which fund this is for.',
      values: req.body,
    });
  }
  await pool.query(
    `INSERT INTO giving_records (giver_name, phone, fund_type, amount_ugx, momo_reference)
     VALUES ($1, $2, $3, $4, $5)`,
    [giver_name, phone || null, fund_type, amount_ugx || null, momo_reference || null]
  );

  const waText = encodeURIComponent(
    `Hi MMC, I just gave ${FUND_LABELS[fund_type]} — my name is ${giver_name}. Praise God!`
  );
  const waLink = `https://wa.me/${church.whatsapp}?text=${waText}`;

  res.render('give/confirmation', {
    church,
    page: 'give',
    giverName: giver_name,
    fundLabel: FUND_LABELS[fund_type],
    waLink,
  });
});

module.exports = router;
