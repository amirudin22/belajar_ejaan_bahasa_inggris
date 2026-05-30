import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import rulesData from '../data/rules.json';
import vocabData from '../data/vocab.json';
import type { Rule, VocabWord } from '../types';
import styles from './ReferencePage.module.css';

interface RuleEntry {
  rule: Rule;
  isGharib: boolean;
  patterns: string[];
  words: VocabWord[];
}

const allRules: Rule[] = Object.entries(rulesData).map(([id, r]) => ({
  id,
  nama: r.nama,
  penjelasan: r.penjelasan,
}));

const allWords: VocabWord[] = vocabData.vocabularies;

export function ReferencePage() {
  const navigate = useNavigate();

  const entries: RuleEntry[] = useMemo(() => {
    const grouped = new Map<string, VocabWord[]>();
    for (const w of allWords) {
      const list = grouped.get(w.id_hukum) ?? [];
      list.push(w);
      grouped.set(w.id_hukum, list);
    }

    return allRules.map((rule) => {
      const words = grouped.get(rule.id) ?? [];
      const patterns = [...new Set(words.map((w) => w.bagian_jebakan.huruf))];
      const isGharib =
        rule.nama.toLowerCase().includes('gharib') ||
        rule.nama.toLowerCase().includes('pengecualian');

      return { rule, isGharib, patterns, words };
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          &larr;
        </button>
        <h1 className={styles.title}>Glosarium Hukum Ejaan</h1>
      </div>
      <p className={styles.subtitle}>
        Panduan pola huruf & aturan bacaan bahasa Inggris
      </p>

      {entries.map(({ rule, isGharib, patterns, words }) => (
        <div
          key={rule.id}
          className={`${styles.ruleCard} ${isGharib ? styles.ruleCardGharib : ''}`}
        >
          <div className={styles.ruleHeader}>
            <span
              className={`${styles.badge} ${isGharib ? styles.badgeGharib : styles.badgeHukum}`}
            >
              {isGharib ? 'Gharib' : 'Hukum'}
            </span>
            <h3 className={styles.ruleName}>{rule.nama}</h3>
          </div>

          <p className={styles.ruleExplanation}>{rule.penjelasan}</p>

          {patterns.length > 0 && (
            <div className={styles.patternSection}>
              <p className={styles.patternLabel}>Pola huruf</p>
              <div className={styles.patternList}>
                {patterns.map((p) => (
                  <span key={p} className={styles.patternTag}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}

          {words.length > 0 && (
            <div className={styles.patternSection}>
              <p className={styles.patternLabel}>
                Contoh ({words.length})
              </p>
              <div className={styles.wordExamples}>
                {words.map((w) => (
                  <div key={w.id} className={styles.wordRow}>
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
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
