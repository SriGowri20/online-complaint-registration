const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  complaintId: { type: mongoose.Schema.Types.ObjectId, ref: 'Complaint', required: true },
  senderId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  senderRole:  { type: String, enum: ['user', 'agent', 'admin'] },
  text:        { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);