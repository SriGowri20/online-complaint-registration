const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  createComplaint,
  getMyComplaints,
  getComplaintById,
  getAssignedComplaints,
  updateStatus
} = require('../controllers/complaintController');
const { protect, agentOnly } = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename:    (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.post('/',          protect, upload.single('attachment'), createComplaint);
router.get('/my',         protect, getMyComplaints);
router.get('/assigned',   protect, agentOnly, getAssignedComplaints);
router.get('/:id',        protect, getComplaintById);
router.put('/:id/status', protect, agentOnly, updateStatus);

module.exports = router;