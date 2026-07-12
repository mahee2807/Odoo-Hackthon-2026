const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const DB_PATH = path.resolve(__dirname, '../ecosphere.db');
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) return console.error('DB open error', err);
  console.log('Connected to DB:', DB_PATH);
});

function createDemoUser() {
  const email = 'demo@ecos.com';
  const password = 'password123';
  const name = 'Demo User';
  const hashed = bcrypt.hashSync(password, 10);

  db.get('SELECT id FROM users WHERE email = ?', [email], (err, row) => {
    if (err) return console.error('DB error', err);
    if (row) return console.log('Demo user already exists');

    const stmt = db.prepare('INSERT INTO users (email, password, name) VALUES (?, ?, ?)');
    stmt.run(email, hashed, name, function(err) {
      if (err) return console.error('Insert error', err);
      console.log('Inserted demo user with id', this.lastID);
      stmt.finalize(() => db.close());
    });
  });
}

createDemoUser();
