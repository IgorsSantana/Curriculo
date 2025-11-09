# 🛠️ Guia de Manutenção da Performance

## 🎯 Objetivo
Manter o score de **Performance 88+** conforme você adiciona novos projetos e conteúdo.

---

## ✅ Regras de Ouro

### 1. 🖼️ SEMPRE Use WebP para Imagens

#### ❌ ERRADO:
```jsx
<img src="minha-imagem.png" alt="..." />
```

#### ✅ CORRETO:
```jsx
<picture>
  <source srcSet={minhaImagem.webp} type="image/webp" />
  <img 
    src={minhaImagem.png} 
    alt="..." 
    loading="lazy"
    width="100"
    height="100"
  />
</picture>
```

#### Como Converter PNG → WebP:

**Opção 1: Online**
- https://squoosh.app/ (Google)
- Quality: 80-85

**Opção 2: Sharp (Node.js)**
```javascript
import sharp from 'sharp'

await sharp('input.png')
  .webp({ quality: 80 })
  .toFile('output.webp')
```

---

### 2. 🎥 SEMPRE Use LazyIframe para Embeds

#### ❌ ERRADO:
```jsx
<iframe 
  src="https://app.powerbi.com/..." 
  title="Dashboard"
/>
```

#### ✅ CORRETO:
```jsx
import LazyIframe from './LazyIframe'

<LazyIframe 
  ref={iframeRef}
  src="https://app.powerbi.com/..." 
  title="Dashboard"
/>
```

**Benefício:** Economia de ~1-2 MB por iframe no carregamento inicial.

---

### 3. 📦 SEMPRE Teste em Produção

#### ❌ ERRADO:
```bash
npm run dev
# Testar Lighthouse aqui (localhost:3000)
```

#### ✅ CORRETO:
```bash
npm run build
npm run preview
# Testar Lighthouse aqui (localhost:4173)
```

**Por quê?**
- DEV não minifica
- DEV não comprime
- DEV não faz tree-shaking
- DEV tem source maps grandes

**Diferença:** ~28 pontos de Performance!

---

### 4. 🚫 NUNCA Adicione Imagens Grandes

**Limites:**
- PNG: Máximo 200 KB
- JPG: Máximo 150 KB
- WebP: Máximo 50 KB

**Se a imagem for maior:**
1. Comprima com Squoosh.app
2. Converta para WebP
3. Use lazy loading
4. Especifique width/height

---

### 5. 🔄 Monitore o Tamanho do Build

Após cada build, verifique:

```bash
npm run build

# Veja o output:
# dist/assets/index-*.js  → deve ser < 100 KB
# dist/assets/*-vendor-*.js  → deve ser < 150 KB cada
```

**Se algum chunk for > 200 KB:**
- Revise o que você adicionou
- Considere code splitting adicional
- Use dynamic imports

---

## 📊 Checklist Pré-Commit

Antes de fazer commit de novas features, verifique:

```markdown
- [ ] Novas imagens estão em WebP?
- [ ] Imagens têm width/height?
- [ ] Imagens têm loading="lazy"?
- [ ] Novos iframes usam LazyIframe?
- [ ] Rodei npm run build?
- [ ] Build gerou chunks < 200 KB?
- [ ] Testei no preview (4173)?
- [ ] Performance ainda 85+?
```

---

## 🆕 Como Adicionar Novo Projeto

### Passo 1: Prepare o Dashboard

```bash
# URL do Power BI (com embed):
https://app.powerbi.com/reportEmbed?reportId=SEU_ID&autoAuth=true&...
```

### Passo 2: Crie um Ref

```javascript
const iframe4Ref = useRef(null)
```

### Passo 3: Use LazyIframe

```jsx
<LazyIframe
  ref={iframe4Ref}
  src="https://app.powerbi.com/..."
  title="Novo Dashboard"
  className={styles.projectVideo}
/>
```

### Passo 4: Botão Fullscreen

```jsx
<button
  className={styles.projectLink}
  onClick={() => {
    const iframe = iframe4Ref.current
    if (iframe?.requestFullscreen) {
      iframe.requestFullscreen()
    }
  }}
>
  Ver em Tela Cheia
</button>
```

### Passo 5: Adicione à Timeline GSAP

```javascript
// Projeto 3 → Projeto 4
masterTimeline
  .to(project3Ref.current, {
    opacity: 0,
    x: '-100vw',
    duration: 1,
    ease: 'power2.inOut'
  }, 5.5)
  .fromTo(project4Ref.current, {
    opacity: 0,
    x: '100vw'
  }, {
    opacity: 1,
    x: '0vw',
    duration: 1,
    ease: 'power2.inOut'
  }, 5.5)
```

### Passo 6: Atualize ProgressNavigation

