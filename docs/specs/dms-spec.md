# Especificação - Document Management System

> Especificação gerada a partir de `docs/specs/spec-template.md` para orientar
> o desenvolvimento guiado por especificação (Spec Driven Development).

## 1. Objetivo

Prover um sistema web simples para upload, listagem e download de documentos,
com gestão básica por usuário e armazenamento estritamente local.

## 2. Escopo

### Dentro do escopo

- Upload de documentos
- Listagem de documentos
- Download de documentos
- Gestão simples por usuário (associação de documentos a um `owner`)

### Fora do escopo

- Armazenamento externo ou em nuvem
- Versionamento de documentos
- Autenticação e autorização completas (login, sessões, permissões)
- Edição ou exclusão de documentos
- Busca avançada ou filtros complexos

## 3. Requisitos funcionais

| ID    | Requisito                                                          |
| ----- | ------------------------------------------------------------------- |
| RF-01 | O usuário pode enviar um documento                                 |
| RF-02 | O usuário pode listar os documentos enviados                       |
| RF-03 | O usuário pode baixar um documento pelo identificador              |
| RF-04 | Cada documento enviado é associado a um `owner` (usuário simples)   |
| RF-05 | O sistema valida a presença do arquivo no upload                   |
| RF-06 | O sistema retorna erro 404 ao tentar baixar um documento inexistente |

## 4. Requisitos não funcionais

| ID     | Requisito                                                            |
| ------ | ---------------------------------------------------------------------- |
| RNF-01 | Arquivos gravados no filesystem local via multer com `diskStorage`     |
| RNF-02 | Metadados dos documentos mantidos em memória nesta fase                |
| RNF-03 | Configuração via variáveis de ambiente (12-Factor), ex.: `PORT`         |
| RNF-04 | Fluxo de dependência respeitado: routes -> controllers -> services -> repositories |
| RNF-05 | Erros tratados nos limites do sistema (entrada HTTP, leitura/escrita de arquivos) |

## 5. Modelo de dados (metadados do documento)

| Campo        | Tipo   | Descrição                          |
| ------------ | ------ | ----------------------------------- |
| id           | string | Identificador único do documento    |
| originalName | string | Nome original do arquivo enviado    |
| size         | number | Tamanho em bytes                    |
| uploadedAt   | string | Data/hora do upload (ISO 8601)      |
| owner        | string | Identificador do usuário dono       |

## 6. Contratos de API

### POST /upload

- Entrada: arquivo (`multipart/form-data`, campo `file`) e, opcionalmente,
  campo `owner` identificando o usuário.
- Saída (201): metadados do documento criado.

```json
{
  "id": "b3f1e2c4-...",
  "originalName": "contrato.pdf",
  "size": 10240,
  "uploadedAt": "2026-09-01T12:00:00.000Z",
  "owner": "usuario1"
}
```

- Erros:
  - 400: arquivo ausente ou inválido.

### GET /documents

- Entrada: query opcional `?owner=` para filtrar por usuário.
- Saída (200): lista de metadados de documentos.

```json
[
  {
    "id": "b3f1e2c4-...",
    "originalName": "contrato.pdf",
    "size": 10240,
    "uploadedAt": "2026-09-01T12:00:00.000Z",
    "owner": "usuario1"
  }
]
```

### GET /documents/:id/download

- Entrada: `id` do documento na URL.
- Saída (200): conteúdo binário do arquivo, com headers `Content-Type` e
  `Content-Disposition` apropriados.
- Erros:
  - 404: documento não encontrado.

## 7. Decisões arquiteturais

- Backend em Clean Architecture simples, separando `routes/`, `controllers/`,
  `services/` e `repositories/` em `backend/src`, com fluxo de dependência
  único (camadas internas não conhecem camadas externas).
- Persistência de arquivos exclusivamente local, via multer com
  `diskStorage`, gravando em `backend/storage`; metadados mantidos em memória
  no repository.
- Frontend baseado em componentes React (`components/`, `pages/`,
  `services/`), consumindo o backend via `fetch` através do prefixo `/api`.

## 8. Plano de execução

1. Modelar a entidade de documento e o repository em memória no backend.
2. Implementar o service com as regras de negócio de upload, listagem e
   download.
3. Configurar o multer com `diskStorage` apontando para `backend/storage`.
4. Implementar os controllers e as routes para `POST /upload`,
   `GET /documents` e `GET /documents/:id/download`.
5. Escrever testes com `node:test` cobrindo upload, listagem, download e os
   casos de erro (arquivo ausente, documento inexistente).
6. Implementar o frontend: página de listagem, componente de upload e
   serviço de acesso à API via `fetch`.
7. Realizar testes manuais end-to-end (upload real, listagem e download).
