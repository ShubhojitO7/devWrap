const rateLimit = require('express-rate-limit');

const aiRateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: (req) => {
    if (req.user && (req.user.plan === 'premium' || req.user.plan === 'annual')) {
      return 1000; // unlimited for premium
    }
    return 10; // 10/day for free
  },
  message: { error: 'AI query limit reached. Upgrade to Premium for unlimited queries.' },
  keyGenerator: (req) => req.user ? req.user._id.toString() : req.ip,
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
});

module.exports = { aiRateLimiter, generalLimiter };
