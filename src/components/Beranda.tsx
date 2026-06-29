import { useState } from 'react';
import { motion } from 'motion/react';
import { Award, BookOpen, Layers, Target, Compass, PlayCircle, ShieldCheck, CheckSquare, Trophy, Star, Globe, Download } from 'lucide-react';
import { ScoreRecord, TabType } from '../types';

interface BerandaProps {
  username: string;
  scores: ScoreRecord[];
  onNavigateTab: (tab: TabType) => void;
  onNavigateMateriIndex: (index: number) => void;
}

export default function Beranda({ username, scores, onNavigateTab, onNavigateMateriIndex }: BerandaProps) {
  const [copied, setCopied] = useState(false);
  const [showCodeArea, setShowCodeArea] = useState(false);

  // Latihan Mudah
  const highestLatihanMudah = scores
    .filter(s => s.type === 'latihan' && s.level === 'mudah')
    .reduce((max, curr) => (curr.score > max ? curr.score : max), 0);

  // Latihan Sedang
  const highestLatihanSedang = scores
    .filter(s => s.type === 'latihan' && s.level === 'sedang')
    .reduce((max, curr) => (curr.score > max ? curr.score : max), 0);

  // Latihan Sulit
  const highestLatihanSulit = scores
    .filter(s => s.type === 'latihan' && s.level === 'sulit')
    .reduce((max, curr) => (curr.score > max ? curr.score : max), 0);

  // Tes Akhir (Evaluasi)
  const highestTesAkhir = scores
    .filter(s => s.type === 'tes-akhir')
    .reduce((max, curr) => (curr.score > max ? curr.score : max), 0);

  // Overall highest percent score
  // Latihan Mudah, Sedang, Sulit has 10 questions each, so we multiply by 10 to get percent
  const scoreMudahPercent = highestLatihanMudah * 10;
  const scoreSedangPercent = highestLatihanSedang * 10;
  const scoreSulitPercent = highestLatihanSulit * 10;
  const displayHighScore = Math.max(highestTesAkhir, scoreMudahPercent, scoreSedangPercent, scoreSulitPercent);

  const summaryCards = [
    {
      title: "PLDV & SPLDV",
      desc: "Mengenal bentuk umum aljabar linear dua variabel.",
      badge: "Dasar",
      color: "bg-[#6B3A2A] text-white",
      borderColor: "border-[#6B3A2A]",
      onClick: () => {
        onNavigateTab('materi');
        onNavigateMateriIndex(0); // Materi 1: Pengenalan
      }
    },
    {
      title: "Substitusi & Eliminasi",
      desc: "Metode dasar aljabar penggantian dan peniadaan.",
      badge: "Level 1",
      color: "bg-[#C9A84C] text-[#FAF7EE]",
      borderColor: "border-[#C9A84C]",
      onClick: () => {
        onNavigateTab('materi');
        onNavigateMateriIndex(1); // Materi 2: Substitusi
      }
    },
    {
      title: "Kombinasi & Grafik",
      desc: "Metode lanjutan grafik geometri dan taktik campuran.",
      badge: "Level 2",
      color: "bg-[#5B8A52] text-[#FAF7EE]",
      borderColor: "border-[#5B8A52]",
      onClick: () => {
        onNavigateTab('materi');
        onNavigateMateriIndex(6); // // Materi 4: Kombinasi (index 6)
      }
    },
    {
      title: "Tes & Eksplorasi",
      desc: "Praktik langsung merekayasa persamaan secara grafik.",
      badge: "Uji",
      color: "bg-[#2C4A7C] text-white",
      borderColor: "border-[#2C4A7C]",
      onClick: () => {
        onNavigateTab('eksplorasi');
      }
    }
  ];

  return (
    <div className="space-y-6 pb-24 font-sans text-gray-800">
      {/* Personalized Welcome Card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#6B3A2A] border-l-4 border-[#C9A84C] text-white rounded-3xl p-5 shadow-lg relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8 rounded-full bg-white/5 pointer-events-none" />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
          <div>
            <span className="text-[10px] text-amber-200 uppercase tracking-widest font-bold">Selamat Belajar</span>
            <h2 className="font-serif text-2xl font-bold text-[#C9A84C] mt-0.5">
              Selamat Datang, {username}! 👋
            </h2>
            <p className="text-white/80 text-xs mt-1 font-sans">
              Mari belajar konsep aljabar matematika SPLDV bermotif kebudayaan Batik Yogyakarta.
            </p>
          </div>
          {displayHighScore > 0 ? (
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur border border-white/20 text-white rounded-full font-bold text-xs shadow-sm">
              <Award className="w-4 h-4 text-amber-300" />
              <span>Skor Terbaik: {displayHighScore}/100</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur border border-dashed border-white/10 text-white/75 rounded-full text-[11px]">
              <Award className="w-4 h-4 text-white/55" />
              <span>Belum ada riwayat tes</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Guide to use (Petunjuk Penggunaan Modul) - SEKARANG DI PALING ATAS */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-[#FAF7EE] border border-[#C9A84C]/35 rounded-3xl p-5 shadow-sm font-sans"
      >
        <h4 className="font-serif text-sm font-bold text-[#6B3A2A] mb-2 flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-[#C9A84C]" /> Petunjuk Penggunaan Modul:
        </h4>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 text-xs text-gray-600 space-y-2">
          <p className="font-medium">1. Baca <span className="text-[#6B3A2A] font-bold font-serif">MATERI</span>: pahami konsep PLDV dan SPLDV terlebih dahulu</p>
          <p className="font-medium">2. Lihat <span className="text-[#6B3A2A] font-bold font-serif">CONTOH</span> dalam materi: perhatikan langkah demi langkah perhitungan</p>
          <p className="font-medium">3. Coba <span className="text-[#6B3A2A] font-bold font-serif">EKSPLORASI</span>: manipulasi persamaan dan lihat grafik real-time</p>
          <p className="font-medium">4. Kerjakan <span className="text-[#6B3A2A] font-bold font-serif">LATIHAN</span>: uji pemahaman dengan soal bervariasi 3 tingkat kesulitan</p>
          <p className="font-medium">5. Cek <span className="text-[#6B3A2A] font-bold font-serif">RIWAYAT</span>: lihat progres belajarmu dan evaluasi kompetensi</p>
        </div>
      </motion.div>

      {/* Bagian 1: Pendahuluan (CP, TP, Prasyarat) */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white border-2 border-[#C9A84C]/55 rounded-3xl p-5 space-y-5 shadow-md relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-12 -translate-y-12 rounded-full bg-[#FAF7EE] opacity-60 pointer-events-none" />
        
        <div className="text-center pb-3 border-b border-[#C9A84C]/25">
          <h2 className="font-serif text-lg font-bold text-[#6B3A2A]">
            Modul Pembelajaran SPLDV
          </h2>
          <p className="text-[10px] text-gray-500 uppercase font-semibold mt-0.5 tracking-wider">
            Tema Batik Yogyakarta • Kelas VIII SMP/MTs
          </p>
        </div>

        {/* 3-Column CP, TP, PPP Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
          <div className="p-4 bg-[_FAF7EE]/70 border border-[#C9A84C]/20 rounded-2xl bg-[#FAF7EE]/50">
            <div className="flex items-center gap-2 mb-2 text-[#2C4A7C] font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Capaian (CP)</span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed font-sans">
              &quot;Peserta didik memahami dan dapat menyelesaikan sistem persamaan linear dua variabel melalui berbagai metode.&quot;
            </p>
          </div>

          <div className="p-4 bg-[_FAF7EE]/70 border border-[#C9A84C]/20 rounded-2xl bg-[#FAF7EE]/50">
            <div className="flex items-center gap-2 mb-2 text-[#6B3A2A] font-bold text-xs uppercase tracking-wider">
              <Target className="w-4 h-4" />
              <span>Tujuan (TP)</span>
            </div>
            <ul className="text-xs text-gray-700 space-y-1 pl-1 list-none font-sans">
              <li>• Memahami definisi PLDV &amp; SPLDV.</li>
              <li>• Menyelesaikan dengan berbagai metode aljabar &amp; grafik.</li>
              <li>• Mengaplikasikan dalam konteks batik Yogyakarta.</li>
            </ul>
          </div>

          <div className="p-4 bg-[_FAF7EE]/70 border border-[#C9A84C]/20 rounded-2xl bg-[#FAF7EE]/50">
            <div className="flex items-center gap-2 mb-2 text-[#5B8A52] font-bold text-xs uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Rencana Belajar</span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed font-sans">
              Belajar interaktif melalui simulasi koefisien dinamis grafik koordinat, visualisasi batik, serta evaluasi latihan bertahap.
            </p>
          </div>
        </div>

        {/* Prasyarat Belajar */}
        <div className="pt-2 border-t border-gray-100">
          <h4 className="font-serif text-sm font-bold text-[#6B3A2A] mb-2 flex items-center gap-1.5">
            <CheckSquare className="w-4 h-4 text-[#C9A84C]" /> Prasyarat Belajar Siswa:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Mengenal persamaan linear satu variabel",
              "Memahami operasi aljabar (tambah, kurang, kali, bagi)",
              "Mengenal koordinat Cartesian (sumbu X, Y)",
              "Bisa membaca dan membuat grafik garis lurus"
            ].map((text, index) => (
              <div key={index} className="flex items-center gap-2 bg-[#FAF7EE] p-2 rounded-xl border border-[#C9A84C]/10 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                <span className="text-gray-600 font-sans">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* DASHBOARD SKOR TERTINGGI SISWA (Menggantikan Pola Geometris) */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white border-2 border-[#C9A84C]/50 rounded-3xl p-6 shadow-md relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-24 h-24 transform translate-x-6 -translate-y-6 rounded-full bg-amber-50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 transform -translate-x-6 translate-y-6 rounded-full bg-amber-50 pointer-events-none" />

        <div className="flex items-center gap-2.5 mb-5 border-b border-gray-100 pb-3">
          <div className="p-2 bg-[#FAF7EE] border border-[#C9A84C]/40 rounded-xl">
            <Trophy className="w-5 h-5 text-[#C9A84C] animate-pulse" />
          </div>
          <div>
            <h3 className="font-serif text-md font-bold text-[#6B3A2A]">
              Pencapaian & Skor Tertinggi Kamu
            </h3>
            <p className="text-[10px] text-gray-400 font-sans">
              Rekor nilai terbaik yang berhasil kamu kumpulkan selama mempelajari SPLDV
            </p>
          </div>
        </div>

        {/* Skor Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10">
          {/* Latihan Mudah */}
          <div className="bg-[#FAF7EE]/70 border border-[#C9A84C]/25 p-3 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
            <span className="text-[9px] uppercase tracking-wider font-bold text-gray-400 block mb-1">Latihan Mudah</span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-xl font-extrabold text-[#6B3A2A]">{highestLatihanMudah}</span>
              <span className="text-[10px] text-gray-400">/10</span>
            </div>
            <div className="w-full bg-gray-200 h-1 rounded-full mt-2 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${highestLatihanMudah * 10}%` }} />
            </div>
            <span className="text-[8px] font-bold text-gray-400 mt-1 uppercase">
              {highestLatihanMudah === 10 ? 'Sempurna! 🌟' : highestLatihanMudah >= 7 ? 'Sangat Baik' : highestLatihanMudah > 0 ? 'Hebat' : 'Belum Coba'}
            </span>
          </div>

          {/* Latihan Sedang */}
          <div className="bg-[#FAF7EE]/70 border border-[#C9A84C]/25 p-3 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
            <span className="text-[9px] uppercase tracking-wider font-bold text-gray-400 block mb-1">Latihan Sedang</span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-xl font-extrabold text-[#6B3A2A]">{highestLatihanSedang}</span>
              <span className="text-[10px] text-gray-400">/10</span>
            </div>
            <div className="w-full bg-gray-200 h-1 rounded-full mt-2 overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: `${highestLatihanSedang * 10}%` }} />
            </div>
            <span className="text-[8px] font-bold text-gray-400 mt-1 uppercase">
              {highestLatihanSedang === 10 ? 'Sempurna! 🌟' : highestLatihanSedang >= 7 ? 'Sangat Baik' : highestLatihanSedang > 0 ? 'Hebat' : 'Belum Coba'}
            </span>
          </div>

          {/* Latihan Sulit */}
          <div className="bg-[#FAF7EE]/70 border border-[#C9A84C]/25 p-3 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
            <span className="text-[9px] uppercase tracking-wider font-bold text-gray-400 block mb-1">Latihan Sulit</span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-xl font-extrabold text-[#6B3A2A]">{highestLatihanSulit}</span>
              <span className="text-[10px] text-gray-400">/10</span>
            </div>
            <div className="w-full bg-gray-200 h-1 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#6B3A2A] h-full rounded-full" style={{ width: `${highestLatihanSulit * 10}%` }} />
            </div>
            <span className="text-[8px] font-bold text-gray-400 mt-1 uppercase">
              {highestLatihanSulit === 10 ? 'Sempurna! 🌟' : highestLatihanSulit >= 7 ? 'Sangat Baik' : highestLatihanSulit > 0 ? 'Hebat' : 'Belum Coba'}
            </span>
          </div>

          {/* Evaluasi Akhir */}
          <div className="bg-[#6B3A2A]/5 border-2 border-[#C9A84C] p-3 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
            <span className="text-[9px] uppercase tracking-wider font-bold text-[#6B3A2A] block mb-1">Evaluasi Akhir</span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-xl font-black text-[#6B3A2A]">{highestTesAkhir}</span>
              <span className="text-[10px] text-gray-400 font-sans">/100</span>
            </div>
            <div className="w-full bg-gray-200 h-1 rounded-full mt-2 overflow-hidden font-sans">
              <div className="bg-[#C9A84C] h-full rounded-full" style={{ width: `${highestTesAkhir}%` }} />
            </div>
            <span className="text-[8px] font-bold text-[#6B3A2A] mt-1 uppercase">
              {highestTesAkhir >= 80 ? 'LULUS 🎯' : highestTesAkhir >= 50 ? 'Cukup Baik' : highestTesAkhir > 0 ? 'Belajar Lagi' : 'Belum Mulai'}
            </span>
          </div>
        </div>

        {/* Motivating note or progress circle display */}
        <div className="mt-4 p-3 bg-[#FAF7EE] border border-[#C9A84C]/25 rounded-2xl flex items-center justify-between gap-3 text-xs font-sans">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse flex-shrink-0" />
            <span className="text-gray-600 leading-relaxed">
              {displayHighScore >= 80 
                ? "Hebat sekali! Kamu siap menyebarkan ilmu SPLDV ini kepada teman yang lain." 
                : displayHighScore >= 50 
                ? "Kerja bagus! Terus asah kemampuanmu di latihan tersisa untuk menggapai nilai sempurna."
                : "Ayo jelajahi materi dan raih skor tertinggimu hari ini!"}
            </span>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="font-bold text-[#6B3A2A] block text-sm font-mono">{displayHighScore}%</span>
            <span className="text-[9px] text-gray-400 block uppercase font-bold">Skor Puncak</span>
          </div>
        </div>
      </motion.div>

      {/* 4 Clickable Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {summaryCards.map((card, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={card.onClick}
            className={`cursor-pointer bg-white border border-gray-200 rounded-3xl p-4 shadow-sm flex items-start gap-3 transition-colors border-l-4 ${card.borderColor}`}
          >
            <div className={`p-2.5 rounded-xl flex-shrink-0 ${card.color}`}>
              {idx === 0 ? <Compass className="w-4 h-4" /> : idx === 1 ? <Layers className="w-4 h-4" /> : idx === 2 ? <Target className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
            </div>
            <div className="flex-1 min-w-0 font-sans">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-serif text-sm font-bold text-gray-800 truncate">
                  {card.title}
                </h4>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${card.color} uppercase tracking-wider`}>
                  {card.badge}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1 leading-normal line-clamp-2">
                {card.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mulai Belajar Button */}
      <div className="flex justify-center py-2 relative z-10">
        <button
          onClick={() => {
            onNavigateTab('materi');
            onNavigateMateriIndex(0);
          }}
          className="w-full max-w-sm py-3.5 bg-[#6B3A2A] hover:bg-[#522c1f] text-white font-bold rounded-2xl transition duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm font-serif"
        >
          <BookOpen className="w-4 h-4 text-amber-300" /> Mulai Belajar Materi →
        </button>
      </div>
    </div>
  );
}
