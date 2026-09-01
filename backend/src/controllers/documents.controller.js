const path = require('node:path');
const documentsService = require('../services/documents.service');
const { STORAGE_DIR } = require('../routes/storage-path');

function upload(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: 'Nenhum arquivo foi enviado.' });
  }

  const document = documentsService.createDocument({
    file: req.file,
    owner: req.body.owner,
  });

  return res.status(201).json(document);
}

function list(req, res) {
  const documents = documentsService.listDocuments(req.query.owner);
  return res.status(200).json(documents);
}

function download(req, res) {
  const document = documentsService.getDocumentById(req.params.id);

  if (!document) {
    return res.status(404).json({ message: 'Documento não encontrado.' });
  }

  const filePath = path.join(STORAGE_DIR, document.storedName);
  return res.download(filePath, document.originalName, (error) => {
    if (error && !res.headersSent) {
      res.status(404).json({ message: 'Arquivo do documento não encontrado no storage.' });
    }
  });
}

module.exports = { upload, list, download };
