import { useEffect } from 'react'
import styles from './ProjectModal.module.css'

const ProjectModal = ({ isOpen, onClose, project }) => {
  // Fechar modal ao pressionar ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (isOpen) {
      window.addEventListener('keydown', handleEsc)
      // Prevenir scroll do body quando modal está aberto
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !project) return null

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header do Modal */}
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>
            <span className={styles.modalIcon}>{project.icon}</span>
            <h2>{project.title}</h2>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <span>✕</span>
          </button>
        </div>

        {/* Corpo do Modal */}
        <div className={styles.modalBody}>
          <div className={styles.documentation}>
            {project.documentation}
          </div>
        </div>

        {/* Footer do Modal */}
        <div className={styles.modalFooter}>
          <button className={styles.closeFooterButton} onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal

