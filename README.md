# Predik

Site one-page da Predik: manutenção preditiva para agroindústria, com sensor e software inclusos. HTML, CSS e JavaScript estáticos, sem build.

Publicado em: https://erik-akaishi.github.io/predik/

## Estrutura

- `index.html`: a página (SEO, Open Graph e JSON-LD no `<head>`)
- `assets/sensor-boot.js`: prepara a seção "O sensor" e carrega o 3D só quando ela se aproxima da tela
- `assets/sensor-3d.js`: sensor 3D (Three.js embutido), carregado sob demanda e pausado fora da tela
- `assets/site.js`: simulador, contador de perdas, formulário (demonstração), menu, campos de calor e animações de entrada (respeitam prefers-reduced-motion)
- `assets/img`, `assets/fonts`: imagens do sensor e JetBrains Mono (woff2)
- `robots.txt`, `sitemap.xml`, `llms.txt`: rastreamento, indexação e leitura por IA
- `404.html`, `.nojekyll`, favicons

## Publicar (GitHub Pages)

Settings → Pages → Source: "Deploy from a branch" → Branch: `main`, pasta `/ (root)`.

## Domínio próprio (depois)

Trocar a URL base em `index.html` (canonical, `og:url`, `og:image`, JSON-LD), `robots.txt`, `sitemap.xml`, `llms.txt` e `404.html`, e criar o arquivo `CNAME` com o domínio.

## Observação

Os números do site são projeções sobre uma empresa-base (300 funcionários, safra de 8 meses, 40 ativos críticos, 12 paradas por ano de 6 horas, R$ 15.000 por hora parada). O formulário é demonstração: nenhum dado é enviado.

Construído por [Akaishi Design Studio](https://akaishidesign.com.br).
