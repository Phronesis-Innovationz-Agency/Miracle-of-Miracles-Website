const express = require('express');
const router = express.Router();
const { pool } = require('../db');
const church = require('../church');

router.get('/', async (req, res) => {
  const [
    { rows: regTotal },
    { rows: givingTotal },
    { rows: eventCount },
    { rows: viewTotal },
    { rows: recentRegs },
    { rows: recentGiving },
  ] = await Promise.all([
    pool.query(`SELECT COUNT(*) AS n FROM registrations`),
    pool.query(`SELECT COALESCE(SUM(amount_ugx), 0) AS total FROM giving_records`),
    pool.query(`SELECT COUNT(*) FILTER (WHERE event_date >= CURRENT_DATE) AS upcoming FROM events`),
    pool.query(`SELECT COUNT(*) AS n FROM page_views`),
    pool.query(`SELECT * FROM registrations ORDER BY created_at DESC LIMIT 5`),
    pool.query(`SELECT * FROM giving_records ORDER BY created_at DESC LIMIT 5`),
  ]);
  res.render('admin/dashboard', {
    church,
    activeSection: 'dashboard',
    heading: 'Dashboard',
    totalRegistrations: regTotal[0].n,
    totalGiving: givingTotal[0].total,
    upcomingEventCount: eventCount[0].upcoming,
    totalViews: viewTotal[0].n,
    recentRegs,
    recentGiving,
  });
});

router.get('/registrations', async (req, res) => {
  const { type } = req.query;
  const params = [];
  let where = '';
  if (type === 'foundation_school' || type === 'department') {
    params.push(type);
    where = 'WHERE reg_type = $1';
  }
  const [{ rows }, { rows: regCount }] = await Promise.all([
    pool.query(`SELECT * FROM registrations ${where} ORDER BY created_at DESC`, params),
    pool.query(`SELECT reg_type, COUNT(*) AS n FROM registrations GROUP BY reg_type`),
  ]);
  res.render('admin/registrations', {
    church,
    activeSection: 'registrations',
    heading: 'Registrations',
    registrations: rows,
    filterType: type || '',
    regCount,
  });
});

router.get('/giving', async (req, res) => {
  const { rows } = await pool.query(`SELECT * FROM giving_records ORDER BY created_at DESC`);
  const { rows: totals } = await pool.query(
    `SELECT COALESCE(SUM(amount_ugx), 0) AS grand_total,
            COALESCE(SUM(amount_ugx) FILTER (WHERE fund_type = 'building_fund'), 0) AS building_fund_total
     FROM giving_records`
  );
  res.render('admin/giving', {
    church,
    activeSection: 'giving',
    heading: 'Giving Records',
    records: rows,
    totals: totals[0],
  });
});

router.get('/analytics', async (req, res) => {
  const [
    { rows: totalsRows },
    { rows: viewsByDay },
    { rows: topPages },
    { rows: givingByDay },
    { rows: regRows },
  ] = await Promise.all([
    pool.query(`SELECT COUNT(*) AS total_views, COUNT(DISTINCT session_id) AS unique_visitors FROM page_views`),
    pool.query(`
      SELECT to_char(d::date, 'Mon DD') AS label, COALESCE(v.n, 0)::int AS n
      FROM generate_series(CURRENT_DATE - INTERVAL '13 days', CURRENT_DATE, INTERVAL '1 day') d
      LEFT JOIN (
        SELECT date_trunc('day', created_at) AS day, COUNT(*) AS n
        FROM page_views
        WHERE created_at >= CURRENT_DATE - INTERVAL '13 days'
        GROUP BY 1
      ) v ON v.day = d
      ORDER BY d
    `),
    pool.query(`SELECT path, COUNT(*) AS n FROM page_views GROUP BY path ORDER BY n DESC LIMIT 5`),
    pool.query(`
      SELECT to_char(d::date, 'Mon DD') AS label, COALESCE(g.total, 0)::numeric AS total
      FROM generate_series(CURRENT_DATE - INTERVAL '29 days', CURRENT_DATE, INTERVAL '1 day') d
      LEFT JOIN (
        SELECT date_trunc('day', created_at) AS day, SUM(amount_ugx) AS total
        FROM giving_records
        WHERE created_at >= CURRENT_DATE - INTERVAL '29 days'
        GROUP BY 1
      ) g ON g.day = d
      ORDER BY d
    `),
    pool.query(`SELECT COUNT(*) AS n FROM registrations WHERE created_at >= CURRENT_DATE - INTERVAL '29 days'`),
  ]);

  res.render('admin/analytics', {
    church,
    activeSection: 'analytics',
    heading: 'Analytics',
    totals: totalsRows[0],
    viewsByDay,
    topPages,
    givingByDay,
    newRegistrations: regRows[0].n,
  });
});

module.exports = router;
