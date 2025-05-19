const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  agentId: mongoose.Schema.Types.ObjectId,
  firstName: String,
  phone: String,
  notes: String
});

module.exports = mongoose.model('Task', taskSchema);
