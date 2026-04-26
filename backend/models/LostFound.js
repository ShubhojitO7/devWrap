const mongoose = require('mongoose');

const lostFoundSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  type: { type: String, enum: ['lost', 'found'], required: true },
  category: {
    type: String,
    enum: ['electronics', 'documents', 'accessories', 'clothing', 'keys', 'other'],
    default: 'other',
  },
  location: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  reward: { type: Number, default: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resolved: { type: Boolean, default: false },
  contactInfo: { type: String },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('LostFound', lostFoundSchema);
