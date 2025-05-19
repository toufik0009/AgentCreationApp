const express = require('express');
const multer = require('multer');
const { uploadFile, getAllTask } = require('../controllers/taskController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'text/csv' ||
    file.mimetype === 'application/vnd.ms-excel' ||
    file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file format'), false);
  }
};

const upload = multer({ storage, fileFilter });
const router = express.Router();

router.post('/upload', upload.single('file'), uploadFile);
router.get('/', getAllTask);

module.exports = router;
