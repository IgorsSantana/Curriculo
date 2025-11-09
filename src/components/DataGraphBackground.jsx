import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './DataGraphBackground.module.css'

gsap.registerPlugin(ScrollTrigger)

const DataGraphBackground = () => {
  const containerRef = useRef(null)
  const linesRef = useRef([])
  const dotsRef = useRef([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Anima linhas do gráfico sendo desenhadas conforme rola
      linesRef.current.forEach((line, index) => {
        if (!line) return
        
        gsap.fromTo(line,
          {
            strokeDashoffset: 1000
          },
          {
            strokeDashoffset: 0,
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${index * 500} bottom`,
              end: `top+=${index * 500 + 800} center`,
              scrub: 1,
              markers: false
            }
          }
        )
      })

      // Anima pontos de dados aparecendo
      dotsRef.current.forEach((dot, index) => {
        if (!dot) return
        
        gsap.fromTo(dot,
          {
            scale: 0,
            opacity: 0
          },
          {
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${index * 200} bottom`,
              end: `top+=${index * 200 + 300} center`,
              scrub: 1,
              markers: false
            }
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Gerar pontos de dados aleatórios para parecer um gráfico
  const generateDataPoints = (count, startY, variance) => {
    const points = []
    for (let i = 0; i < count; i++) {
      const x = (i / (count - 1)) * 100
      const y = startY + (Math.random() - 0.5) * variance
      points.push({ x, y })
    }
    return points
  }

  const dataLine1 = generateDataPoints(20, 30, 20)
  const dataLine2 = generateDataPoints(20, 50, 25)
  const dataLine3 = generateDataPoints(20, 70, 15)

  const createPathFromPoints = (points) => {
    if (points.length === 0) return ''
    
    let path = `M ${points[0].x} ${points[0].y}`
    
    for (let i = 1; i < points.length; i++) {
      const prevPoint = points[i - 1]
      const currentPoint = points[i]
      
      // Curva suave (Catmull-Rom)
      const cpX = (prevPoint.x + currentPoint.x) / 2
      path += ` Q ${cpX} ${prevPoint.y}, ${currentPoint.x} ${currentPoint.y}`
    }
    
    return path
  }

  return (
    <div ref={containerRef} className={styles.graphBackground}>
      <svg className={styles.graphSvg} viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Grid de fundo */}
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0, 212, 255, 0.1)" strokeWidth="0.3"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />

        {/* Linhas de dados */}
        <path
          ref={el => linesRef.current[0] = el}
          d={createPathFromPoints(dataLine1)}
          fill="none"
          stroke="#00d4ff"
          strokeWidth="0.5"
          strokeDasharray="1000"
          strokeDashoffset="1000"
          className={styles.dataLine}
        />
        <path
          ref={el => linesRef.current[1] = el}
          d={createPathFromPoints(dataLine2)}
          fill="none"
          stroke="#7b2ff7"
          strokeWidth="0.5"
          strokeDasharray="1000"
          strokeDashoffset="1000"
          className={styles.dataLine}
        />
        <path
          ref={el => linesRef.current[2] = el}
          d={createPathFromPoints(dataLine3)}
          fill="none"
          stroke="#00ff9d"
          strokeWidth="0.5"
          strokeDasharray="1000"
          strokeDashoffset="1000"
          className={styles.dataLine}
        />

        {/* Pontos de dados */}
        {[...dataLine1, ...dataLine2, ...dataLine3].map((point, index) => (
          <circle
            key={index}
            ref={el => dotsRef.current[index] = el}
            cx={point.x}
            cy={point.y}
            r="0.5"
            fill={index < 20 ? '#00d4ff' : index < 40 ? '#7b2ff7' : '#00ff9d'}
            className={styles.dataPoint}
          />
        ))}

        {/* Áreas sombreadas abaixo das linhas */}
        <path
          d={`${createPathFromPoints(dataLine1)} L 100 100 L 0 100 Z`}
          fill="url(#gradient1)"
          opacity="0.2"
        />
        
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>

      {/* Números de dados flutuantes */}
      <div className={styles.floatingNumbers}>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={styles.floatingNumber}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            {Math.floor(Math.random() * 999)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DataGraphBackground

