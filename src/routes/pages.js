const express = require('express');
const router = express.Router();
const { pool } = require('../db');
const church = require('../church');
const { DEPARTMENTS } = require('../departments');
const { categoryLabel, categoryColor } = require('../eventCategories');
const { listGalleryImages, pickGalleryImage } = require('../gallery');

router.get('/', async (req, res) => {
  const { rows: upcomingEvents } = await pool.query(
    `SELECT * FROM events WHERE event_date >= CURRENT_DATE ORDER BY event_date ASC LIMIT 3`
  );
  res.render('pages/home', {
    church,
    page: 'home',
    galleryImages: listGalleryImages(),
    pickGalleryImage,
    upcomingEvents,
    categoryLabel,
    categoryColor,
  });
});

router.get('/about', (req, res) => {
  res.render('pages/about', {
    church,
    page: 'about',
    pageImage: pickGalleryImage('about'),
    pickGalleryImage,
  });
});

router.get('/leadership', (req, res) => {
  res.render('pages/leadership', { church, page: 'leadership', pageImage: pickGalleryImage('leadership') });
});

router.get('/departments', (req, res) => {
  res.render('pages/departments', {
    church,
    departments: DEPARTMENTS,
    page: 'departments',
    pageImage: pickGalleryImage('departments'),
    pickGalleryImage,
  });
});

router.get('/building-fund', (req, res) => {
  res.render('pages/building-fund', {
    church,
    page: 'building-fund',
    pageImage: pickGalleryImage('building-fund'),
  });
});

router.get('/contact', (req, res) => {
  res.render('pages/contact', { church, page: 'contact', pageImage: pickGalleryImage('contact') });
});

module.exports = router;
