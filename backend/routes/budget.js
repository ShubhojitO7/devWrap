const router = require('express').Router();
const { getExpenses, addExpense, deleteExpense, getAnalytics } = require('../controllers/budgetController');
const { protect } = require('../middleware/auth');
const { validateExpense } = require('../middleware/validate');

router.get('/expenses', protect, getExpenses);
router.post('/expenses', protect, validateExpense, addExpense);
router.delete('/expenses/:id', protect, deleteExpense);
router.get('/analytics', protect, getAnalytics);

module.exports = router;
