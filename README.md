# LAB40 – Laboratório de Funcionalidades Web

Projeto-base para avaliação prática de Integração e Entrega Contínua (CI/CD).

## Requisitos
- Node.js 20 ou superior.
- npm.

## Executar localmente
```bash
npm install
npm start
```
Acesse http://localhost:3000. Para desenvolvimento com reinicialização automática: `npm run dev`.

## Endpoints
- `GET /health`: verificação de disponibilidade.
- `GET /api/features`: lista as 40 funcionalidades e seus estados.
- `POST /api/features/:id`: executa uma funcionalidade, recebendo JSON no corpo.

Exemplo:
```bash
curl -X POST http://localhost:3000/api/features/1 -H "Content-Type: application/json" -d '{"valor":200,"percentual":15}'
```

## Estrutura
```text
lab40/
├── public/
├── src/
│   ├── app.js
│   ├── server.js
│   └── features/
├── package.json
└── package-lock.json
```

## Feature 19 — Identificador de menor valor

A Feature 19 identifica o menor elemento de uma lista numérica não vazia. Todos os elementos precisam ser números finitos.

```bash
curl -X POST http://localhost:3000/api/features/19 -H "Content-Type: application/json" -d '{"valores":[8,2,5]}'
```

O resultado contém `result.menor` igual a `2`.

## Qualidade e testes

```bash
npm run lint
npm test
npm run test:smoke
npm audit --audit-level=high
```

Os testes automatizados cobrem caso típico, fronteira com lista de um elemento, números negativos/decimais e entradas inválidas. O smoke test sobe a aplicação em uma porta efêmera e valida `GET /health` e a API da Feature 19. Na auditoria realizada em 27/11/2026, o resultado foi `found 0 vulnerabilities`.

### Roteiro manual

1. Execute `npm install` e `npm start`.
2. Acesse `http://localhost:3000/health` e confirme `status: "ok"`.
3. Acesse `http://localhost:3000` e selecione a Feature 19 na interface.
4. Execute a entrada `{ "valores": [8, 2, 5] }` e confirme o retorno `menor: 2`.
5. Envie `{ "valores": [] }` pela API e confirme HTTP 400 com mensagem clara.

## Automação CI/CD

O workflow [CI](.github/workflows/ci.yml) é executado em `push` e `pull_request`. Ele instala dependências com `npm ci`, executa lint, testes, auditoria, smoke test e constrói/valida uma imagem Docker, publicando a imagem como artefato.

O workflow [CD simulado](.github/workflows/cd.yml) é acionado após `push` na `main`. Ele constrói a imagem de entrega e publica o artefato `lab40-delivery-record`, com a imagem `.tar` e o arquivo `deployment-record.txt` (repositório, referência, SHA e tag).

## Docker

Quando o Docker Desktop estiver em execução, use:

```bash
docker build --pull -t lab40:feature19 .
docker run -d --name lab40-container -p 3000:3000 lab40:feature19
curl --fail http://localhost:3000/health
docker stop lab40-container
docker rm lab40-container
```

## Contrato de cada módulo
Cada arquivo `src/features/featureNN.js` exporta `id`, `name`, `description`, `implemented` e `execute(input)`.

1. Implemente `execute(input)`.
2. Valide os dados recebidos.
3. Retorne um objeto serializável em JSON.
4. Trate entradas inválidas lançando `Error` com mensagem clara.
5. Depois de implementar e validar, altere `implemented` para `true`.
6. Não altere o contrato dos outros módulos nem a API central sem autorização.

Enquanto `implemented` for `false`, a API retorna HTTP 501 para aquele módulo.

## Importante
Este repositório é entregue intencionalmente sem testes automatizados, análise estática, workflow de CI, build ou configuração de deploy. O estudante deverá criar e justificar esses elementos durante a avaliação.

O servidor escuta `process.env.PORT` e `0.0.0.0`, e a aplicação não persiste dados em disco.
