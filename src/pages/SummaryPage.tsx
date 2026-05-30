import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import styles from './SummaryPage.module.css';

export function SummaryPage() {
  const { answers } = useGame();
  const navigate = useNavigate();

  const correctCount = answers.filter((a) => a.result === 'correct').length;
  const total = answers.length;
  const wrongAnswers = answers.filter((a) => a.result === 'wrong');
  const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  let grade = '';
  let gradeColor = '#e94560';
  if (pct === 100) { grade = 'Sempurna!'; gradeColor = '#4ecca3'; }
  else if (pct >= 80) { grade = 'Baik'; gradeColor = '#4ecca3'; }
  else if (pct >= 60) { grade = 'Cukup'; gradeColor = '#f0c040'; }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Latihan Selesai!</h1>
      <p className={styles.subtitle}>Berikut hasil belajarmu</p>

      <div className={styles.scoreCard}>
        <div className={styles.scoreNumber}>{pct}</div>
        <div className={styles.scoreSuffix}>/ 100</div>
        <p className={styles.scoreLabel}>
          {correctCount} benar dari {total} soal
        </p>
        {grade && (
          <p className={styles.grade} style={{ color: gradeColor }}>
            {grade}
          </p>
        )}
      </div>

      {wrongAnswers.length > 0 && (
        <>
          <h2 className={styles.reviewTitle}>
            Kata yang perlu diulang ({wrongAnswers.length})
          </h2>
          <div className={styles.reviewList}>
            {wrongAnswers.map((a) => (
              <div key={a.word.id} className={styles.reviewItem}>
                <div>
                  <div className={styles.reviewKata}>{a.word.kata}</div>
                  <div className={styles.reviewArti}>{a.word.arti}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <button className={styles.homeBtn} onClick={() => navigate('/')}>
        Kembali ke Beranda
      </button>
    </div>
  );
}
