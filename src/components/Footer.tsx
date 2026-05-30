import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';
import styles from './Footer.module.css';

const APK_URL = '/PolaEja.apk';
const FULL_APK_URL = 'https://belajarejaanbahasainggris.vercel.app/PolaEja.apk';

export function Footer() {
  const navigate = useNavigate();

  const handleDownload = useCallback(async () => {
    if (Capacitor.isNativePlatform()) {
      await Browser.open({ url: FULL_APK_URL });
    } else {
      const a = document.createElement('a');
      a.href = APK_URL;
      a.download = 'PolaEja.apk';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }, []);

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
