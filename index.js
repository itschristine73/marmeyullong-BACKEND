require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const { notifyAdmin } = require('./mailer');

const app = express();
app.use(cors());          // lets your frontend call this server
app.use(express.json());  // lets the server read JSON sent by the frontend
app.use(express.static('public'));

// Temporary storage (lost on restart)
const bookings = [];
const messages = [];
const subscribers = [];
const reviews = [
  { name: 'Sophia Laurent', loc: 'Paris', stars: 5, text: 'Sample review text' },
  // copy the rest from reviewsData in script.js if you want
];

// Small helper: are all required fields present?
// Small helper: are all required fields present?
function missing(body, fields) {
  return fields.filter(f => !body[f] || String(body[f]).trim() === '');
}

function requireAdmin(req, res, next) {
  const password = req.headers['x-admin-password'];
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// ---- Bookings ----
app.post('/api/bookings', (req, res) => {
  const bad = missing(req.body, ['name', 'email', 'checkIn', 'checkOut']);
  if (bad.length) return res.status(400).json({ error: 'Missing: ' + bad.join(', ') });
  if (new Date(req.body.checkOut) <= new Date(req.body.checkIn)) {
    return res.status(400).json({ error: 'Check-out must be after check-in' });
  }
  const { name, email, phone, guests, occasion, checkIn, checkOut, timeSlot, requests } = req.body;
  const stmt = db.prepare(`INSERT INTO bookings (name, email, phone, guests, occasion, checkIn, checkOut, timeSlot, requests)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  const result = stmt.run(name, email, phone, guests, occasion, checkIn, checkOut, timeSlot, requests);

  notifyAdmin(
  'New Booking Received',
  `${name} booked ${checkIn} to ${checkOut} for ${guests} guests.\nEmail: ${email}\nPhone: ${phone}`
);

  res.status(201).json({ id: result.lastInsertRowid, ...req.body });
});

app.get('/api/bookings',requireAdmin, (req, res) => {
  res.json(db.prepare('SELECT * FROM bookings ORDER BY id DESC').all());
});

// ---- Reviews ----
app.get('/api/reviews', (req, res) => {
  res.json(db.prepare('SELECT * FROM reviews ORDER BY id DESC').all());
});

app.post('/api/reviews', (req, res) => {
  const bad = missing(req.body, ['name', 'email', 'stars', 'comment']);
  if (bad.length) return res.status(400).json({ error: 'Missing: ' + bad.join(', ') });
  const stmt = db.prepare('INSERT INTO reviews (name, email, stars, text) VALUES (?, ?, ?, ?)');
  const result = stmt.run(req.body.name, req.body.email, Number(req.body.stars), req.body.comment);
  res.status(201).json({ id: result.lastInsertRowid, name: req.body.name, stars: Number(req.body.stars), text: req.body.comment });
});

// ---- Contact ----
app.post('/api/contact', (req, res) => {
  const bad = missing(req.body, ['name', 'email', 'subject', 'message']);
  if (bad.length) return res.status(400).json({ error: 'Missing: ' + bad.join(', ') });
  const stmt = db.prepare('INSERT INTO messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)');
  stmt.run(req.body.name, req.body.email, req.body.phone, req.body.subject, req.body.message);
  res.status(201).json({ ok: true });
});

app.get('/api/contact', requireAdmin, (req, res) => {
  res.json(db.prepare('SELECT * FROM messages ORDER BY id DESC').all());
});

// ---- Newsletter ----
app.post('/api/newsletter', (req, res) => {
  if (!req.body.email || !req.body.email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }
  try {
    db.prepare('INSERT INTO subscribers (email) VALUES (?)').run(req.body.email);
  } catch (err) {
    return res.status(400).json({ error: 'Already subscribed' });
  }
  
  notifyAdmin('New Newsletter Subscriber', `New subscriber: ${req.body.email}`);
  res.status(201).json({ ok: true });
});

app.get('/api/newsletter', requireAdmin, (req, res) => {
  res.json(db.prepare('SELECT * FROM subscribers ORDER BY id DESC').all());
});
app.listen(3000, () => console.log('Server running on http://localhost:3000'));