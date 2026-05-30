import { useState, useCallback, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { useSpeech, type SpeechSpeed } from '../hooks/useSpeech';
import { cleanBaca } from '../hooks/useGameEngine';
import { ProgressBar } from '../components/ProgressBar';
import { SpellingLawPopup } from '../components/SpellingLawPopup';
import type { Rule, WordMastery } from '../types';
import styles from './PlayPage.module.css';

const SRS_INTERVALS_HOURS = [2, 4, 8, 24, 72, 168, 336, 720];

function getNextInterval(existing: WordMastery | undefined, correct: boolean): number {
  if (!correct) {
    const mistakes = (existing?.mistake_count ?? 0) + 1;
    return Math.min(2 ** (mistakes - 1) * 2, 168);
  }
  if (!existing || existing.mistake_count === 0) return 48;
  const currentMs = new Date(existing.next_review).getTime() - new Date(existing.last_practiced).getTime();
  const currentHours = Math.max(0, Math.round(currentMs / (60 * 60 * 1000)));
  const next = SRS_INTERVALS_HOURS.find((h) => h > currentHours);
  return next ?? SRS_INTERVALS_HOURS[SRS_INTERVALS_HOURS.length - 1];
}

function buildSrsEntry(existing: WordMastery | undefined, correct: boolean): WordMastery {
  const now = new Date();
  const intervalHours = getNextInterval(existing, correct);
  const next = new Date(now.getTime() + intervalHours * 60 * 60 * 1000);
  return {
    mistake_count: correct ? 0 : (existing?.mistake_count ?? 0) + 1,
    last_practiced: now.toISOString(),
    next_review: next.toISOString(),
  };
}

export function PlayPage() {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  const {
    level,
    currentWord,
    isFinished,
    progress_,
    answers,
    startLevel,
    submitAnswer,
    updateProgress,
    updateProfile,
    progress,
  } = useGame();
  const { speak, voicesReady } = useSpeech();

  const [typed, setTyped] = useState('');
  const [notes, setNotes] = useState('');
  const [lastResult, setLastResult] = useState<'correct' | 'wrong' | null>(null);
  const [showHukum, setShowHukum] = useState(false);
  const [speechSpeed, setSpeechSpeed] = useState<SpeechSpeed>('normal');
  const [pendingAnswer, setPendingAnswer] = useState<{
    typed: string;
    rule: Rule;
  } | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const startedRef = useRef<string | null>(null);

  useEffect(() => {
    if (levelId && startedRef.current !== levelId) {
      startedRef.current = levelId;
      startLevel(levelId, progress.word_mastery);
    }
  }, [levelId, startLevel]);

  useEffect(() => {
    if (isFinished && answers.length > 0) {
      const correctCount = answers.filter((a) => a.result === 'correct').length;
      const earnedXp = correctCount * 10;
      if (earnedXp > 0) {
        updateProfile((p) => ({ xp: p.xp + earnedXp }));
      }
      if (level) {
        updateProgress((p) => ({
          ...p,
          completed_levels: p.completed_levels.includes(level.id)
            ? p.completed_levels
            : [...p.completed_levels, level.id],
        }));
      }
    }
  }, [isFinished]);

  useEffect(() => {
    if (lastResult) inputRef.current?.focus();
  }, [lastResult]);

  const handleSubmit = useCallback(() => {
    if (!typed.trim()) return;
    const feedback = submitAnswer(typed.trim(), notes.trim());
    setLastResult(feedback.result);

    const existing = progress.word_mastery[feedback.word.id];
    updateProgress((p) => ({
      ...p,
      word_mastery: {
        ...p.word_mastery,
        [feedback.word.id]: buildSrsEntry(existing, feedback.result === 'correct'),
      },
    }));

    if (feedback.result === 'wrong') {
      setPendingAnswer({
        typed: feedback.typed,
        rule: feedback.rule,
      });
      setShowHukum(true);
    }
    setTyped('');
    setNotes('');
  }, [typed, notes, submitAnswer, updateProgress, progress.word_mastery]);

  const handleNext = useCallback(() => {
    setLastResult(null);
    setPendingAnswer(null);
    setShowHukum(false);
    setTyped('');
    setNotes('');
    if (isFinished) {
      navigate('/summary');
    }
  }, [isFinished, navigate]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !lastResult) {
        handleSubmit();
      }
    },
    [handleSubmit, lastResult],
  );

  if (!level) return <p style={{ color: '#fff', padding: 24 }}>Loading...</p>;

  const feedback = answers[answers.length - 1];
  const showFeedback = lastResult && feedback;

  const isReviewWord = level.words.length > progress_.total;

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <p className={styles.levelName}>
          {level.nama}
          {isReviewWord && <span className={styles.reviewTag}> + ulang</span>}
        </p>
        <p className={styles.counter}>
          {progress_.current}/{progress_.total}
        </p>
      </div>

      <div className={styles.progressWrapper}>
        <ProgressBar current={progress_.current} total={progress_.total} />
      </div>

      {currentWord && (
        <div className={styles.card}>
          <p className={styles.prompt}>Tulis ejaan dalam bahasa Indonesia</p>
          <div className={styles.kataRow}>
            {currentWord.kata.split('').map((char, i) => {
              const isJebakan =
                i >= currentWord.bagian_jebakan.posisi_mulai &&
                i <= currentWord.bagian_jebakan.posisi_akhir;
              return (
                <span
                  key={i}
                  className={isJebakan ? styles.kataJebakan : styles.kataChar}
                >
                  {char}
                </span>
              );
            })}
          </div>
          <p className={styles.arti}>{currentWord.arti}</p>
          <div className={styles.audioRow}>
            <button
              className={styles.audioBtn}
              onClick={() => speak(currentWord.kalimat_audio, speechSpeed)}
              disabled={!voicesReady}
            >
              {voicesReady ? 'Dengarkan Kalimat' : 'Memuat suara...'}
            </button>
            <button
              className={`${styles.speedBtn} ${speechSpeed === 'slow' ? styles.speedBtnActive : ''}`}
              onClick={() =>
                setSpeechSpeed((s) => (s === 'normal' ? 'slow' : 'normal'))
              }
              title={speechSpeed === 'slow' ? 'Kecepatan normal' : 'Kecepatan lambat'}
            >
              {speechSpeed === 'slow' ? 'Lambat' : 'Normal'}
            </button>
          </div>
        </div>
      )}

      {!showFeedback && (
        <div className={styles.inputGroup}>
          <input
            ref={inputRef}
            className={styles.input}
            type="text"
            placeholder="Ketik ejaan bahasa Indonesia..."
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button className={styles.submitBtn} onClick={handleSubmit}>
            Cek
          </button>
        </div>
      )}

      {!showFeedback && (
        <textarea
          className={styles.notesInput}
          placeholder="Catatan (opsional): kenapa menurutmu ditulis seperti itu?"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
        />
      )}

      {showFeedback && (
        <div
          className={`${styles.feedback} ${
            feedback.result === 'correct'
              ? styles.feedbackCorrect
              : styles.feedbackWrong
          }`}
        >
          <p className={styles.feedbackText}>
            {feedback.result === 'correct' ? 'Benar!' : 'Kurang tepat'}
          </p>

          {feedback.result === 'wrong' && (
            <>
              <div className={styles.comparisonSection}>
                <p className={styles.comparisonLabel}>Kamu tulis:</p>
                <div className={styles.charRow}>
                  {feedback.comparison.map((c, i) => (
                    <span
                      key={i}
                      className={
                        c.status === 'correct' ? styles.charCorrect
                          : c.status === 'wrong' ? styles.charWrong
                            : c.status === 'extra' ? styles.charExtra
                              : styles.charMissing
                      }
                    >
                      {c.status === 'missing' ? '\u00B7' : c.char}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.comparisonSection}>
                <p className={styles.comparisonLabel}>Yang benar:</p>
                <div className={styles.charRow}>
                  {feedback.comparison.map((c, i) =>
                    c.status === 'extra' ? null : (
                      <span
                        key={i}
                        className={
                          c.status === 'correct' ? styles.charCorrect : styles.charHighlight
                        }
                      >
                        {cleanBaca(currentWord!.cara_baca_lokal)[i] ?? ''}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <p className={styles.bacaRef}>
                Cara baca: {currentWord?.cara_baca_lokal}
              </p>

              {pendingAnswer && (
                <button
                  className={styles.hukumBtn}
                  onClick={() => setShowHukum(true)}
                >
                  Lihat Hukum Ejaan
                </button>
              )}
            </>
          )}

          {feedback.result === 'correct' && feedback.notes && (
            <p className={styles.notesReview}>{feedback.notes}</p>
          )}

          <button className={styles.nextBtn} onClick={handleNext}>
            {isFinished ? 'Lihat Hasil' : 'Lanjut'}
          </button>
        </div>
      )}

      {showHukum && pendingAnswer && (
        <SpellingLawPopup
          rule={pendingAnswer.rule}
          onClose={() => setShowHukum(false)}
        />
      )}
    </div>
  );
}
