module.exports = (req, res) => {
  // Demo: registration not supported in serverless demo
  res.status(501).json({ error: 'Registration not supported in demo deployment' });
};
