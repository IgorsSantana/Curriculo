# 🔧 Comandos Git - Setup do Repositório

## 📋 Passo a Passo Completo

### 1️⃣ Inicializar Repositório (se ainda não foi feito)

```bash
cd C:\Users\igors\OneDrive\Documentos\Portifolio
git init
```

---

### 2️⃣ Adicionar Arquivos ao Stage

```bash
# Adicionar TODOS os arquivos (exceto os no .gitignore)
git add .

# Ou adicionar seletivamente:
git add src/
git add docs/
git add public/
git add index.html
git add package.json
git add vite.config.js
git add README.md
git add DEPLOY.md
git add GUIA_PERSONALIZACAO.md
git add ESTRUTURA_PROJETO.md
git add LICENSE
git add .gitignore
git add .gitattributes
```

---

### 3️⃣ Fazer o Primeiro Commit

```bash
git commit -m "🎉 Initial commit: Portfolio Dashboard com Performance 88

✨ Features:
- React + GSAP + ScrollTrigger
- 3 Dashboards Power BI interativos
- Scrollytelling experience
- Performance 88/100 (TOP 10%)
- 100% Mobile responsive
- Lazy loading de iframes
- Image optimization (WebP)
- Brotli compression
- Code splitting

📚 Documentação:
- 50 documentos técnicos
- Guias de personalização e deploy
- Troubleshooting completo

🏆 Métricas:
- Performance: 88/100
- Accessibility: 100/100
- LCP: 1.0s
- FCP: 0.3s"
```

---

### 4️⃣ Adicionar Repositório Remoto

```bash
git remote add origin https://github.com/IgorsSantana/Curriculo.git
```

**Verificar se foi adicionado:**
```bash
git remote -v
```

**Saída esperada:**
```
origin  https://github.com/IgorsSantana/Curriculo.git (fetch)
origin  https://github.com/IgorsSantana/Curriculo.git (push)
```

---

### 5️⃣ Renomear Branch para Main (se necessário)

```bash
git branch -M main
```

---

### 6️⃣ Fazer o Push

```bash
# Primeira vez (com -u para tracking)
git push -u origin main

# Próximas vezes (apenas)
git push
```

---

## 🔄 Comandos para Atualizações Futuras

### Adicionar Mudanças

```bash
# Ver o que mudou
git status

# Adicionar arquivos específicos
git add src/components/PortfolioDashboard.jsx
git add docs/NOVA_FEATURE.md

# Ou adicionar tudo
git add .
```

### Commit

```bash
# Commit simples
git commit -m "✨ Adiciona novo projeto Power BI"

# Commit detalhado
git commit -m "✨ Adiciona Dashboard de Logística

- Lazy loading implementado
- Documentação completa
- Performance mantida em 88"
```

### Push

```bash
git push
```

---

## 📝 Convenções de Commit

Use emojis para commits mais claros:

```bash
# Nova feature
git commit -m "✨ feat: Adiciona novo dashboard"

# Bug fix
git commit -m "🐛 fix: Corrige botão fullscreen"

# Documentação
git commit -m "📚 docs: Atualiza README"

# Performance
git commit -m "⚡ perf: Otimiza lazy loading"

# Estilo/CSS
git commit -m "💄 style: Ajusta responsividade mobile"

# Refactor
git commit -m "♻️ refactor: Melhora estrutura do código"

# Testes
git commit -m "✅ test: Adiciona testes unitários"

# Build/Deploy
git commit -m "🔧 build: Atualiza configuração Vite"
```

---

## 🌳 Trabalhando com Branches (Opcional)

### Criar Feature Branch

```bash
# Criar e mudar para nova branch
git checkout -b feature/novo-projeto

# Fazer mudanças...
git add .
git commit -m "✨ Adiciona novo projeto"

# Push da branch
git push -u origin feature/novo-projeto
```

### Voltar para Main

```bash
git checkout main
```

### Merge

```bash
# Estando na main
git merge feature/novo-projeto

# Push do merge
git push
```

### Deletar Branch

```bash
# Local
git branch -d feature/novo-projeto

# Remoto
git push origin --delete feature/novo-projeto
```

---

## 🔍 Comandos Úteis

### Ver Histórico

```bash
# Histórico completo
git log

# Histórico resumido
git log --oneline

# Últimos 5 commits
git log -5

# Com gráfico
git log --graph --oneline --all
```

### Ver Mudanças

```bash
# Mudanças não staged
git diff

# Mudanças staged
git diff --staged

# Mudanças em arquivo específico
git diff src/App.jsx
```

### Desfazer Mudanças

