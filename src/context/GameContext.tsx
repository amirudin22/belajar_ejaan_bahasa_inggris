import { createContext, useContext, type ReactNode } from 'react';
import { useUserProfile, useLearningProgress } from '../hooks/useLocalStorage';
import { useGameEngine } from '../hooks/useGameEngine';
import type {
  UserProfile,
  LearningProgress,
  FeedbackData,
  VocabWord,
  Rule,
  WordMastery,
  Module,
} from '../types';

interface GameContextValue {
  profile: UserProfile;
  updateProfile: (fn: (prev: UserProfile) => UserProfile) => void;
  progress: LearningProgress;
  updateProgress: (fn: (prev: LearningProgress) => LearningProgress) => void;
  modules: Module[];
  levels: ReturnType<typeof useGameEngine>['levels'];
  level: ReturnType<typeof useGameEngine>['level'];
  currentWord: VocabWord | null;
  isFinished: boolean;
  rule: Rule | null;
  answers: FeedbackData[];
  progress_: { current: number; total: number };
  score: { correct: number; total: number };
  startLevel: (levelId: string, wordMastery?: Record<string, WordMastery>) => void;
  submitAnswer: (typed: string, notes?: string) => FeedbackData;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const { profile, updateProfile } = useUserProfile();
  const { progress, updateProgress } = useLearningProgress();
  const engine = useGameEngine();

  const value: GameContextValue = {
    profile,
    updateProfile,
    progress,
    updateProgress,
    modules: engine.modules,
    levels: engine.levels,
    level: engine.level,
    currentWord: engine.currentWord,
    isFinished: engine.isFinished,
    rule: engine.rule,
    answers: engine.answers,
    progress_: engine.progress,
    score: engine.score,
    startLevel: engine.startLevel,
    submitAnswer: engine.submitAnswer,
  };

  return <GameContext value={value}>{children}</GameContext>;
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
