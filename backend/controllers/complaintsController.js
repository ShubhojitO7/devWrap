const Complaint = require('../models/Complaint');

exports.getComplaints = async (req, res) => {
  try {
    const query = {};
    if (req.query.status) query.status = req.query.status;
    if (req.query.userId) query.userId = req.query.userId;
    const complaints = await Complaint.find(query).populate('userId', 'name hostelRoom').sort('-createdAt');
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createComplaint = async (req, res) => {
  try {
    const { title, description, category, priority, room, hostelBlock } = req.body;
    const complaint = await Complaint.create({
      title, description, category, priority, room, hostelBlock, userId: req.user._id,
      images: req.files ? req.files.map(f => f.path) : [],
    });
    const io = req.app.get('io');
    if (io) io.emit('new-complaint', complaint);
    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateComplaint = async (req, res) => {
  try {
    const { status, adminNotes, resolvedBy } = req.body;
    const update = {};
    if (status) update.status = status;
    if (adminNotes) update.adminNotes = adminNotes;
    if (status === 'resolved') {
      update.resolvedAt = new Date();
      update.resolvedBy = resolvedBy || 'Admin';
    }
    const complaint = await Complaint.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getComplaintStats = async (req, res) => {
  try {
    const stats = await Complaint.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    const total = await Complaint.countDocuments();
    res.json({ stats, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
