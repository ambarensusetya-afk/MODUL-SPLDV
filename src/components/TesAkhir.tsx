import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Timer, BookOpen, CheckCircle, XCircle, ChevronRight, AlertTriangle, ShieldCheck, RefreshCw, BarChart3, ListChecks, ArrowRight } from 'lucide-react';
import { ScoreRecord } from '../types';
import { TES_AKHIR_QUESTIONS } from '../data/questions';

interface TesAkhirProps {
  onAddScoreRecord: (record: ScoreRecord) => void;
}

export default function TesAkhir({ onAddScoreRecord }: TesAkhirProps) {
  const [testStarted, setTestStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isianX, setIsianX] = useState('');
  const [isianY, setIsianY] = useState('');

  // Stores user answers: index -> user input coordinates
  const [userAnswers, setUserAnswers] = useState<{ x?: number; y?: number; selectedIdx?: number; isCorrect: boolean }[]>([]);
  const [testTimeLeft, setTestTimeLeft] = useState(2700); // 45 minutes in seconds
  const [testFinished, setTestFinished] = useState(false);
  const [showPembahasan, setShowPembahasan] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer loop
  useEffect(() => {
    if (!testStarted || testFinished) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTestTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleFinishTestAuto();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [testStarted, testFinished]);

  const handleStartTest = () => {
    setTestStarted(true);
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsianX('');
    setIsianY('');
    setUserAnswers([]);
    setTestTimeLeft(2700);
    setTestFinished(false);
    setShowPembahasan(false);
  };

  const handleFinishTestAuto = () => {
    // Fill remaining with incorrect and trigger finish
    setTestFinished(true);
  };

  const handleNextQuestion = () => {
    const q = TES_AKHIR_QUESTIONS[currentIdx];

    // Read current answers
    let isCorrect = false;
    let currentAns: { x?: number; y?: number; selectedIdx?: number; isCorrect: boolean };

    if (q.type === 'pg') {
      if (selectedOption === null) {
        alert("Silakan pilih salah satu opsi jawaban terlebih dahulu!");
        return;
      }
      isCorrect = selectedOption === q.correctOptionIndex;
      currentAns = { selectedIdx: selectedOption, isCorrect };
    } else {
      const parsedX = Math.round(Number(isianX.trim()));
      const parsedY = Math.round(Number(isianY.trim()));

      if (isianX.trim() === "" || isianY.trim() === "") {
        alert("Silakan isi kedua kolom pengerjaan x dan y!");
        return;
      }

      isCorrect = parsedX === q.correctAnswer.x && parsedY === q.correctAnswer.y;
      currentAns = { x: parsedX, y: parsedY, isCorrect };
    }

    const updatedAnswers = [...userAnswers, currentAns];
    setUserAnswers(updatedAnswers);

    if (currentIdx < TES_AKHIR_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsianX('');
      setIsianY('');
    } else {
      // Completed all questions
      setTestFinished(true);
      if (timerRef.current) clearInterval(timerRef.current);

      // Compute final score
      const correctsCount = updatedAnswers.filter(ans => ans.isCorrect).length;
      const finalScorePercent = correctsCount * 10; // (corrects / 10) * 100

      // Add score record
      const record: ScoreRecord = {
        id: Math.random().toString(36).substring(2, 9),
        date: new Date().toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        type: 'tes-akhir',
        score: finalScorePercent,
        totalQuestions: 10,
        status: finalScorePercent >= 70 ? 'Lulus' : 'Coba Lagi'
      };
      onAddScoreRecord(record);
    }
  };

  // Compute stats method breakdown
  const computeMethodBreakdown = () => {
    const breakdown = {
      substitusi: { correct: 0, total: 0 },
      eliminasi: { correct: 0, total: 0 },
      kombinasi: { correct: 0, total: 0 },
      grafik: { correct: 0, total: 0 }
    };

    TES_AKHIR_QUESTIONS.forEach((q, idx) => {
      const isAnsCorrect = userAnswers[idx]?.isCorrect || false;
      const m = q.recommendedMethod;
      breakdown[m].total += 1;
      if (isAnsCorrect) {
        breakdown[m].correct += 1;
      }
    });

    return breakdown;
  };

  const methodStats = testFinished ? computeMethodBreakdown() : null;

  // Recommendations: List methods that score below 70 %
  const getReviewRecommendations = () => {
    if (!methodStats) return [];
    const recs: string[] = [];
    Object.entries(methodStats).forEach(([methodName, val]) => {
      const scoreRatio = val.total > 0 ? val.correct / val.total : 0;
      if (scoreRatio < 0.7) {
        const capitalizedMethod = methodName.charAt(0).toUpperCase() + methodName.slice(1);
        recs.push(capitalizedMethod);
      }
    });
    return recs;
  };

  const recommendations = testFinished ? getReviewRecommendations() : [];

  const formatTimer = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const activeQuestion = TES_AKHIR_QUESTIONS[currentIdx];

  return (
    <div className="space-y-6 pb-28">
      <AnimatePresence mode="wait">
        {/* State 1: Test Lobby Instructions */}
        {!testStarted && (
          <motion.div
            key="test-lobby"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <div className="bg-white border-l-4 border-batik-blue rounded-xl p-5 shadow-sm space-y-2 text-center">
              <h2 className="font-serif text-xl font-bold text-batik-brown">Evaluasi Akhir Modul</h2>
              <p className="text-xs text-batik-muted font-sans mt-1">
                Menguji pemahaman menyeluruh terhadap Sistem Persamaan Linear Dua Variabel (SPLDV).
              </p>
            </div>

            <div className="bg-white border border-batik-gold/30 rounded-2xl p-5 space-y-4 shadow-sm">
              <h3 className="font-serif text-sm font-bold text-batik-brown flex items-center gap-1.5 border-b border-gray-100 pb-2">
                <ShieldCheck className="w-5 h-5 text-batik-gold" /> Peraturan Dan Petunjuk Tes:
              </h3>
              
              <div className="text-xs text-batik-dark font-sans space-y-2 leading-relaxed">
                <p>1. Tes ini terdiri dari <strong>10 soal</strong> yang diambil acak dari kategori metode substitusi, eliminasi, komb, dan grafik.</p>
                <p>2. Disediakan waktu bertotal <strong>45 menit (2700 detik)</strong> untuk menyelesaikan seluruh soal.</p>
                <p>3. Format soal berupa gabungan antara Pilihan Ganda (PG) dan pengisian jawaban koordinat angka.</p>
                <p>4. <strong>Lembaga Review:</strong> Berbeda dengan menu latihan, pembahasan bertahap tidak ditampilkan selama tes dan baru dapat diulas lengkap di halaman akhir hasil tes.</p>
                <p>5. Sesi akan tuntas otomatis bila pengukur waktu mencapai angka nol.</p>
              </div>

              <div className="p-3 bg-batik-surface-dark/60 border border-batik-gold border-radius-lg text-[11px] text-batik-muted">
                📌 Siapkan buku coret-coret dan alat hitung tulismu untuk mempermudah pengerjaan aljabar secara presisi!
              </div>

              <button
                onClick={handleStartTest}
                className="w-full py-3.5 bg-batik-blue hover:bg-batik-blue/90 text-white font-bold rounded-xl transition shadow cursor-pointer justify-center flex items-center gap-1.5 font-serif text-sm"
              >
                Mulai Tes Akhir Sekarang <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* State 2: Active Question View */}
        {testStarted && !testFinished && (
          <motion.div
            key="test-active"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Countdown info */}
            <div className="bg-white border border-batik-gold/30 p-3 rounded-xl shadow-sm flex items-center justify-between text-xs font-sans">
              <span className="font-bold text-batik-brown font-serif">
                Evaluasi: Soal {currentIdx + 1} / 10
              </span>
              <span className={`font-mono font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                testTimeLeft < 300 ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-batik-surface-dark text-batik-brown'
              }`}>
                <Timer className="w-3.5 h-3.5" /> {formatTimer(testTimeLeft)}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-batik-blue transition-all duration-300" style={{ width: `${((currentIdx + 1) / 10) * 100}%` }} />
            </div>

            {/* Question Card */}
            <div className="bg-white border-l-4 border-batik-gold rounded-2xl p-5 shadow-sm space-y-4">
              <span className="text-[10px] text-batik-muted font-bold block uppercase tracking-wider font-sans">
                Konteks: {activeQuestion.context}
              </span>

              <p className="text-xs text-batik-dark font-sans leading-relaxed font-semibold bg-[#FAF7EE] p-3 rounded-xl border border-batik-gold/15">
                {activeQuestion.questionText}
              </p>

              {/* Formula display */}
              <div className="bg-batik-surface-dark/50 border border-batik-gold/30 p-3 rounded-xl text-center space-y-1 font-mono text-xs font-bold text-batik-brown">
                <p className="bg-white px-2 py-0.5 rounded border inline-block">({activeQuestion.eq1.display})</p>
                <p className="bg-white px-2 py-0.5 rounded border inline-block ml-2">({activeQuestion.eq2.display})</p>
              </div>

              {/* Dynamic Inputs (PG / Isian) */}
              <div className="pt-2">
                {activeQuestion.type === 'pg' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeQuestion.options?.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedOption(i)}
                        className={`p-3 text-left rounded-xl text-xs font-bold font-sans transition border ${
                          selectedOption === i
                            ? 'bg-batik-blue text-white border-batik-blue shadow-md'
                            : 'bg-white text-batik-dark border-gray-200 hover:border-batik-gold/50'
                        }`}
                      >
                        {String.fromCharCode(65 + i)}. {opt}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-[#FAF7EE] border border-batik-gold/20 rounded-xl space-y-3">
                    <p className="text-[10px] font-bold text-batik-muted uppercase tracking-wider">Isikan koordinat x dan y yang benar:</p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 flex items-center gap-1.5">
                        <label className="font-mono text-xs font-bold text-batik-brown">x =</label>
                        <input
                          type="number"
                          value={isianX}
                          onChange={(e) => setIsianX(e.target.value)}
                          placeholder="Nilai x"
                          className="w-full p-2 bg-white border border-batik-gold/30 rounded focus:outline-none focus:ring-1 focus:ring-batik-gold text-center text-xs font-mono font-bold"
                        />
                      </div>
                      <div className="flex-1 flex items-center gap-1.5">
                        <label className="font-mono text-xs font-bold text-batik-brown">y =</label>
                        <input
                          type="number"
                          value={isianY}
                          onChange={(e) => setIsianY(e.target.value)}
                          placeholder="Nilai y"
                          className="w-full p-2 bg-white border border-batik-gold/30 rounded focus:outline-none focus:ring-1 focus:ring-batik-gold text-center text-xs font-mono font-bold"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleNextQuestion}
                className="w-full py-3 bg-batik-gold hover:bg-batik-gold/90 text-white font-bold text-xs rounded-xl shadow cursor-pointer justify-center flex items-center gap-1 font-serif"
              >
                {currentIdx === TES_AKHIR_QUESTIONS.length - 1 ? 'Kirim Lembar Tes' : 'Soal Berikutnya'} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* State 3: Test Finished Summary */}
        {testFinished && (
          <motion.div
            key="test-completed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Result Header Card */}
            <div className="bg-white border-2 border-batik-gold rounded-2xl p-6 text-center space-y-3 shadow-sm">
              <div className="mx-auto w-14 h-14 bg-batik-surface-dark border border-batik-gold rounded-full flex items-center justify-center text-batik-brown">
                <BarChart3 className="w-7 h-7 text-batik-gold" />
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-batik-brown">Hasil Evaluasi Akhir</h3>
                <p className="text-[10px] text-batik-muted font-sans font-bold tracking-wider uppercase mt-0.5">
                  Modul Pembelajaran SPLDV Batik Yogyakarta
                </p>
              </div>

              {/* Total Score Percent label */}
              {userAnswers.length > 0 && (
                <div className="py-2">
                  <span className="text-[10px] text-batik-muted uppercase font-bold tracking-wider block">
                    Skor Akhir Evaluasi
                  </span>
                  <div className="text-4xl font-serif font-black text-batik-brown mt-1">
                    {userAnswers.filter(ans => ans.isCorrect).length * 10} / 100
                  </div>
                </div>
              )}

              <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase inline-block ${
                (userAnswers.filter(ans => ans.isCorrect).length * 10) >= 70
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-800'
              }`}>
                {(userAnswers.filter(ans => ans.isCorrect).length * 10) >= 70
                  ? 'LULUS (TUNTAS BELAJAR) 🎉'
                  : 'COBA LAGI (BELUM TUNTAS) 🎯'}
              </span>

              {/* Method Success Rates Breakdown */}
              {methodStats && (
                <div className="bg-[#FAF7EE] border border-batik-gold/10 p-4 rounded-xl text-left space-y-2 mt-4">
                  <span className="text-xs font-bold text-batik-brown font-serif block">Analisis Penguasaan Metode:</span>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {Object.entries(methodStats).map(([methodName, val]) => {
                      const scoreRatio = val.total > 0 ? (val.correct / val.total) * 100 : 0;
                      return (
                        <div key={methodName} className="bg-white p-2.5 rounded border border-gray-100 flex flex-col justify-between">
                          <span className="uppercase font-bold text-[10px] text-batik-muted">
                            {methodName}
                          </span>
                          <span className="font-mono text-xs font-black text-batik-brown mt-1">
                            {val.correct} / {val.total} Benar ({scoreRatio.toFixed(0)}%)
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Personalized diagnostic counselor recommendation */}
              {recommendations.length > 0 ? (
                <div className="text-left bg-amber-50 border border-amber-200 p-3 rounded-lg text-[11px] leading-relaxed text-amber-800">
                  <AlertTriangle className="w-4 h-4 text-amber-600 inline mr-1 flex-shrink-0" />
                  <strong>Rekomendasi Belajar:</strong> Kamu perlu meninjau ulang materi metode{' '}
                  <span className="font-bold text-batik-brown font-serif">{recommendations.join(', ')}</span> karena persentase ketuntasan di bawah 70%. Ulas langkah pengerjaan di bawah atau buka kembali tab 📖 Materi.
                </div>
              ) : (
                <div className="text-left bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-[11px] leading-relaxed text-emerald-800">
                  <CheckCircle className="w-4 h-4 text-emerald-600 inline mr-1 flex-shrink-0" />
                  <strong>Predikat Istimewa!</strong> Kamu telah menguasai seluruh metode pengerjaan SPLDV dengan nilai ketuntasan di atas rata-rata standard!
                </div>
              )}

              <div className="flex gap-2.5 pt-2">
                <button
                  onClick={handleStartTest}
                  className="flex-1 py-2.5 bg-white border border-batik-gold/30 text-batik-brown font-bold text-xs rounded-lg hover:bg-batik-surface-dark transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} /> Ulangi Sesi Tes
                </button>
                <button
                  onClick={() => setShowPembahasan(prev => !prev)}
                  className="flex-1 py-2.5 bg-batik-brown text-white font-bold text-xs rounded-lg hover:bg-batik-brown/90 transition cursor-pointer flex items-center justify-center gap-1.5 font-serif"
                >
                  <ListChecks className="w-4 h-4" /> {showPembahasan ? 'Tutup Review' : 'Lihat Pembahasan'}
                </button>
              </div>
            </div>

            {/* Diagnostic Logs / Review Explanations */}
            {showPembahasan && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border-l-4 border-batik-gold rounded-2xl p-5 shadow-sm space-y-5"
              >
                <h3 className="font-serif font-bold text-batik-brown text-md border-b border-gray-100 pb-2">
                  Review Lembar Jawaban Dan Pembahasan Soal
                </h3>

                <div className="space-y-4">
                  {TES_AKHIR_QUESTIONS.map((q, idx) => {
                    const userAns = userAnswers[idx];
                    return (
                      <div key={idx} className="p-4 bg-[#FAF7EE] border rounded-xl space-y-2">
                        <div className="flex items-center justify-between border-b border-gray-200 pb-1.5">
                          <span className="font-bold text-xs text-batik-brown">Soal {idx + 1}: {q.context}</span>
                          {userAns?.isCorrect ? (
                            <span className="text-emerald-700 font-bold text-xs flex items-center gap-0.5">✓ Benar</span>
                          ) : (
                            <span className="text-rose-700 font-bold text-xs flex items-center gap-0.5">✗ Salah / Waktu Habis</span>
                          )}
                        </div>

                        <p className="text-xs text-batik-dark font-sans leading-relaxed italic">
                          &ldquo;{q.questionText}&rdquo;
                        </p>

                        <div className="bg-white p-2 rounded border text-mono text-[10px] space-y-0.5 text-gray-500 font-mono">
                          <p>Pers 1: {q.eq1.display}</p>
                          <p>Pers 2: {q.eq2.display}</p>
                        </div>

                        {/* Step discussions list */}
                        <div className="pl-2 border-l border-batik-gold/40 text-[11px] text-gray-600 font-mono space-y-1 mt-2">
                          <strong className="text-xs text-batik-muted font-sans font-bold block mb-1">Algoritma Aljabar:</strong>
                          {q.explanation.map((line, lIdx) => (
                            <p key={lIdx}>{line}</p>
                          ))}
                        </div>
                        <p className="font-bold text-xs text-batik-green pt-1">
                          &check; Jawaban Benar: {q.type === 'pg'
                            ? q.options ? q.options[q.correctOptionIndex!] : ''
                            : `x = ${q.correctAnswer.x}, y = ${q.correctAnswer.y}`
                          }
                        </p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
