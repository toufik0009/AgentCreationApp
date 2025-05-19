const Task = require('../models/Task');
const Agent = require('../models/Agent');
const csv = require('csv-parser');
const fs = require('fs');
const xlsx = require('xlsx');

exports.uploadFile = async (req, res) => {
  const file = req.file;
  console.log("file",file)
  const agents = await Agent.find();
  if (agents.length < 1) return res.status(400).json({ message: 'No agents found' });

  let rows = [];

  // Read CSV or Excel
  if (file.mimetype === 'text/csv') {
    fs.createReadStream(file.path)
      .pipe(csv())
      .on('data', (row) => rows.push(row))
      .on('end', () => distribute(rows, agents, res));
  } else {
    const workbook = xlsx.readFile(file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    rows = xlsx.utils.sheet_to_json(sheet);
    distribute(rows, agents, res);
  }
};

function distribute(data, agents, res) {
  const assignments = [];
  const total = data.length;
  const agentCount = agents.length;

  for (let i = 0; i < total; i++) {
    const agent = agents[i % agentCount];
    const entry = data[i];
    assignments.push({
      agentId: agent._id,
      firstName: entry.FirstName,
      phone: entry.Phone,
      notes: entry.Notes,
    });
  }

  Task.insertMany(assignments).then(() => res.json({ message: 'Tasks distributed!' }));
}


exports.getAllTask = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};
