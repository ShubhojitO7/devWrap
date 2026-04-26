const router = require('express').Router();
const { chat, summarize, generateQuiz } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');
const { aiRateLimiter } = require('../middleware/rateLimiter');

router.post('/chat', protect, aiRateLimiter, chat);
router.post('/summarize', protect, aiRateLimiter, summarize);
router.post('/quiz', protect, aiRateLimiter, generateQuiz);

module.exports = router;
