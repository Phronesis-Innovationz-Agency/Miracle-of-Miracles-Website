require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');

const { initDb, pool } = require('./db');
const { requireAuth } = require('./auth');

const pagesRoutes = require('./routes/pages');
const registerRoutes = require('./routes/register');
const giveRoutes = require('./routes/give');
const eventsRoutes = require('./routes/events');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/admin');
const adminEventsRoutes = require('./routes/adminEvents');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev-secret-change-me',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 8 },
  })
);

const STATIC_ASSET_PATTERN = /\.(css|js|png|jpe?g|svg|ico|txt|webp|gif)$/i;
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/admin') && !STATIC_ASSET_PATTERN.test(req.path)) {
    pool
      .query(
        `INSERT INTO page_views (path, session_id, user_agent, referrer) VALUES ($1, $2, $3, $4)`,
        [req.path, req.sessionID, req.get('user-agent') || null, req.get('referer') || null]
      )
      .catch(() => {});
  }
  next();
});

app.use('/', pagesRoutes);
app.use('/', registerRoutes);
app.use('/', giveRoutes);
app.use('/', eventsRoutes);
app.use('/', authRoutes);
app.use('/admin/events', requireAuth, adminEventsRoutes);
app.use('/admin', requireAuth, adminRoutes);

app.use((req, res) => {
  res.status(404).render('pages/not-found', { page: 'not-found' });
});

const PORT = process.env.PORT || 3000;

initDb()
  .then(() => {
    app.listen(PORT, () => console.log(`MMC website running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });
