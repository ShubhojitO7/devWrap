const router = require('express').Router();
const { register, login, getMe, googleOAuth } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { validateRegister, validateLogin } = require('../middleware/validate');

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/google-oauth', googleOAuth);
router.get('/me', protect, getMe);

module.exports = router;
