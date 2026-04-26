const router = require('express').Router();
const { getItems, createItem, resolveItem } = require('../controllers/lostfoundController');
const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

router.get('/', getItems);
router.post('/', protect, upload.single('image'), createItem);
router.patch('/:id/resolve', protect, resolveItem);

module.exports = router;
