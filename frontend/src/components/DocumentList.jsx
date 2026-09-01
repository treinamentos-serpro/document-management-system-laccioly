import DownloadButton from './DownloadButton';

function formatSize(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleString('pt-BR');
}

export default function DocumentList({ documents, isLoading, error }) {
  if (isLoading) {
    return <p className="text-sm text-slate-500">Carregando documentos...</p>;
  }

  if (error) {
    return (
      <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
        {error}
      </p>
    );
  }

  if (documents.length === 0) {
    return <p className="text-sm text-slate-500">Nenhum documento enviado até o momento.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-slate-500">
            <th className="py-2 pr-4 font-medium">Nome</th>
            <th className="py-2 pr-4 font-medium">Tamanho</th>
            <th className="py-2 pr-4 font-medium">Enviado em</th>
            <th className="py-2 pr-4 font-medium">Dono</th>
            <th className="py-2 pr-4 font-medium">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {documents.map((document) => (
            <tr key={document.id} className="text-slate-700">
              <td className="py-2 pr-4">{document.originalName}</td>
              <td className="py-2 pr-4">{formatSize(document.size)}</td>
              <td className="py-2 pr-4">{formatDate(document.uploadedAt)}</td>
              <td className="py-2 pr-4">{document.owner || '-'}</td>
              <td className="py-2 pr-4">
                <DownloadButton documentId={document.id} fileName={document.originalName} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
