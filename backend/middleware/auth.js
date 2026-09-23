const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'sumnay_cosmetic_dev_secret_change_in_production';

// Verifies the JWT sent in the Authorization header, attaches user info to req.user
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided. Please log in.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

// Use after requireAuth — only allows admins through
function requireAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Admin access required.' });
}

module.exports = { requireAuth, requireAdmin, JWT_SECRET };
