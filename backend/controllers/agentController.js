const Agent = require('../models/Agent');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createAgent = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if agent already exists
    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      return res.status(400).json({ message: 'Agent already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAgent = new Agent({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await newAgent.save();

    // Generate JWT Token
    const token = jwt.sign(
      { agentId: newAgent._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    res.status(201).json({
      _id: newAgent._id,
      name: newAgent.name,
      email: newAgent.email,
      phone: newAgent.phone,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


exports.getAllAgents = async (req, res) => {
  const agents = await Agent.find();
  res.json(agents);
};
