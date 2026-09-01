// Repository em memória: metadados dos documentos são perdidos ao reiniciar o processo.
const documents = new Map();

function save(document) {
  documents.set(document.id, document);
  return document;
}

function findAll(owner) {
  const all = Array.from(documents.values());
  return owner ? all.filter((document) => document.owner === owner) : all;
}

function findById(id) {
  return documents.get(id);
}

module.exports = { save, findAll, findById };
