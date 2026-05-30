import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSpeech } from '../hooks/useSpeech';
import rulesData from '../data/rules.json';
import vocabData from '../data/vocab.json';
import levelsData from '../data/levels.json';
import type { Rule, VocabWord } from '../types';
import styles from './LearnPage.module.css';

interface RuleWithWords {
  rule: Rule;
  words: VocabWord[];
}

const allRules: Rule[] = Object.entries(rulesData).map(([id, r]) => ({
  id,
  nama: r.nama,
  penjelasan: r.penjelasan,
}));

const rulesMap = new Map(allRules.map((r) => [r.id, r]));
const wordsMap = new Map(vocabData.vocabularies.map((w) => [w.id, w]));

export function LearnPage() {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  const { speak } = useSpeech();

  const level = useMemo(() => {
    if (!levelId) return null;
    return levelsData.levels.find((l) => l.id === levelId) ?? null;
  }, [levelId]);

  const rulesWithWords: RuleWithWords[] = useMemo(() => {
    if (!level) return [];
    const words = level.wordIds
      .map((id) => wordsMap.get(id))
      .filter((w): w is VocabWord => w !== undefined);

    const grouped = new Map<string, VocabWord[]>();
    for (const w of words) {
      const existing = grouped.get(w.id_hukum) ?? [];
      existing.push(w);
      grouped.set(w.id_hukum, existing);
    }

    return Array.from(grouped.entries()).map(([ruleId, ruleWords]) => {
      const rule = rulesMap.get(ruleId) ?? {
        id: ruleId,
        nama: 'Hukum Tidak Diketahui',
        penjelasan: '',
      };
      return { rule, words: ruleWords };
    });
  }, [level]);

  if (!level) {
    return <p style={{ color: '#fff', padding: 24 }}>Level tidak ditemukan</p>;
  }

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => navigate('/')}>
        &larr; Kembali
      </button>

      <h1 className={styles.title}>{level.nama}</h1>
      <p className={styles.desc}>{level.deskripsi}</p>

      {rulesWithWords.map(({ rule, words }) => (
        <div key={rule.id} className={styles.ruleCard}>
          <span className={styles.ruleBadge}>Hukum Ejaan</span>
          <h3 className={styles.ruleName}>{rule.nama}</h3>
          <p className={styles.ruleExplanation}>{rule.penjelasan}</p>

          <div className={styles.wordList}>
            {words.map((w) => (
              <div key={w.id} className={styles.wordItem}>
                <span className={styles.wordKata}>
                  {w.kata.split('').map((char, i) => {
                    const isJebakan =
                      i >= w.bagian_jebakan.posisi_mulai &&
                      i <= w.bagian_jebakan.posisi_akhir;
                    return (
                      <span
                        key={i}
                        className={isJebakan ? styles.wordJebakan : undefined}
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>
                <span className={styles.wordArti}>{w.arti}</span>
                <span className={styles.wordBaca}>{w.cara_baca_lokal}</span>
                <button
                  className={styles.audioBtn}
                  onClick={() => speak(w.kalimat_audio)}
                >
                  Dengarkan
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className={styles.cta}>
        <button
          className={styles.latihanBtn}
          onClick={() => navigate(`/play/${level.id}`)}
        >
          Mulai Latihan
        </button>
      </div>
    </div>
  );
}
