---
description: Melhora o visual do frontend do DMS aplicando Tailwind CSS 3 aos componentes React existentes.
name: melhorar-visual-tailwind
agent: tailwind-ui
---

# Melhorar visual com Tailwind CSS 3

Use o agente [tailwind-ui](../agents/tailwind-ui.agent.md) para melhorar o visual da aplicação frontend do Document Management System com Tailwind CSS 3.

Escopo:

1. Configure o Tailwind CSS 3 no projeto `frontend` (dependências, `tailwind.config.js`, `postcss.config.js` e diretivas no CSS global), caso ainda não esteja configurado.
2. Reestilize os componentes existentes com classes utilitárias do Tailwind:
   - [App.jsx](../../frontend/src/App.jsx)
   - [UploadComponent.jsx](../../frontend/src/components/UploadComponent.jsx)
   - [DocumentList.jsx](../../frontend/src/components/DocumentList.jsx)
   - [DownloadButton.jsx](../../frontend/src/components/DownloadButton.jsx)
3. Não altere a lógica de negócio, apenas a apresentação (JSX/estilos).
4. Garanta um layout responsivo, com hierarquia visual clara e feedback visual para estados de carregamento, sucesso e erro.
5. Valide o resultado rodando `npm run build` em `frontend/`.
