const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

module.exports = (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  // Demo-only: accept single seeded demo user
  const demoEmail = 'demo@ecos.com';
  const demoPassword = 'password123';
  if (email === demoEmail && password === demoPassword) {
    const user = { id: 1, email: demoEmail, name: 'Demo User' };
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ user, token });
  }

  return res.status(401).json({ error: 'Invalid credentials (demo only)' });
};
