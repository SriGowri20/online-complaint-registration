const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  category:    { type: String, required: true },
  department:  { type: String, required: true },
  urgency:     { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
  status:      { type: String, enum: ['Pending', 'Assigned', 'In Progress', 'Resolved', 'Rejected'], default: 'Pending' },
  attachment:  { type: String },
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName:    { type: String },
  userEmail:   { type: String },
  agentId:     { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);