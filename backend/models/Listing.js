const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: ['books', 'electronics', 'stationery', 'clothing', 'furniture', 'other'],
    required: true,
  },
  condition: {
    type: String,
    enum: ['new', 'like-new', 'good', 'fair', 'used'],
    default: 'good',
  },
  images: [String],
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  college: { type: String },
  sold: { type: Boolean, default: false },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);
