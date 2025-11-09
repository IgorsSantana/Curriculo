import { useEffect, useState, useRef, forwardRef } from 'react'
import styles from './LazyIframe.module.css'

/**
 * LazyIframe - Carrega iframe apenas quando está próximo da viewport
 * Reduz drasticamente o tempo de carregamento inicial
 */
const LazyIframe = forwardRef(({ src, title, className }, ref) => {
  const [shouldLoad, setShouldLoad] = useState(false)
  const placeholderRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '400px', // Começa a carregar 400px antes de aparecer
        threshold: 0.01
      }
    )

    const target = placeholderRef.current
    if (target) {
      observer.observe(target)
    }

    return () => {
      if (target) {
        observer.unobserve(target)
      }
    }
  }, [])

  return (
    <div ref={placeholderRef} className={styles.lazyIframeContainer}>
      {shouldLoad ? (
        <iframe
          ref={ref}
          className={className}
          src={src}
          frameBorder="0"
          allowFullScreen={true}
          title={title}
          loading="lazy"
        />
      ) : (
        <div className={styles.placeholder}>
          <div className={styles.spinner}></div>
          <p className={styles.placeholderText}>Preparando dashboard...</p>
        </div>
      )}
    </div>
  )
})

LazyIframe.displayName = 'LazyIframe'

export default LazyIframe

