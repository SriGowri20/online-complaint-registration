const express = require('express');
const router = express.Router();
const { getMessages, sendMessage } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:complaintId', protect, getMessages);
router.post('/',            protect, sendMessage);

module.exports = router;