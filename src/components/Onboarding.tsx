import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Gamepad2, PenTool, Flame, ArrowRight, UserPlus, Award, Trophy, Download } from 'lucide-react';

interface OnboardingProps {
  key?: string;
  onComplete: (username: string) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState<'name' | 'tutorial'>('name');
  const [name, setName] = useState('');
  const [slide, setSlide] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [showCodeArea, setShowCodeArea] = useState(false);

  // Retrieve the highest score of the student from local storage
  const getHighScore = (): number => {
    try {
      const stored = localStorage.getItem('batikmath_scores');
      if (!stored) return 0;
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) return 0;
      
      const highestTestScore = parsed
        .filter((s: any) => s.type === 'tes-akhir')
        .reduce((max: number, curr: any) => (curr.score > max ? curr.score : max), 0);

      const highestLatihanScore = parsed
        .filter((s: any) => s.type === 'latihan')
        .reduce((max: number, curr: any) => (curr.score > max ? curr.score : max), 0);

      return Math.max(highestTestScore, highestLatihanScore * 10);
    } catch (e) {
      return 0;
    }
  };

  const highScore = getHighScore();

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setErrorMsg('Tuliskan nama belajarmu terlebih dahulu!');
      return;
    }
    setErrorMsg('');
    try {
      localStorage.setItem('batikmath_user', trimmedName);
    } catch (err) {
      console.warn("localStorage setItem failed:", err);
    }
    setStep('tutorial');
  };

  const slides = [
    {
      title: "Baca Materi Seksama",
      icon: <BookOpen className="w-16 h-16 text-[#6B3A2A]" />,
      text: "📖 Pelajari konsep SPLDV (Sistem Persamaan Linear Dua Variabel) yang dihubungkan dengan keindahan tradisi Batik Yogyakarta.",
      color: "border-[#6B3A2A] text-[#6B3A2A]"
    },
    {
      title: "Coba Eksplorasi Interaktif",
      icon: <Gamepad2 className="w-16 h-16 text-[#6B3A2A]" />,
      text: "🎮 Gunakan simulator grafik interaktif kami untuk memanipulasi koefisien persamaan dan melihat pergeseran garis secara real-time.",
      color: "border-[#6B3A2A] text-[#6B3A2A]"
    },
    {
      title: "Selesaikan Latihan & Tes",
      icon: <PenTool className="w-16 h-16 text-[#6B3A2A]" />,
      text: "📝 Selesaikan 3 tingkat kesulitan latihan soal dengan batas waktu demi mencatat skor terbaikmu dan taklukkan evaluasi akhir modul!",
      color: "border-[#6B3A2A] text-[#C9A84C]"
    }
  ];

  const handleNextSlide = () => {
    if (slide < slides.length - 1) {
      setSlide(prev => prev + 1);
    } else {
      onComplete(name.trim());
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto kawung-pattern"
    >
      <AnimatePresence mode="wait">
        {step === 'name' ? (
          <motion.div
            key="name-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md p-6 bg-white border-2 border-[#C9A84C] rounded-3xl shadow-xl text-center relative overflow-hidden"
          >
            {/* Top decorative batik corner */}
            <div className="absolute top-0 left-0 w-16 h-16 transform -translate-x-6 -translate-y-6 rounded-full bg-[#6B3A2A]/5 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-16 h-16 transform translate-x-6 translate-y-6 rounded-full bg-[#6B3A2A]/5 pointer-events-none" />

            {/* High Score Dashboard / Trophy Panel */}
            <div className="flex flex-col items-center mb-6 mt-2">
              <div className="relative mb-3">
                <div className="absolute -inset-1.5 rounded-full bg-[#C9A84C] blur opacity-45 animate-pulse" />
                <div className="relative bg-[#6B3A2A] border-2 border-[#C9A84C] p-4 rounded-full text-white shadow-md flex items-center justify-center font-sans">
                  <Trophy className="w-10 h-10 text-amber-300 animate-pulse" />
                </div>
              </div>
              <div className="bg-[#6B3A2A]/5 border border-[#C9A84C]/35 rounded-2xl px-5 py-2 flex items-center gap-2 shadow-sm font-sans">
                <Award className="w-5 h-5 text-[#C9A84C]" />
                <div className="text-left">
                  <span className="text-[9px] uppercase tracking-widest font-bold text-gray-500 block">Skor Tertinggi Siswa</span>
                  <span className="text-sm font-black text-[#6B3A2A] font-mono">{highScore} / 100</span>
                </div>
              </div>
            </div>

            <h1 className="font-serif text-3xl font-bold text-[#6B3A2A] mb-6 leading-tight">
              Selamat Datang!
            </h1>

            <form onSubmit={handleNameSubmit} className="space-y-4">
              <div className="p-4 bg-amber-50/70 border border-[#C9A84C]/45 rounded-2xl text-left">
                <label className="block text-xs font-bold text-[#6B3A2A] uppercase tracking-wider mb-1">
                  Siapa nama belajarmu?
                </label>
                <p className="text-[10px] text-amber-800 font-medium mb-2.5">
                  💡 Jika tidak bisa mengetik di layar ini, klik tombol <strong>"Buka di Tab Baru" ↗️</strong> di pojok kanan atas layar agar lancar.
                </p>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <UserPlus className="w-4 h-4 text-[#C9A84C]" />
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama lengkap / panggilan..."
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C] text-gray-800 font-sans text-sm placeholder-gray-400"
                  />
                </div>
                {errorMsg && (
                  <p className="text-rose-700 text-xs mt-2 font-medium">
                    ⚠️ {errorMsg}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#6B3A2A] hover:bg-[#522c1f] text-white font-bold rounded-2xl transition duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm font-sans"
              >
                Lanjut <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="tutorial-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md p-6 bg-white border-2 border-[#C9A84C] rounded-3xl shadow-xl flex flex-col items-center relative overflow-hidden"
          >
            {/* Top decorative batik corner */}
            <div className="absolute top-0 left-0 w-16 h-16 transform -translate-x-6 -translate-y-6 rounded-full bg-[#6B3A2A]/5 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-16 h-16 transform translate-x-6 translate-y-6 rounded-full bg-[#6B3A2A]/5 pointer-events-none" />

            {/* Top step bar */}
            <div className="flex gap-2 mb-6 w-full justify-center">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === slide ? 'w-8 bg-[#C9A84C]' : 'w-2.5 bg-gray-200'
                  }`}
                />
              ))}
            </div>

            {/* Illustration */}
            <div className="p-5 bg-amber-50/70 rounded-full mb-4 border border-[#C9A84C]/25">
              {slides[slide].icon}
            </div>

            <h2 className="font-serif text-xl font-bold text-[#6B3A2A] mb-3 text-center">
              {slides[slide].title}
            </h2>

            <div className="px-2 py-4 bg-amber-50/50 rounded-2xl border-l-4 border-[#C9A84C] w-full text-center mb-6">
              <p className="text-gray-700 text-xs leading-relaxed font-medium px-2">
                {slides[slide].text}
              </p>
            </div>

            <button
              onClick={handleNextSlide}
              className="w-full py-3 bg-[#6B3A2A] hover:bg-[#522c1f] text-white font-bold rounded-2xl transition duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm font-sans"
            >
              {slide === slides.length - 1 ? "Mengerti, Mulai!" : "Berikutnya →"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
