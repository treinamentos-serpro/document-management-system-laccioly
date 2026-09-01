const express = require('express');
const multer = require('multer');
const documentsController = require('../controllers/documents.controller');
const { STORAGE_DIR } = require('./storage-path');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, STORAGE_DIR);
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post('/upload', upload.single('file'), documentsController.upload);
router.get('/documents', documentsController.list);
router.get('/documents/:id/download', documentsController.download);

module.exports = router;
