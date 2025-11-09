# 🎯 Portfolio Dashboard - Scrollytelling Experience

Um portfólio interativo de projetos Power BI com experiência imersiva de scrollytelling, utilizando React + GSAP + ScrollTrigger.

## 🏆 Performance

```
⭐ Performance: 88/100
⚡ First Contentful Paint: 0.3s
🎯 Largest Contentful Paint: 1.0s
♿ Accessibility: 100/100
```

**Top 10% dos portfólios web!** 🚀

## 🚀 Tecnologias

- **React 18** - Framework UI
- **Vite** - Build tool de alta performance
- **GSAP 3** - Biblioteca de animações profissional
- **ScrollTrigger** - Plugin GSAP para animações controladas por scroll
- **CSS Modules** - Estilização modular e sem conflitos
- **LazyIframe** - Lazy loading otimizado para iframes
- **WebP + Sharp** - Otimização de imagens

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview
```

## 🎨 Estrutura do Projeto

```
portfolio-dashboard-scrollytelling/
├── src/
│   ├── components/
│   │   ├── PortfolioDashboard.jsx       # Componente principal
│   │   └── PortfolioDashboard.module.css # Estilos modulares
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                         # Estilos globais
├── public/
│   └── videos/                           # Adicione seus vídeos aqui
│       ├── projeto1.mp4
│       ├── projeto1.webm
│       ├── projeto2.mp4
│       └── projeto2.webm
├── index.html
├── package.json
└── vite.config.js
```

## 🎬 Como Funciona

### 1. **Seção Hero (Dashboard Principal)**
- Ocupa 100vh da tela
- Exibe widgets fictícios de dashboard
- Animação de fade-out controlada por scroll

### 2. **Transição Hero → Projeto 1**
- Container é "pinado" (fixado) na viewport
- Scroll controla uma timeline de animação
- Efeito de zoom/expansão do widget
- Fade-in suave do primeiro projeto

### 3. **Transição Projeto 1 → Projeto 2**
- Slide horizontal (simulando troca de abas)
- Projeto 1 desliza para esquerda
- Projeto 2 entra pela direita

### 4. **Seção de Contato**
- Pin é liberado
- Scroll normal retorna
- Formulário de contato e links sociais

## 🎯 Configuração das Animações

### useLayoutEffect vs useEffect

```javascript
// ✅ CORRETO - useLayoutEffect
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    // Animações aqui
  }, containerRef)
  
  return () => ctx.revert()
}, [])
```

**Por quê?** `useLayoutEffect` executa **antes** do browser pintar, evitando o "flash" de conteúdo não animado.

### ScrollTrigger - Parâmetros Importantes

```javascript
scrollTrigger: {
  trigger: containerRef.current,  // Elemento que dispara a animação
  start: 'top top',               // Quando começa (trigger top = viewport top)
  end: '+=2000',                  // 2000px de scroll virtual
  scrub: 1,                       // Sincroniza com scroll (1 = suavização)
  pin: true,                      // Fixa o elemento
  anticipatePin: 1,               // Previne pulos
  markers: false                  // Debug visual (true para ver)
}
```

### Timeline Structure

```javascript
const tl = gsap.timeline({ scrollTrigger: {...} })

// Sintaxe: .to(elemento, { propriedades }, posição_na_timeline)
tl.to(heroTitle, { opacity: 0, y: -50, duration: 0.3 }, 0)    // Posição 0s
tl.to(widget1, { opacity: 0, scale: 0.8, duration: 0.3 }, 0)  // Posição 0s (paralelo)
tl.fromTo(projeto1, 
  { opacity: 0, scale: 0.9 },      // Estado inicial
  { opacity: 1, scale: 1 }, 
  0.5)                             // Posição 0.5s
```

## 🎥 Adicionando Seus Vídeos

1. Converta seus dashboards Power BI para vídeo (use OBS Studio ou similar)
2. Exporte em dois formatos para compatibilidade:
   - **MP4** (H.264) - compatibilidade geral
   - **WebM** (VP9) - melhor compressão/qualidade

3. Coloque os vídeos em `public/videos/`:
```
public/videos/
├── projeto1.mp4
├── projeto1.webm
├── projeto2.mp4
└── projeto2.webm
```

4. Otimize os vídeos para web:
```bash
# Usando FFmpeg (reduz tamanho sem perder qualidade)
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output.mp4
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 output.webm
```

## ⚡ Otimizações de Performance

### 1. **Vídeos ao invés de iframes**
- ✅ Vídeos: ~5-10MB, renderização GPU
- ❌ iframes Power BI: pesado, JavaScript bloqueante

### 2. **Propriedades CSS otimizadas**
```css
.elemento {
  transform: translateZ(0);      /* Força GPU */
  will-change: transform;        /* Prepara otimização */
  backface-visibility: hidden;   /* Evita flickering */
}
```

### 3. **GSAP Settings**
- `scrub: 1` - Suaviza animações (valor maior = mais suave)
- `anticipatePin: 1` - Previne pulos no pin
- Context cleanup evita memory leaks

### 4. **Lazy Loading de Vídeos**
```html
<video preload="metadata">  <!-- Carrega apenas metadados -->
```

## 🐛 Debug de Animações

### Visualizar Markers do ScrollTrigger

```javascript
scrollTrigger: {
  markers: true  // Mostra linhas de debug
}
```

Você verá:
- **start** (verde) - Onde a animação começa
- **end** (vermelho) - Onde termina
- **scroller-start/end** - Posição do viewport

### Console Helpers

```javascript
// Listar todos os ScrollTriggers ativos
ScrollTrigger.getAll().forEach(st => console.log(st))

