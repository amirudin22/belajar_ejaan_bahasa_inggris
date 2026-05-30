import { useCallback, useState, useEffect } from 'react';

export type SpeechSpeed = 'normal' | 'slow';

export function useSpeech() {
  const [voicesReady, setVoicesReady] = useState(
    () => window.speechSynthesis?.getVoices().length > 0,
  );

  useEffect(() => {
    if (window.speechSynthesis?.getVoices().length > 0) {
      setVoicesReady(true);
      return;
    }
    const handler = () => setVoicesReady(true);
    window.speechSynthesis?.addEventListener('voiceschanged', handler);
    return () =>
      window.speechSynthesis?.removeEventListener('voiceschanged', handler);
  }, []);

  const speak = useCallback(
    (text: string, speed: SpeechSpeed = 'normal') => {
      if (!window.speechSynthesis || !voicesReady) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = speed === 'slow' ? 0.6 : 0.85;
      window.speechSynthesis.speak(utterance);
    },
    [voicesReady],
  );

  return { speak, voicesReady } as const;
}
