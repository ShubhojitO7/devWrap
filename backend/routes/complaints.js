const router = require('express').Router();
const { getComplaints, createComplaint, updateComplaint, getComplaintStats } = require('../controllers/complaintsController');
const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

router.get('/', protect, getComplaints);
router.post('/', protect, upload.array('images', 3), createComplaint);
router.patch('/:id', protect, updateComplaint);
router.get('/stats', protect, getComplaintStats);

module.exports = router;
