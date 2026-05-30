import { useCallback } from 'react';

const audioCtxRef: { current: AudioContext | null } = { current: null };

function getCtx(): AudioContext {
  if (!audioCtxRef.current) {
    audioCtxRef.current = new AudioContext();
  }
  return audioCtxRef.current;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType,
  gain: number = 0.3,
) {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const vol = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);
  vol.gain.setValueAtTime(gain, ctx.currentTime);
  vol.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
  osc.connect(vol);
  vol.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

export function useSound() {
  const playCorrect = useCallback(() => {
    playTone(523.25, 0.15, 'sine');
    setTimeout(() => playTone(659.25, 0.15, 'sine'), 100);
    setTimeout(() => playTone(783.99, 0.3, 'sine'), 200);
  }, []);

  const playWrong = useCallback(() => {
    playTone(200, 0.3, 'square', 0.15);
    setTimeout(() => playTone(150, 0.4, 'square', 0.12), 150);
  }, []);

  return { playCorrect, playWrong };
}
