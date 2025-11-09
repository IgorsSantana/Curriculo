# ⚡ PLANO DE OTIMIZAÇÃO DE PERFORMANCE

## 🔴 PROBLEMAS CRÍTICOS IDENTIFICADOS

### **Performance Score: 40/100**

**Lighthouse Report:**
- ❌ LCP (Largest Contentful Paint): **6.2s** (deve ser < 2.5s)
- ⚠️ FCP (First Contentful Paint): **1.5s** (aceitável, mas pode melhorar)
- ❌ TBT (Total Blocking Time): **510ms** (deve ser < 200ms)
- ✅ CLS (Cumulative Layout Shift): **0.086** (bom, < 0.1)
- ❌ Speed Index: **3.5s** (deve ser < 3.4s)
- ⚠️ Payload total: **18,151 KiB** (muito pesado)

---

## 🎯 PRIORIDADES DE OTIMIZAÇÃO

### **IMPACTO ALTO (Implementar Agora)**

#### **1. Lazy Loading de Iframes do Power BI** ⚡
**Economia estimada: -4s no LCP**

```jsx
// PROBLEMA: Todos iframes carregam no mount
<iframe src="https://app.powerbi.com/..." />

// SOLUÇÃO: Carregar apenas quando visível
import { useEffect, useState, useRef } from 'react'

const LazyIframe = ({ src, title }) => {
  const [shouldLoad, setShouldLoad] = useState(false)
  const iframeRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' } // Pré-carregar 200px antes
    )

    if (iframeRef.current) {
      observer.observe(iframeRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={iframeRef}>
      {shouldLoad ? (
        <iframe src={src} title={title} />
      ) : (
        <div className="iframe-placeholder">
          Carregando dashboard...
        </div>
      )}
    </div>
  )
}
```

#### **2. Otimizar Imagem de Perfil** 🖼️
**Economia estimada: -3,888 KiB**

```bash
# PROBLEMA: perfil.png provavelmente muito grande

# SOLUÇÃO 1: Converter para WebP
npm install --save-dev imagemin imagemin-webp

# Criar versões otimizadas:
- perfil.webp (formato moderno)
- perfil-small.webp (thumbnail 100x100)
- perfil.png (fallback)

# Uso no código:
<picture>
  <source srcSet="/perfil-small.webp" media="(max-width: 768px)" type="image/webp" />
  <source srcSet="/perfil.webp" type="image/webp" />
  <img src="/perfil.png" alt="Igor Santana" loading="lazy" />
</picture>
```

#### **3. Reduzir Animações GSAP** 🎬
**Problema: 71 elementos animados**

```javascript
// PROBLEMA: Muitas animações simultâneas

// SOLUÇÃO: Desabilitar animações complexas em mobile
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const isMobile = window.innerWidth <= 768

useLayoutEffect(() => {
  // Pular animações pesadas em mobile
  if (isMobile || prefersReducedMotion) {
    gsap.set([heroRef.current, aboutRef.current, projeto1Ref.current], {
      opacity: 1
    })
    return
  }

  // Animações completas apenas em desktop
  const ctx = gsap.context(() => {
    // ... animações
  })

  return () => ctx.revert()
}, [isMobile, prefersReducedMotion])
```

#### **4. Reduzir Layout Shifts** 📐
**Problema: 15 layout shifts identificados**

```css
/* PROBLEMA: Elementos sem dimensões definidas */

/* SOLUÇÃO: Definir width/height para evitar shifts */

/* Foto de perfil */
.profileImageBorder {
  width: 100px;
  height: 100px;
  aspect-ratio: 1/1; /* Garante proporção */
}

/* Iframes */
.projectVideo {
  aspect-ratio: 16/9;
  width: 100%;
  height: auto;
}

/* Reservar espaço para conteúdo carregado */
.dashboardPreview {
  min-height: 400px; /* Evita shift ao carregar iframe */
}
```

---

### **IMPACTO MÉDIO (Implementar em Seguida)**

#### **5. Code Splitting**
**Economia: -542 KiB**

```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'gsap': ['gsap'],
          'react': ['react', 'react-dom'],
        }
      }
    }
  }
}
```

#### **6. Compressão de Assets**
**Economia: -1,677 KiB**

