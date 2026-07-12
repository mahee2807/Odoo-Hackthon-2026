const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

module.exports = (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const auth = req.headers.authorization || '';
  const parts = auth.split(' ');
  if (parts.length !== 2) return res.status(401).json({ error: 'Missing token' });
  const token = parts[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    // For demo return simple user
    return res.json({ user: { id: payload.id, email: payload.email, name: 'Demo User' } });
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
