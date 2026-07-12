const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const DB_PATH = path.resolve(__dirname, '../ecosphere.db');
const FRONTEND_PATH = path.resolve(__dirname, '../Ecosphere/frontend');
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

// Initialize DB
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) return console.error('DB open error', err);
  console.log('Connected to SQLite DB:', DB_PATH);
});

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`
  );
});

function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
}

app.post('/api/auth/register', (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  const hashed = bcrypt.hashSync(password, 10);
  const stmt = db.prepare('INSERT INTO users (email, password, name) VALUES (?, ?, ?)');
  stmt.run(email, hashed, name || null, function (err) {
    if (err) {
      if (err.code === 'SQLITE_CONSTRAINT') return res.status(409).json({ error: 'User already exists' });
      return res.status(500).json({ error: 'DB error' });
    }
    const user = { id: this.lastID, email, name };
    const token = signToken(user);
    res.json({ user, token });
  });
  stmt.finalize();
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  db.get('SELECT id, email, password, name FROM users WHERE email = ?', [email], (err, row) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (!row) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = bcrypt.compareSync(password, row.password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const user = { id: row.id, email: row.email, name: row.name };
    const token = signToken(user);
    res.json({ user, token });
  });
});

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Missing auth' });
  const parts = auth.split(' ');
  if (parts.length !== 2) return res.status(401).json({ error: 'Invalid auth format' });
  const token = parts[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

app.get('/api/auth/me', authMiddleware, (req, res) => {
  db.get('SELECT id, email, name, created_at FROM users WHERE id = ?', [req.user.id], (err, row) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (!row) return res.status(404).json({ error: 'User not found' });
    res.json({ user: row });
  });
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Serve frontend static files
app.use(express.static(FRONTEND_PATH));

// Fallback to app.html for SPA routes
app.get('*', (req, res) => {
  const index = path.join(FRONTEND_PATH, 'app.html');
  res.sendFile(index);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
