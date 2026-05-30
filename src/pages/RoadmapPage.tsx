import { useNavigate } from 'react-router-dom';
import styles from './RoadmapPage.module.css';

const phases = [
  {
    icon: '✅',
    title: 'Fase 1: Latihan Spesifik',
    desc: 'Belajar dalam level yang terfokus per hukum ejaan. Penting untuk pengenalan awal.',
    status: 'Selesai',
    statusClass: 'done',
  },
  {
    icon: '🔴',
    title: 'Fase 2: Boss Stage (Interleaving)',
    desc: 'Ujian campuran di akhir setiap modul. Kata dari berbagai hukum diacak tanpa hint.',
    status: 'Prioritas Tinggi',
    statusClass: 'high',
  },
  {
    icon: '🟡',
    title: 'Fase 3: Mode Endless',
    desc: 'Semua kosakata yang pernah dipelajari dilempar acak. 3 salah = game over.',
    status: 'Prioritas Sedang',
    statusClass: 'mid',
  },
  {
    icon: '🟢',
    title: 'Tip Harian Sains Kognitif',
    desc: 'Kutipan edukasi tentang cara otak belajar, tampil di halaman utama.',
    status: 'Prioritas Rendah',
    statusClass: 'low',
  },
  {
    icon: '🟢',
    title: 'Healthy Limit Pop-Up',
    desc: 'Notifikasi jika sesi belajar > 30 menit, ajak istirahat.',
    status: 'Prioritas Rendah',
    statusClass: 'low',
  },
  {
    icon: '🟡',
    title: 'Edukasi Orang Tua',
    desc: 'Halaman khusus yang menjelaskan pendekatan pedagogis untuk orang tua/guru.',
    status: 'Sudah (halaman About)',
    statusClass: 'done',
  },
];

export function RoadmapPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => navigate('/')}>
        &larr; Kembali
      </button>

      <h1 className={styles.title}>Roadmap Pengembangan</h1>
      <p className={styles.subtitle}>
        Rencana pengembangan fitur berdasarkan prinsip sains kognitif.
      </p>

      <div className={styles.timeline}>
        {phases.map((p) => (
          <div key={p.title} className={styles.phase}>
            <div className={styles.phaseIcon}>{p.icon}</div>
            <div className={styles.phaseBody}>
              <h3 className={styles.phaseTitle}>{p.title}</h3>
              <p className={styles.phaseDesc}>{p.desc}</p>
              <span className={`${styles.phaseBadge} ${styles[p.statusClass]}`}>
                {p.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.note}>
        <p className={styles.noteText}>
          Roadmap lengkap dengan detail implementasi teknis ada di <code>catatan.md</code>.
        </p>
      </div>
    </div>
  );
}
