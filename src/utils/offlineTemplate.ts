import { MUDAH_QUESTIONS, SEDANG_QUESTIONS, SULIT_QUESTIONS, TES_AKHIR_QUESTIONS } from '../data/questions';

export function generateOfflineHTML(username: string): string {
  // Serialize question datasets directly from questions.ts
  const mudahQsJSON = JSON.stringify(MUDAH_QUESTIONS);
  const sedangQsJSON = JSON.stringify(SEDANG_QUESTIONS);
  const sulitQsJSON = JSON.stringify(SULIT_QUESTIONS);
  const tesAkhirQsJSON = JSON.stringify(TES_AKHIR_QUESTIONS);

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modul SPLDV Interaktif - Luring Portabel</title>
  <!-- Tailwind CSS Play CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            serif: ['Playfair Display', 'serif'],
            mono: ['JetBrains Mono', 'monospace'],
          },
          colors: {
            batik: {
              brown: '#6B3A2A',
              gold: '#C9A84C',
              dark: '#1C1613',
              sand: '#FAF7EE',
              surface: '#FFFDFC',
              blue: '#2C4A7C',
              green: '#5B8A52'
            },
          }
        }
      }
    }
  </script>
  <style>
    body {
      background-color: #FAF7EE;
    }
    @media (min-width: 768px) {
      body {
        background-image: radial-gradient(#C9A84C 18%, transparent 19%), radial-gradient(#6B3A2A 18%, transparent 19%);
        background-size: 28px 28px;
        background-position: 0 0, 14px 14px;
      }
    }
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #FAF7EE;
    }
    ::-webkit-scrollbar-thumb {
      background: #C9A84C;
      border-radius: 3px;
    }
    .kawung-subtle {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0 C15 0 15 25 30 25 C45 25 45 0 30 0 Z M30 60 C15 60 15 35 30 35 C45 35 45 60 30 60 Z M0 30 C0 15 25 15 25 30 C25 45 0 45 0 30 Z M60 30 C60 15 35 15 35 30 C35 45 60 45 60 30 Z' fill='%23C9A84C' fill-opacity='0.12'/%3E%3C/svg%3E");
    }
  </style>
