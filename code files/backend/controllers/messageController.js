const Message = require('../models/Message');

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      complaintId: req.params.complaintId
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const sendMessage = async (req, res) => {
  const { complaintId, text } = req.body;
  try {
    const message = await Message.create({
      complaintId,
      senderId:   req.user.id,
      senderRole: req.user.role,
      text
    });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getMessages, sendMessage };