const express = require('express');
const router = express.Router();
const { pool } = require('../db');
const church = require('../church');
const { EVENT_CATEGORIES } = require('../eventCategories');

function validate(body) {
  const { title, category, event_date } = body;
  if (!title || !event_date || !EVENT_CATEGORIES.some((c) => c.key === category)) {
    return 'Please fill in a title, a date, and choose a category.';
  }
  return null;
}

router.get('/', async (req, res) => {
  const { rows } = await pool.query(`SELECT * FROM events ORDER BY event_date DESC`);
  res.render('admin/events', { church, activeSection: 'events', heading: 'Events', events: rows });
});

router.get('/new', (req, res) => {
  res.render('admin/event-form', {
    church,
    activeSection: 'events',
    heading: 'New event',
    categories: EVENT_CATEGORIES,
    formAction: '/admin/events',
    event: {},
  });
});

router.post('/', async (req, res) => {
  const { title, category, description, location, event_date, event_time, image_filename } = req.body;
  const error = validate(req.body);
  if (error) {
    return res.render('admin/event-form', {
      church,
      activeSection: 'events',
      heading: 'New event',
      categories: EVENT_CATEGORIES,
      formAction: '/admin/events',
      event: req.body,
      error,
    });
  }
  await pool.query(
    `INSERT INTO events (category, title, description, location, event_date, event_time, image_filename)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [category, title, description || null, location || null, event_date, event_time || null, image_filename || null]
  );
  res.redirect('/admin/events');
});

router.get('/:id/edit', async (req, res) => {
  const { rows } = await pool.query(`SELECT * FROM events WHERE id = $1`, [req.params.id]);
  if (rows.length === 0) return res.redirect('/admin/events');
  res.render('admin/event-form', {
    church,
    activeSection: 'events',
    heading: 'Edit event',
    categories: EVENT_CATEGORIES,
    formAction: `/admin/events/${req.params.id}`,
    event: rows[0],
  });
});

router.post('/:id', async (req, res) => {
  const { title, category, description, location, event_date, event_time, image_filename } = req.body;
  const error = validate(req.body);
  if (error) {
    return res.render('admin/event-form', {
      church,
      activeSection: 'events',
      heading: 'Edit event',
      categories: EVENT_CATEGORIES,
      formAction: `/admin/events/${req.params.id}`,
      event: { ...req.body, id: req.params.id },
      error,
    });
  }
  await pool.query(
    `UPDATE events SET category = $1, title = $2, description = $3, location = $4,
       event_date = $5, event_time = $6, image_filename = $7
     WHERE id = $8`,
    [category, title, description || null, location || null, event_date, event_time || null, image_filename || null, req.params.id]
  );
  res.redirect('/admin/events');
});

router.post('/:id/delete', async (req, res) => {
  await pool.query(`DELETE FROM events WHERE id = $1`, [req.params.id]);
  res.redirect('/admin/events');
});

module.exports = router;
