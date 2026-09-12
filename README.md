# Black & White IT

Site institucional de página única para a **Black & White IT** — empresa de aluguel de sites, aplicativos e sistemas com manutenção, segurança e suporte inclusos.

## Visão geral

A Black & White IT oferece um modelo de assinatura mensal para presença digital. Em vez de comprar um site caro e contratar técnico de TI, o cliente aluga e recebe tudo incluso: hospedagem, SSL, manutenção, atualizações, segurança e suporte.

## Estrutura de pastas

```
blackandwhite-it/
├── index.html
├── README.md
├── jsconfig.json
├── robots.txt
├── .htaccess
├── _headers
├── netlify.toml
├── css/
│   └── style.css
└── js/
    └── script.js
```

## Tecnologias

- HTML5 semântico
- CSS3 puro (variáveis, grid, flexbox, animações)
- JavaScript vanilla (ES2020+, IIFE, IntersectionObserver)
- Fontes: Inter e JetBrains Mono (Google Fonts)

## Como executar localmente

```bash
git clone https://github.com/LEVIATAD21/blackandwhite-it.git
cd blackandwhite-it
python3 -m http.server 8080
```

Acesse `http://localhost:8080` no navegador.

## Segurança

- Content Security Policy (CSP) restritivo via meta tag
- Honeypot duplo para detecção de bots
- Anti-bot com timeout de 5 segundos
- Validação de entrada com whitelist Unicode
- Sanitização de campos contra injeção
- Headers de segurança (X-Frame-Options, X-Content-Type-Options, etc.)
- Bloqueio de bots de IA via robots.txt
- HTTPS forçado via .htaccess

## Responsividade

O site é responsivo e funciona em telas a partir de 320px até 1440px+, com breakpoints em 980px, 768px e 480px.

## Acessibilidade

- Skip-link para pular ao conteúdo principal
- Atributos ARIA em elementos interativos
- Focus-visible para navegação por teclado
- prefers-reduced-motion respeitado
- Contraste de cores adequado

## Transparência de conteúdo

Depoimentos e resultados comerciais devem ser publicados somente quando forem verificáveis e autorizados pelas pessoas ou empresas mencionadas.

## Autor

Black & White IT — Soluções de TI por assinatura.

## Licença

Todos os direitos reservados.
