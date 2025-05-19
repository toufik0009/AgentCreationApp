const express = require('express');
const { login } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/login', login);

module.exports = router;
