import { useState, useCallback, useMemo } from 'react';
import type {
  VocabWord,
  Rule,
  FeedbackData,
  AnswerResult,
  CharComparison,
  WordMastery,
} from '../types';
import rulesData from '../data/rules.json';
import levelsData from '../data/levels.json';
import vocabData from '../data/vocab.json';
import modulesData from '../data/modules.json';

const rules: Rule[] = Object.entries(rulesData).map(([id, r]) => ({
  id,
  nama: r.nama,
  penjelasan: r.penjelasan,
}));

export const rulesMap = new Map(rules.map((r) => [r.id, r]));

const allWords: VocabWord[] = vocabData.vocabularies;
const wordsMap = new Map(allWords.map((w) => [w.id, w]));

export interface LevelInfo {
  id: string;
  nama: string;
  deskripsi: string;
  words: VocabWord[];
}

export function cleanBaca(baca: string): string {
  return baca.replace(/[\/\-\s]/g, '').toLowerCase();
}

function buildComparison(typed: string, correct: string): CharComparison[] {
  const result: CharComparison[] = [];
  const maxLen = Math.max(typed.length, correct.length);

  for (let i = 0; i < maxLen; i++) {
    if (i >= typed.length) {
      result.push({ char: correct[i], status: 'missing' });
    } else if (i >= correct.length) {
      result.push({ char: typed[i], status: 'extra' });
    } else if (typed[i] === correct[i]) {
      result.push({ char: typed[i], status: 'correct' });
    } else {
      result.push({ char: typed[i], status: 'wrong' });
    }
  }
  return result;
}

function getDueReviewWords(
  wordMastery: Record<string, WordMastery>,
  excludeIds: Set<string>,
): VocabWord[] {
  const now = Date.now();
  return allWords.filter((w) => {
    if (excludeIds.has(w.id)) return false;
    const m = wordMastery[w.id];
    if (!m) return false;
    return new Date(m.next_review).getTime() <= now;
  });
}

export function useGameEngine() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<FeedbackData[]>([]);
  const [level, setLevelState] = useState<LevelInfo | null>(null);

  const levels = useMemo(() => getLevels(), []);

  const startLevel = useCallback(
    (levelId: string, wordMastery?: Record<string, WordMastery>) => {
      const found = getLevels().find((l) => l.id === levelId) ?? null;
      if (!found) {
        setLevelState(null);
        setCurrentIndex(0);
        setAnswers([]);
        return;
      }

      let words = [...found.words];

      if (wordMastery) {
        const levelWordIds = new Set(words.map((w) => w.id));
        const reviewWords = getDueReviewWords(wordMastery, levelWordIds);
        if (reviewWords.length > 0) {
          words = [...words, ...reviewWords];
        }
      }

      setLevelState({ ...found, words });
      setCurrentIndex(0);
      setAnswers([]);
    },
    [],
  );

  const currentWord = useMemo(() => {
    if (!level) return null;
    return level.words[currentIndex] ?? null;
  }, [level, currentIndex]);

  const isFinished = useMemo(() => {
    if (!level) return false;
    return currentIndex >= level.words.length;
  }, [level, currentIndex]);

  const ruleForCurrent = useMemo(() => {
    if (!currentWord) return null;
    return rulesMap.get(currentWord.id_hukum) ?? null;
  }, [currentWord]);

  const submitAnswer = useCallback(
    (typed: string, notes?: string): FeedbackData => {
      if (!currentWord) throw new Error('No current word');

      const correctBaca = cleanBaca(currentWord.cara_baca_lokal);
      const normalizedTyped = cleanBaca(typed);
      const correct = normalizedTyped === correctBaca;
      const comparison = buildComparison(normalizedTyped, correctBaca);

      const result: AnswerResult = correct ? 'correct' : 'wrong';
      const feedback: FeedbackData = {
        result,
        word: currentWord,
        rule: rulesMap.get(currentWord.id_hukum) ?? {
          id: 'unknown',
          nama: 'Hukum Tidak Diketahui',
          penjelasan: '',
        },
        typed,
        comparison,
        ...(notes?.trim() ? { notes: notes.trim() } : {}),
      };

      setAnswers((prev) => [...prev, feedback]);
      setCurrentIndex((prev) => prev + 1);
      return feedback;
    },
    [currentWord],
  );

  const progress = useMemo(() => {
    if (!level) return { current: 0, total: 1 };
    return {
      current: Math.min(currentIndex, level.words.length),
      total: level.words.length,
    };
  }, [level, currentIndex]);

  const score = useMemo(() => {
    const correct = answers.filter((a) => a.result === 'correct').length;
    return { correct, total: answers.length };
  }, [answers]);

  return {
    modules: modulesData.modules,
    levels,
    level,
    currentWord,
    currentIndex,
    isFinished,
    rule: ruleForCurrent,
    answers,
    progress,
    score,
    startLevel,
    submitAnswer,
  } as const;
}

function getLevels(): LevelInfo[] {
  return levelsData.levels.map((l) => ({
    ...l,
    words: l.wordIds
      .map((id) => wordsMap.get(id))
      .filter((w): w is VocabWord => w !== undefined),
  }));
}
