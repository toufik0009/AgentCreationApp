const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/agents', require('./routes/agentRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
