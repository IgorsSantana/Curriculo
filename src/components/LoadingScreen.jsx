import { useState, useEffect } from 'react'
import styles from './LoadingScreen.module.css'

const LoadingScreen = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Inicializando Dashboard...')

  useEffect(() => {
    // Simula carregamento progressivo de recursos
    const stages = [
      { progress: 20, text: 'Carregando dados...', delay: 300 },
      { progress: 40, text: 'Processando gráficos...', delay: 400 },
      { progress: 60, text: 'Renderizando visualizações...', delay: 400 },
      { progress: 80, text: 'Otimizando performance...', delay: 300 },
      { progress: 100, text: 'Dashboard pronto!', delay: 500 }
    ]

    let currentStage = 0

    const loadNextStage = () => {
      if (currentStage < stages.length) {
        const stage = stages[currentStage]
        
        setTimeout(() => {
          setProgress(stage.progress)
          setLoadingText(stage.text)
          
          if (stage.progress === 100) {
            // Aguarda um pouco antes de liberar
            setTimeout(() => {
              onLoadComplete()
            }, 500)
          } else {
            currentStage++
            loadNextStage()
          }
        }, stage.delay)
      }
    }

    // Pré-carregar vídeos (se existirem)
    const preloadVideos = async () => {
      const videoUrls = [
        '/videos/projeto1.mp4',
        '/videos/projeto2.mp4'
      ]

      const promises = videoUrls.map(url => {
        return new Promise((resolve) => {
          const video = document.createElement('video')
          video.src = url
          video.preload = 'metadata'
          video.onloadedmetadata = () => resolve()
          video.onerror = () => resolve() // Continua mesmo se vídeo não existir
        })
      })

      await Promise.all(promises)
      loadNextStage()
    }

    preloadVideos()
  }, [onLoadComplete])

  return (
    <div className={styles.loadingScreen}>
      {/* Grid de fundo (estilo dashboard) */}
      <div className={styles.gridBackground}></div>

      {/* Container do loading */}
      <div className={styles.loadingContainer}>
        {/* Logo/Ícone */}
        <div className={styles.iconContainer}>
          <svg className={styles.chartIcon} viewBox="0 0 100 100" width="80" height="80">
            {/* Barras do gráfico animadas */}
            <rect x="10" y="60" width="15" height="30" fill="#00d4ff" className={styles.bar1} />
            <rect x="35" y="40" width="15" height="50" fill="#00d4ff" className={styles.bar2} />
            <rect x="60" y="20" width="15" height="70" fill="#7b2ff7" className={styles.bar3} />
            <rect x="85" y="50" width="15" height="40" fill="#7b2ff7" className={styles.bar4} />
            
            {/* Linha conectando as barras */}
            <polyline
              points="17,60 42,40 67,20 92,50"
              fill="none"
              stroke="#00d4ff"
              strokeWidth="2"
              className={styles.line}
            />
          </svg>
        </div>

        {/* Texto de loading */}
        <h2 className={styles.loadingTitle}>
          {loadingText}
        </h2>

        {/* Barra de progresso */}
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            >
              <div className={styles.progressGlow}></div>
            </div>
          </div>
          <span className={styles.progressText}>{progress}%</span>
        </div>

        {/* Dados "fluindo" */}
        <div className={styles.dataStream}>
          {[...Array(20)].map((_, i) => (
            <span key={i} className={styles.dataPoint} style={{ animationDelay: `${i * 0.1}s` }}>
              {Math.floor(Math.random() * 1000)}
            </span>
          ))}
        </div>
      </div>

      {/* Partículas de fundo */}
      <div className={styles.particles}>
        {[...Array(30)].map((_, i) => (
          <div 
            key={i} 
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default LoadingScreen

