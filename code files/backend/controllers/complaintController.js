const Complaint = require('../models/Complaint');
const User = require('../models/User');

const createComplaint = async (req, res) => {
  const { title, description, category, department, urgency } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const complaint = await Complaint.create({
      title, description, category, department, urgency,
      userId:    user._id,
      userName:  user.name,
      userEmail: user.email,
      attachment: req.file ? req.file.filename : null
    });
    res.status(201).json(complaint);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getMyComplaints = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const complaints = await Complaint.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ complaints, name: user.name });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAssignedComplaints = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const complaints = await Complaint.find({ agentId: req.user.id }).sort({ createdAt: -1 });
    res.json({ complaints, name: user.name });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createComplaint,
  getMyComplaints,
  getComplaintById,
  getAssignedComplaints,
  updateStatus
};