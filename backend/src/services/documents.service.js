const crypto = require('node:crypto');
const documentsRepository = require('../repositories/documents.repository');

function createDocument({ file, owner }) {
  const document = {
    id: crypto.randomUUID(),
    originalName: file.originalname,
    size: file.size,
    uploadedAt: new Date().toISOString(),
    owner: owner || null,
    storedName: file.filename,
  };

  return documentsRepository.save(document);
}

function listDocuments(owner) {
  return documentsRepository.findAll(owner);
}

function getDocumentById(id) {
  return documentsRepository.findById(id);
}

module.exports = { createDocument, listDocuments, getDocumentById };
