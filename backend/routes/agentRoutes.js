const express = require('express');
const { createAgent, getAllAgents } = require('../controllers/agentController');
const router = express.Router();

router.post('/', createAgent);
router.get('/', getAllAgents);

module.exports = router;
