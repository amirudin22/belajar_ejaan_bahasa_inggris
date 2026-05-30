import { useNavigate } from 'react-router-dom';
import styles from './AboutPage.module.css';

const stats = [
  { label: 'Aturan Ejaan', value: 38 },
  { label: 'Kosakata', value: 188 },
  { label: 'Level Latihan', value: 44 },
  { label: 'Modul Materi', value: 18 },
];

export function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => navigate('/')}>
        &larr; Kembali
      </button>

      <h1 className={styles.title}>Tentang PolaEja</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Apa Ini?</h2>
        <p className={styles.text}>
          <strong>PolaEja</strong> adalah aplikasi interaktif untuk membantu penutur bahasa Indonesia
          menguasai ejaan bahasa Inggris melalui pendekatan <strong>"Hukum Ejaan" (Spelling Laws)</strong> —
          terinspirasi dari cara belajar Tajwid dalam membaca Al-Qur'an.
        </p>
        <p className={styles.text}>
          Alih-alih menghafal ejaan kata satu per satu, pengguna belajar <strong>pola-pola</strong> yang
          konsisten: Magic E, Vokal Beriringan, Huruf Bisu, dan lainnya. Setelah mengenal polanya,
          pengguna bisa mengeja ribuan kata lain yang mengikuti pola yang sama.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Mengapa "Spelling Law"?</h2>
        <p className={styles.text}>
          Bahasa Inggris terkenal dengan ejaan yang tidak fonetis — banyak huruf yang ditulis tapi tidak
          dibaca, atau dibaca berbeda dari tulisannya. Dengan mengelompokkan pola-pola ini menjadi
          "hukum" yang terstruktur, pengguna tidak perlu menghafal setiap kata secara terpisah.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Cara Belajar</h2>
        <ol className={styles.list}>
          <li><strong>Pelajari Hukumnya</strong> — baca penjelasan hukum ejaan dengan contoh kata.</li>
          <li><strong>Latihan</strong> — lihat kata Inggris, tulis ejaan dalam bahasa Indonesia.</li>
          <li><strong>Ulang & Review</strong> — sistem SRS mengatur jadwal pengulangan otomatis.</li>
        </ol>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Pendekatan Ilmiah</h2>
        <p className={styles.text}>
          Aplikasi ini menggunakan prinsip <strong>Spaced Repetition (SRS)</strong> dan
          <strong> Interleaving</strong> — dua metode yang terbukti secara sains kognitif
          meningkatkan retensi memori jangka panjang. Kata yang sering salah akan muncul lebih sering,
          dan materi dari berbagai hukum dicampur agar otak terlatih mendiagnosis pola.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Statistik Konten</h2>
        <div className={styles.statsGrid}>
          {stats.map((s) => (
            <div key={s.label} className={styles.statCard}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Lisensi (Freeware)</h2>
        <p className={styles.text}>
          Aplikasi ini dirilis sebagai <strong>Freeware</strong>. Setiap orang bebas menggunakan
          aplikasi ini untuk keperluan belajar dan mengajar tanpa dipungut biaya sama sekali.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Kontak & Masukan</h2>
        <p className={styles.text}>
          Punya saran, masukan, atau menemukan bug? Hubungi kami:
        </p>
        <div className={styles.contactLinks}>
          <a
            href="https://wa.me/6285850800914"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
          >
            WhatsApp
          </a>
          <a
            href="mailto:amirudin22@gmail.com"
            className={styles.contactLink}
          >
            Email
          </a>
        </div>
      </section>
    </div>
  );
}
