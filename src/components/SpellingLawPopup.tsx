import type { Rule } from '../types';
import styles from './SpellingLawPopup.module.css';

interface Props {
  rule: Rule;
  onClose: () => void;
}

export function SpellingLawPopup({ rule, onClose }: Props) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.badge}>Hukum Ejaan</span>
          <h3 className={styles.title}>{rule.nama}</h3>
        </div>
        <p className={styles.explanation}>{rule.penjelasan}</p>
        <button className={styles.closeBtn} onClick={onClose}>
          Mengerti
        </button>
      </div>
    </div>
  );
}
