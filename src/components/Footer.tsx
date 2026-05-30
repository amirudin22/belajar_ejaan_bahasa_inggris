import { useNavigate } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import styles from './Footer.module.css';

const APK_URL = '/PolaEja.apk';

export function Footer() {
  const navigate = useNavigate();

  const handleDownload = () => {
    if (Capacitor.isNativePlatform()) {
      window.open(APK_URL, '_blank');
    } else {
      const a = document.createElement('a');
      a.href = APK_URL;
      a.download = 'PolaEja.apk';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
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
