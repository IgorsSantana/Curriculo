# 🔧 Troubleshooting e Otimizações

Soluções para problemas comuns e dicas de performance.

## ⚠️ Problemas Comuns

### 1. "Flash" de Conteúdo Não Animado

**Sintoma:** Ao carregar a página, você vê todo o conteúdo por 1 segundo antes das animações começarem.

**Solução:**

Garanta que está usando `useLayoutEffect` (não `useEffect`):

```javascript
// ❌ ERRADO
useEffect(() => {
  // animações...
}, [])

// ✅ CORRETO
useLayoutEffect(() => {
  // animações...
}, [])
```

**Solução Adicional:** Adicione CSS inicial:

```css
/* No PortfolioDashboard.module.css */
.projectSection {
  opacity: 0; /* Começa invisível */
  z-index: 2;
}
```

---

### 2. Animações "Travando" ou Com Lag

**Sintoma:** As animações não são suaves, parecem congelar.

**Causas Possíveis:**

#### a) Vídeos Muito Pesados

Vídeos maiores que 20MB podem causar lag. **Otimize:**

```bash
# Reduzir bitrate
ffmpeg -i input.mp4 -b:v 2M output.mp4

# Reduzir resolução
ffmpeg -i input.mp4 -vf scale=1280:720 output.mp4
```

#### b) Falta de GPU Acceleration

Garanta que estas propriedades estão nos elementos animados:

```css
.elemento {
  transform: translateZ(0);
  will-change: transform, opacity;
  backface-visibility: hidden;
}
```

#### c) `scrub` Muito Baixo

No ScrollTrigger, aumente o valor de `scrub`:

```javascript
scrub: 1  // ← Tente 2 ou 3
```

---

### 3. Pin Não Está Funcionando

**Sintoma:** A página rola normalmente, sem "fixar" o conteúdo.

**Soluções:**

#### a) Verifique se o ScrollTrigger está registrado

```javascript
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
```

#### b) Verifique o `overflow` no CSS

```css
/* Garanta que não há overflow: hidden no body */
body {
  overflow-x: hidden; /* OK */
  overflow-y: auto;   /* OK */
  /* overflow: hidden ← REMOVE ISSO */
}
```

#### c) Force o refresh

```javascript
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    // ... animações ...
    
    ScrollTrigger.refresh() // ← Adicione isso
  }, containerRef)
}, [])
```

---

### 4. Vídeos Não Estão Carregando

**Sintoma:** Tela preta no lugar do vídeo.

**Soluções:**

#### a) Verifique o caminho dos arquivos

Estrutura correta:
```
public/
└── videos/
    ├── projeto1.mp4
    └── projeto1.webm
```

No código:
```jsx
<source src="/videos/projeto1.mp4" type="video/mp4" />
```

#### b) Teste com um vídeo placeholder

Baixe um vídeo de teste de: https://file-examples.com/

#### c) Verifique o formato do vídeo

Use esta ferramenta online: https://www.videohelp.com/software

**Formatos compatíveis:**
- MP4: Codec H.264
- WebM: Codec VP8 ou VP9

---

### 5. Erro "Cannot read property 'current' of null"

**Sintoma:** Console mostra erro sobre refs.

**Solução:** Garanta que todos os elementos têm a ref correta:

```jsx
// ❌ ERRADO
<section ref={projeto1Ref}></section>

// ✅ CORRETO
const projeto1Ref = useRef(null) // Declarado no topo
// ...
<section ref={projeto1Ref}>...</section>
```

---

### 6. Animações Não Acontecem no Mobile

**Sintoma:** No celular, o site parece estático.

**Solução:** ScrollTrigger funciona no mobile, mas pode precisar de ajustes:

```javascript
scrollTrigger: {
  // ... config normal ...
  
  // Adicione isso:
  invalidateOnRefresh: true,
  
  // Ou desabilite no mobile:
  // (adicione dentro do useLayoutEffect)
}

// Alternativa: detectar mobile
const isMobile = window.innerWidth < 768
if (isMobile) {
  // Sem animações complexas
  return
}
```

---

### 7. Múltiplos ScrollTriggers Conflitando

**Sintoma:** Animações se sobrepõem de forma estranha.

**Solução:** Use uma única timeline para sequências:

```javascript
// ❌ EVITE múltiplas timelines independentes
const tl1 = gsap.timeline({ scrollTrigger: {...} })
const tl2 = gsap.timeline({ scrollTrigger: {...} })

// ✅ USE uma timeline com múltiplas animações
const master = gsap.timeline({ scrollTrigger: {...} })
master
  .to(elemento1, {...})
  .to(elemento2, {...})
  .to(elemento3, {...})
```

**NOTA:** No nosso código, temos `tl1` e `tl2` separadas porque têm `end` diferentes. Isso é intencional!

---

## ⚡ Otimizações de Performance

### 1. Lazy Loading de Vídeos

Por padrão, o navegador carrega todos os vídeos. Otimize:

```jsx
<video 
  autoPlay 
  loop 
  muted 
  playsInline
  preload="none"  // ← Só carrega quando necessário
  loading="lazy"  // ← Navegadores modernos
>
```

**OU** carregue dinamicamente:

```javascript
const [videoLoaded, setVideoLoaded] = useState(false)

useEffect(() => {
  // Só carrega vídeo quando a seção está visível
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setVideoLoaded(true)
    }
  })
  observer.observe(projeto1Ref.current)
}, [])

// No JSX:
{videoLoaded && (
  <video src="/videos/projeto1.mp4" />
)}
```

