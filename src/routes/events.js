const express = require('express');
const router = express.Router();
const { pool } = require('../db');
const church = require('../church');
const { EVENT_CATEGORIES, categoryLabel, categoryColor } = require('../eventCategories');
const { pickGalleryImage } = require('../gallery');

router.get('/events', async (req, res) => {
  const [{ rows: upcoming }, { rows: past }] = await Promise.all([
    pool.query(
      `SELECT * FROM events WHERE event_date >= CURRENT_DATE ORDER BY event_date ASC`
    ),
    pool.query(
      `SELECT * FROM events WHERE event_date < CURRENT_DATE ORDER BY event_date DESC LIMIT 6`
    ),
  ]);
  res.render('pages/events', {
    church,
    page: 'events',
    upcoming,
    past,
    categoryLabel,
    categoryColor,
    pageImage: pickGalleryImage('events'),
  });
});

module.exports = router;
