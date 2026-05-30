export interface Rule {
  id: string;
  nama: string;
  penjelasan: string;
}

export interface BagianJebakan {
  huruf: string;
  posisi_mulai: number;
  posisi_akhir: number;
}

export interface VocabWord {
  id: string;
  kata: string;
  arti: string;
  cara_baca_lokal: string;
  kalimat_audio: string;
  bagian_jebakan: BagianJebakan;
  id_hukum: string;
}

export interface Module {
  id: string;
  nama: string;
  deskripsi: string;
  icon: string;
  levelIds: string[];
}

export interface Level {
  id: string;
  nama: string;
  deskripsi: string;
  wordIds: string[];
}

export interface UserProfile {
  xp: number;
}

export interface WordMastery {
  mistake_count: number;
  last_practiced: string;
  next_review: string;
}

export interface LearningProgress {
  completed_levels: string[];
  word_mastery: Record<string, WordMastery>;
}

export type AnswerResult = 'correct' | 'wrong';

export interface CharComparison {
  char: string;
  status: 'correct' | 'wrong' | 'extra' | 'missing';
}

export interface FeedbackData {
  result: AnswerResult;
  word: VocabWord;
  rule: Rule;
  typed: string;
  comparison: CharComparison[];
  notes?: string;
}
