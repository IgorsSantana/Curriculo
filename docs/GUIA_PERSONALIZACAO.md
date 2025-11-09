# 🎨 Guia de Personalização do Portfolio

Este guia vai te ajudar a customizar o portfólio para refletir sua identidade e seus projetos.

## 📝 Passo 1: Informações Pessoais

### Editar o Nome e Título

No arquivo `src/components/PortfolioDashboard.jsx`, encontre:

```jsx
<h1 ref={heroTitleRef} className={styles.heroTitle}>
  Dashboard de Carreira de <span className={styles.highlight}>[Seu Nome]</span>
</h1>
```

**Substitua por:**
```jsx
<h1 ref={heroTitleRef} className={styles.heroTitle}>
  Dashboard de Carreira de <span className={styles.highlight}>Igor Silva</span>
</h1>
```

### Atualizar os Widgets do Hero

Encontre os widgets e personalize os números:

```jsx
<div ref={widget1Ref} className={`${styles.widget} ${styles.widget1}`}>
  <div className={styles.widgetIcon}>📊</div>
  <div className={styles.widgetLabel}>Projetos Concluídos</div>
  <div className={styles.widgetValue}>15</div> {/* ← Seu número */}
</div>

<div ref={widget2Ref} className={`${styles.widget} ${styles.widget2}`}>
  <div className={styles.widgetIcon}>🛠️</div>
  <div className={styles.widgetLabel}>Ferramentas</div>
  <div className={styles.widgetValue}>Power BI, SQL, Python</div> {/* ← Suas ferramentas */}
</div>
```

## 🎬 Passo 2: Adicionar Seus Projetos

### Projeto 1

Encontre a seção "PROJETO 1" e edite:

```jsx
<span className={styles.projectTag}>Projeto 01</span>
<h2 className={styles.projectTitle}>Dashboard de Vendas Corporativas</h2> {/* ← Seu título */}
<p className={styles.projectDescription}>
  Análise completa de vendas com KPIs dinâmicos... {/* ← Sua descrição */}
</p>

<div className={styles.projectTechs}>
  <span className={styles.tech}>Power BI</span>
  <span className={styles.tech}>DAX</span>
  <span className={styles.tech}>Python</span>
  <span className={styles.tech}>SQL Server</span>
  {/* ← Adicione ou remova tecnologias */}
</div>

<a href="#" className={styles.projectLink}> {/* ← Seu link do Power BI */}
  Ver Relatório ao Vivo →
</a>
```

### Projeto 2

Repita o processo para o Projeto 2 na seção correspondente.

## 📞 Passo 3: Informações de Contato

Encontre a seção de contato e atualize seus links:

```jsx
<div className={styles.contactLinks}>
  <a href="https://linkedin.com/in/seu-perfil" className={styles.contactButton}>
    <span className={styles.contactIcon}>💼</span>
    LinkedIn
  </a>
  <a href="mailto:seu@email.com" className={styles.contactButton}>
    <span className={styles.contactIcon}>✉️</span>
    Email
  </a>
  <a href="https://github.com/seu-usuario" className={styles.contactButton}>
    <span className={styles.contactIcon}>🐙</span>
    GitHub
  </a>
</div>
```

## 🎨 Passo 4: Personalizar Cores

### Gradientes Principais

No arquivo `src/components/PortfolioDashboard.module.css`:

```css
/* Encontre estas linhas e ajuste as cores */

/* Gradiente do título */
background: linear-gradient(90deg, #00d4ff, #7b2ff7);
/* Azul ciano → Roxo */

/* Fundo escuro */
background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
/* Azul escuro → Azul médio */
```

**Sugestões de Paletas:**

**Profissional Azul:**
```css
linear-gradient(90deg, #2563eb, #0891b2)  /* Azul → Ciano */
```

**Energético Verde:**
```css
linear-gradient(90deg, #10b981, #06b6d4)  /* Verde → Ciano */
```

**Empresarial Elegante:**
```css
linear-gradient(90deg, #6366f1, #8b5cf6)  /* Índigo → Violeta */
```

### Cores de Destaque

Procure por essas classes e ajuste:

```css
.highlight {
  color: #00d4ff;  /* ← Cor do seu nome */
}

.widgetValue {
  color: #00d4ff;  /* ← Cor dos valores dos widgets */
}

.projectTag {
  background: rgba(0, 212, 255, 0.2);  /* ← Cor da tag "Projeto 01" */
  color: #00d4ff;
}
```

## ⚙️ Passo 5: Ajustar Velocidade das Animações

### Tornar Animações Mais Lentas

No arquivo `src/components/PortfolioDashboard.jsx`:

```javascript
scrollTrigger: {
  trigger: containerRef.current,
  start: 'top top',
  end: '+=2000',  // ← Aumente para +=3000 ou +=4000
  scrub: 1,       // ← Aumente para 2 ou 3 (mais suave)
  pin: true,
  anticipatePin: 1,
}
```

