const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      
      const mongoose = require('mongoose');
      if (mongoose.connection.readyState !== 1) {
        // Mock mode: Just attach the ID to req.user
        req.user = { id: decoded.id, plan: 'free' };
        return next();
      }

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ error: 'User not found' });
      }
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ error: 'Not authorized, no token' });
  }
};

const isPremium = (req, res, next) => {
  if (req.user && (req.user.plan === 'premium' || req.user.plan === 'annual')) {
    next();
  } else {
    res.status(403).json({ error: 'Premium subscription required' });
  }
};

module.exports = { protect, isPremium };
