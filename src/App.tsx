import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, BookOpen, Route, Activity, History, User, Award, ShieldAlert, LogOut, Download, Check, Globe, Wifi, WifiOff, FileText, X, Info, Sparkles } from 'lucide-react';

import { TabType, ScoreRecord } from './types';
import { generateOfflineHTML } from './utils/offlineTemplate';
import Onboarding from './components/Onboarding';
import Navigation from './components/Navigation';
import Beranda from './components/Beranda';
import Materi from './components/Materi';
import Eksplorasi from './components/Eksplorasi';
import Latihan from './components/Latihan';
import Riwayat from './components/Riwayat';
import TesAkhir from './components/TesAkhir';

export default function App() {
  const isOfflineFile = typeof window !== 'undefined' && (
    window.location.protocol === 'file:' || 
    (window as any).__OFFLINE__ === true
  );

  const [username, setUsername] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('beranda');
  const [scores, setScores] = useState<ScoreRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showOfflineModal, setShowOfflineModal] = useState(false);
  const [isSwRegistered, setIsSwRegistered] = useState(false);
  const [modalCopied, setModalCopied] = useState(false);
  const [showModalCodeArea, setShowModalCodeArea] = useState(false);
  const [fullOfflineHTML, setFullOfflineHTML] = useState<string>('');

  // References to communicate with Materi component
  const setMateriIndexRef = useRef<((index: number) => void) | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      setIsSwRegistered(true);
    }
  }, []);

  // Pre-fetch the offline HTML when modal opens so copy/download uses the real beautiful singlefile React bundle
  useEffect(() => {
    if (showOfflineModal) {
      fetch(`/Modul_SPLDV_Interaktif_Offline.html?t=${Date.now()}`)
        .then((res) => {
          if (res.ok) return res.text();
          throw new Error('Not found');
        })
        .then((text) => {
          if (text && text.length > 10000) {
            setFullOfflineHTML(text);
          }
        })
        .catch((err) => {
          console.warn('Gagal memuat berkas luring utama:', err);
        });
    }
  }, [showOfflineModal]);

  useEffect(() => {
    // Load username
    try {
      const storedUser = localStorage.getItem('batikmath_user');
      if (storedUser) {
        setUsername(storedUser);
      }
    } catch (e) {
      console.warn("localStorage is not available:", e);
    }

    // Load records
    try {
      const storedScores = localStorage.getItem('batikmath_scores');
      if (storedScores) {
        setScores(JSON.parse(storedScores));
      }
    } catch (e) {
      console.error("Failed to load scores from localStorage", e);
    }

    setLoading(false);
  }, []);

  const handleOnboardingComplete = (name: string) => {
    setUsername(name);
    setActiveTab('beranda');
  };

  const handleAddScoreRecord = (record: ScoreRecord) => {
    const updatedScores = [record, ...scores];
    setScores(updatedScores);
    try {
      localStorage.setItem('batikmath_scores', JSON.stringify(updatedScores));
    } catch (e) {
      console.warn("Failed to save score to localStorage:", e);
    }
  };

  const handleClearHistory = () => {
    try {
      localStorage.removeItem('batikmath_scores');
    } catch (e) {
      console.warn("Failed to remove scores from localStorage:", e);
    }
    setScores([]);
  };

  const handleResetProfile = () => {
    const isConfirmed = window.confirm(
      "Apakah kamu ingin mengubah nama belajarmu? Skor riwayat pengerjaan pengerjaanmu akan tetap disimpan."
    );
    if (isConfirmed) {
      try {
        localStorage.removeItem('batikmath_user');
      } catch (e) {
        console.warn("Failed to remove user from localStorage:", e);
      }
      setUsername(null);
    }
  };

  // Safe navigation portal that lets items redirect to specific chapters
  const handleNavigateMateriIndex = (idx: number) => {
    setActiveTab('materi');
    // We defer the execution slightly to let the tab mount if not already mounted
    setTimeout(() => {
      if (setMateriIndexRef.current) {
        setMateriIndexRef.current(idx);
      }
    }, 100);
  };

  // Download self-contained offline html (the exact beautiful React app)
  const handleDownloadOfflineHTML = async () => {
    if (fullOfflineHTML) {
      const blob = new Blob([fullOfflineHTML], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Modul_SPLDV_Interaktif_Offline.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return;
    }

    try {
      // Try to fetch the compiled single-file React app first so that the user gets the EXACT same preview app!
      const response = await fetch(`/Modul_SPLDV_Interaktif_Offline.html?t=${Date.now()}`);
      if (response.ok) {
        const htmlText = await response.text();
        if (htmlText && htmlText.length > 10000) { // Check that it's the full built file
          const blob = new Blob([htmlText], { type: 'text/html;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Modul_SPLDV_Interaktif_Offline.html';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          return;
        }
      }
    } catch (e) {
      console.warn('Gagal mengambil berkas build tunggal, beralih ke berkas cadangan:', e);
    }

    try {
      // Fallback to the light standalone offline template
      const offlineHTML = generateOfflineHTML(username || 'Pelajar Hebat');
      const blob = new Blob([offlineHTML], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Modul_SPLDV_Interaktif_Offline.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Gagal mengunduh modul offline:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-batik-bg flex justify-center items-center font-serif text-batik-brown">
        <div className="text-center space-y-2">
          <RefreshCw className="w-10 h-10 animate-spin mx-auto text-batik-gold" />
          <p className="text-sm font-semibold tracking-wide">Mempersiapkan Modul...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center font-sans overflow-hidden polkadot-bg">
      {/* Central responsive mockup stage (max-width: 768px) */}
      <div className="w-full max-w-[768px] h-full md:h-[840px] md:max-h-[95vh] kawung-pattern shadow-2xl flex flex-col relative overflow-hidden md:rounded-3xl md:border-2 border-[#FAF7EE]">
        
        {/* Top Header branding */}
        <header className="bg-[#6B3A2A] border-b-4 border-[#C9A84C] text-white p-5 sticky top-0 z-30 rounded-b-[32px] shadow-lg flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            {/* Minimal SVG Kawung icon */}
            <svg className="w-8 h-8 text-batik-gold flex-shrink-0 animate-pulse" viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="50" r="12" className="text-white" />
              <path d="M 50 20 C 35 20 35 45 50 45 C 65 45 65 20 50 20 Z" fill="#C9A84C" />
              <path d="M 50 80 C 35 80 35 55 50 55 C 65 55 65 80 50 80 Z" fill="#C9A84C" />
              <path d="M 20 50 C 20 35 45 35 45 50 C 45 65 20 65 20 50 Z" fill="#C9A84C" />
              <path d="M 80 50 C 80 35 55 35 55 50 C 55 65 80 65 80 50 Z" fill="#C9A84C" />
            </svg>
            <div>
              <h1 className="font-serif text-sm font-black tracking-wide leading-none text-batik-gold uppercase">
                Modul SPLDV Interaktif
              </h1>
              <span className="text-[10px] text-white/85 tracking-tight font-sans leading-none block mt-0.5">
                Pembelajaran Matematika SMP
              </span>
            </div>
          </div>

          {/* User profile actions button */}
          {username && (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={handleResetProfile}
                id="btn-edit-user"
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white border border-batik-gold/40 px-3 py-1.5 rounded-full text-xs font-sans font-bold transition cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="truncate max-w-[80px]">{username}</span>
              </button>
              <button
                onClick={() => setActiveTab('riwayat')}
                id="btn-nav-riwayat"
                className={`p-1.5 rounded-lg transition ${
                  activeTab === 'riwayat' ? 'bg-[#C9A84C]/35 text-white' : 'text-white/80 hover:text-white'
                }`}
                title="Riwayat Skor"
              >
                <History className="w-4 h-4" />
              </button>
            </div>
          )}
        </header>

        {/* Floating background kawung subtle decor */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-10 kawung-subtle mt-16" />

        {/* Main interactive tabs viewport */}
        <main className="flex-grow p-4 sm:p-6 z-10 overflow-y-auto pb-20">
          <AnimatePresence mode="wait">
            {!username ? (
              <Onboarding
                key="onboard"
                onComplete={handleOnboardingComplete}
              />
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'beranda' && (
                  <Beranda
                    username={username}
                    scores={scores}
                    onNavigateTab={setActiveTab}
                    onNavigateMateriIndex={handleNavigateMateriIndex}
                  />
                )}
                {activeTab === 'materi' && (
                  <Materi
                    onNavigateTab={setActiveTab}
                    onSetMateriIndexCallback={(callback) => {
                      setMateriIndexRef.current = callback;
                    }}
                  />
                )}
                {activeTab === 'eksplorasi' && (
                  <Eksplorasi />
                )}
                {activeTab === 'latihan' && (
                  <Latihan
                    onAddScoreRecord={handleAddScoreRecord}
                    onNavigateTab={setActiveTab}
                  />
                )}
                {activeTab === 'riwayat' && (
                  <Riwayat
                    scores={scores}
                    onClearHistory={handleClearHistory}
                  />
                )}
                {activeTab === 'tes-akhir' && (
                  <TesAkhir
                    onAddScoreRecord={handleAddScoreRecord}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Global Bottom Navigation */}
        {username && (
          <Navigation activeTab={activeTab} onChangeTab={setActiveTab} />
        )}


      </div>
    </div>
  );
}

// Inline fallback loader helper
function RefreshCw(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  );
}
