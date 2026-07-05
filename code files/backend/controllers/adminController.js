const User = require('../models/User');
const Complaint = require('../models/Complaint');

const getDashboard = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    const stats = {
      totalComplaints: complaints.length,
      pending:         complaints.filter(c => c.status === 'Pending').length,
      inProgress:      complaints.filter(c => c.status === 'In Progress').length,
      resolved:        complaints.filter(c => c.status === 'Resolved').length,
    };
    res.json({ stats, complaints });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const assignAgent = async (req, res) => {
  const { complaintId, agentId } = req.body;
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { agentId, status: 'Assigned' },
      { new: true }
    );
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: 'agent' });
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteAgent = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Agent removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getDashboard,
  assignAgent,
  getAgents,
  getUsers,
  deleteUser,
  deleteAgent
};