const Agent = require('../models/Agent');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for email and password
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find agent by email
    const agent = await Agent.findOne({ email });
    console.log("Email found:", agent);

    if (!agent) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, agent.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { agentId: agent._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      agent: {
        id: agent._id,
        name: agent.name,
        email: agent.email,
        phone: agent.phone
      }
    });

  } catch (error) {
    console.error('Agent login error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
