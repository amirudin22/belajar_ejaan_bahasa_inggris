import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import styles from './ModulePage.module.css';

export function ModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { progress, modules, levels } = useGame();
  const navigate = useNavigate();

  const mod = useMemo(
    () => modules.find((m) => m.id === moduleId) ?? null,
    [moduleId, modules],
  );

  const modLevels = useMemo(
    () =>
      mod
        ? mod.levelIds
            .map((id) => levels.find((l) => l.id === id))
            .filter((l): l is NonNullable<typeof l> => l !== undefined)
        : [],
    [mod, levels],
  );

  if (!mod) {
    return (
      <div className={styles.container}>
        <p style={{ color: '#fff' }}>Modul tidak ditemukan</p>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          &larr; Kembali ke Beranda
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => navigate('/')}>
        &larr; Kembali
      </button>

      <div className={styles.header}>
        <div className={styles.headerIcon}>{mod.icon}</div>
        <div>
          <h1 className={styles.title}>{mod.nama}</h1>
          <p className={styles.desc}>{mod.deskripsi}</p>
        </div>
      </div>

      <div className={styles.levelList}>
        {modLevels.map((lvl) => {
          const isCompleted = progress.completed_levels.includes(lvl.id);
          return (
            <div
              key={lvl.id}
              className={styles.levelCard}
              onClick={() => navigate(`/learn/${lvl.id}`)}
            >
              <div className={styles.levelInfo}>
                <p className={styles.levelName}>{lvl.nama}</p>
                <p className={styles.levelDesc}>{lvl.deskripsi}</p>
              </div>
              {isCompleted && (
                <span className={styles.completedBadge}>Selesai</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
