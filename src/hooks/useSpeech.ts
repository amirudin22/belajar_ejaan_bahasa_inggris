import { useCallback, useState, useEffect, useRef } from 'react';

export type SpeechSpeed = 'normal' | 'slow';

export function useSpeech() {
  const [voicesReady, setVoicesReady] = useState(false);
  const readyRef = useRef(false);

  useEffect(() => {
    const check = () => {
      const available = window.speechSynthesis?.getVoices().length > 0;
      if (available && !readyRef.current) {
        readyRef.current = true;
        setVoicesReady(true);
      }
    };

    check();
    window.speechSynthesis?.addEventListener('voiceschanged', check);
    return () =>
      window.speechSynthesis?.removeEventListener('voiceschanged', check);
  }, []);

  const speak = useCallback(
    (text: string, speed: SpeechSpeed = 'normal') => {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = speed === 'slow' ? 0.6 : 0.85;

      const voices = window.speechSynthesis.getVoices();
      const enVoice = voices.find(
        (v) => v.lang.startsWith('en') && v.localService,
      );
      if (enVoice) utterance.voice = enVoice;

      window.speechSynthesis.speak(utterance);
    },
    [],
  );

  return { speak, voicesReady } as const;
}