---

### 2. Reduzir Tamanho dos Vídeos

**Alvo:** 5-10MB por vídeo (máximo 15MB)

```bash
# Comprimir agressivamente (mantenha qualidade visual)
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 96k output.mp4

# WebM (geralmente menor)
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 35 -b:v 0 output.webm
```

**CRF (Constant Rate Factor):**
- 18: Quase sem perdas (grande)
- 23: Alta qualidade (recomendado)
- 28: Boa qualidade (menor)
- 35: Qualidade OK para web (muito menor)

---

### 3. Usar CDN para Vídeos

**Problema:** Vídeos pesados tornam o deploy lento.

**Solução:** Hospede vídeos separadamente:

**Opção 1: Cloudflare R2 (Grátis até 10GB)**

1. Crie conta em cloudflare.com
2. Vá em R2 Storage
3. Faça upload dos vídeos
4. Obtenha URL pública

```jsx
<source src="https://seu-bucket.r2.dev/projeto1.mp4" type="video/mp4" />
```

**Opção 2: AWS S3**

Mesmo processo, mas pago (poucos centavos).

---

### 4. Disable ScrollTrigger em Modo de Edição

Se você estiver desenvolvendo e precisar testar sem animações:

```javascript
useLayoutEffect(() => {
  const isDevelopment = true // ← Mude para false em produção
  
  if (isDevelopment) {
    gsap.set([projeto1Ref.current, projeto2Ref.current], {
      opacity: 1,
      x: 0
    })
    return
  }
  
  // Animações normais...
}, [])
```

---

### 5. Implementar Loading Screen

Para evitar "flash" durante carregamento inicial:

**Crie um componente `LoadingScreen.jsx`:**

```jsx
import { useState, useEffect } from 'react'
import styles from './LoadingScreen.module.css'

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Simula carregamento de recursos
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])
  
  if (!loading) return null
  
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.spinner}></div>
      <p>Carregando Dashboard...</p>
    </div>
  )
}
```

**CSS:**

```css
.loadingScreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #0a0e27;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(0, 212, 255, 0.3);
  border-top-color: #00d4ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

**Use no `App.jsx`:**

```jsx
import LoadingScreen from './components/LoadingScreen'
import PortfolioDashboard from './components/PortfolioDashboard'

function App() {
  return (
    <>
      <LoadingScreen />
      <PortfolioDashboard />
    </>
  )
}
```

---

### 6. Bundle Size Analysis

Veja o que está deixando o site pesado:

```bash
npm install --save-dev rollup-plugin-visualizer
```

**Atualize `vite.config.js`:**

```javascript
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true })
  ]
})
```

```bash
npm run build
```

Abrirá um gráfico interativo mostrando o tamanho de cada biblioteca.

---

## 🐛 Debug Avançado

### Console Helpers

```javascript
// Adicione ao useLayoutEffect para debug:

console.log('ScrollTriggers:', ScrollTrigger.getAll())

// Log do progresso do scroll
scrollTrigger: {
  onUpdate: (self) => console.log('Progress:', self.progress)
}
```

### Visualizar Boundaries

```javascript
scrollTrigger: {
  markers: {
    startColor: "green",
    endColor: "red",
    fontSize: "18px",
    fontWeight: "bold",
    indent: 20
  }
}
```

### Kill Animação Específica

```javascript
// No console do navegador:
ScrollTrigger.getById("minhaAnimacao").kill()
```

Para usar:
```javascript
scrollTrigger: {
  id: "minhaAnimacao",
  // ...
}
```

---

## 📊 Métricas de Performance

### Target (Meta)

- **FCP (First Contentful Paint):** < 1.5s
- **LCP (Largest Contentful Paint):** < 2.5s
- **CLS (Cumulative Layout Shift):** < 0.1
- **FPS:** Sempre 60 FPS durante animações

### Como Medir

**Lighthouse (Chrome DevTools):**

1. F12 → Aba "Lighthouse"
2. Selecione "Performance"
3. Click "Analyze page load"

**GSAP Performance:**

```javascript
// Adicione ao início do useLayoutEffect:
gsap.ticker.fps(120) // Tenta 120 FPS (default é 60)
```

**Monitor FPS em tempo real:**

```javascript
const stats = new Stats()
document.body.appendChild(stats.dom)

function animate() {
  stats.begin()
  // código de animação
  stats.end()
  requestAnimationFrame(animate)
}
```

---

## 🆘 Ainda com Problemas?

### Checklist Final

- [ ] `npm install` executado com sucesso?
- [ ] Servidor rodando em `http://localhost:3000`?
- [ ] Console do navegador sem erros vermelhos?
- [ ] Vídeos na pasta `public/videos/`?
- [ ] `useLayoutEffect` (não `useEffect`)?
- [ ] `gsap.registerPlugin(ScrollTrigger)` presente?
- [ ] Cleanup implementado (`return () => ctx.revert()`)?

### Recursos de Ajuda

- **GSAP Forum:** https://greensock.com/forums/
- **Stack Overflow:** Tag `gsap` + `scrolltrigger`
- **Documentação Oficial:** https://greensock.com/docs/

---

**Lembre-se:** Performance > Funcionalidade. É melhor ter animações simples e rápidas do que complexas e travadas! 🚀

