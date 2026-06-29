export type TabType = 'beranda' | 'materi' | 'eksplorasi' | 'latihan' | 'riwayat' | 'tes-akhir';

export type QuestionLevel = 'mudah' | 'sedang' | 'sulit';

export interface ScoreRecord {
  id: string;
  date: string;
  type: 'latihan' | 'tes-akhir';
  level?: QuestionLevel;
  score: number; // For latihan, number of correct answers (out of 10) / or percent
  totalQuestions: number;
  status: 'Lulus' | 'Coba Lagi' | 'Selesai';
}

export interface Question {
  id: number;
  context: string;
  questionText: string;
  recommendedMethod: 'substitusi' | 'eliminasi' | 'kombinasi' | 'grafik';
  eq1: { a: number; b: number; c: number; display: string };
  eq2: { a: number; b: number; c: number; display: string };
  questionTarget: string; // e.g. "Nilai x", "Nilai y", "Harga satu potong kain A"
  type: 'pg' | 'isian';
  options?: string[]; // For PG (4 options)
  correctOptionIndex?: number; // 0-3 key
  correctAnswer: { x: number; y: number }; // For checking answers
  explanation: string[]; // Steps for explanation
}
