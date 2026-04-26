const router = require('express').Router();
const { getNotes, getNoteById, uploadNote, rateNote, downloadNote } = require('../controllers/notesController');
const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

router.get('/', getNotes);
router.get('/:id', getNoteById);
router.post('/upload', protect, upload.single('file'), uploadNote);
router.patch('/:id/rate', protect, rateNote);
router.get('/:id/download', downloadNote);

module.exports = router;
