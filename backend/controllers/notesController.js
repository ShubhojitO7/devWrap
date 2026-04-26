const Note = require('../models/Note');

exports.getNotes = async (req, res) => {
  try {
    const { subject, semester, college, search } = req.query;
    const query = {};
    if (subject) query.subject = new RegExp(subject, 'i');
    if (semester) query.semester = parseInt(semester);
    if (college) query.college = new RegExp(college, 'i');
    if (search) query.$or = [
      { title: new RegExp(search, 'i') },
      { subject: new RegExp(search, 'i') },
      { tags: { $in: [new RegExp(search, 'i')] } },
    ];

    const notes = await Note.find(query).populate('uploader', 'name avatar').sort('-createdAt').limit(50);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate('uploader', 'name avatar college');
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.uploadNote = async (req, res) => {
  try {
    const { title, subject, semester, college, branch, description, tags, isExclusive } = req.body;
    const fileUrl = req.file ? req.file.path : req.body.fileUrl;
    if (!fileUrl) return res.status(400).json({ error: 'File is required' });

    const note = await Note.create({
      title, subject, semester, college, branch, description, fileUrl,
      uploader: req.user._id,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      isExclusive: isExclusive === 'true',
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.rateNote = async (req, res) => {
  try {
    const { score } = req.body;
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: 'Note not found' });

    const existingIdx = note.ratings.findIndex(r => r.user.toString() === req.user._id.toString());
    if (existingIdx > -1) {
      note.ratings[existingIdx].score = score;
    } else {
      note.ratings.push({ user: req.user._id, score });
    }
    note.updateAverageRating();
    await note.save();
    res.json({ averageRating: note.averageRating, totalRatings: note.ratings.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.downloadNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, { $inc: { downloads: 1 } }, { new: true });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json({ fileUrl: note.fileUrl, downloads: note.downloads });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
