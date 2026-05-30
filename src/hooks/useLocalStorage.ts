import { useState, useCallback } from 'react';
import type { UserProfile, LearningProgress } from '../types';

const PROFILE_KEY = 'user_profile';
const PROGRESS_KEY = 'learning_progress';

const defaultProfile: UserProfile = { xp: 0 };

const defaultProgress: LearningProgress = {
  completed_levels: [],
  word_mastery: {},
};

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile>(() =>
    read(PROFILE_KEY, defaultProfile),
  );

  const updateProfile = useCallback((fn: (prev: UserProfile) => UserProfile) => {
    setProfile((prev: UserProfile) => {
      const next = fn(prev);
      write(PROFILE_KEY, next);
      return next;
    });
  }, []);

  return { profile, updateProfile } as const;
}

export function useLearningProgress() {
  const [progress, setProgress] = useState<LearningProgress>(() =>
    read(PROGRESS_KEY, defaultProgress),
  );

  const updateProgress = useCallback(
    (fn: (prev: LearningProgress) => LearningProgress) => {
      setProgress((prev: LearningProgress) => {
        const next = fn(prev);
        write(PROGRESS_KEY, next);
        return next;
      });
    },
    [],
  );

  return { progress, updateProgress } as const;
}
