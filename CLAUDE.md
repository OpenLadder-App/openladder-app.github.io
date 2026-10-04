# Landing page do OpenLadder — guia para o Claude Code

Página única em React 19 + Vite + Tailwind 4. Todo o conteúdo está em `src/components/LandingPage.tsx`.
O código do produto fica em outro repositório (`OpenLadder-App/openladder`, privado).

- **Repositório público**: nada de segredos, chaves ou material interno.
- **Um branch, dois destinos**: `main` vai para openladder.app (Cloudflare) e openladder-app.github.io (Pages).
  Não use caminhos que dependam do domínio; mantenha `base` na raiz.
- Os exemplos interativos são iframes de `https://editor-vibe.openladder.app/?logic=...` — a lógica vai codificada
  na URL. Para gerar novas URLs, use o gerador da versão embedded.
- Mantenha o `<link rel="canonical">` apontando para `https://openladder.app/`.
- Antes de terminar: `npm run lint` e `npm run build`.
