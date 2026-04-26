const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ['maintenance', 'wifi', 'food', 'cleanliness', 'electricity', 'water', 'security', 'other'],
    required: true,
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved'],
    default: 'open',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
  },
  room: { type: String, default: '' },
  hostelBlock: { type: String, default: '' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resolvedAt: { type: Date },
  resolvedBy: { type: String },
  adminNotes: { type: String },
  images: [String],
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
