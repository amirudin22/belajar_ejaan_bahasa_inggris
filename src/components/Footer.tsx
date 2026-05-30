import { useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';

const APK_URL = '/PolaEja.apk';

export function Footer() {
  const navigate = useNavigate();

  const handleDownload = () => {
    window.open(APK_URL, '_blank');
  };

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
        <button onClick={handleDownload} className={styles.downloadLink}>
          Download APK
        </button>
      </div>
      <p className={styles.copyright}>
        PolaEja by AyahNAyla &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
}
