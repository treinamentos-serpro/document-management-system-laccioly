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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200"
    >
      <h2 className="text-xl font-semibold text-slate-900">Enviar documento</h2>

      <div className="flex flex-col gap-1">
        <label htmlFor="file" className="text-sm font-medium text-slate-700">
          Arquivo
        </label>
        <input
          id="file"
          name="file"
          type="file"
          onChange={(event) => setFile(event.target.files[0] ?? null)}
          className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-md file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="owner" className="text-sm font-medium text-slate-700">
          Dono (opcional)
        </label>
        <input
          id="owner"
          name="owner"
          type="text"
          value={owner}
          placeholder="Nome do usuário"
          onChange={(event) => setOwner(event.target.value)}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
      </div>

      <button
        type="submit"
        disabled={isSending}
        className="self-start rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSending ? 'Enviando...' : 'Enviar'}
      </button>

      {message && (
        <p
          role="status"
          className={
            message.type === 'error'
              ? 'rounded-md bg-red-50 px-3 py-2 text-sm text-red-700'
              : 'rounded-md bg-green-50 px-3 py-2 text-sm text-green-700'
          }
        >
          {message.text}
        </p>
      )}
    </form>
  );
}