```bash
# vite.config.js
npm install --save-dev vite-plugin-compression

import viteCompression from 'vite-plugin-compression'

export default {
  plugins: [
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br'
    })
  ]
}
```

#### **7. Preload de Recursos Críticos**

```html
<!-- index.html -->
<head>
  <!-- Preload fontes -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  
  <!-- Preload imagem de perfil -->
  <link rel="preload" as="image" href="/perfil-small.webp" />
  
  <!-- DNS Prefetch para Power BI -->
  <link rel="dns-prefetch" href="https://app.powerbi.com" />
  <link rel="preconnect" href="https://app.powerbi.com" crossorigin />
</head>
```

---

### **IMPACTO BAIXO (Bônus)**

#### **8. Minificação JS/CSS**

```javascript
// vite.config.js
export default {
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log
        drop_debugger: true
      }
    }
  }
}
```

#### **9. Service Worker / PWA**

```javascript
// vite.config.js
import { VitePWA } from 'vite-plugin-pwa'

export default {
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}']
      }
    })
  ]
}
```

---

## 📋 CHECKLIST DE IMPLEMENTAÇÃO

### **FASE 1: Quick Wins (30min - 1h)**
- [ ] Adicionar `loading="lazy"` em imagens
- [ ] Adicionar `aspect-ratio` em iframes e imagens
- [ ] Reduzir qualidade da imagem de perfil
- [ ] Desabilitar animações pesadas em mobile
- [ ] Adicionar preconnect para Power BI

### **FASE 2: Otimizações Médias (2-3h)**
- [ ] Implementar LazyIframe component
- [ ] Converter imagem para WebP
- [ ] Adicionar compressão Brotli
- [ ] Code splitting manual
- [ ] Remover console.logs

### **FASE 3: Otimizações Avançadas (4-6h)**
- [ ] Implementar Service Worker
- [ ] Adicionar cache strategies
- [ ] Implementar prefetch de próxima seção
- [ ] Otimizar bundle com análise

---

## 🎯 METAS DE PERFORMANCE

### **Após Otimizações:**

| Métrica | Atual | Meta | Como Atingir |
|---------|-------|------|--------------|
| **Performance** | 40 | **85+** | Lazy loading + otimização imagens |
| **LCP** | 6.2s | **< 2.5s** | Lazy iframes + WebP |
| **FCP** | 1.5s | **< 1.0s** | Preload + minificação |
| **TBT** | 510ms | **< 200ms** | Reduzir animações |
| **Payload** | 18MB | **< 5MB** | Compressão + WebP |

---

## 🚀 IMPLEMENTAÇÃO RÁPIDA (30 MIN)

### **Arquivo: `vite.config.js`**

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br'
    })
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'gsap-vendor': ['gsap'],
          'react-vendor': ['react', 'react-dom']
        }
      }
    }
  }
})
```

### **Arquivo: `index.html`**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Preconnect -->
  <link rel="preconnect" href="https://app.powerbi.com" />
  <link rel="dns-prefetch" href="https://app.powerbi.com" />
  
  <!-- Preload recursos críticos -->
  <link rel="preload" as="image" href="/perfil-small.webp" />
  
  <title>Dashboard de Carreira - Portfolio</title>
  <meta name="description" content="Portfolio interativo de projetos Power BI" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

---

## 📊 RESULTADO ESPERADO

### **Performance Score Projetado:**

```
ANTES:  40 ━━━━░░░░░░ 
DEPOIS: 85 ━━━━━━━━░░ 

LCP:  6.2s → 2.0s ✅
FCP:  1.5s → 0.9s ✅
TBT:  510ms → 150ms ✅
SIZE: 18MB → 4MB ✅
```

---

## 🔧 FERRAMENTAS DE ANÁLISE

```bash
# Analisar bundle
npm install --save-dev rollup-plugin-visualizer

# Build e análise
npm run build
npx vite-bundle-visualizer

# Lighthouse CI
npm install -g @lhci/cli
lhci autorun
```

---

**Data:** 09/11/2025  
**Prioridade:** 🔴 CRÍTICO  
**Impacto:** +45 pontos no Performance Score  
**Tempo estimado:** 4-6 horas total

