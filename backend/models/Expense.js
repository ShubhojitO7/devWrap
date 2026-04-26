const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  category: {
    type: String,
    enum: ['food', 'transport', 'books', 'entertainment', 'clothing', 'recharge', 'medical', 'other'],
    required: true,
  },
  description: { type: String, default: '' },
  date: { type: Date, default: Date.now },
  monthlyBudget: { type: Number, default: 6000 },
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
