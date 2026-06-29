import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Timer, BookOpen, AlertCircle, ArrowRight, RotateCcw, CheckCircle, XCircle, ChevronRight, HelpCircle } from 'lucide-react';
import { Question, QuestionLevel, ScoreRecord } from '../types';
import { MUDAH_QUESTIONS, SEDANG_QUESTIONS, SULIT_QUESTIONS } from '../data/questions';

interface LatihanProps {
  onAddScoreRecord: (record: ScoreRecord) => void;
  onNavigateTab: (tab: string) => void;
}

export default function Latihan({ onAddScoreRecord, onNavigateTab }: LatihanProps) {
  const [level, setLevel] = useState<QuestionLevel | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isianX, setIsianX] = useState('');
  const [isianY, setIsianY] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(120);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [answersSheet, setAnswersSheet] = useState<{ isCorrect: boolean; userAnswer: string; question: Question }[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load questions based on level
  const questions: Question[] = level === 'mudah'
    ? MUDAH_QUESTIONS
    : level === 'sedang'
    ? SEDANG_QUESTIONS
    : SULIT_QUESTIONS;

  const currentQuestion = questions[currentQuestionIndex];

  // Set initial timer based on level selection
  const getInitialTimer = (lvl: QuestionLevel) => {
    if (lvl === 'mudah') return 120;
    if (lvl === 'sedang') return 90;
    return 60;
  };

  // Timer loop
  useEffect(() => {
    if (!level || quizFinished || hasAnswered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    setTimerSeconds(getInitialTimer(level));
    setIsTimeOut(false);

    timerRef.current = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [level, currentQuestionIndex, quizFinished, hasAnswered]);

  const handleTimeOut = () => {
    setIsTimeOut(true);
    setHasAnswered(true);
    // Record as incorrect
    setAnswersSheet(prev => [
      ...prev,
      {
        isCorrect: false,
        userAnswer: "Waktu Habis",
        question: currentQuestion
      }
    ]);
  };

  const handleLevelSelect = (lvl: QuestionLevel) => {
    setLevel(lvl);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsianX('');
    setIsianY('');
    setHasAnswered(false);
    setScore(0);
    setAnswersSheet([]);
    setQuizFinished(false);
  };

  const handleSubmit = () => {
    if (hasAnswered) return;

    let isCorrect = false;
    let userAnswerText = "";

    if (currentQuestion.type === 'pg') {
      if (selectedOption === null) {
        alert("Silakan pilih salah satu opsi jawaban terlebih dahulu!");
        return;
      }
      isCorrect = selectedOption === currentQuestion.correctOptionIndex;
      userAnswerText = currentQuestion.options ? currentQuestion.options[selectedOption] : "";
    } else {
      const parsedX = Math.round(Number(isianX.trim()));
      const parsedY = Math.round(Number(isianY.trim()));

      if (isianX.trim() === "" || isianY.trim() === "") {
        alert("Silakan isi kedua kolom pengerjaan x dan y!");
        return;
      }

      isCorrect = parsedX === currentQuestion.correctAnswer.x && parsedY === currentQuestion.correctAnswer.y;
      userAnswerText = `x = ${parsedX}, y = ${parsedY}`;
    }

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setAnswersSheet(prev => [
      ...prev,
      {
        isCorrect,
        userAnswer: userAnswerText,
        question: currentQuestion
      }
    ]);

    setHasAnswered(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsianX('');
      setIsianY('');
      setHasAnswered(false);
    } else {
      // Finished
      setQuizFinished(true);
      if (timerRef.current) clearInterval(timerRef.current);

      // Save record to database
      const correctRatio = score; // Out of 10
      const finalStatus = correctRatio >= 7 ? 'Lulus' : 'Coba Lagi';
      const record: ScoreRecord = {
        id: Math.random().toString(36).substring(2, 9),
        date: new Date().toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        type: 'latihan',
        level: level!,
        score: correctRatio,
        totalQuestions: 10,
        status: finalStatus
      };
      onAddScoreRecord(record);
    }
  };

  const handleResetLevel = () => {
    setLevel(null);
  };

  // Timer color indicator
  const initialMax = level ? getInitialTimer(level) : 100;
  const isTimeCritical = (timerSeconds / initialMax) < 0.2;

  return (
    <div className="space-y-6 pb-24">
      <AnimatePresence mode="wait">
        {/* State 1: Select Level Screen */}
        {!level && (
          <motion.div
            key="select-level"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-4"
          >
            <div className="bg-white border-l-4 border-batik-gold rounded-xl p-5 shadow-sm text-center">
              <h2 className="font-serif text-xl font-bold text-batik-brown">Pilih Tingkat Latihan Soal</h2>
              <p className="text-xs text-batik-muted mt-1 leading-normal font-sans">
                Setiap level berisi 10 soal kombinasi pilihan ganda dan isian berlatar cerita Batik Yogyakarta.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* Mudah Card */}
              <div
                onClick={() => handleLevelSelect('mudah')}
                id="btn-level-mudah"
                className="cursor-pointer bg-white border border-batik-gold/20 p-5 rounded-2xl hover:border-batik-blue hover:shadow-md transition-all border-l-4 border-l-batik-blue flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-batik-blue text-md flex items-center gap-1">
                    🟢 Tingkat Mudah
                  </h3>
                  <p className="text-xs text-batik-muted font-sans leading-relaxed">
                    Mengenal eliminasi variabel langsung, persamaan koordinat satu langkah mudah.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-batik-surface-dark border border-batik-gold rounded-full font-bold text-xs text-batik-brown flex-shrink-0">
                  <Timer className="w-4 h-4 text-batik-gold" /> 120s / Soal
                </div>
              </div>

              {/* Sedang Card */}
              <div
                onClick={() => handleLevelSelect('sedang')}
                id="btn-level-sedang"
                className="cursor-pointer bg-white border border-batik-gold/20 p-5 rounded-2xl hover:border-batik-gold hover:shadow-md transition-all border-l-4 border-l-batik-gold flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-[#b59640] text-md flex items-center gap-1">
                    🟡 Tingkat Sedang
                  </h3>
                  <p className="text-xs text-batik-muted font-sans leading-relaxed">
                    Sistem persamaan dengan koefisien bervariasi, memerlukan trik perkalian aljabar.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-batik-surface-dark border border-batik-gold rounded-full font-bold text-xs text-batik-brown flex-shrink-0">
                  <Timer className="w-4 h-4 text-batik-gold" /> 90s / Soal
                </div>
              </div>

              {/* Sulit Card */}
              <div
                onClick={() => handleLevelSelect('sulit')}
                id="btn-level-sulit"
                className="cursor-pointer bg-white border border-batik-gold/20 p-5 rounded-2xl hover:border-batik-brown hover:shadow-md transition-all border-l-4 border-l-batik-brown flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-batik-brown text-md flex items-center gap-1">
                    🔴 Tingkat Sulit
                  </h3>
                  <p className="text-xs text-batik-muted font-sans leading-relaxed">
                    Sistem linear berpola rumit, tanda negatif, serta pecahan atau koefisien tak langsung.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-batik-surface-dark border border-batik-gold rounded-full font-bold text-xs text-batik-brown flex-shrink-0">
                  <Timer className="w-4 h-4 text-batik-gold" /> 60s / Soal
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* State 2: Active Question Screen */}
        {level && !quizFinished && (
          <motion.div
            key="quiz-active"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Header progress info */}
            <div className="bg-white border border-batik-gold/30 p-3 rounded-xl shadow-sm flex items-center justify-between text-xs font-sans">
              <span className="font-bold text-batik-brown font-serif">
                Soal {currentQuestionIndex + 1} / 10
              </span>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-batik-muted font-mono">Skor: {score}/10</span>
                <span className={`font-bold font-mono px-2 py-0.5 rounded flex items-center gap-1 ${
                  isTimeCritical ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-batik-surface-dark text-batik-brown'
                }`}>
                  <Timer className="w-3.5 h-3.5" /> {timerSeconds}s
                </span>
              </div>
            </div>

            {/* Progress Timer bar */}
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${
                  isTimeCritical ? 'bg-red-600' : 'bg-batik-green'
                }`}
                style={{ width: `${(timerSeconds / initialMax) * 100}%` }}
              />
            </div>

            {/* Question Card */}
            <div className="bg-white border-l-4 border-batik-gold rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-1 text-[11px] font-bold text-batik-muted uppercase tracking-wider font-sans">
                <BookOpen className="w-3.5 h-3.5 text-batik-gold" />
                <span>Konteks: {currentQuestion.context}</span>
              </div>

              <p className="text-xs text-batik-dark leading-relaxed font-sans font-medium bg-[#FAF7EE] p-3 rounded-xl border border-batik-gold/10">
                {currentQuestion.questionText}
              </p>

              {/* Equating System Display */}
              <div className="bg-batik-surface-dark/50 border border-batik-gold/30 p-3.5 rounded-xl text-center space-y-1 font-mono text-xs font-bold text-batik-brown">
                <p>Sistem Persamaan:</p>
                <p className="bg-white px-2 py-1 rounded inline-block border mt-1">({currentQuestion.eq1.display})</p>
                <p className="bg-white px-2 py-1 rounded inline-block border ml-2">({currentQuestion.eq2.display})</p>
                <p className="text-[10px] text-batik-muted mt-1 uppercase font-semibold">Mencari: {currentQuestion.questionTarget}</p>
              </div>

              {/* Input Forms (PG or Isian) */}
              {!hasAnswered ? (
                <div className="pt-2 space-y-3">
                  {currentQuestion.type === 'pg' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentQuestion.options?.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedOption(i)}
                          className={`p-3 text-left rounded-xl text-xs font-bold font-sans transition border ${
                            selectedOption === i
                              ? 'bg-batik-gold text-white border-batik-gold shadow-md'
                              : 'bg-white text-batik-dark border-gray-200 hover:border-batik-gold/50'
                          }`}
                        >
                          {String.fromCharCode(65 + i)}. {opt}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 bg-[#FAF7EE] border border-batik-gold/20 rounded-xl space-y-3">
                      <p className="text-[11px] font-semibold text-batik-muted">Tuliskan koordinat jawaban bulat (x dan y):</p>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 flex items-center gap-1.5">
                          <label className="font-mono text-xs font-bold text-batik-brown">x =</label>
                          <input
                            type="number"
                            value={isianX}
                            onChange={(e) => setIsianX(e.target.value)}
                            placeholder="0"
                            className="w-full p-2 bg-white border border-batik-gold/30 rounded focus:outline-none focus:ring-1 focus:ring-batik-gold text-center text-xs font-mono font-bold"
                          />
                        </div>
                        <div className="flex-1 flex items-center gap-1.5">
                          <label className="font-mono text-xs font-bold text-batik-brown">y =</label>
                          <input
                            type="number"
                            value={isianY}
                            onChange={(e) => setIsianY(e.target.value)}
                            placeholder="0"
                            className="w-full p-2 bg-white border border-batik-gold/30 rounded focus:outline-none focus:ring-1 focus:ring-batik-gold text-center text-xs font-mono font-bold"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleSubmit}
                    className="w-full py-3 bg-batik-brown hover:bg-batik-brown/90 text-white font-bold text-xs rounded-xl transition duration-200 shadow cursor-pointer justify-center flex items-center gap-1"
                  >
                    Kirim Jawaban <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                /* Immediate Review Discussion view */
                <div className="pt-2 space-y-4">
                  {/* Correct / Incorrect Banner */}
                  {isTimeOut ? (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs font-semibold">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <span>Sesi waktu habis! Jawabannya kurang tepat.</span>
                    </div>
                  ) : answersSheet[answersSheet.length - 1].isCorrect ? (
                    <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span>Hebat! Jawabanmu 100% Benar 🎉</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold">
                      <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                      <span>Oops! Jawaban kurang tepat 💡</span>
                    </div>
                  )}

                  {/* Recommended Method info */}
                  <span className="text-[10px] bg-batik-surface-dark border border-batik-gold/30 text-batik-brown px-2 py-0.5 rounded font-bold uppercase tracking-wider block w-max">
                    Metode Rekomendasi: {currentQuestion.recommendedMethod.toUpperCase()}
                  </span>

                  {/* Math Step-by-Step Explanation */}
                  <div className="bg-[#FAF7EE] p-4 rounded-xl border border-batik-gold/20 font-sans text-xs text-batik-dark space-y-2">
                    <span className="font-serif font-bold text-batik-brown text-sm block">Pembahasan Langkah Demi Langkah:</span>
                    <div className="space-y-1.5 pl-2 border-l-2 border-batik-gold mt-1.5 leading-relaxed font-mono text-[11px] text-gray-700">
                      {currentQuestion.explanation.map((line, idx) => (
                        <p key={idx}>{line}</p>
                      ))}
                    </div>
                    <p className="pt-2 font-bold text-batik-green">
                      &check; Jawaban Benar: {currentQuestion.type === 'pg'
                        ? currentQuestion.options ? currentQuestion.options[currentQuestion.correctOptionIndex!] : ''
                        : `x = ${currentQuestion.correctAnswer.x}, y = ${currentQuestion.correctAnswer.y}`
                      }
                    </p>
                  </div>

                  <button
                    onClick={handleNext}
                    className="w-full py-3 bg-batik-gold hover:bg-batik-gold/90 text-white font-bold text-xs rounded-xl transition duration-200 shadow cursor-pointer justify-center flex items-center gap-1.5 font-serif"
                  >
                    {currentQuestionIndex === questions.length - 1 ? "Selesaikan Latihan" : "Soal Berikutnya"} <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* State 3: Quiz Finished Summary Card */}
        {quizFinished && (
          <motion.div
            key="quiz-finished"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-5"
          >
            <div className="bg-white border-2 border-batik-gold rounded-2xl p-6 text-center space-y-4 shadow-sm">
              <div className="mx-auto w-16 h-16 bg-batik-surface-dark border border-batik-gold rounded-full flex items-center justify-center text-batik-brown">
                <Award className="w-8 h-8 text-batik-gold" />
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-batik-brown">Hasil Latihan Kamu</h3>
                <p className="text-xs text-batik-muted mt-1 uppercase tracking-wider font-semibold">
                  Tingkat {level?.toUpperCase()}
                </p>
              </div>

              {/* Circular score display */}
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-28 h-28 transform -rotate-90">
                  <circle cx="56" cy="56" r="45" fill="transparent" stroke="#F0E8D5" strokeWidth="8" />
                  <circle cx="56" cy="56" r="45" fill="transparent" stroke="#C9A84C" strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - score / 10)}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <span className="absolute font-serif text-2xl font-bold text-batik-brown">{score * 10}%</span>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-batik-dark font-sans leading-relaxed">
                  Kamu berhasil menyelesaikan <strong>{score}</strong> dari 10 soal latihan matematika materi SPLDV tingkat {level}.
                </p>
                <div className="inline-block mt-2">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                    score >= 7 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    Status: {score >= 7 ? 'LULUS (KOMPETEN) 🎉' : 'COBA LAGI 🎯'}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleResetLevel}
                  className="flex-1 py-2.5 bg-white border border-batik-gold/30 text-batik-brown font-bold text-xs rounded-lg hover:bg-batik-surface-dark transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" /> Level Lain
                </button>
                <button
                  onClick={() => onNavigateTab('riwayat')}
                  className="flex-1 py-2.5 bg-batik-brown text-white font-bold text-xs rounded-lg hover:bg-batik-brown/90 transition cursor-pointer flex items-center justify-center gap-1.5 font-serif"
                >
                  Buka Riwayat
                </button>
              </div>
            </div>

            {/* Quick Solution checklist review of each question */}
            <div className="bg-white border border-batik-gold/30 rounded-xl p-4 shadow-sm space-y-3">
              <span className="font-serif text-[13px] font-bold text-batik-brown border-b border-gray-100 pb-2 block">Analisis Jawaban Soal:</span>
              <div className="space-y-2 text-xs">
                {answersSheet.map((ans, idx) => (
                  <div key={idx} className="flex justify-between items-start gap-4 p-2 bg-gray-50 border border-gray-100 rounded">
                    <div>
                      <strong className="block text-batik-dark">Gagang {idx + 1}: {ans.question.context}</strong>
                      <span className="text-[10px] text-batik-muted">Target: {ans.question.questionTarget}</span>
                    </div>
                    {ans.isCorrect ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-0.5">✓ Benar</span>
                    ) : (
                      <span className="text-rose-700 font-bold flex items-center gap-0.5">✗ Salah</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
