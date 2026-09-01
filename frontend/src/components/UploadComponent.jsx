import { useState } from 'react';
import { uploadDocument } from '../services/documentsApi';

export default function UploadComponent({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [owner, setOwner] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!file) {
      setMessage({ type: 'error', text: 'Selecione um arquivo para enviar.' });
      return;
    }

    setIsSending(true);
    setMessage(null);

    try {
      const document = await uploadDocument(file, owner.trim());
      setMessage({ type: 'success', text: `Documento "${document.originalName}" enviado com sucesso.` });
      setFile(null);
      event.target.reset();
      onUploaded?.();
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enviar documento</h2>

      <label htmlFor="file">Arquivo</label>
      <input
        id="file"
        name="file"
        type="file"
        onChange={(event) => setFile(event.target.files[0] ?? null)}
      />

      <label htmlFor="owner">Dono (opcional)</label>
      <input
        id="owner"
        name="owner"
        type="text"
        value={owner}
        placeholder="Nome do usuário"
        onChange={(event) => setOwner(event.target.value)}
      />

      <button type="submit" disabled={isSending}>
        {isSending ? 'Enviando...' : 'Enviar'}
      </button>

      {message && <p role="status">{message.text}</p>}
    </form>
  );
}
