# Black & White IT

Landing page institucional para a **Black & White IT** — empresa de aluguel e assinatura de sites, apps e sistemas com tudo incluso: hospedagem, domínio, SSL, design, manutenção, segurança e suporte.

## Estrutura Real

```
blackandwhite-it-main/
├── assets/                # Imagens e mídias locais
├── css/style.css          # Estilos completos
├── js/script.js           # Lógica: menu, formulário, WhatsApp, reveal
├── .vscode/settings.json  # Configuração do editor
├── jsconfig.json          # Configuração JS para o VS Code
├── .gitignore             # Proteção contra arquivos indesejados
├── index.html             # Página principal
└── README.md
```

## Tecnologias

HTML5, CSS3 e JavaScript (ES2020+). Sem frameworks.

## Funcionalidades

- Landing page responsiva (320px a 1440px+)
- Menu mobile com painel lateral e ARIA correto
- Formulário que abre o WhatsApp com mensagem pronta
- Validação inline (sem alert)
- Animações sutis de scroll com IntersectionObserver
- Botão voltar ao topo após 600px
- Dark mode preto e branco
- Acessibilidade: skip-link, ARIA, focus-visible, prefers-reduced-motion

## Como rodar localmente

```bash
python3 -m http.server 8080
# ou
npx serve .
```

## Contato

WhatsApp: (21) 99507-8663

## Licença

Uso interno — Black & White IT.
