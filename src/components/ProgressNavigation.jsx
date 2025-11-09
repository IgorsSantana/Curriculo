import { useState, useEffect } from 'react'
import styles from './ProgressNavigation.module.css'

const ProgressNavigation = () => {
  const [activeSection, setActiveSection] = useState(0)
  const [progress, setProgress] = useState(0)

  const sections = [
    { id: 0, name: 'Início', label: 'Dashboard Principal' },
    { id: 1, name: 'Sobre Mim', label: 'Igor Santana' },
    { id: 2, name: 'Projeto 1', label: 'Análise de Vendas' },
    { id: 3, name: 'Projeto 2', label: 'Checklists Operacionais' },
    { id: 4, name: 'Projeto 3', label: 'Controle de Perdas' },
    { id: 5, name: 'Contato', label: 'Entre em Contato' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      // Calcular progresso total (0 a 100)
      const totalProgress = (scrollPosition / (documentHeight - windowHeight)) * 100
      setProgress(Math.min(totalProgress, 100))
      
      // Determinar seção ativa baseada no scroll
      const scrollPercent = scrollPosition / (documentHeight - windowHeight)
      
      if (scrollPercent < 0.125) {
        setActiveSection(0) // Início (0%)
      } else if (scrollPercent < 0.375) {
        setActiveSection(1) // Sobre Mim (25%)
      } else if (scrollPercent < 0.575) {
        setActiveSection(2) // Projeto 1 (50%)
      } else if (scrollPercent < 0.75) {
        setActiveSection(3) // Projeto 2 (65%)
      } else if (scrollPercent < 0.925) {
        setActiveSection(4) // Projeto 3 (85%)
      } else {
        setActiveSection(5) // Contato (100%)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Executar uma vez no mount
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const documentHeight = document.documentElement.scrollHeight
    const windowHeight = window.innerHeight
    const scrollableHeight = documentHeight - windowHeight
    
    let targetScroll = 0
    
    switch(sectionId) {
      case 0: // Início (0%)
        targetScroll = 0
        break
      case 1: // Sobre Mim (25%)
        targetScroll = scrollableHeight * 0.25
        break
      case 2: // Projeto 1 (50%)
        targetScroll = scrollableHeight * 0.50
        break
      case 3: // Projeto 2 (65%)
        targetScroll = scrollableHeight * 0.65
        break
      case 4: // Projeto 3 (85%)
        targetScroll = scrollableHeight * 0.85
        break
      case 5: // Contato (100%)
        targetScroll = scrollableHeight
        break
      default:
        targetScroll = 0
    }
    
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    })
  }

  return (
    <div className={styles.navigationContainer}>
      {/* Linha de progresso reta */}
      <svg className={styles.progressLine} viewBox="0 0 100 10" preserveAspectRatio="none">
        {/* Gradiente para a linha */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="25%" stopColor="#7b2ff7" />
            <stop offset="50%" stopColor="#00ff9d" />
            <stop offset="65%" stopColor="#ff6b9d" />
            <stop offset="85%" stopColor="#ffa500" />
            <stop offset="100%" stopColor="#ff4500" />
          </linearGradient>
        </defs>
        
        {/* Linha de fundo reta (cinza) */}
        <line
          x1="0"
          y1="5"
          x2="100"
          y2="5"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Linha de progresso animada (gradiente) */}
        <line
          x1="0"
          y1="5"
          x2={progress}
          y2="5"
          stroke="url(#progressGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          className={styles.progressFill}
        />
      </svg>

      {/* Bolinhas das seções */}
      <div className={styles.sectionsContainer}>
        {sections.map((section) => {
          // Posições específicas: 0%, 25%, 50%, 65%, 85%, 100%
          const positions = [0, 25, 50, 65, 85, 100]
          return (
            <div
              key={section.id}
              className={`${styles.sectionDot} ${activeSection === section.id ? styles.active : ''}`}
              style={{ left: `${positions[section.id]}%` }}
              onClick={() => scrollToSection(section.id)}
            >
            {/* Bolinha */}
            <div className={styles.dot}>
              <div className={styles.dotInner}></div>
            </div>
            
            {/* Tooltip */}
            <div className={styles.tooltip}>
              <div className={styles.tooltipArrow}></div>
              <div className={styles.tooltipContent}>
                <span className={styles.tooltipNumber}>{section.id + 1}</span>
                <div>
                  <strong>{section.name}</strong>
                  <p>{section.label}</p>
                </div>
              </div>
            </div>
          </div>
          )
        })}
      </div>

      {/* Indicador de progresso numérico */}
      <div className={styles.progressIndicator}>
        {Math.round(progress)}%
      </div>
    </div>
  )
}

export default ProgressNavigation

