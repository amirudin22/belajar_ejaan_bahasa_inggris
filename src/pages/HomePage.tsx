import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import styles from './HomePage.module.css';

export function HomePage() {
  const { profile, progress, modules, levels } = useGame();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>PolaEja</h1>
        <div className={styles.stat}>
          <div className={styles.statValue}>{profile.xp}</div>
          <div className={styles.statLabel}>XP</div>
        </div>
      </div>

      <button
        className={styles.glosariumBtn}
        onClick={() => navigate('/reference')}
      >
        Lihat Glosarium Hukum Ejaan
      </button>

      <div className={styles.moduleList}>
        {modules.map((mod) => {
          const modLevels = mod.levelIds
            .map((id) => levels.find((l) => l.id === id))
            .filter((l): l is NonNullable<typeof l> => l !== undefined);
          const done = modLevels.filter((l) =>
            progress.completed_levels.includes(l.id),
          ).length;
          return (
            <div
              key={mod.id}
              className={styles.moduleCard}
              onClick={() => navigate(`/module/${mod.id}`)}
            >
              <div className={styles.moduleIcon}>{mod.icon}</div>
              <div className={styles.moduleInfo}>
                <p className={styles.moduleName}>{mod.nama}</p>
                <p className={styles.moduleDesc}>{mod.deskripsi}</p>
                <span className={styles.moduleProgress}>
                  {done}/{mod.levelIds.length} level selesai
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
