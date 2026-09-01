import { getDownloadUrl } from '../services/documentsApi';

export default function DownloadButton({ documentId, fileName }) {
  return (
    <a
      href={getDownloadUrl(documentId)}
      download={fileName}
      className="inline-flex items-center rounded-md bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 transition hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400"
    >
      Baixar
    </a>
  );
}
