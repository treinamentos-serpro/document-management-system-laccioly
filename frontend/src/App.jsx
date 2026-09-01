import { useCallback, useEffect, useState } from 'react';
import UploadComponent from './components/UploadComponent';
import DocumentList from './components/DocumentList';
import { listDocuments } from './services/documentsApi';

export default function App() {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDocuments = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      setDocuments(await listDocuments());
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <h1 className="text-3xl font-bold text-slate-900">Document Management System</h1>

        <UploadComponent onUploaded={loadDocuments} />

        <section className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Documentos</h2>
            <button
              type="button"
              onClick={loadDocuments}
              disabled={isLoading}
              className="rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Atualizar lista
            </button>
          </div>
          <DocumentList documents={documents} isLoading={isLoading} error={error} />
        </section>
      </div>
    </main>
  );
}