```javascript
// Em ProgressNavigation.jsx
const sections = [
  { name: 'Início', position: 0 },
  { name: 'Sobre Mim', position: 25 },
  { name: 'Projeto 1', position: 50 },
  { name: 'Projeto 2', position: 65 },
  { name: 'Projeto 3', position: 85 },
  { name: 'Projeto 4', position: 92 }, // ← NOVO
  { name: 'Contato', position: 100 }
]
```

### Passo 7: Teste Performance

```bash
npm run build
npm run preview
# Lighthouse em localhost:4173
# Certifique-se que ainda está 85+
```

---

## 🚨 Alertas de Performance

### ⚠️ Problema: Performance Caiu Abaixo de 85

**Diagnóstico:**
```bash
npm run build
# Veja se algum chunk está > 200 KB
```

**Possíveis causas:**
1. Adicionou imagem PNG grande
2. Novo iframe sem LazyIframe
3. Importou biblioteca pesada
4. Muitas animações simultâneas

**Soluções:**
1. Converta imagens para WebP
2. Use LazyIframe
3. Use dynamic import
4. Reduza partículas/animações

---

### ⚠️ Problema: LCP > 2.5s

**Diagnóstico:**
```
Lighthouse > LCP Element
```

**Possíveis causas:**
1. Imagem grande sendo carregada
2. Font blocking render
3. CSS crítico não inline

**Soluções:**
1. Otimize a imagem LCP
2. Use `font-display: swap`
3. Considere critical CSS inline

---

### ⚠️ Problema: TBT > 300ms

**Diagnóstico:**
```
Lighthouse > Minimize main-thread work
```

**Possíveis causas:**
1. Muito JavaScript executando
2. Animações pesadas
3. Processamento síncrono

**Soluções:**
1. Use `requestIdleCallback`
2. Reduza partículas em transições
3. Mova código para Web Workers

---

## 📚 Recursos Recomendados

### Ferramentas Online
1. **Squoosh** - https://squoosh.app/ (otimizar imagens)
2. **WebPageTest** - https://www.webpagetest.org/ (teste avançado)
3. **Bundlephobia** - https://bundlephobia.com/ (tamanho de libs)

### Extensões Chrome
1. **Lighthouse** - Built-in DevTools
2. **Web Vitals** - Monitora FCP, LCP, CLS
3. **React DevTools** - Debug performance

### CLI Tools
```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse http://localhost:4173 --view

# Bundle Analyzer
npm install -D rollup-plugin-visualizer
```

---

## 📊 Metas de Performance

### Mínimo Aceitável
```
Performance: 80+
FCP: < 1.5s
LCP: < 2.5s
TBT: < 300ms
CLS: < 0.1
```

### Ideal (Seu Atual!)
```
Performance: 88
FCP: 0.3s  ✅
LCP: 1.0s  ✅
TBT: 250ms ✅
CLS: 0.057 ✅
```

### Excelência (Opcional)
```
Performance: 90+
FCP: < 0.5s
LCP: < 1.0s
TBT: < 200ms
CLS: < 0.05
```

---

## 🔄 Workflow de Desenvolvimento

### 1. Desenvolvimento Local
```bash
npm run dev
# Trabalhe normalmente em localhost:3000
```

### 2. Antes de Commitar
```bash
npm run build
npm run preview
# Teste em localhost:4173
# Se Performance < 85, otimize antes de commitar
```

### 3. Deploy
```bash
# Seu build está em /dist
# Suba para Netlify, Vercel, GitHub Pages, etc.
```

---

## 🎯 Quando Re-otimizar?

Rode Lighthouse novamente se:

1. ✅ Adicionou novo projeto (iframe)
2. ✅ Adicionou novas imagens
3. ✅ Instalou nova biblioteca
4. ✅ Modificou animações significativamente
5. ✅ A cada 1-2 meses (manutenção)

---

## 🏆 Seu Portfólio Agora Está

```
┌─────────────────────────────────────────┐
│                                         │
│   🚀 PERFORMANCE: 88/100                │
│   ♿ ACCESSIBILITY: 100/100             │
│   🛡️ BEST PRACTICES: 78/100            │
│   🔍 SEO: 92/100                        │
│                                         │
│   ═══════════════════════════           │
│   MÉDIA GERAL: 89.5/100 ⭐⭐⭐⭐⭐      │
│   ═══════════════════════════           │
│                                         │
│   ✅ PRONTO PARA O MERCADO!             │
│                                         │
└─────────────────────────────────────────┘
```

---

## 📞 Suporte

Se Performance cair abaixo de 80:

1. Rode `npm run build`
2. Verifique tamanho dos chunks
3. Procure por imagens grandes
4. Confirme que LazyIframe está sendo usado
5. Teste em localhost:4173 (não :3000!)

---

**Mantenha a excelência! Você chegou ao topo! 🏆**

