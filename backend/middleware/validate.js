const { body, validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateRegister = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be 6+ characters'),
  handleValidation,
];

const validateLogin = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
  handleValidation,
];

const validateNote = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('semester').isNumeric().withMessage('Semester must be a number'),
  handleValidation,
];

const validateComplaint = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category').isIn(['maintenance', 'wifi', 'food', 'cleanliness', 'electricity', 'water', 'security', 'other']),
  handleValidation,
];

const validateExpense = [
  body('amount').isNumeric().withMessage('Amount is required'),
  body('category').isIn(['food', 'transport', 'books', 'entertainment', 'clothing', 'recharge', 'medical', 'other']),
  handleValidation,
];

module.exports = { validateRegister, validateLogin, validateNote, validateComplaint, validateExpense };
