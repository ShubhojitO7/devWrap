const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  subject: { type: String, required: true },
  semester: { type: Number, required: true },
  college: { type: String, required: true },
  branch: { type: String, default: '' },
  description: { type: String, default: '' },
  fileUrl: { type: String, required: true },
  fileType: { type: String, default: 'pdf' },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  downloads: { type: Number, default: 0 },
  ratings: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    score: { type: Number, min: 1, max: 5 },
  }],
  averageRating: { type: Number, default: 0 },
  isExclusive: { type: Boolean, default: false },
  tags: [String],
}, { timestamps: true });

noteSchema.methods.updateAverageRating = function() {
  if (this.ratings.length === 0) {
    this.averageRating = 0;
  } else {
    const sum = this.ratings.reduce((acc, r) => acc + r.score, 0);
    this.averageRating = Math.round((sum / this.ratings.length) * 10) / 10;
  }
};

module.exports = mongoose.model('Note', noteSchema);
