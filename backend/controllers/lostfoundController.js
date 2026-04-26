const LostFound = require('../models/LostFound');

exports.getItems = async (req, res) => {
  try {
    const { type, search } = req.query;
    const query = { resolved: false };
    if (type) query.type = type;
    if (search) query.$or = [
      { title: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') },
      { location: new RegExp(search, 'i') },
    ];
    const items = await LostFound.find(query).populate('userId', 'name avatar').sort('-createdAt');
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createItem = async (req, res) => {
  try {
    const { title, description, type, category, location, reward, contactInfo } = req.body;
    const imageUrl = req.file ? req.file.path : '';
    const item = await LostFound.create({
      title, description, type, category, location, reward, contactInfo, imageUrl, userId: req.user._id,
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.resolveItem = async (req, res) => {
  try {
    const item = await LostFound.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    item.resolved = true;
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
