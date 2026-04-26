const Expense = require('../models/Expense');

exports.getExpenses = async (req, res) => {
  try {
    const { month, year } = req.query;
    const query = { userId: req.user._id };
    if (month && year) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0, 23, 59, 59);
      query.date = { $gte: start, $lte: end };
    }
    const expenses = await Expense.find(query).sort('-date');
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addExpense = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    const expense = await Expense.create({
      userId: req.user._id, amount, category, description, date: date || new Date(),
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const categoryBreakdown = await Expense.aggregate([
      { $match: { userId: req.user._id, date: { $gte: startOfMonth } } },
      { $group: { _id: '$category', total: { $sum: '$amount' }, count: { $sum: 1 } } },
      { $sort: { total: -1 } },
    ]);

    const monthlyTrend = await Expense.aggregate([
      { $match: { userId: req.user._id } },
      { $group: { _id: { year: { $year: '$date' }, month: { $month: '$date' } }, total: { $sum: '$amount' } } },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 6 },
    ]);

    const totalThisMonth = categoryBreakdown.reduce((sum, c) => sum + c.total, 0);

    res.json({ categoryBreakdown, monthlyTrend, totalThisMonth });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
