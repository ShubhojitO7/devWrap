const router = require('express').Router();
const { getListings, createListing, getListingById, updateListing, deleteListing } = require('../controllers/marketplaceController');
const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

router.get('/listings', getListings);
router.post('/listings', protect, upload.array('images', 5), createListing);
router.get('/:id', getListingById);
router.patch('/:id', protect, updateListing);
router.delete('/:id', protect, deleteListing);

module.exports = router;