// Refresh após mudanças no DOM
ScrollTrigger.refresh()
```

## 📱 Responsividade

Para dispositivos móveis, considere desabilitar as animações complexas:

```javascript
useLayoutEffect(() => {
  // Detecta mobile
  const isMobile = window.innerWidth < 768
  
  if (isMobile) {
    // Versão simplificada ou sem scroll-pin
    return
  }
  
  // Animações completas para desktop
  const ctx = gsap.context(() => {
    // ...
  })
}, [])
```

## 🎨 Personalização

### Cores do Tema

```css
/* Principais cores do gradiente */
--primary-gradient: linear-gradient(90deg, #00d4ff, #7b2ff7);
--bg-dark: #0a0e27;
--bg-medium: #1a1f3a;
```

### Duração das Animações

```javascript
end: '+=2000'  // Aumente para animações mais lentas
scrub: 2       // Aumente para mais suavização
```

### Adicionar Mais Projetos

1. Adicione uma nova ref: `const projeto3Ref = useRef(null)`
2. Crie uma nova timeline `tl3` similar à `tl2`
3. Configure a transição (slide, fade, zoom, etc.)
4. Adicione a nova `<section>` no JSX

## 📚 Documentação Completa

Toda a documentação técnica, changelogs e guias estão organizados na pasta **[`docs/`](./docs/)**:

### 🏆 Performance
- **[SUCESSO_PERFORMANCE_88.md](./docs/SUCESSO_PERFORMANCE_88.md)** - 🎉 Como alcançamos Performance 88
- **[GUIA_MANUTENCAO_PERFORMANCE.md](./docs/GUIA_MANUTENCAO_PERFORMANCE.md)** - Como manter a performance
- **[OTIMIZACOES_AVANCADAS_OPCIONAL.md](./docs/OTIMIZACOES_AVANCADAS_OPCIONAL.md)** - Para chegar a 90+

### 📱 Mobile & Responsividade
- **[VERSAO_MOBILE_COMPLETA.md](./docs/VERSAO_MOBILE_COMPLETA.md)** - Implementação mobile
- **[SEM_SCROLL_INTERNO.md](./docs/SEM_SCROLL_INTERNO.md)** - Ajustes de layout

### 📊 Projetos Power BI
- **[PROJETO1_DETALHES.md](./docs/PROJETO1_DETALHES.md)** - Dashboard de Análise de Vendas
- **[PROJETO2_DETALHES.md](./docs/PROJETO2_DETALHES.md)** - Dashboard de Checklists
- **[PROJETO3_DETALHES.md](./docs/PROJETO3_DETALHES.md)** - Dashboard de Controle de Perdas

### 🎨 Conceito Visual
- **[CONCEITO_VISUAL.md](./docs/CONCEITO_VISUAL.md)** - A metáfora do "Data Graph"

### 🔧 Troubleshooting
- **[TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)** - Soluções para problemas comuns

**📖 [Ver índice completo da documentação →](./docs/README.md)**

## 📚 Recursos Adicionais

- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Demos](https://greensock.com/st-demos/)
- [React + GSAP Best Practices](https://greensock.com/react/)
- [Web.dev Performance](https://web.dev/performance/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

## 🤝 Próximos Passos

- [x] ~~Adicionar projetos Power BI~~ ✅
- [x] ~~Implementar versão mobile otimizada~~ ✅
- [x] ~~Otimizar performance (70-80)~~ ✅ **Alcançado 88!**
- [ ] Adicionar analytics (Vercel Analytics)
- [ ] Deploy (Vercel/Netlify)
- [ ] Adicionar mais projetos (opcional)

## 🚀 Deploy

Pronto para publicar? Veja o guia completo:

**[📖 DEPLOY.md](./DEPLOY.md)** - Guia de deploy para Vercel, Netlify e GitHub Pages

**[🔧 COMANDOS_GIT.md](./COMANDOS_GIT.md)** - Setup do repositório GitHub

---

## 📄 Licença

MIT - Sinta-se livre para usar em seus projetos! ([LICENSE](./LICENSE))

---

## 📞 Contato

**Desenvolvedor:** Igor Santana  
**Projeto:** Dashboard de Carreira - Portfolio  
**Repositório:** [github.com/IgorsSantana/Curriculo](https://github.com/IgorsSantana/Curriculo)  

---

Desenvolvido com ❤️ e muito scroll 🖱️

