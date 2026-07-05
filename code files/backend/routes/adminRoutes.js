const express = require('express');
const router = express.Router();
const {
  getDashboard,
  assignAgent,
  getAgents,
  getUsers,
  deleteUser,
  deleteAgent
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/dashboard',     protect, adminOnly, getDashboard);
router.put('/assign',        protect, adminOnly, assignAgent);
router.get('/agents',        protect, adminOnly, getAgents);
router.get('/users',         protect, adminOnly, getUsers);
router.delete('/users/:id',  protect, adminOnly, deleteUser);
router.delete('/agents/:id', protect, adminOnly, deleteAgent);

module.exports = router;