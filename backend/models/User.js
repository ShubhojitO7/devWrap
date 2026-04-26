const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, minlength: 6 },
  avatar: { type: String, default: '' },
  college: { type: String, default: '' },
  branch: { type: String, default: '' },
  semester: { type: Number, default: 1 },
  cgpa: { type: Number, default: 0 },
  hostelRoom: { type: String, default: '' },
  googleId: { type: String },
  plan: { type: String, enum: ['free', 'premium', 'annual'], default: 'free' },
  planExpiry: { type: Date },
  aiQueriesUsed: { type: Number, default: 0 },
  aiQueriesResetDate: { type: Date, default: Date.now },
  streak: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now },
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
