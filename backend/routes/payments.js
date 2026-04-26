const router = require('express').Router();
const { createOrder, verifyPayment } = require('../controllers/paymentsController');
const { protect } = require('../middleware/auth');

router.post('/create-order', protect, createOrder);
router.post('/verify', protect, verifyPayment);
router.post('/upgrade', protect, require('../controllers/paymentsController').upgradePlan);

module.exports = router;