</head>
<body class="font-sans text-gray-800 antialiased min-h-screen flex flex-col justify-center items-center py-4 md:py-8 px-2 sm:px-4">

  <!-- FLOATING DOWNLOAD BANNER FOR ONLINE PREVIEW ONLY -->
  <div id="online-download-banner" class="w-full max-w-[768px] bg-gradient-to-r from-[#6B3A2A] to-[#8C4A36] text-white p-4 mb-4 rounded-3xl border-2 border-[#C9A84C]/50 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 font-sans z-50 text-xs" style="display: none;">
    <div class="flex items-center gap-3">
      <span class="text-2xl animate-bounce">📥</span>
      <div class="text-left">
        <p class="font-bold text-amber-200 text-sm">Download File Modul Luring (.html) Sekarang!</p>
        <p class="text-[10px] text-white/95 leading-normal">Klik tombol hijau di sebelah kanan untuk mengunduh modul ini agar bisa disimpan & dibuka di HP/Laptop siswa tanpa butuh internet sama sekali.</p>
      </div>
    </div>
    <button onclick="downloadSelfHTML()" class="w-full sm:w-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-black rounded-2xl transition duration-150 shadow-md flex items-center justify-center gap-1.5 cursor-pointer text-xs uppercase tracking-wider shrink-0">
      🟢 KLIK UNTUK UNDUH
    </button>
  </div>

  <!-- ==================== MAIN DEVICE WRAPPER ==================== -->
  <div class="w-full max-w-[768px] h-full md:h-[840px] md:max-h-[95vh] bg-white shadow-2xl flex flex-col relative overflow-hidden md:rounded-3xl md:border-2 border-[#FAF7EE] min-h-[90vh]">
    
    <!-- HEADER BRANDING -->
    <header class="bg-[#6B3A2A] border-b-4 border-[#C9A84C] text-white p-4 sticky top-0 z-30 rounded-b-[28px] shadow-md flex items-center justify-between flex-shrink-0">
      <div class="flex items-center gap-2">
        <!-- SVG Kawung -->
        <svg class="w-7 h-7 text-amber-300 flex-shrink-0 animate-pulse" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="12" class="text-white" />
          <path d="M 50 20 C 35 20 35 45 50 45 C 65 45 65 20 50 20 Z" />
          <path d="M 50 80 C 35 80 35 55 50 55 C 65 55 65 80 50 80 Z" />
          <path d="M 20 50 C 20 35 45 35 45 50 C 45 65 20 65 20 50 Z" />
          <path d="M 80 50 C 80 35 55 35 55 50 C 55 65 80 65 80 50 Z" />
        </svg>
        <div>
          <h1 class="font-serif text-xs min-[400px]:text-sm font-black tracking-wider leading-none text-amber-300 uppercase">
            Modul SPLDV Interaktif
          </h1>
          <span class="text-[9px] min-[400px]:text-[10px] text-white/85 tracking-tight font-sans leading-none block mt-0.5">
            Pembelajaran Matematika Luring
          </span>
        </div>
      </div>

      <div class="flex items-center gap-1.5">
        <!-- Profile reset button -->
        <button onclick="handleResetProfile()" class="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white border border-amber-300/40 px-2.5 py-1 rounded-full text-[11px] font-bold transition">
          <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
          <span id="header-user-display" class="truncate max-w-[80px]">Siswa</span>
        </button>
        <!-- Open History Button -->
        <button onclick="switchTab('riwayat')" class="p-1.5 rounded-lg text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10" title="Riwayat Skor">
          🕒
        </button>
      </div>
    </header>

    <!-- Sub header warning banner -->
    <div class="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-amber-900 text-[11px] flex items-center justify-between">
      <span class="font-medium flex items-center gap-1">
        📍 Berkas Luring: Tanpa butuh kuota internet sama sekali!
      </span>
      <span class="px-1.5 py-0.5 bg-amber-600 text-white font-bold rounded text-[8px] uppercase tracking-wide">Offline v2</span>
    </div>

    <!-- MAIN COVUNG FLOATING BACKDROP -->
    <div class="absolute inset-x-0 top-16 bottom-16 z-0 pointer-events-none opacity-10 kawung-subtle" />

    <!-- VIEWPORT WRAPPER -->
    <main class="flex-grow p-4 sm:p-5 z-10 overflow-y-auto pb-20 relative">

      <!-- ==================== ONBOARDING SCREEN (OVERLAY) ==================== -->
      <div id="onboarding-overlay" class="absolute inset-0 bg-[#FAF7EE] z-50 flex items-center justify-center p-4">
        <!-- Onboard Name Step -->
        <div id="onboard-step-name" class="w-full max-w-md p-6 bg-white border-2 border-amber-400 rounded-3xl shadow-xl text-center relative overflow-hidden">
          <div class="flex flex-col items-center mb-5 mt-2">
            <div class="relative mb-3">
              <div class="absolute -inset-1.5 rounded-full bg-amber-400 blur opacity-45 animate-pulse" />
              <div class="relative bg-[#6B3A2A] border-2 border-[#C9A84C] w-14 h-14 rounded-full text-white shadow-md flex items-center justify-center text-2xl">
                🏆
              </div>
            </div>
            <div class="bg-[#6B3A2A]/5 border border-[#C9A84C]/35 rounded-2xl px-4 py-1.5 flex items-center gap-2">
              <span class="text-sm font-semibold text-amber-600">🎖️</span>
              <div class="text-left">
                <span class="text-[9px] uppercase tracking-widest font-bold text-gray-400 block">Skor Tertinggi Siswa</span>
                <span id="onboard-high-score" class="text-xs font-black text-[#6B3A2A] font-mono">0 / 100</span>
              </div>
            </div>
          </div>
          <h1 class="font-serif text-2xl font-black text-[#6B3A2A] mb-3 leading-tight">Selamat Datang!</h1>
          <p class="text-xs text-gray-500 mb-5 leading-normal">Gabungkan keindahan seni tradisi Batik Yogyakarta dengan rahasia penyelesaian Aljabar linear dua variabel.</p>
          
          <div class="p-4 bg-amber-50/60 border border-amber-400/30 rounded-2xl text-left space-y-2.5">
            <label class="block text-xs font-bold text-[#6B3A2A] uppercase tracking-wider">Siapa nama belajarmu?</label>
            <input type="text" id="onboard-name-input" placeholder="Tuliskan panggilan / namamu..." class="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C] text-sm text-gray-800">
            <p id="onboard-error" class="text-rose-600 font-semibold text-[11px] hidden">⚠️ Tuliskan namamu terlebih dahulu!</p>
          </div>
          <button onclick="submitOnboardingName()" class="w-full mt-4 py-3 bg-[#6B3A2A] hover:bg-[#522b1f] text-white font-bold rounded-2xl transition shadow-md flex items-center justify-center gap-1 text-xs uppercase tracking-wider">
            Lanjut Belajar &rarr;
          </button>
        </div>

        <!-- Onboard Tutorial Step -->
        <div id="onboard-step-tutorial" class="w-full max-w-md p-6 bg-white border-2 border-amber-400 rounded-3xl shadow-xl flex flex-col items-center text-center relative overflow-hidden hidden">
          <!-- Slide indicators -->
          <div class="flex gap-1.5 mb-5" id="tutorial-dots">
            <div class="h-2 w-7 rounded-full bg-[#C9A84C]"></div>
            <div class="h-2 w-2 rounded-full bg-gray-200"></div>
            <div class="h-2 w-2 rounded-full bg-gray-200"></div>
          </div>
          <div class="p-4 bg-amber-50/60 rounded-full mb-3 border border-amber-400/20 text-3xl" id="tutorial-icon">
            📖
          </div>
          <h2 class="font-serif text-lg font-bold text-[#6B3A2A] mb-2" id="tutorial-title">Baca Materi Suku-Suku</h2>
          <div class="px-2 py-3 bg-amber-50/40 rounded-xl border-l-4 border-amber-400 w-full mb-5 text-center">
            <p class="text-xs text-gray-600 leading-relaxed font-medium" id="tutorial-text">Pelajari konsep SPLDV yang diintegrasikan dengan keindahan bermotif Batik Yogyakarta.</p>
          </div>
          <button onclick="nextTutorialSlide()" id="tutorial-btn" class="w-full py-3 bg-[#6B3A2A] text-white font-bold rounded-2xl hover:bg-[#522c1f] transition text-xs uppercase tracking-wider">
            Berikutnya →
          </button>
        </div>
      </div>

      <!-- ==================== VIEW 1: BERANDA ==================== -->
      <section id="view-beranda" class="view-item space-y-4">
        <!-- Welcome banner -->
        <div class="p-5 bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-2xl border border-amber-400/35 relative overflow-hidden">
          <div class="relative z-10">
            <h2 class="font-serif text-xl sm:text-2xl font-black text-[#6B3A2A]" id="welcome-username">Selamat Datang, Pelajar!</h2>
            <p class="text-xs text-gray-600 mt-1 max-w-md leading-relaxed">
              Mulai kuasai materi <strong>SPLDV bermotif Batik khas Yogyakarta</strong>. Kamu bisa mempelajari modul, menguji di bidang grafik live, serta menuntaskan latihan.
            </p>
          </div>
          <span class="absolute -right-8 -bottom-8 text-5xl opacity-15">⚜️</span>
        </div>

        <!-- Petunjuk Penggunaan Modul - SEKARANG DI PALING ATAS -->
        <div class="bg-amber-50/40 border border-amber-300/35 rounded-2xl p-4 shadow-xs font-sans">
          <h4 class="font-serif text-xs font-bold text-[#6B3A2A] mb-1.5 flex items-center gap-1">
            🧭 Petunjuk Penggunaan Modul:
          </h4>
          <div class="bg-white p-3 rounded-xl border border-gray-150 text-[11px] text-gray-600 space-y-1.5">
            <p class="font-medium">1. Baca <span class="text-[#6B3A2A] font-bold">MATERI</span>: pahami konsep PLDV dan SPLDV terlebih dahulu</p>
            <p class="font-medium">2. Lihat <span class="text-[#6B3A2A] font-bold">CONTOH</span> dalam materi: perhatikan langkah demi langkah perhitungan</p>
            <p class="font-medium">3. Coba <span class="text-[#6B3A2A] font-bold">EKSPLORASI</span>: manipulasi persamaan dan lihat grafik real-time</p>
            <p class="font-medium">4. Kerjakan <span class="text-[#6B3A2A] font-bold">LATIHAN</span>: uji pemahaman dengan soal bervariasi 3 tingkat kesulitan</p>
            <p class="font-medium">5. Cek <span class="text-[#6B3A2A] font-bold">RIWAYAT</span>: lihat progres belajarmu dan evaluasi kompetensi</p>
          </div>
        </div>

        <!-- Quick Access Materi Indeks -->
        <div class="bg-white border border-gray-150 rounded-2xl p-4 shadow-sm space-y-3">
          <h3 class="font-serif text-sm font-black text-[#6B3A2A] border-b pb-1">📚 Daftar Bab Pembelajaran (Materi)</h3>
          <div class="grid grid-cols-2 gap-2" id="materi-quick-links">
            <!-- Dynamic inject quick links -->
          </div>
        </div>

        <!-- Mode selection Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Latihan Card -->
          <div class="bg-white border rounded-2xl p-4 shadow-sm flex flex-col justify-between gap-3 border-l-4 border-[#5B8A52]">
            <div>
              <span class="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded uppercase">Uji Pemahaman</span>
              <h3 class="font-serif text-sm font-black text-[#6B3A2A] mt-1.5">Gladhen Luring (Latihan)</h3>
              <p class="text-[10px] text-gray-500 mt-0.5">Tes kecakapan dengan 3 level kesulitan latihan dan timer pengerjaan.</p>
            </div>
            <button onclick="switchTab('latihan')" class="w-full py-2 bg-[#5B8A52] text-white text-xs font-bold rounded-xl hover:opacity-90 transition">
              Mulai Latihan →
            </button>
          </div>

          <!-- Tes Akhir Card -->
          <div class="bg-white border rounded-2xl p-4 shadow-sm flex flex-col justify-between gap-3 border-l-4 border-[#C9A84C]">
            <div>
              <span class="text-[9px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded uppercase">Evaluasi</span>
              <h3 class="font-serif text-sm font-black text-[#6B3A2A] mt-1.5">Pendadaran Akhir (Tes Akhir)</h3>
              <p class="text-[10px] text-gray-500 mt-0.5">Selesaikan kuis 10 soal evaluasi berdurasi 45 menit demi mencatatkan medali.</p>
            </div>
            <button onclick="startFinalExam()" class="w-full py-2 bg-[#C9A84C] text-white text-xs font-bold rounded-xl hover:opacity-90 transition">
              Mulai Evaluasi Akhir →
            </button>
          </div>
        </div>
      </section>

      <!-- ==================== VIEW 2: MATERI ==================== -->
      <section id="view-materi" class="view-item hidden space-y-4">
        <div class="bg-gray-50 border border-amber-300/30 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-xs">
          <span class="text-xs font-bold text-[#6B3A2A] font-serif">Pilih Bab Belajar:</span>
          <select id="materi-dropdown" onchange="renderActiveChapter()" class="w-full sm:w-auto bg-white border border-gray-300 px-3 py-1.5 rounded-lg text-xs font-medium focus:ring-1 focus:ring-[#C9A84C] outline-none">
            <!-- Populated via script -->
          </select>
        </div>

        <article class="bg-white border rounded-2xl overflow-hidden shadow-xs">
          <div class="border-b px-5 py-3.5 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between">
            <span id="materi-badge" class="px-2 py-0.5 rounded text-[10px] font-bold uppercase"></span>
            <span id="materi-count" class="text-[10px] text-gray-500 font-mono">Bab 1 / 10</span>
          </div>
          <div class="p-5 md:p-6 space-y-3">
            <h3 id="materi-title" class="font-serif text-lg font-black text-[#6B3A2A]"></h3>
            <p id="materi-context" class="text-xs text-gray-500 italic pl-3 border-l-4 border-amber-400 leading-relaxed"></p>
            <div id="materi-body" class="space-y-4 pt-2 text-xs text-gray-700 leading-relaxed font-sans">
              <!-- Chapter content HTML holds visual formulas and SVGs -->
            </div>
          </div>
        </article>

        <!-- Chapter Navigators -->
        <div class="flex items-center justify-between gap-4">
          <button onclick="prevChapter()" id="btn-prev-chap" class="flex-1 py-2 bg-white border rounded-xl text-xs font-bold text-[#6B3A2A] hover:bg-gray-50 disabled:opacity-40">&larr; Sebelum</button>
          <span id="materi-indicator" class="text-xs font-mono font-bold text-[#6B3A2A]">1/10</span>
          <button onclick="nextChapter()" id="btn-next-chap" class="flex-1 py-2 bg-[#C9A84C] text-white rounded-xl text-xs font-bold disabled:opacity-40">Lanjut &rarr;</button>
        </div>
      </section>

      <!-- ==================== VIEW 3: EKSPLORASI ==================== -->
      <section id="view-eksplorasi" class="view-item hidden space-y-4">
        <div class="bg-white rounded-2xl p-4 border shadow-sm space-y-3">
          <div class="flex justify-between items-center border-b pb-2">
            <div>
              <h2 class="font-serif text-base font-bold text-[#6B3A2A]">Simulator Koordinat Grafik</h2>
              <p class="text-[10px] text-gray-500">Ubah nilai koefisien untuk mengamati pergeseran solusi live.</p>
            </div>
            <button onclick="resetSandbox()" class="text-[11px] font-bold text-[#6B3A2A] hover:underline flex items-center gap-1">🔄 Reset</button>
          </div>

          <div class="flex flex-col items-center">
            <div class="bg-gray-50 border p-2 rounded-2xl relative flex flex-col items-center shadow-inner">
              <svg id="cartesian-svg" class="w-[280px] sm:w-[320px] aspect-square bg-[#FAF7EE] rounded-xl border border-gray-200" viewBox="0 0 300 300" onmousemove="mouseMoveGrid(event)" onmouseleave="mouseLeaveGrid()">
                <!-- Grid Lines -->
                <g id="svg-grid-lines" stroke="#eadecc" stroke-width="0.5"></g>
                <line x1="0" y1="150" x2="300" y2="150" stroke="#8c6c4c" stroke-width="1.5" />
                <line x1="150" y1="0" x2="150" y2="300" stroke="#8c6c4c" stroke-width="1.5" />
                <text x="288" y="162" font-size="9" font-family="monospace" fill="#8c6c4c" font-weight="bold">X</text>
                <text x="156" y="12" font-size="9" font-family="monospace" fill="#8c6c4c" font-weight="bold">Y</text>
                <line id="svg-line1" x1="0" y1="0" x2="0" y2="0" stroke="#2C4A7C" stroke-width="2.5" />
                <line id="svg-line2" x1="0" y1="0" x2="0" y2="0" stroke="#6B3A2A" stroke-width="2.5" />
                <circle id="svg-sol-dot" cx="0" cy="0" r="5" fill="#C9A84C" stroke="#fff" stroke-width="1.5" class="hidden" />
              </svg>
              <div id="grid-coord-bubble" class="absolute top-3 right-3 bg-gray-800/80 text-white rounded px-1.5 py-0.5 font-mono text-[9px] hidden">x: 0, y: 0</div>
            </div>
            <div id="graph-coordinate-status" class="text-xs font-bold text-gray-700 mt-2 text-center"></div>
          </div>

          <!-- Sandbox controllers -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <!-- Line 1 -->
            <div class="p-3 bg-blue-50/50 rounded-xl border border-blue-100 space-y-2">
              <span class="text-[10px] font-bold text-blue-700 flex justify-between items-center">
                <span>Garis Biru (Garis 1)</span>
                <span id="live-eq1-disp" class="font-mono bg-white px-2 py-0.5 rounded border border-blue-200"></span>
              </span>
              <div class="grid grid-cols-3 gap-1.5 text-center">
                <div>
                  <label class="text-[9px] font-bold text-gray-400 block">a₁ (x)</label>
                  <div class="flex justify-center gap-1 items-center">
                    <button onclick="adjCoeff('a1', -1)" class="w-4 h-4 bg-white border rounded text-[10px]">-</button>
                    <span id="disp-a1" class="font-mono text-xs font-bold w-3">2</span>
                    <button onclick="adjCoeff('a1', 1)" class="w-4 h-4 bg-white border rounded text-[10px]">+</button>
                  </div>
                </div>
                <div>
                  <label class="text-[9px] font-bold text-gray-400 block">b₁ (y)</label>
                  <div class="flex justify-center gap-1 items-center">
                    <button onclick="adjCoeff('b1', -1)" class="w-4 h-4 bg-white border rounded text-[10px]">-</button>
                    <span id="disp-b1" class="font-mono text-xs font-bold w-3">1</span>
                    <button onclick="adjCoeff('b1', 1)" class="w-4 h-4 bg-white border rounded text-[10px]">+</button>
                  </div>
                </div>
                <div>
                  <label class="text-[9px] font-bold text-gray-400 block">c₁ (Const)</label>
                  <div class="flex justify-center gap-1 items-center">
                    <button onclick="adjCoeff('c1', -1)" class="w-4 h-4 bg-white border rounded text-[10px]">-</button>
                    <span id="disp-c1" class="font-mono text-xs font-bold w-3">8</span>
                    <button onclick="adjCoeff('c1', 1)" class="w-4 h-4 bg-white border rounded text-[10px]">+</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Line 2 -->
            <div class="p-3 bg-amber-50/50 rounded-xl border border-amber-100 space-y-2">
              <span class="text-[10px] font-bold text-amber-800 flex justify-between items-center">
                <span>Garis Cokelat (Garis 2)</span>
                <span id="live-eq2-disp" class="font-mono bg-white px-2 py-0.5 rounded border border-amber-200"></span>
              </span>
              <div class="grid grid-cols-3 gap-1.5 text-center">
                <div>
                  <label class="text-[9px] font-bold text-gray-400 block">a₂ (x)</label>
                  <div class="flex justify-center gap-1 items-center">
                    <button onclick="adjCoeff('a2', -1)" class="w-4 h-4 bg-white border rounded text-[10px]">-</button>
                    <span id="disp-a2" class="font-mono text-xs font-bold w-3">1</span>
                    <button onclick="adjCoeff('a2', 1)" class="w-4 h-4 bg-white border rounded text-[10px]">+</button>
                  </div>
                </div>
                <div>
                  <label class="text-[9px] font-bold text-gray-400 block">b₂ (y)</label>
                  <div class="flex justify-center gap-1 items-center">
                    <button onclick="adjCoeff('b2', -1)" class="w-4 h-4 bg-white border rounded text-[10px]">-</button>
                    <span id="disp-b2" class="font-mono text-xs font-bold w-3">3</span>
                    <button onclick="adjCoeff('b2', 1)" class="w-4 h-4 bg-white border rounded text-[10px]">+</button>
                  </div>
                </div>
                <div>
                  <label class="text-[9px] font-bold text-gray-400 block">c₂ (Const)</label>
                  <div class="flex justify-center gap-1 items-center">
                    <button onclick="adjCoeff('c2', -1)" class="w-4 h-4 bg-white border rounded text-[10px]">-</button>
                    <span id="disp-c2" class="font-mono text-xs font-bold w-3">9</span>
                    <button onclick="adjCoeff('c2', 1)" class="w-4 h-4 bg-white border rounded text-[10px]">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Walkthrough Step Methods selector -->
          <div class="bg-gray-50 border rounded-2xl p-3.5 space-y-3">
            <h3 class="text-xs font-bold text-[#6B3A2A]">Langkah Pembahasan Aljabar:</h3>
            <div class="flex gap-1 bg-white p-1 rounded-lg border text-center">
              <button onclick="switchMathMethod('grafik')" id="method-tab-grafik" class="flex-1 py-1 text-[11px] font-bold rounded bg-[#6B3A2A] text-white transition">Grafik</button>
              <button onclick="switchMathMethod('eliminasi')" id="method-tab-eliminasi" class="flex-1 py-1 text-[11px] font-bold rounded text-gray-500 transition">Eliminasi</button>
              <button onclick="switchMathMethod('substitusi')" id="method-tab-substitusi" class="flex-1 py-1 text-[11px] font-bold rounded text-gray-500 transition">Substitusi</button>
              <button onclick="switchMathMethod('kombinasi')" id="method-tab-kombinasi" class="flex-1 py-1 text-[11px] font-bold rounded text-gray-500 transition">Campuran</button>
            </div>
            <div id="sandbox-calculation-box" class="p-3 bg-amber-50/30 rounded-xl border font-mono text-[11px] text-gray-700 leading-normal space-y-2">
              <!-- Generated automatically -->
            </div>
          </div>
        </div>
      </section>

      <!-- ==================== VIEW 4: LATIHAN ==================== -->
      <section id="view-latihan" class="view-item hidden space-y-4">
        <!-- Level Picker Screen -->
        <div id="latihan-level-selector" class="space-y-4">
          <div class="p-5 bg-[#6B3A2A]/5 border-2 border-dashed border-[#C9A84C]/50 rounded-2xl text-center space-y-2">
            <h3 class="font-serif text-base font-bold text-[#6B3A2A]">Pilih Level Gladhen (Kuis Latihan)</h3>
            <p class="text-xs text-gray-500 max-w-sm mx-auto">Terdapat 10 butir soal variatif per tingkatan dengan pengerjaan berbatas waktu.</p>
          </div>
          <div class="grid grid-cols-1 gap-2.5">
            <button onclick="startLatihanQuiz('mudah')" class="p-3 bg-[#5B8A52]/10 border border-[#5B8A52]/40 rounded-xl hover:bg-[#5B8A52]/20 text-left transition flex items-center justify-between">
              <div>
                <span class="text-xs font-bold text-emerald-800">[1] Level Mudah</span>
                <p class="text-[10px] text-gray-500 mt-0.5">Waktu: 120 Detik/Soal • Sifat: Teori Dasar Aljabar</p>
              </div>
              <span class="text-base">🟢</span>
            </button>
            <button onclick="startLatihanQuiz('sedang')" class="p-3 bg-amber-500/10 border border-amber-500/40 rounded-xl hover:bg-amber-500/20 text-left transition flex items-center justify-between">
              <div>
                <span class="text-xs font-bold text-amber-800">[2] Level Sedang</span>
                <p class="text-[10px] text-gray-500 mt-0.5">Waktu: 90 Detik/Soal • Sifat: Soal Cerita Batik Jogja</p>
              </div>
              <span class="text-base">🟡</span>
            </button>
            <button onclick="startLatihanQuiz('sulit')" class="p-3 bg-rose-500/10 border border-rose-500/40 rounded-xl hover:bg-rose-500/20 text-left transition flex items-center justify-between">
              <div>
                <span class="text-xs font-bold text-rose-800">[3] Level Sulit</span>
                <p class="text-[10px] text-gray-500 mt-0.5">Waktu: 60 Detik/Soal • Sifat: Sistem Persamaan Kompleks</p>
              </div>
              <span class="text-base">🔴</span>
            </button>
          </div>
        </div>

        <!-- Quiz Gameplay Card -->
        <div id="latihan-gameplay" class="space-y-3 hidden">
          <div class="bg-white border rounded-2xl p-4 shadow-xs flex justify-between items-center">
            <span class="text-xs font-bold text-[#6B3A2A]" id="lat-progress-text">Soal 1 / 10</span>
            <span id="lat-timer" class="px-2.5 py-1 bg-amber-100 text-amber-800 font-mono text-xs font-bold rounded-lg flex items-center gap-1">⏰ 120s</span>
          </div>

          <div class="bg-white rounded-2xl p-5 border shadow-sm space-y-4">
            <div class="flex justify-between border-b pb-2 items-center">
              <span id="lat-badge-context" class="px-2 py-0.5 bg-gray-100 text-[#6B3A2A] rounded font-bold text-[9px] uppercase tracking-wide">Konteks</span>
              <span class="text-[9px] uppercase font-mono text-amber-600">Gladhen Latihan</span>
            </div>

            <h3 id="lat-question-text" class="text-xs sm:text-sm font-semibold text-gray-800 leading-relaxed pt-1"></h3>

            <!-- Dynamic Equations help box -->
            <div id="lat-eq-box" class="p-3 bg-gray-50 border rounded-xl font-mono text-[11px] text-center text-[#6B3A2A] hidden">
            </div>

            <!-- Options (For PG) -->
            <div id="lat-pg-options" class="grid grid-cols-1 gap-2"></div>

            <!-- Inputs (For Isian) -->
            <div id="lat-isian-box" class="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-3 hidden">
              <p class="text-[11px] text-gray-500">Tentukan nilai bulat dari penyelesaian SPLDV di atas:</p>
              <div class="grid grid-cols-2 gap-3">
                <div class="space-y-1">
                  <span class="text-[10px] font-bold text-[#6B3A2A]">Nilai x / variabel 1=</span>
                  <input type="number" id="lat-input-x" class="w-full px-2.5 py-1.5 bg-white border rounded-lg text-xs" placeholder="Misal: 5">
                </div>
                <div class="space-y-1">
                  <span class="text-[10px] font-bold text-[#6B3A2A]">Nilai y / variabel 2=</span>
                  <input type="number" id="lat-input-y" class="w-full px-2.5 py-1.5 bg-white border rounded-lg text-xs" placeholder="Misal: 3">
                </div>
              </div>
              <button onclick="submitLatihanIsianAnswer()" class="w-full py-2 bg-[#6B3A2A] text-white font-bold text-xs rounded-lg hover:bg-opacity-95 transition">Periksa Jawaban</button>
            </div>

            <!-- Feedback step walkthrough calculations -->
            <div id="lat-feedback-box" class="p-4 rounded-xl border text-[11px] leading-relaxed space-y-1 hidden"></div>

            <!-- Next button controllers -->
            <button id="lat-btn-next" onclick="nextLatihanQuestion()" class="w-full py-2.5 bg-[#6B3A2A] text-white font-bold text-xs rounded-xl hover:bg-opacity-90 hidden transition flex items-center justify-center gap-1">
              <span>Pertanyaan Berikutnya</span> &rarr;
            </button>
          </div>
        </div>

        <!-- Quiz finished results -->
        <div id="latihan-result" class="bg-white rounded-3xl p-6 border shadow-lg text-center space-y-5 hidden">
          <div class="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold mx-auto text-2xl">🎉</div>
          <div>
            <h3 class="font-serif text-lg font-bold text-[#6B3A2A]">Gladhen Selesai!</h3>
            <p class="text-xs text-gray-500 mt-1">Skor yang Anda capai pada tingkat kesulitan ini:</p>
          </div>
          <div class="p-4 bg-amber-50 border border-[#C9A84C]/40 rounded-2xl max-w-xs mx-auto">
            <span class="text-3xl font-mono font-black text-[#6B3A2A]" id="lat-fin-score">0</span>
            <span class="text-[10px] text-gray-400 block tracking-wider mt-1 uppercase">Skor Tersimpan</span>
          </div>
          <button onclick="resetLatihanSelector()" class="px-5 py-2 bg-[#6B3A2A] text-white text-xs font-bold rounded-xl hover:bg-opacity-90 transition">Selesai &amp; Kembali</button>
        </div>
      </section>

      <!-- ==================== VIEW 5: EVALUASI (TES AKHIR) ==================== -->
      <section id="view-tes-akhir" class="view-item hidden space-y-4">
        <!-- Start screen -->
        <div id="tes-start-panel" class="bg-white rounded-3xl p-5 border shadow-sm text-center space-y-4">
          <div class="w-16 h-16 bg-[#6B3A2A]/5 border border-[#C9A84C] rounded-full flex items-center justify-center mx-auto text-3xl">📝</div>
          <div class="space-y-1">
            <h2 class="font-serif text-lg font-black text-[#6B3A2A]">Pendadaran Pungkasan (Tes Akhir Modul)</h2>
            <p class="text-xs text-gray-500 max-w-sm mx-auto">Evaluasi menyeluruh mencakup 10 butir soal matematika terintegrasi. Anda dilarang membuka catatan atau menu lain saat tes berlangsung.</p>
          </div>
          <div class="bg-amber-50/50 border rounded-xl p-3 max-w-sm mx-auto text-left text-[11px] text-gray-600 leading-normal space-y-1.5 font-sans">
            <p>💡 <b>Aturan Ujian Terbuka:</b></p>
            <p>• Durasi Maksimum: 45 Menit (Timer terus berjalan)</p>
            <p>• Tidak ada kunci pembetulan per pertanyaan saat tes berlangsung.</p>
            <p>• Pembahasan lengkap komplit dibuka setelah kuis dikirimkan.</p>
          </div>
          <button onclick="startFinalExamGameplay()" class="w-full max-w-xs py-3 bg-[#C9A84C] text-white font-bold rounded-xl hover:bg-opacity-90 transition shadow-sm text-xs uppercase tracking-wide">Mulai Pendadaran Sekarang</button>
        </div>

        <!-- Tes Gameplay -->
        <div id="tes-gameplay-panel" class="space-y-3 hidden">
          <div class="bg-[#6B3A2A] text-white p-3.5 rounded-2xl flex justify-between items-center shadow-xs">
            <span id="tes-progress-text" class="text-xs font-bold text-amber-200">Soal 1 / 10</span>
            <span id="tes-timer" class="font-mono text-xs font-medium bg-white/10 px-2 py-0.5 rounded-md text-amber-300">⏰ 45:00</span>
          </div>

          <div class="bg-white rounded-3xl p-5 border shadow-sm space-y-4">
            <div id="tes-question-area" class="space-y-4">
              <div class="flex justify-between border-b pb-2 items-center">
                <span id="tes-badge" class="px-2 py-0.5 bg-gray-100 text-[#6B3A2A] rounded font-bold text-[9px] uppercase tracking-wide">Konteks</span>
                <span class="text-[9px] uppercase text-amber-600 font-mono font-bold">Evaluasi Mandiri</span>
              </div>
              <h3 id="tes-question-text" class="text-xs sm:text-sm font-semibold text-gray-800 leading-relaxed pt-1"></h3>
              <!-- Eq box -->
              <div id="tes-eq-box" class="p-3 bg-gray-50 border rounded-xl font-mono text-[11px] text-center text-[#6B3A2A] hidden"></div>
              
              <!-- PG -->
              <div id="tes-pg-options" class="grid grid-cols-1 gap-2"></div>
              
              <!-- Isian -->
              <div id="tes-isian-box" class="p-3 bg-gray-50 rounded-xl border space-y-3.5 hidden">
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <span class="text-[10px] font-bold text-gray-500 block">Variabel x =</span>
                    <input type="number" id="tes-input-x" class="w-full px-2 py-1.5 bg-white border rounded text-xs">
                  </div>
                  <div>
                    <span class="text-[10px] font-bold text-gray-500 block">Variabel y =</span>
                    <input type="number" id="tes-input-y" class="w-full px-2 py-1.5 bg-white border rounded text-xs">
                  </div>
                </div>
              </div>
            </div>

            <!-- Controllers -->
            <button onclick="submitTesQuestionNext()" class="w-full py-2.5 bg-[#6B3A2A] hover:bg-opacity-95 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5">
              <span>Simpan &amp; Lanjut</span> &rarr;
            </button>
          </div>
        </div>

        <!-- Tes Finished View Card -->
        <div id="tes-result-panel" class="bg-white rounded-3xl p-6 border shadow-lg text-center space-y-5 hidden">
          <div class="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold mx-auto text-2xl">🎓</div>
          <div>
            <h3 class="font-serif text-lg font-bold text-[#6B3A2A]">Slamet! Evaluasi Anda Selesai!</h3>
            <p class="text-[11px] text-gray-500">Nilai pencapaian kuis aljabar linear Anda:</p>
          </div>
          <!-- Score summary circles -->
          <div class="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl max-w-sm mx-auto border border-[#C9A84C]/35">
            <span class="text-4xl font-mono font-black text-[#6B3A2A]" id="tes-final-score">0</span>
            <span class="text-[10px] text-gray-400 block uppercase tracking-wider mt-1">Skor / Nilai Evaluasi</span>
          </div>

          <div class="space-y-2 max-w-md mx-auto pt-2 text-left">
            <button onclick="togglePembahasan()" class="w-full py-2 bg-gray-100 hover:bg-gray-200 text-[#6B3A2A] text-xs font-bold rounded-xl border">📖 Tampilkan Pembahasan Lengkap</button>
            <div id="tes-pembahasan-box" class="p-3 bg-gray-55 rounded-xl border text-[11px] text-gray-700 space-y-4 max-h-60 overflow-y-auto hidden">
              <!-- Pembahasan list gets structured -->
            </div>
          </div>
          <button onclick="resetTesPanel()" class="px-5 py-2.5 bg-[#6B3A2A] text-white text-xs font-bold rounded-xl hover:bg-opacity-90 transition">Selesai &amp; Keluar</button>
        </div>
      </section>

      <!-- ==================== VIEW 6: RIWAYAT SKOR ==================== -->
      <section id="view-riwayat" class="view-item hidden space-y-4">
        <div class="bg-white rounded-2xl p-4 border shadow-sm flex items-center justify-between">
          <div>
            <h2 class="font-serif text-base font-bold text-[#6B3A2A]">Riwayat Pengerjaan Kuis</h2>
            <p class="text-[10px] text-gray-500">Catatan perkembangan pengerjaan modul luring Anda.</p>
          </div>
          <button onclick="clearHistoryRecords()" class="text-rose-600 font-bold text-[11px] hover:underline">Hapus Semua</button>
        </div>

        <div id="riwayat-list" class="space-y-2.5 max-h-[500px] overflow-y-auto">
          <!-- Dynamically populated or says empty -->
        </div>
      </section>

    </main>

    <!-- NAVBAR BOTTOM FOOTER NAVIGATION -->
    <nav class="absolute bottom-0 left-0 w-full bg-[#6B3A2A] border-t-4 border-[#C9A84C] h-16 flex items-center justify-around z-40 px-2 shadow-lg">
      <button onclick="switchTab('beranda')" id="nav-btn-beranda" class="flex flex-col items-center justify-center gap-1 opacity-100 transition duration-150">
        <div class="p-1.5 rounded-lg bg-[#C9A84C] text-white shadow"><span class="text-sm">🏡</span></div>
        <span class="text-[9px] text-white font-bold">Beranda</span>
      </button>
      <button onclick="switchTab('materi')" id="nav-btn-materi" class="flex flex-col items-center justify-center gap-1 opacity-50 transition duration-150">
        <div class="p-1.5 rounded-lg"><span class="text-sm">📖</span></div>
        <span class="text-[9px] text-white font-bold">Materi</span>
      </button>
      <button onclick="switchTab('eksplorasi')" id="nav-btn-eksplorasi" class="flex flex-col items-center justify-center gap-1 opacity-50 transition duration-150">
        <div class="p-1.5 rounded-lg"><span class="text-sm">🗺️</span></div>
        <span class="text-[9px] text-white font-bold">Eksplorasi</span>
      </button>
      <button onclick="switchTab('latihan')" id="nav-btn-latihan" class="flex flex-col items-center justify-center gap-1 opacity-50 transition duration-150">
        <div class="p-1.5 rounded-lg"><span class="text-sm">📝</span></div>
        <span class="text-[9px] text-white font-bold">Latihan</span>
      </button>
    </nav>
  </div>

  <!-- INJECTED DATASET COMMUNICATED FORM SYSTEM -->
  <script>
    const DATA_MUDAH = ${mudahQsJSON};
    const DATA_SEDANG = ${sedangQsJSON};
    const DATA_SULIT = ${sulitQsJSON};
    const DATA_TES_AKHIR = ${tesAkhirQsJSON};

    // CHAPTERS DATA FOR MATERIAL VIEW
    const CHAPTERS_DATA = [
      {
        title: "Pengenalan PLDV dan SPLDV",
        context: "Pengrajin batik Yogyakarta membuat pola kombinasi bunga dan kawung. Setiap jenis motif punya harga berbeda. Bagaimana menghitung harga total?",
        badge: "Dasar",
        content: \`
          <div class="p-3 bg-gray-50 border-l-4 border-blue-600 rounded-xl space-y-1.5">
            <h4 class="font-serif font-bold text-blue-900 text-[11px] uppercase">1. Definisi PLDV</h4>
            <p class="text-[11px] text-gray-700">PLDV adalah persamaan matematika yang memiliki <strong>dua variabel</strong> (misalnya x dan y), dengan pangkat tertinggi dari masing-masing variabel adalah <strong>satu</strong>.</p>
            <div class="bg-white p-2 border border-blue-100 rounded font-mono text-center text-[12px] font-bold text-blue-800">
              Bentuk Umum: ax + by = c (a, b &ne; 0)
            </div>
          </div>
          <div class="p-3 bg-gray-50 border-l-4 border-[#6B3A2A] rounded-xl space-y-1.5">
            <h4 class="font-serif font-bold text-[#6B3A2A] text-[11px] uppercase">2. Definisi SPLDV</h4>
            <p class="text-[11px] text-gray-700">SPLDV adalah himpunan dari <strong>dua atau lebih</strong> persamaan linear dua variabel yang saling terkait, dengan satu pasang nilai kunci penyelesaian yang sama.</p>
            <p class="text-[10px] text-gray-500">Tujuan SPLDV adalah mencari satu koordinat (x, y) yang memuaskan kedua persamaan secara berbarengan.</p>
          </div>
        \`
      },
      {
        title: "Metode Substitusi",
        context: "Pengrajin punya catatan 2 resep campuran pewarna soga. Dengan metode substitusi (mengganti), dia bisa mengetahui jumlah tepat setiap warna.",
        badge: "Level 1",
        content: \`
          <div class="p-3 bg-gray-50 border-l-4 border-blue-600 rounded-xl space-y-2">
            <h4 class="font-serif font-bold text-blue-900 text-[11px] uppercase">Langkah-Langkah Substitusi:</h4>
            <ol class="text-[11px] text-gray-700 list-decimal pl-4 space-y-1">
              <li>Pilih persamaan paling sederhana, isolasi salah satu variabel (seperti x = ...).</li>
              <li>Sustitusikan nilai variabel tersebut ke persamaan kedua.</li>
              <li>Selesaikan persamaan tersebut untuk mendapat nilai satu variabel asli.</li>
              <li>Substitusikan balik nilai tersebut untuk menemukan variabel kedua.</li>
            </ol>
          </div>
        \`
      },
      {
        title: "Metode Eliminasi",
        context: "Menyeimbangkan timbangan tembaga lilin dengan menghilangkan salah satu kubu logam.",
        badge: "Level 1",
        content: \`
          <div class="p-3 bg-gray-50 border-l-4 border-[#6B3A2A] rounded-xl space-y-1.5">
            <h4 class="font-serif font-bold text-xs">Konsep Eliminasi (Melunasi):</h4>
            <p class="text-[11px]"> Metode ini bekerja dengan menyamakan koefisien variabel sasaran kemudian menjumlahkan atau mengurangkan kedua persamaan guna memaksa variabel sasaran bernilai nol (hilang).</p>
          </div>
        \`
      },
      {
        title: "Methods Rangkuman: Aljabar",
        context: "Mempelajari kelebihan kelemahan masing-masing metode.",
        badge: "Ringkasan",
        content: \`
          <div class="overflow-x-auto border rounded-xl">
            <table class="w-full text-left text-[11px] border-collapse">
              <thead>
                <tr class="bg-[#6B3A2A] text-white">
                  <th class="p-2">Aspek</th>
                  <th class="p-2">Substitusi</th>
                  <th class="p-2">Eliminasi</th>
                </tr>
              </thead>
              <tbody class="text-gray-700">
                <tr class="border-b bg-white">
                  <td class="p-2 font-bold">Kelebihan</td>
                  <td class="p-2 text-blue-700">Mudah bila koefisien = 1</td>
                  <td class="p-2 text-[#C9A84C] font-bold">Hebat untuk angka besar</td>
                </tr>
              </tbody>
            </table>
          </div>
        \`
      },
      {
        title: "Glosarium: Istilah Penting",
        context: "Kamus aljabar istilah kunci untuk kelas 8 SMP.",
        badge: "Kamus",
        content: \`
          <ul class="space-y-2 text-[11px] text-gray-700">
            <li>📌 <b>Variabel:</b> Huruf pengganti kuantitas belum diketahui nilainya (seperti x, y).</li>
            <li>📌 <b>Koefisien:</b> Bilangan pengkali di depan variabel (seperti 3 pada 3x).</li>
            <li>📌 <b>Konstanta:</b> Angka numerik absolut tanpa variabel pendamping.</li>
          </ul>
        \`
      },
      {
        title: "Eksplorasi Simulator Mandiri",
        context: "Panduan manipulasi simulator visual.",
        badge: "Peta",
        content: \`
          <div class="p-3 bg-amber-50 border text-center rounded-xl space-y-1.5">
            <p class="text-[11px]">Buka tab <b>Eksplorasi</b> di menu bawah untuk mematangkan pemahamanmu mengenai bagaimana kemiringan garis membentuk satu titik potong solusi!</p>
          </div>
        \`
      },
      {
        title: "Peta Konsep SPLDV",
        context: "Diagram rute grafis alur SPLDV.",
        badge: "Peta",
        content: \`
          <div class="p-2 border rounded-xl bg-gray-50 flex items-center justify-center font-mono text-[10px] space-y-2 flex-col">
            <div class="border p-1 bg-amber-600 text-white rounded font-bold">SPLDV</div>
            <div>&darr;</div>
            <div class="grid grid-cols-2 gap-2 text-center">
              <div class="border p-1 rounded bg-white font-bold">Metode Aljabar</div>
              <div class="border p-1 rounded bg-white font-bold">Metode Grafik</div>
            </div>
          </div>
        \`
      },
      {
        title: "Metode Kombinasi",
        context: "Menggabungkan kelebihan Eliminasi dan Substitusi.",
        badge: "Level 2",
        content: \`
          <p class="text-[11px]">Metode campuran ini melenyapkan variabel pertama dengan Eliminasi, lalu menyisipkan nilainya ke salah satu rumus asli dengan Substitusi. Sangat efisien!</p>
        \`
      },
      {
        title: "Metode Grafik",
        context: "Mencari titik potong dua garis lurus di diagram Cartesian.",
        badge: "Grafik",
        content: \`
          <p class="text-[11px]">Menggambar kedua garis SPLDV pada koordinat Cartesian. Lokasi persilangan silang antar kedua koordinat garis adalah Himpunan Penyelesaian (HP).</p>
        \`
      },
      {
        title: "Tes Akhir Modul",
        context: "Siap menguji kemampuan total?",
        badge: "Evaluasi",
        content: \`
          <div class="text-center py-2 space-y-2">
            <p class="text-[11px]">Setelah tuntas membaca ragam bab, ketuk tombol di bawah untuk menguji keahlian kuis aljabar linear pada evaluasi akhir!</p>
            <button onclick="startFinalExam()" class="px-4 py-2 bg-[#6B3A2A] text-white text-[11px] font-bold rounded-xl">Mulai Tes Evaluasi sekarang &rarr;</button>
          </div>
        \`
      }
    ];
  </script>

  <!-- BUSINESS LOGIC JAVASCRIPT ENGINE -->
  <script>
    // SELF-DOWNLOAD FUNCTION FOR ONLINE BROWSER
    function downloadSelfHTML() {
      try {
        const btn = document.querySelector('#online-download-banner button');
        if (btn) {
          btn.disabled = true;
          btn.innerText = 'MENGUNDUH...';
        }
        
        // Fetch current file and download it
        fetch(window.location.href)
          .then(res => {
            if (!res.ok) throw new Error();
            return res.text();
          })
          .then(htmlText => {
            const blob = new Blob([htmlText], { type: 'text/html;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Modul_SPLDV_Interaktif_Offline.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            if (btn) {
              btn.disabled = false;
              btn.innerText = 'BERHASIL DIUNDUH! 👍';
              setTimeout(() => { btn.innerText = '🟢 KLIK UNTUK UNDUH'; }, 3000);
            }
          })
          .catch(() => {
            // Fallback: download current outerHTML
            const htmlContent = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
            const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Modul_SPLDV_Interaktif_Offline.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            if (btn) {
              btn.disabled = false;
              btn.innerText = 'BERHASIL DIUNDUH! 👍';
              setTimeout(() => { btn.innerText = '🟢 KLIK UNTUK UNDUH'; }, 3000);
            }
          });
      } catch (err) {
        alert('Gagal mengunduh berkas secara otomatis. Silakan gunakan pintasan browser Anda.');
        if (btn) {
          btn.disabled = false;
          btn.innerText = '🟢 KLIK UNTUK UNDUH';
        }
      }
    }

    // CORE GLOBAL STATE
    let currentUsername = "${username}";
    let activeTab = 'beranda';
    let currentChapterIndex = 0;

    // Sandbox state
    const sandboxCoeffs = { a1: 2, b1: 1, c1: 8, a2: 1, b2: 3, c2: 9 };
    let currentMathMethod = 'grafik';

    // Latihan Quiz State
    let quizLevel = null;
    let quizQuestions = [];
    let currentQuizIndex = 0;
    let quizScore = 0;
    let quizSelectedAnswer = null;
    let quizSecondsLeft = 120;
    let quizTimerInterval = null;

    // Tes Akhir State
    let tesActive = false;
    let tesQuestions = [];
    let currentTesIndex = 0;
    let tesAnswers = []; // holds { selectedIdx, x, y, isCorrect }
    let tesTimeLeft = 2700; // 45 minutes
    let tesTimerInterval = null;

    // ONBOARDING CONTROLLER
    let currentOnboardSlide = 0;
    const tutorialSlides = [
      {
        title: "Baca Materi Seksama",
        text: "📖 Pelajari konsep SPLDV (Sistem Persamaan Linear Dua Variabel) yang dihubungkan dengan keindahan tradisi Batik Yogyakarta.",
        icon: "📖"
      },
      {
        title: "Coba Eksplorasi Interaktif",
        text: "🎮 Gunakan simulator grafik interaktif kami untuk memanipulasi koefisien persamaan dan melihat pergeseran garis secara real-time.",
        icon: "🎮"
      },
      {
        title: "Selesaikan Latihan & Tes",
        text: "📝 Selesaikan 3 tingkat kesulitan latihan soal dengan batas waktu demi mencatat skor terbaikmu dan taklukkan evaluasi akhir modul!",
        icon: "📝"
      }
    ];

    window.onload = function() {
      // Show download banner if accessed online via HTTP/HTTPS
      if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
        const banner = document.getElementById('online-download-banner');
        if (banner) banner.style.display = 'flex';
      }

      // Load saved user profile
      const savedUser = localStorage.getItem('batikmath_user');
      const savedScores = getScoresFromStorage();

      // Show onboarding overlay if no user saved
      if (!savedUser) {
        document.getElementById('onboarding-overlay').style.display = 'flex';
        // Compute high score
        document.getElementById('onboard-high-score').innerText = getHighScoreValue() + ' / 100';
      } else {
        currentUsername = savedUser;
        document.getElementById('onboarding-overlay').style.display = 'none';
        initAppDashboard();
      }

      drawGridBackground();
      renderActiveChapter();
      renderGraph();
    };

    function getScoresFromStorage() {
      const stored = localStorage.getItem('batikmath_scores');
      if (!stored) return [];
      try { return JSON.parse(stored); } catch(e) { return []; }
    }

    function getHighScoreValue() {
      const records = getScoresFromStorage();
      if (records.length === 0) return 0;
      let maxScore = 0;
      records.forEach(r => {
        if (r.type === 'tes-akhir' && r.score > maxScore) maxScore = r.score;
        if (r.type === 'latihan' && (r.score * 10) > maxScore) maxScore = r.score * 10;
      });
      return maxScore;
    }

    function saveScoreRecord(type, levelName, scoreValue) {
      const records = getScoresFromStorage();
      const newRec = {
        date: new Date().toLocaleString('id-ID'),
        type: type,
        level: levelName,
        score: scoreValue
      };
      records.push(newRec);
      localStorage.setItem('batikmath_scores', JSON.stringify(records));
      updateRiwayatListUI();
    }

    function initAppDashboard() {
      document.getElementById('header-user-display').innerText = currentUsername;
      document.getElementById('welcome-username').innerText = "Selamat Datang, " + currentUsername + "!";
      
      // Inject quick-links
      const quickBox = document.getElementById('materi-quick-links');
      quickBox.innerHTML = CHAPTERS_DATA.slice(0, 4).map((ch, idx) => {
        return \`<button onclick="goToMateriClick(\${idx})" class="p-2 border text-left rounded-xl hover:bg-amber-50/50 transition">
          <span class="text-[10px] font-bold text-amber-700 block">Bab \${idx+1}</span>
          <span class="text-[10px] font-semibold text-[#6B3A2A] truncate block">\${ch.title}</span>
        </button>\`;
      }).join('');

      // Populate material dropdown
      const select = document.getElementById('materi-dropdown');
      select.innerHTML = CHAPTERS_DATA.map((ch, idx) => {
        return \`<option value="\${idx}">Bab \${idx+1}: \${ch.title}</option>\`;
      }).join('');

      updateRiwayatListUI();
    }

    // ONBOARDING STEP LOGIC
    function submitOnboardingName() {
      const nameVal = document.getElementById('onboard-name-input').value.trim();
      if (!nameVal) {
        document.getElementById('onboard-error').classList.remove('hidden');
        return;
      }
      document.getElementById('onboard-error').classList.add('hidden');
      currentUsername = nameVal;
      localStorage.setItem('batikmath_user', nameVal);
      
      // transition to tutorial
      document.getElementById('onboard-step-name').classList.add('hidden');
      document.getElementById('onboard-step-tutorial').classList.remove('hidden');
      currentOnboardSlide = 0;
      renderTutorialSlideUI();
    }

    function renderTutorialSlideUI() {
      const sl = tutorialSlides[currentOnboardSlide];
      document.getElementById('tutorial-icon').innerText = sl.icon;
      document.getElementById('tutorial-title').innerText = sl.title;
      document.getElementById('tutorial-text').innerText = sl.text;
      
      const dotContainer = document.getElementById('tutorial-dots');
      dotContainer.innerHTML = tutorialSlides.map((_, i) => {
        const wClass = (i === currentOnboardSlide) ? 'w-7 bg-[#C9A84C]' : 'w-2.5 bg-gray-200';
        return \`<div class="h-2.5 \${wClass} rounded-full transition-all duration-300"></div>\`;
      }).join('');

      const btn = document.getElementById('tutorial-btn');
      if (currentOnboardSlide === tutorialSlides.length - 1) {
        btn.innerText = "Mengerti, Mulai!";
      } else {
        btn.innerText = "Berikutnya →";
      }
    }

    function nextTutorialSlide() {
      if (currentOnboardSlide < tutorialSlides.length - 1) {
        currentOnboardSlide++;
        renderTutorialSlideUI();
      } else {
        // Complete Onboard
        document.getElementById('onboarding-overlay').style.display = 'none';
        initAppDashboard();
      }
    }

    function handleResetProfile() {
      const isConfirmed = confirm("Apakah kamu ingin mengubah nama belajarmu? Skor riwayat pengerjaan kamu akan tetap disimpan.");
      if (isConfirmed) {
        localStorage.removeItem('batikmath_user');
        document.getElementById('onboard-name-input').value = '';
        document.getElementById('onboard-step-tutorial').classList.add('hidden');
        document.getElementById('onboard-step-name').classList.remove('hidden');
        document.getElementById('onboard-high-score').innerText = getHighScoreValue() + ' / 100';
        document.getElementById('onboarding-overlay').style.display = 'flex';
      }
    }

    // CORE SCREEN NAVIGATION
    function switchTab(tab) {
      if (tesActive) {
        const leave = confirm("Anda sedang dalam pengerjaan Tes Akhir. Jika keluar, nilai akan dihitung gugur!");
        if (!leave) return;
        stopExamTimer();
        tesActive = false;
      }

      // Hide all tabs
      document.querySelectorAll('.view-item').forEach(el => el.classList.add('hidden'));
      activeTab = tab;

      // Show active tab
      const currentView = document.getElementById('view-' + tab);
      if (currentView) currentView.classList.remove('hidden');

      // Update Nav Buttons
      ['beranda', 'materi', 'eksplorasi', 'latihan'].forEach(tabID => {
        const btn = document.getElementById('nav-btn-' + tabID);
        if (btn) {
          if (tabID === tab) {
            btn.classList.remove('opacity-50');
            btn.querySelector('div').className = 'p-1.5 rounded-lg bg-[#C9A84C] text-white shadow';
          } else {
            btn.classList.add('opacity-50');
            btn.querySelector('div').className = 'p-1.5 rounded-lg';
          }
        }
      });

      // Special action
      if (tab === 'eksplorasi') {
        renderGraph();
      } else if (tab === 'riwayat') {
        updateRiwayatListUI();
      }
    }

    function goToMateriClick(idx) {
      switchTab('materi');
      document.getElementById('materi-dropdown').value = idx;
      renderActiveChapter();
    }

    // CHAPTER (MATERI) LOGIC
    function renderActiveChapter() {
      const idx = parseInt(document.getElementById('materi-dropdown').value || '0');
      currentChapterIndex = idx;
      const ch = CHAPTERS_DATA[idx];

      document.getElementById('materi-count').innerText = "Bab " + (idx + 1) + " / 10";
      document.getElementById('materi-badge').innerText = ch.badge;
      
      let bgBadge = "bg-amber-100 text-amber-800";
      if (ch.badge === 'Dasar') bgBadge = "bg-blue-100 text-blue-800";
      if (ch.badge === 'Ringkasan') bgBadge = "bg-gray-100 text-gray-800";
      if (ch.badge === 'Evaluasi') bgBadge = "bg-rose-100 text-rose-800";
      document.getElementById('materi-badge').className = "px-2 py-0.5 rounded text-[10px] font-bold uppercase " + bgBadge;

      document.getElementById('materi-title').innerText = ch.title;
      document.getElementById('materi-context').innerText = "“" + ch.context + "”";
      document.getElementById('materi-body').innerHTML = ch.content;

      document.getElementById('materi-indicator').innerText = (idx + 1) + " / 10";
      document.getElementById('btn-prev-chap').disabled = idx === 0;
      document.getElementById('btn-next-chap').disabled = idx === CHAPTERS_DATA.length - 1;
    }

    function prevChapter() {
      if (currentChapterIndex > 0) {
        document.getElementById('materi-dropdown').value = currentChapterIndex - 1;
        renderActiveChapter();
      }
    }

    function nextChapter() {
      if (currentChapterIndex < CHAPTERS_DATA.length - 1) {
        document.getElementById('materi-dropdown').value = currentChapterIndex + 1;
        renderActiveChapter();
      }
    }


    // EKSPLORASI SIMULATOR ENGINE (SVG COORDINATE RENDERING)
    function drawGridBackground() {
      const group = document.getElementById('svg-grid-lines');
      let lines = '';
      for (let i = -8; i <= 8; i++) {
        const coord = 150 + i * (150 / 8);
        lines += \`<line x1="\${coord}" y1="0" x2="\${coord}" y2="300" stroke-opacity="\${i===0 ? 0.35 : 0.08}" />\`;
        lines += \`<line x1="0" y1="\${coord}" x2="300" y2="\${coord}" stroke-opacity="\${i===0 ? 0.35 : 0.08}" />\`;
      }
      group.innerHTML = lines;
    }

    function adjCoeff(key, val) {
      const nVal = sandboxCoeffs[key] + val;
      if (nVal >= -10 && nVal <= 10) {
        sandboxCoeffs[key] = nVal;
        document.getElementById('disp-' + key).innerText = nVal;
        renderGraph();
      }
    }

    function resetSandbox() {
      sandboxCoeffs.a1 = 2; sandboxCoeffs.b1 = 1; sandboxCoeffs.c1 = 8;
      sandboxCoeffs.a2 = 1; sandboxCoeffs.b2 = 3; sandboxCoeffs.c2 = 9;
      ['a1', 'b1', 'c1', 'a2', 'b2', 'c2'].forEach(k => {
        document.getElementById('disp-' + k).innerText = sandboxCoeffs[k];
      });
      renderGraph();
    }

    function getLineEndpoints(a, b, c) {
      const scale = 150 / 8;
      if (a === 0 && b === 0) return { x1: 150, y1: 150, x2: 150, y2: 150 };
      if (b === 0) {
        const x = c / a;
        return { x1: 150 + x*scale, y1: 0, x2: 150 + x*scale, y2: 300 };
      }
      return {
        x1: 0,
        y1: 150 - ((c - a * -8) / b) * scale,
        x2: 300,
        y2: 150 - ((c - a * 8) / b) * scale
      };
    }

    function formatCoeffStr(val, name, first = false) {
      if (val === 0) return '';
      if (val === 1) return first ? name : '+ ' + name;
      if (val === -1) return '- ' + name;
      if (val > 0) return first ? val + name : '+ ' + val + name;
      return '- ' + Math.abs(val) + name;
    }

    function renderGraph() {
      const { a1, b1, c1, a2, b2, c2 } = sandboxCoeffs;

      const str1 = (\`\${formatCoeffStr(a1, 'x', true)} \${formatCoeffStr(b1, 'y') || ''} = \${c1}\`).trim();
      const str2 = (\`\${formatCoeffStr(a2, 'x', true)} \${formatCoeffStr(b2, 'y') || ''} = \${c2}\`).trim();
      document.getElementById('live-eq1-disp').innerText = str1 || "0 = 0";
      document.getElementById('live-eq2-disp').innerText = str2 || "0 = 0";

      const line1 = getLineEndpoints(a1, b1, c1);
      const l1El = document.getElementById('svg-line1');
      l1El.setAttribute('x1', line1.x1); l1El.setAttribute('y1', line1.y1);
      l1El.setAttribute('x2', line1.x2); l1El.setAttribute('y2', line1.y2);

      const line2 = getLineEndpoints(a2, b2, c2);
      const l2El = document.getElementById('svg-line2');
      l2El.setAttribute('x1', line2.x1); l2El.setAttribute('y1', line2.y1);
      l2El.setAttribute('x2', line2.x2); l2El.setAttribute('y2', line2.y2);

      // Solve
      const D = a1 * b2 - a2 * b1;
      const statusText = document.getElementById('graph-coordinate-status');
      const dot = document.getElementById('svg-sol-dot');

      if (D !== 0) {
        const xVal = (c1 * b2 - c2 * b1) / D;
        const yVal = (a1 * c2 - a2 * c1) / D;
        dot.classList.remove('hidden');
        dot.setAttribute('cx', 150 + xVal * (150/8));
        dot.setAttribute('cy', 150 - yVal * (150/8));

        statusText.innerHTML = \`<span class="text-emerald-800 font-bold">Titik Solusi HP (x, y) = (\${parseFloat(xVal.toFixed(2))}, \${parseFloat(yVal.toFixed(2))})</span>\`;
      } else {
        dot.classList.add('hidden');
        const coin = (a1 !== 0 && a2 !== 0 && c1/a1 === c2/a2) || (b1 !== 0 && b2 !== 0 && c1/b1 === c2/b2);
        if (coin) {
          statusText.innerHTML = \`<span class="text-amber-800 font-bold">Saling Berimpit (Solusi Terhingga Banyak)</span>\`;
        } else {
          statusText.innerHTML = \`<span class="text-rose-800 font-bold">Saling Sejajar Paralel (Tidak Ada Solusi)</span>\`;
        }
      }

      renderSandboxCalculationSteps();
    }

    function mouseMoveGrid(e) {
      const svg = document.getElementById('cartesian-svg');
      const bubble = document.getElementById('grid-coord-bubble');
      const rect = svg.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;

      const width = rect.width;
      const valueX = ((px - (width / 2)) / (width / 16));
      const valueY = -((py - (width / 2)) / (width / 16));

      const roundX = Math.round(valueX * 2) / 2;
      const roundY = Math.round(valueY * 2) / 2;

      bubble.classList.remove('hidden');
      bubble.style.left = (px + 12) + 'px';
      bubble.style.top = (py - 12) + 'px';
      bubble.innerText = "x: " + roundX + ", y: " + roundY;
    }

    function mouseLeaveGrid() {
      document.getElementById('grid-coord-bubble').classList.add('hidden');
    }

    function switchMathMethod(method) {
      currentMathMethod = method;
      ['grafik', 'eliminasi', 'substitusi', 'kombinasi'].forEach(m => {
        const btn = document.getElementById('method-tab-' + m);
        if (m === method) {
          btn.className = "flex-1 py-1 text-[11px] font-bold rounded bg-[#6B3A2A] text-white transition";
        } else {
          btn.className = "flex-1 py-1 text-[11px] font-bold rounded text-gray-500 transition hover:bg-gray-100";
        }
      });
      renderSandboxCalculationSteps();
    }

    function renderSandboxCalculationSteps() {
      const { a1, b1, c1, a2, b2, c2 } = sandboxCoeffs;
      const box = document.getElementById('sandbox-calculation-box');
      const D = a1 * b2 - a2 * b1;

      if (D === 0) {
        box.innerText = "Sistem determinan D = 0. Tidak memiliki satu titik penyelesaian unik.";
        return;
      }

      const x = (c1 * b2 - c2 * b1) / D;
      const y = (a1 * c2 - a2 * c1) / D;

      const px = parseFloat(x.toFixed(2));
      const py = parseFloat(y.toFixed(2));

      let content = "";
      if (currentMathMethod === 'grafik') {
        content = \`<b>Metode Grafik:</b><br/>
• Persamaan (1): Bersilangan di Sumbu-X pada (\${parseFloat((c1/a1).toFixed(1))}, 0) dan Sumbu-Y pada (0, \${parseFloat((c1/b1).toFixed(1))}).<br/>
• Persamaan (2): Bersilangan di Sumbu-X pada (\${parseFloat((c2/a2).toFixed(1))}, 0) dan Sumbu-Y pada (0, \${parseFloat((c2/b2).toFixed(1))}).<br/>
• Kedua garis bersua di titik potong HP = <b>(\${px}, \${py})</b>.\`;
      } else if (currentMathMethod === 'eliminasi') {
        content = \`<b>Metode Eliminasi:</b><br/>
• Samakan koefisien y untuk mengeliminasi variabel y:<br/>
  Kalikan Persamaan (1) dengan \${b2} &rarr; (\${a1*b2}x + \${b1*b2}y = \${c1*b2})<br/>
  Kalikan Persamaan (2) dengan \${b1} &rarr; (\${a2*b1}x + \${b2*b1}y = \${c2*b1})<br/>
• Kurangkan persamaan hasil kali:<br/>
  (\${a1*b2 - a2*b1})x = \${c1*b2 - c2*b1} &rArr; x = <b>\${px}</b>.<br/>
• Lakukan hal serupa pada x untuk determinasi y = <b>\${py}</b>.\`;
      } else if (currentMathMethod === 'substitusi') {
        content = \`<b>Metode Substitusi:</b><br/>
• Isolasi y dari Persamaan (1):<br/>
  y = (\${c1} - \${a1}x) / \${b1}<br/>
• Masukkan nilai y ke Persamaan (2):<br/>
  \${a2}x + \${b2}((\${c1} - \${a1}x)/\${b1}) = \${c2}<br/>
• Selesaikan kalkulasi aljabar linear:<br/>
  x = <b>\${px}</b>.<br/>
• Substitusikan kembali balik x: y = <b>\${py}</b>.\`;
      } else {
        content = \`<b>Metode Campuran:</b><br/>
• Langkah 1 (Eliminasi y): Kurangkan untuk memperoleh x = <b>\${px}</b>.<br/>
• Langkah 2 (Substitusi balik): Masukkan x = \${px} ke Persamaan (1):<br/>
  \${a1}(\${px}) + \${b1}y = \${c1}<br/>
  \${b1}y = \${c1 - a1*px} &rarr; y = <b>\${py}</b>.\`;
      }
      box.innerHTML = content;
    }


    // ==================== LATIHAN QUIZ SYSTEM ====================
    function startLatihanQuiz(level) {
      quizLevel = level;
      currentQuizIndex = 0;
      quizScore = 0;
      
      if (level === 'mudah') {
        quizQuestions = DATA_MUDAH;
        quizSecondsLeft = 120;
      } else if (level === 'sedang') {
        quizQuestions = DATA_SEDANG;
        quizSecondsLeft = 90;
      } else {
        quizQuestions = DATA_SULIT;
        quizSecondsLeft = 60;
      }

      document.getElementById('latihan-level-selector').classList.add('hidden');
      document.getElementById('latihan-gameplay').classList.remove('hidden');
      document.getElementById('latihan-result').classList.add('hidden');

      renderLatihanQuizQuestionUI();
    }

    function resetLatihanSelector() {
      document.getElementById('latihan-level-selector').classList.remove('hidden');
      document.getElementById('latihan-gameplay').classList.add('hidden');
      document.getElementById('latihan-result').classList.add('hidden');
    }

    function renderLatihanQuizQuestionUI() {
      // Clear answers state or fields
      quizSelectedAnswer = null;
      document.getElementById('lat-input-x').value = '';
      document.getElementById('lat-input-y').value = '';
      document.getElementById('lat-feedback-box').classList.add('hidden');
      document.getElementById('lat-btn-next').classList.add('hidden');

      const q = quizQuestions[currentQuizIndex];
      document.getElementById('lat-progress-text').innerText = "Soal " + (currentQuizIndex + 1) + " Dari " + quizQuestions.length;
      document.getElementById('lat-badge-context').innerText = q.context;
      document.getElementById('lat-question-text').innerText = q.questionText;

      // Handle equations box display
      const eqBox = document.getElementById('lat-eq-box');
      if (q.eq1 && q.eq2) {
        eqBox.classList.remove('hidden');
        eqBox.innerHTML = \`<span class="block">Persamaan 1: \${q.eq1.display || (q.eq1.a+'x + '+q.eq1.b+'y = '+q.eq1.c)}</span>
                            <span class="block">Persamaan 2: \${q.eq2.display || (q.eq2.a+'x + '+q.eq2.b+'y = '+q.eq2.c)}</span>\`;
      } else {
        eqBox.classList.add('hidden');
      }

      // Display based on Type
      const pgOptions = document.getElementById('lat-pg-options');
      const isianBox = document.getElementById('lat-isian-box');

      if (q.type === 'pg') {
        pgOptions.classList.remove('hidden');
        isianBox.classList.add('hidden');

        pgOptions.innerHTML = q.options.map((opt, idx) => {
          return \`<button onclick="submitLatihanPgAnswer(\${idx}, this)" class="w-full text-left p-3 bg-white border rounded-xl hover:bg-amber-100/30 font-medium text-xs flex justify-between items-center transition">
            <span>\${opt}</span>
            <span class="w-4 h-4 rounded-full border border-gray-300"></span>
          </button>\`;
        }).join('');
      } else {
        pgOptions.classList.add('hidden');
        isianBox.classList.remove('hidden');
      }

      // Reset timer
      clearInterval(quizTimerInterval);
      if (quizLevel === 'mudah') quizSecondsLeft = 120;
      else if (quizLevel === 'sedang') quizSecondsLeft = 90;
      else quizSecondsLeft = 60;

      updateLatihanQuizTimerUI();
      quizTimerInterval = setInterval(() => {
        quizSecondsLeft--;
        updateLatihanQuizTimerUI();
        if (quizSecondsLeft <= 0) {
          clearInterval(quizTimerInterval);
          handleLatihanQuizTimeout();
        }
      }, 1000);
    }

    function updateLatihanQuizTimerUI() {
      const el = document.getElementById('lat-timer');
      el.innerText = "⏰ " + quizSecondsLeft + "s";
      if (quizSecondsLeft <= 15) {
        el.className = "px-2.5 py-1 bg-red-100 text-red-800 font-mono text-xs font-bold rounded-lg animate-pulse";
      } else {
        el.className = "px-2.5 py-1 bg-amber-100 text-amber-800 font-mono text-xs font-bold rounded-lg";
      }
    }

    function submitLatihanPgAnswer(idx, btnEl) {
      if (quizSelectedAnswer !== null) return; // Locked
      clearInterval(quizTimerInterval);
      quizSelectedAnswer = idx;

      const q = quizQuestions[currentQuizIndex];
      const isCorrect = (idx === q.correctOptionIndex);

      const parent = btnEl.parentElement;
      parent.querySelectorAll('button').forEach(b => {
        b.className = "w-full text-left p-3 border bg-gray-50/70 text-gray-400 font-medium text-xs rounded-xl flex justify-between items-center cursor-default";
      });

      if (isCorrect) {
        quizScore += 10;
        btnEl.className = "w-full text-left p-3 border-2 border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold text-xs rounded-xl flex justify-between items-center";
        btnEl.querySelector('span:last-child').className = "w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-[10px] text-white";
        btnEl.querySelector('span:last-child').innerHTML = "&check;";
      } else {
        btnEl.className = "w-full text-left p-3 border-2 border-rose-400 bg-rose-50 text-rose-800 font-semibold text-xs rounded-xl flex justify-between items-center";
        btnEl.querySelector('span:last-child').className = "w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center text-[10px] text-white";
        btnEl.querySelector('span:last-child').innerHTML = "&times;";

        // Highlight correct options
        const children = parent.querySelectorAll('button');
        children[q.correctOptionIndex].className = "w-full text-left p-3 border border-emerald-300 bg-emerald-50/55 text-emerald-800 font-semibold text-xs rounded-xl flex justify-between items-center";
      }

      revealLatihanQuizFeedback(isCorrect);
    }

    function submitLatihanIsianAnswer() {
      if (quizSelectedAnswer !== null) return;
      
      const xInput = document.getElementById('lat-input-x').value.trim();
      const yInput = document.getElementById('lat-input-y').value.trim();

      if (!xInput || !yInput) {
        alert("Silakan lengkapi kedua kolom pengerjaan!");
        return;
      }

      clearInterval(quizTimerInterval);
      quizSelectedAnswer = -99; // Marked as processed

      const q = quizQuestions[currentQuizIndex];
      const realX = q.correctAnswer.x;
      const realY = q.correctAnswer.y;

      const isCorrect = (Math.round(Number(xInput)) === realX && Math.round(Number(yInput)) === realY);
      if (isCorrect) {
        quizScore += 10;
      }

      revealLatihanQuizFeedback(isCorrect);
    }

    function handleLatihanQuizTimeout() {
      quizSelectedAnswer = -1; // timed out
      revealLatihanQuizFeedback(false, "Waktu pengerjaan habis!");
    }

    function revealLatihanQuizFeedback(isCorrect, heading) {
      const q = quizQuestions[currentQuizIndex];
      const box = document.getElementById('lat-feedback-box');
      box.classList.remove('hidden');

      const title = heading || (isCorrect ? "✓ JAWABAN ANDA BENAR!" : "✗ JAWABAN KURANG TEPAT!");
      const colorClass = isCorrect ? "bg-emerald-50 border-emerald-250 text-emerald-900" : "bg-rose-50 border-rose-250 text-rose-900";
      
      const explanationText = Array.isArray(q.explanation) ? q.explanation.join("<br/>") : q.explanation;

      box.className = "p-4 rounded-xl border text-xs leading-relaxed space-y-1 " + colorClass;
      box.innerHTML = \`<strong class="font-bold block text-sm">\${title}</strong><p class="mt-1 font-mono text-[10px]">\${explanationText}</p>\`;

      document.getElementById('lat-btn-next').classList.remove('hidden');
    }

    function nextLatihanQuestion() {
      if (currentQuizIndex < quizQuestions.length - 1) {
        currentQuizIndex++;
        renderLatihanQuizQuestionUI();
      } else {
        // Quiz completed
        clearInterval(quizTimerInterval);
        document.getElementById('latihan-gameplay').classList.add('hidden');
        document.getElementById('latihan-result').classList.remove('hidden');
        document.getElementById('lat-fin-score').innerText = quizScore + " / 100";

        saveScoreRecord('latihan', quizLevel.toUpperCase(), quizScore);
      }
    }


    // ==================== TES AKHIR (EVALUASI) SYSTEM ====================
    function startFinalExam() {
      switchTab('tes-akhir');
    }

    function startFinalExamGameplay() {
      document.getElementById('tes-start-panel').classList.add('hidden');
      document.getElementById('tes-gameplay-panel').classList.remove('hidden');
      document.getElementById('tes-result-panel').classList.add('hidden');

      tesActive = true;
      tesQuestions = DATA_TES_AKHIR;
      currentTesIndex = 0;
      tesAnswers = [];
      tesTimeLeft = 2700; // 45 mins

      renderTesQuestionUI();

      clearInterval(tesTimerInterval);
      tesTimerInterval = setInterval(() => {
        tesTimeLeft--;
        updateTesTimerUI();
        if (tesTimeLeft <= 0) {
          clearInterval(tesTimerInterval);
          finishFinalExamAuto();
        }
      }, 1000);
    }

    function updateTesTimerUI() {
      const el = document.getElementById('tes-timer');
      const min = Math.floor(tesTimeLeft / 60);
      const sec = tesTimeLeft % 60;
      el.innerText = "⏰ " + (min<10 ? '0'+min : min) + ":" + (sec<10 ? '0'+sec : sec);
    }

    function renderTesQuestionUI() {
      const q = tesQuestions[currentTesIndex];
      document.getElementById('tes-progress-text').innerText = "Soal " + (currentTesIndex + 1) + " Dari " + tesQuestions.length;
      document.getElementById('tes-badge').innerText = q.context;
      document.getElementById('tes-question-text').innerText = q.questionText;

      const eqBox = document.getElementById('tes-eq-box');
      if (q.eq1 && q.eq2) {
        eqBox.classList.remove('hidden');
        eqBox.innerHTML = \`<span class="block">Persamaan 1: \${q.eq1.display || (q.eq1.a+'x + '+q.eq1.b+'y = '+q.eq1.c)}</span>
                            <span class="block">Persamaan 2: \${q.eq2.display || (q.eq2.a+'x + '+q.eq2.b+'y = '+q.eq2.c)}</span>\`;
      } else {
        eqBox.classList.add('hidden');
      }

      const pgDiv = document.getElementById('tes-pg-options');
      const isianDiv = document.getElementById('tes-isian-box');
      
      // Reset inputs
      document.getElementById('tes-input-x').value = '';
      document.getElementById('tes-input-y').value = '';

      if (q.type === 'pg') {
        pgDiv.classList.remove('hidden');
        isianDiv.classList.add('hidden');

        pgDiv.innerHTML = q.options.map((opt, idx) => {
          return \`<button onclick="selectTesPgOption(\${idx}, this)" class="tes-opt-btn w-full text-left p-3.5 bg-white border rounded-xl hover:bg-amber-50 font-medium text-xs flex justify-between items-center transition">
            <span>\${opt}</span>
            <span class="w-3.5 h-3.5 rounded-full border border-gray-300"></span>
          </button>\`;
        }).join('');
      } else {
        pgDiv.classList.add('hidden');
        isianDiv.classList.remove('hidden');
      }
    }

    let currentSelectedTesIdx = null;
    function selectTesPgOption(idx, el) {
      currentSelectedTesIdx = idx;
      // Mark selection visual
      const siblings = el.parentElement.querySelectorAll('button');
      siblings.forEach((sib, i) => {
        if (i === idx) {
          sib.className = "tes-opt-btn w-full text-left p-3.5 border-2 border-[#C9A84C] bg-amber-50/40 font-bold text-xs rounded-xl flex justify-between items-center";
          sib.querySelector('span:last-child').className = "w-3.5 h-3.5 rounded-full bg-[#C9A84C]";
        } else {
          sib.className = "tes-opt-btn w-full text-left p-3.5 bg-white border rounded-xl hover:bg-amber-50 font-medium text-xs flex justify-between items-center";
          sib.querySelector('span:last-child').className = "w-3.5 h-3.5 rounded-full border border-gray-300";
        }
      });
    }

    function submitTesQuestionNext() {
      const q = tesQuestions[currentTesIndex];
      let isCorrect = false;

      if (q.type === 'pg') {
        if (currentSelectedTesIdx === null) {
          alert("Silakan klik salah satu opsi jawaban!");
          return;
        }
        isCorrect = (currentSelectedTesIdx === q.correctOptionIndex);
        tesAnswers.push({ selectedIdx: currentSelectedTesIdx, isCorrect: isCorrect });
        currentSelectedTesIdx = null;
      } else {
        const xVal = document.getElementById('tes-input-x').value.trim();
        const yVal = document.getElementById('tes-input-y').value.trim();
        if (!xVal || !yVal) {
          alert("Silakan lengkapi kedua nilai variabel!");
          return;
        }
        isCorrect = (Math.round(Number(xVal)) === q.correctAnswer.x && Math.round(Number(yVal)) === q.correctAnswer.y);
        tesAnswers.push({ x: Math.round(Number(xVal)), y: Math.round(Number(yVal)), isCorrect: isCorrect });
      }

      if (currentTesIndex < tesQuestions.length - 1) {
        currentTesIndex++;
        renderTesQuestionUI();
      } else {
        // Complete Exam
        finishFinalExam();
      }
    }

    function finishFinalExam() {
      clearInterval(tesTimerInterval);
      tesActive = false;

      // Compute total correct
      let totalCorrect = 0;
      tesAnswers.forEach(ans => {
        if (ans.isCorrect) totalCorrect++;
      });

      const score = totalCorrect * 10;

      document.getElementById('tes-gameplay-panel').classList.add('hidden');
      document.getElementById('tes-result-panel').classList.remove('hidden');
      document.getElementById('tes-final-score').innerText = score + " / 100";

      // Save Score
      saveScoreRecord('tes-akhir', 'EVALUASI', score);

      // Populate explanations complete
      const expBox = document.getElementById('tes-pembahasan-box');
      expBox.innerHTML = tesQuestions.map((q, i) => {
        const userA = tesAnswers[i];
        const isCorrect = userA ? userA.isCorrect : false;
        const stateColor = isCorrect ? 'text-emerald-700' : 'text-rose-700';
        const expStr = Array.isArray(q.explanation) ? q.explanation.join("<br/>") : q.explanation;
        
        return \`<div class="p-3 border-b pb-3 space-y-1">
          <p class="font-bold font-serif text-[#6B3A2A]">Soal \${i+1}: \${q.questionText}</p>
          <div class="text-[10px] font-mono leading-relaxed bg-gray-50 p-2 border rounded-md">
            Pembahasan: <br/> \${expStr}
          </div>
          <span class="text-[9px] font-black \${stateColor}">Hasil Anda: \${isCorrect ? 'BENAR' : 'SALAH'}</span>
        </div>\`;
      }).join('');
    }

    function finishFinalExamAuto() {
      // Auto fill with incorrect for empty responses
      while (tesAnswers.length < tesQuestions.length) {
        tesAnswers.push({ isCorrect: false });
      }
      finishFinalExam();
    }

    let showExplanations = false;
    function togglePembahasan() {
      showExplanations = !showExplanations;
      const el = document.getElementById('tes-pembahasan-box');
      if (showExplanations) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    }

    function stopExamTimer() {
      clearInterval(tesTimerInterval);
    }

    function resetTesPanel() {
      document.getElementById('tes-start-panel').classList.remove('hidden');
      document.getElementById('tes-gameplay-panel').classList.add('hidden');
      document.getElementById('tes-result-panel').classList.add('hidden');
      switchTab('beranda');
    }


    // ==================== RIWAYAT SCORING TABLE ====================
    function updateRiwayatListUI() {
      const list = document.getElementById('riwayat-list');
      const records = getScoresFromStorage();

      if (records.length === 0) {
        list.className = "flex flex-col items-center justify-center p-6 text-center text-gray-400 bg-white border rounded-2xl";
        list.innerHTML = \`<span class="text-xl">🫙</span><p class="text-[11px] font-medium mt-1">Belum ada riwayat pengerjaan nilai kuis.</p>\`;
        return;
      }

      list.className = "space-y-2 max-h-[500px] overflow-y-auto";
      list.innerHTML = records.map((r, i) => {
        let title = "Gladhen Latihan";
        let colorClass = "border-l-4 border-[#5B8A52] bg-[#5B8A52]/5";
        
        if (r.type === 'tes-akhir') {
          title = "Evaluasi Pendadaran Akhir";
          colorClass = "border-l-4 border-[#C9A84C] bg-amber-50/50";
        }

        return \`<div class="p-3 bg-white border rounded-xl flex justify-between items-center shadow-xs \${colorClass}">
          <div>
            <span class="text-[10px] font-black font-serif text-[#6B3A2A] block uppercase">\${title}</span>
            <span class="text-[9px] font-mono text-gray-400 block mt-0.5">\${r.date} • Level \${r.level}</span>
          </div>
          <div class="text-right">
            <span class="font-mono text-lg font-black text-[#6B3A2A] block">\${r.score}</span>
            <span class="text-[8px] uppercase tracking-wide bg-[#6B3A2A]/5 text-[#6B3A2A] px-1 rounded font-bold font-mono">Nilai</span>
          </div>
        </div>\`;
      }).reverse().join('');
    }

    function clearHistoryRecords() {
      const confirmClear = confirm("Apakah kamu yakin ingin melenyapkan seluruh riwayat pengerjaan?");
      if (confirmClear) {
        localStorage.removeItem('batikmath_scores');
        updateRiwayatListUI();
      }
    }
  </script>
</body>
</html>`;
}
