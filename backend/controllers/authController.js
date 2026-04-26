const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mongoose = require('mongoose');

// Fallback in-memory store for demo mode
const mockUsers = [
  {
    _id: 'demo-id-123',
    name: 'Aryan',
    email: 'aryan@college.edu',
    password: 'password123',
    college: 'NIT Delhi',
    branch: 'CSE',
    semester: 6,
    plan: 'free',
    aiQueriesUsed: 7,
    streak: 6
  }
];

const isDbConnected = () => mongoose.connection.readyState === 1;

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', { expiresIn: process.env.JWT_EXPIRE || '7d' });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, college, branch, semester } = req.body;

    if (!isDbConnected()) {
      console.log('📝 Registering user in Mock Mode');
      const exists = mockUsers.find(u => u.email === email);
      if (exists) return res.status(400).json({ error: 'Email already registered' });
      
      const newUser = { _id: Date.now().toString(), name, email, password, college, branch, semester, plan: 'free' };
      mockUsers.push(newUser);
      const token = generateToken(newUser._id);
      return res.status(201).json({ token, user: newUser });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Email already registered' });

    const user = await User.create({ name, email, password, college, branch, semester });
    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, college: user.college, plan: user.plan, avatar: user.avatar },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!isDbConnected()) {
      console.log('🔑 Logging in user in Mock Mode');
      const user = mockUsers.find(u => u.email === email);
      if (!user || user.password !== password) return res.status(401).json({ error: 'Invalid credentials' });
      
      const token = generateToken(user._id);
      return res.json({ token, user });
    }

    const user = await User.findOne({ email });
    if (!user || !user.password) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    user.lastActive = Date.now();
    await user.save();
    const token = generateToken(user._id);

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, college: user.college, plan: user.plan, avatar: user.avatar, semester: user.semester },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    if (!isDbConnected()) {
      const user = mockUsers.find(u => u._id === req.user.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      return res.json(user);
    }
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.googleOAuth = async (req, res) => {
  // Simpler mock implementation for Google OAuth
  res.status(501).json({ error: 'Google OAuth not supported in mock mode' });
};

