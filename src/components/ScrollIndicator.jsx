import { useEffect, useState } from 'react'
import styles from './ScrollIndicator.module.css'

const ScrollIndicator = () => {
  const [visible, setVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detectar se é mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const handleScroll = () => {
      if (window.scrollY > 200) {
        setVisible(false)
      } else {
        setVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return (
    <div className={`${styles.scrollIndicator} ${!visible ? styles.hidden : ''}`}>
      {isMobile ? (
        // Indicador Mobile: Dedo deslizando
        <>
          <div className={styles.swipeIndicator}>
            <div className={styles.fingerIcon}>
              <span className={styles.fingerEmoji}>👆</span>
              <div className={styles.swipeTrail}></div>
            </div>
          </div>
          <div className={styles.arrows}>
            <span>↓</span>
            <span>↓</span>
            <span>↓</span>
          </div>
          <p className={styles.scrollText}>Deslize para navegar</p>
        </>
      ) : (
        // Indicador Desktop: Mouse
        <>
          <div className={styles.mouse}>
            <div className={styles.wheel}></div>
          </div>
          <div className={styles.arrows}>
            <span>↓</span>
            <span>↓</span>
            <span>↓</span>
          </div>
          <p className={styles.scrollText}>Role para navegar pelos dados</p>
        </>
      )}
    </div>
  )
}

export default ScrollIndicator

