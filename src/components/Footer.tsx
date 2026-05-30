import { useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <button className={styles.link} onClick={() => navigate('/about')}>
          Tentang
        </button>
        <button className={styles.link} onClick={() => navigate('/roadmap')}>
          Roadmap
        </button>
        <button className={styles.link} onClick={() => navigate('/reference')}>
          Glosarium
        </button>
      </div>
      <p className={styles.copyright}>
        AyahNayla &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
}