**Valores Recomendados:**
- `end: '+=2000'` - Rápido (2 segundos de scroll virtual)
- `end: '+=3000'` - Médio (3 segundos)
- `end: '+=5000'` - Lento/Dramático (5 segundos)

- `scrub: 1` - Responsivo
- `scrub: 2` - Suave
- `scrub: 3` - Muito suave/cinematográfico

### Ajustar Duração de Fade-ins/Fade-outs

```javascript
tl1.to(heroTitleRef.current, {
  opacity: 0,
  y: -50,
  duration: 0.3  // ← Aumente para 0.5 ou 0.8
}, 0)
```

## 🎯 Passo 6: Adicionar Mais Projetos

Para adicionar um terceiro projeto:

### 1. Adicionar Ref

```javascript
const projeto3Ref = useRef(null)
```

### 2. Criar Nova Timeline

```javascript
const tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: containerRef.current,
    start: 'top top',
    end: '+=6000',  // +2000px a mais que tl2
    scrub: 1,
    pin: true,
  }
})

// Copiar transições anteriores...
// Adicionar nova transição:
tl3.to(projeto2Ref.current, {
  x: '-100%',
  opacity: 0.5,
  duration: 0.3
}, 0.8)

tl3.fromTo(projeto3Ref.current,
  { x: '100%', opacity: 0 },
  { x: '0%', opacity: 1, duration: 0.3 }, 
  0.8)
```

### 3. Adicionar JSX

```jsx
<section ref={projeto3Ref} className={styles.projectSection}>
  {/* Copiar estrutura de projeto1Ref ou projeto2Ref */}
</section>
```

## 📱 Passo 7: Otimizar para Mobile

### Desabilitar Animações em Mobile

```javascript
useLayoutEffect(() => {
  // Detectar mobile
  const isMobile = window.innerWidth < 768
  
  if (isMobile) {
    // Mostrar versão simples sem pin
    gsap.set([projeto1Ref.current, projeto2Ref.current], {
      position: 'relative',
      opacity: 1
    })
    return
  }
  
  // Animações normais para desktop...
}, [])
```

### Ajustar Layout Mobile

No `PortfolioDashboard.module.css`, já existem media queries:

```css
@media (max-width: 1024px) {
  .projectContent {
    grid-template-columns: 1fr;  /* Uma coluna só */
  }
}
```

Ajuste conforme necessário!

## 🐛 Passo 8: Debug de Problemas

### Ver Markers de Debug

```javascript
scrollTrigger: {
  markers: true,  // ← Mude para true
  // ...
}
```

Você verá linhas coloridas mostrando onde as animações começam/terminam.

### Console do GSAP

Abra o Console do navegador (F12) e digite:

```javascript
// Ver todos os ScrollTriggers
ScrollTrigger.getAll()

// Refresh (se algo estiver quebrado)
ScrollTrigger.refresh()

// Kill tudo (para resetar)
ScrollTrigger.killAll()
```

## 🚀 Passo 9: Preparar para Produção

### Build para Deploy

```bash
npm run build
```

Isso cria a pasta `dist/` com arquivos otimizados.

### Deploy Recomendado

**Vercel (Grátis + Rápido):**
```bash
npm install -g vercel
vercel
```

**Netlify:**
1. Arraste a pasta `dist/` em netlify.com
2. Pronto!

### Hospedar Vídeos Separadamente

Para não deixar o site pesado:

1. Faça upload dos vídeos no Cloudflare R2 ou AWS S3
2. Obtenha as URLs públicas
3. No componente, substitua:

```jsx
<source src="https://seu-bucket.s3.amazonaws.com/projeto1.mp4" type="video/mp4" />
```

## 💡 Dicas Extras

### Adicionar Google Analytics

No `index.html`, antes do `</head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Adicionar Favicon

Coloque um `favicon.ico` em `public/` e adicione no `index.html`:

```html
<link rel="icon" type="image/x-icon" href="/favicon.ico">
```

### SEO (Título e Descrição)

No `index.html`:

```html
<title>Igor Silva - Portfolio de Business Intelligence</title>
<meta name="description" content="Portfolio interativo de projetos Power BI, análise de dados e visualizações." />
<meta property="og:title" content="Igor Silva - Portfolio BI" />
<meta property="og:description" content="Explore meus projetos de Power BI com uma experiência interativa única" />
```

## 🎓 Aprofundamento

### Recursos para Aprender Mais

- **GSAP Docs**: https://greensock.com/docs/
- **ScrollTrigger Examples**: https://greensock.com/st-demos/
- **GSAP + React**: https://greensock.com/react/
- **CSS Animations**: https://web.dev/animations/

### Inspirações de Scrollytelling

- https://www.apple.com/airpods-pro/
- https://www.tesla.com/
- https://lenis.studiofreight.com/

---

**Qualquer dúvida, consulte o README.md principal ou a documentação do GSAP!** 🚀

