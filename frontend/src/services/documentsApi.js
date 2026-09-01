// Cliente HTTP do backend. Todas as chamadas usam o prefixo /api, que o Vite
// redireciona para o servidor Express em desenvolvimento.
const API_PREFIX = '/api';

async function parseError(response, fallbackMessage) {
  try {
    const body = await response.json();
    return body.message || fallbackMessage;
  } catch {
    return fallbackMessage;
  }
}

export async function uploadDocument(file, owner) {
  const formData = new FormData();
  formData.append('file', file);

  if (owner) {
    formData.append('owner', owner);
  }

  const response = await fetch(`${API_PREFIX}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await parseError(response, 'Não foi possível enviar o documento.'));
  }

  return response.json();
}

export async function listDocuments(owner) {
  const query = owner ? `?owner=${encodeURIComponent(owner)}` : '';
  const response = await fetch(`${API_PREFIX}/documents${query}`);

  if (!response.ok) {
    throw new Error(await parseError(response, 'Não foi possível listar os documentos.'));
  }

  return response.json();
}

export function getDownloadUrl(id) {
  return `${API_PREFIX}/documents/${encodeURIComponent(id)}/download`;
}