```bash
# Descartar mudanças locais (CUIDADO!)
git checkout -- src/App.jsx

# Tirar arquivo do stage
git reset HEAD src/App.jsx

# Desfazer último commit (mantém mudanças)
git reset --soft HEAD~1

# Desfazer último commit (descarta mudanças) CUIDADO!
git reset --hard HEAD~1
```

### Atualizar do Remoto

```bash
# Baixar mudanças
git fetch origin

# Baixar e fazer merge
git pull origin main
```

---

## 🚨 Problemas Comuns

### Erro: "Repository not found"

```bash
# Verifique a URL do remoto
git remote -v

# Se estiver errada, corrija:
git remote set-url origin https://github.com/IgorsSantana/Curriculo.git
```

### Erro: "Updates were rejected"

```bash
# Primeiro, puxe as mudanças
git pull origin main --rebase

# Depois push
git push origin main
```

### Arquivo Muito Grande

```bash
# Se você adicionou um arquivo muito grande acidentalmente:

# 1. Remova do stage
git rm --cached caminho/do/arquivo-grande.zip

# 2. Adicione ao .gitignore
echo "arquivo-grande.zip" >> .gitignore

# 3. Commit
git add .gitignore
git commit -m "🙈 Adiciona arquivo grande ao gitignore"
```

### Esqueceu de Adicionar algo ao .gitignore

```bash
# 1. Adicione ao .gitignore
echo "node_modules/" >> .gitignore

# 2. Remova do git (mas mantém local)
git rm -r --cached node_modules/

# 3. Commit
git add .gitignore
git commit -m "🙈 Remove node_modules do git"
git push
```

---

## 📂 Arquivos que NÃO devem ir pro GitHub

Estes já estão no `.gitignore`:

```
❌ node_modules/          # Dependências
❌ dist/                  # Build
❌ .env                   # Variáveis sensíveis
❌ *.log                  # Logs
❌ .DS_Store             # macOS
❌ Thumbs.db             # Windows
❌ perfil-original.png   # Backup grande (4.6 MB)
```

---

## ✅ Arquivos que DEVEM ir pro GitHub

```
✅ src/                   # Código fonte
✅ public/                # Assets públicos
✅ docs/                  # Documentação
✅ index.html             # Entry point
✅ package.json           # Dependências
✅ vite.config.js         # Config build
✅ README.md              # Documentação
✅ LICENSE                # Licença MIT
✅ .gitignore             # Ignorar arquivos
✅ .gitattributes         # Line endings
✅ DEPLOY.md              # Guia de deploy
✅ GUIA_PERSONALIZACAO.md # Guia de uso
✅ ESTRUTURA_PROJETO.md   # Visão geral
```

---

## 🎯 Checklist Final Antes do Push

```markdown
- [ ] `git status` não mostra node_modules
- [ ] `git status` não mostra dist/
- [ ] `git status` não mostra .env
- [ ] README.md está atualizado
- [ ] LICENSE está presente
- [ ] .gitignore está correto
- [ ] Commit message é descritivo
- [ ] Não há dados sensíveis (API keys, senhas)
- [ ] Build funciona (npm run build)
```

---

## 🚀 Comandos Completos (Copy-Paste)

```bash
# 1. Inicializar (se necessário)
cd C:\Users\igors\OneDrive\Documentos\Portifolio
git init

# 2. Adicionar todos arquivos
git add .

# 3. Commit inicial
git commit -m "🎉 Initial commit: Portfolio Dashboard com Performance 88"

# 4. Adicionar remoto
git remote add origin https://github.com/IgorsSantana/Curriculo.git

# 5. Renomear branch para main
git branch -M main

# 6. Push
git push -u origin main
```

---

## 📊 Após o Push

### Verificar no GitHub

1. Acesse: https://github.com/IgorsSantana/Curriculo
2. Verifique se todos os arquivos estão lá
3. Verifique se o README está renderizado
4. Verifique se node_modules NÃO está lá

### Configurar GitHub Pages (opcional)

1. Settings → Pages
2. Source: Deploy from branch
3. Branch: main / (root)
4. Save

### Adicionar Description

1. Clique no ⚙️ (Settings) ao lado de "About"
2. Description: `Portfolio interativo com scrollytelling | React + GSAP | Performance 88`
3. Website: Sua URL do Vercel
4. Topics: `portfolio`, `react`, `gsap`, `scrolltrigger`, `power-bi`, `scrollytelling`, `vite`, `performance`

---

## 🎉 Pronto!

Seu repositório está configurado e pronto para:

✅ Commits futuros  
✅ Deploy automático (Vercel/Netlify)  
✅ Compartilhamento com recrutadores  
✅ Contribuições (se quiser)  

**URL do repo:** https://github.com/IgorsSantana/Curriculo

---

*Última atualização: 08/11/2025*

