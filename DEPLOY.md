# 🚀 Guia de Deploy - Portfolio Dashboard

## 📦 Pré-requisitos

Antes de fazer o deploy, certifique-se de que:

✅ `npm run build` executa sem erros  
✅ `npm run preview` mostra o site funcionando  
✅ Performance Lighthouse está 85+ (teste no preview!)  
✅ Todos os dashboards Power BI estão funcionando  

---

## 🌐 Opções de Deploy

### 1. Vercel (Recomendado) ⭐

**Por quê Vercel?**
- ✅ Deploy automático do GitHub
- ✅ HTTPS grátis
- ✅ CDN global
- ✅ Brotli compression nativo
- ✅ Analytics grátis

#### Passo a Passo:

1. **Crie uma conta:**
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com GitHub

2. **Importe o repositório:**
   ```
   New Project → Import Git Repository
   → Selecione seu repo (IgorsSantana/Curriculo)
   ```

3. **Configure o projeto:**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Deploy!**
   ```
   Click "Deploy"
   Aguarde 1-2 minutos
   ```

5. **Configure domínio (opcional):**
   ```
   Project Settings → Domains
   → Adicione seu domínio customizado
   ```

**URL final:** `https://seu-portfolio.vercel.app`

---

### 2. Netlify

**Vantagens:**
- ✅ Interface simples
- ✅ Formulários integrados
- ✅ Redirects e headers customizados

#### Passo a Passo:

1. **Crie uma conta:**
   - Acesse [netlify.com](https://netlify.com)
   - Faça login com GitHub

2. **Novo site:**
   ```
   Add new site → Import existing project
   → GitHub → Selecione seu repo
   ```

3. **Configuração:**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

4. **Deploy!**

**URL final:** `https://seu-portfolio.netlify.app`

---

### 3. GitHub Pages

**Vantagens:**
- ✅ Grátis
- ✅ Integrado ao GitHub

**Desvantagens:**
- ⚠️ Sem Brotli automático
- ⚠️ Mais lento que Vercel/Netlify

#### Configuração:

1. **Instale gh-pages:**
```bash
npm install -D gh-pages
```

2. **Adicione scripts ao `package.json`:**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://IgorsSantana.github.io/Curriculo"
}
```

3. **Configure `vite.config.js`:**
```javascript
export default defineConfig({
  base: '/Curriculo/',  // Nome do repo
  // ... resto da config
})
```

4. **Deploy:**
```bash
npm run deploy
```

5. **Configure no GitHub:**
```
Settings → Pages
→ Source: Deploy from branch
→ Branch: gh-pages / (root)
→ Save
```

**URL final:** `https://IgorsSantana.github.io/Curriculo`

---

## ⚙️ Configurações Avançadas

### Headers de Segurança (Vercel)

Crie `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Headers de Segurança (Netlify)

Crie `netlify.toml`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 🔍 SEO & Analytics

### Meta Tags (já implementado em `index.html`)

```html
<meta name="description" content="Portfolio interativo de projetos Power BI com experiência de scrollytelling" />
<title>Dashboard de Carreira - Portfolio</title>
```

### Google Analytics (opcional)

1. **Crie uma propriedade GA4:**
   - [analytics.google.com](https://analytics.google.com)
   - Crie nova propriedade
   - Copie o ID (G-XXXXXXXXXX)

2. **Adicione ao `index.html`:**
```html
<head>
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
  <!-- ... -->
</head>
```

### Vercel Analytics (recomendado)

```bash
npm install @vercel/analytics
```

Em `src/main.jsx`:
```javascript
import { inject } from '@vercel/analytics'

inject()

// ... resto do código
```

---

## 🔒 Variáveis de Ambiente

Se você precisar de API keys (futuro):

### Desenvolvimento (`.env.local`):
```env
VITE_API_KEY=sua-key-dev
```

### Produção:
- **Vercel:** Project Settings → Environment Variables
- **Netlify:** Site Settings → Environment variables

**Uso no código:**
```javascript
const apiKey = import.meta.env.VITE_API_KEY
```

---

## 📊 Performance Pós-Deploy

### Teste com Lighthouse

1. Acesse sua URL de produção
2. Abra DevTools (F12)
3. Lighthouse → Run Audit
4. Certifique-se que Performance está 85+

### PageSpeed Insights

- Acesse: [pagespeed.web.dev](https://pagespeed.web.dev)
- Cole sua URL
- Teste Mobile + Desktop

### WebPageTest

- Acesse: [webpagetest.org](https://webpagetest.org)
- Teste de múltiplas localizações

---

## 🔄 Deploy Automático (CI/CD)

### Vercel (Automático)

```
Push para GitHub → Deploy automático ✅
```

### Netlify (Automático)

```
Push para GitHub → Deploy automático ✅
```

### GitHub Pages (Manual)

```bash
# Sempre que quiser atualizar:
npm run deploy
```

---

## 🐛 Troubleshooting

### Erro: "Module not found"
```bash
# Limpe cache e reinstale
rm -rf node_modules dist
npm install
npm run build
```

### Build funciona local mas não no deploy
```bash
# Certifique-se que Node version é compatível
# Adicione ao package.json:
"engines": {
  "node": ">=18.0.0",
  "npm": ">=9.0.0"
}
```

### Performance caiu no deploy
- ✅ Certifique-se que Brotli está ativo
- ✅ Verifique se os assets estão cacheados
- ✅ Use Lighthouse no URL de produção (não localhost!)

### Power BI não carrega
- ✅ Verifique URLs dos iframes
- ✅ Certifique-se que `filterPaneEnabled=false` está na URL
- ✅ Verifique permissões de embed do Power BI

---

## 📝 Checklist Pré-Deploy

```markdown
- [ ] `npm run build` sem erros
- [ ] `npm run preview` funciona
- [ ] Performance Lighthouse 85+
- [ ] Todos dashboards carregam
- [ ] Mobile responsivo OK
- [ ] Links funcionando
- [ ] README atualizado
- [ ] .gitignore configurado
- [ ] Sem dados sensíveis no repo
- [ ] Build folder em .gitignore
- [ ] node_modules em .gitignore
```

---

## 🎯 Comandos Rápidos

### Desenvolvimento
```bash
npm run dev
```

### Build Local
```bash
npm run build
npm run preview
```

### Deploy Vercel
```bash
# Instale Vercel CLI (opcional)
npm install -g vercel
vercel
```

### Deploy Netlify
```bash
# Instale Netlify CLI (opcional)
npm install -g netlify-cli
netlify deploy --prod
```

### Deploy GitHub Pages
```bash
npm run deploy
```

---

## 🏆 Após o Deploy

1. **Compartilhe sua URL:**
   - LinkedIn
   - Currículo
   - GitHub profile README

2. **Monitore Analytics:**
   - Vercel Analytics
   - Google Analytics

3. **Teste regularmente:**
   - Performance
   - Links quebrados
   - Responsividade

4. **Atualize frequentemente:**
   - Novos projetos
   - Melhorias de performance
   - Correções de bugs

---

## 📞 Suporte

**Problemas no deploy?**
- Vercel: [vercel.com/support](https://vercel.com/support)
- Netlify: [docs.netlify.com](https://docs.netlify.com)
- GitHub Pages: [docs.github.com/pages](https://docs.github.com/pages)

**Documentação do projeto:**
- [README.md](./README.md)
- [docs/TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)

---

## 🎉 Pronto!

Seu portfólio com **Performance 88** está pronto para impressionar recrutadores! 🚀

**URL sugerida:** `https://igor-santana-portfolio.vercel.app`

---

*Última atualização: 08/11/2025*

