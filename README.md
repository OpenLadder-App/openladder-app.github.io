# OpenLadder — landing page

Site do [OpenLadder](https://openladder.app), editor e simulador de lógica Ladder (CLP) no navegador.

O mesmo branch `main` é publicado em dois lugares:

| Endereço | Como |
|---|---|
| https://openladder.app | Cloudflare Worker (arquivos estáticos), build do próprio Cloudflare a cada push |
| https://openladder-app.github.io | GitHub Pages, pelo workflow `.github/workflows/pages.yml` |

O endereço oficial é `openladder.app`; a página declara isso em `<link rel="canonical">`, para os buscadores não
tratarem o espelho como conteúdo duplicado.

## Desenvolvimento

Requer Node.js 22 ou superior.

```bash
npm ci
npm run dev        # http://localhost:3000
npm run build      # gera dist/
```

## Configuração única

- **GitHub Pages**: em *Settings → Pages → Build and deployment*, escolher *Source: GitHub Actions*.
- **Cloudflare**: em *Workers & Pages → (Worker da landing) → Settings → Build*, conectar este repositório,
  *Build command* `npm ci && npm run build`, *Deploy command* `npx wrangler deploy`, branch `main`.
  O `name` em `wrangler.jsonc` precisa ser igual ao nome do Worker.

## Licença

Ainda não definida. Até lá, todos os direitos reservados.
