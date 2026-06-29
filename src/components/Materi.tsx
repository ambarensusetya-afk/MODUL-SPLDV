import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, BookOpen, Layers, HelpCircle, LayoutGrid, Route, Award, ArrowRight } from 'lucide-react';
import { TabType } from '../types';

interface MateriProps {
  initialIndex?: number;
  onNavigateTab: (tab: TabType) => void;
  onSetMateriIndexCallback?: (callback: (index: number) => void) => void;
}

export default function Materi({ initialIndex = 0, onNavigateTab, onSetMateriIndexCallback }: MateriProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Expose set current index to parent
  React.useEffect(() => {
    if (onSetMateriIndexCallback) {
      onSetMateriIndexCallback((index: number) => {
        if (index >= 0 && index < 10) {
          setCurrentIndex(index);
        }
      });
    }
  }, [onSetMateriIndexCallback]);

  const chapters = [
    // 1. Pengenalan PLDV & SPLDV
    {
      title: "Pengenalan PLDV dan SPLDV",
      context: "Pengrajin batik Yogyakarta membuat pola kombinasi bunga dan kawung. Setiap jenis motif punya harga berbeda. Bagaimana menghitung harga total?",
      badge: "Dasar",
      color: "border-batik-blue",
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-batik-surface-dark border-l-4 border-batik-blue rounded-xl">
            <h4 className="font-serif font-bold text-batik-blue text-sm mb-2">1. Definisi PLDV (Persamaan Linear Dua Variabel)</h4>
            <div className="text-xs space-y-1 text-batik-dark font-sans">
              <p>PLDV adalah persamaan matematika yang memiliki <strong>dua variabel</strong> (misalnya x dan y), dan pangkat tertinggi dari masing-masing variabel adalah <strong>satu</strong>.</p>
              <p className="bg-white p-2 rounded border border-batik-blue/20 font-mono mt-2 text-center text-sm">
                Bentuk Umum: ax + by = c (a, b &ne; 0)
              </p>
              <p className="mt-1">Contoh: <code className="bg-white px-1.5 py-0.5 rounded border border-gray-200">2x + 3y = 12</code>, di mana x dan y adalah variabel, 2 dan 3 adalah koefisien, serta 12 adalah konstanta.</p>
            </div>
          </div>

          <div className="p-4 bg-batik-surface-dark border-l-4 border-batik-brown rounded-xl">
            <h4 className="font-serif font-bold text-batik-brown text-sm mb-2">2. Definisi SPLDV (Sistem Persamaan Linear Dua Variabel)</h4>
            <div className="text-xs space-y-1 text-batik-dark font-sans">
              <p>SPLDV adalah kumpulan dari <strong>dua atau lebih</strong> persamaan linear dua variabel yang saling berhubungan dan memiliki satu pasang nilai penyelesaian yang sama.</p>
              <div className="bg-white p-3 rounded border border-batik-brown/20 font-mono mt-2 text-center text-sm">
                a₁x + b₁y = c₁<br />
                a₂x + b₂y = c₂
              </div>
              <p className="mt-2">Tujuan utama SPLDV adalah mencari satu nilai x dan y yang sekaligus memuaskan kedua persamaan tersebut.</p>
            </div>
          </div>

          <div className="p-4 bg-white border border-batik-gold/30 rounded-xl space-y-2">
            <h4 className="font-serif font-semibold text-batik-dark text-xs uppercase tracking-wider">Contoh Konteks Batik Yogyakarta:</h4>
            <div className="text-xs space-y-2 font-sans bg-[#FAF7EE] p-3 rounded-lg border border-batik-gold/20">
              <p>Misalkan:</p>
              <ul className="list-disc list-inside pl-1 space-y-1">
                <li>Motif Bunga per potong = <code className="bg-white px-1 font-bold text-batik-blue">x</code> (Rp10.000)</li>
                <li>Motif Kawung per potong = <code className="bg-white px-1 font-bold text-batik-brown">y</code> (Rp8.000)</li>
              </ul>
              <div className="border-t border-gray-200 my-2 pt-2">
                <p><strong>Pembeli A:</strong> Membeli 2 potong motif bunga &amp; 3 potong motif kawung.</p>
                <p className="font-mono bg-white p-1 rounded border text-left mt-1">2x + 3y = 44.000 ... (1)</p>
              </div>
              <div>
                <p><strong>Pembeli B:</strong> Membeli 1 potong motif bunga &amp; 2 potong motif kawung.</p>
                <p className="font-mono bg-white p-1 rounded border text-left mt-1">x + 2y = 26.000 ... (2)</p>
              </div>
              <p className="text-xs font-semibold text-batik-green mt-2">
                &rarr; Pasangan penyelesaian tunggal yang memenuhi kedua persamaan adalah: x = 10.000 dan y = 8.000.
              </p>
            </div>
          </div>

          {/* Side-by-Side SVG Coordinates */}
          <div className="bg-white border border-batik-gold/20 p-4 rounded-xl flex flex-col items-center">
            <h5 className="font-serif text-xs font-bold text-batik-brown mb-2 text-center">
              Perbedaan Geometri: 1 Garis vs Titik Potong 2 Garis
            </h5>
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-batik-muted mb-1 font-medium">1 Persamaan saja (Banyak Solusi)</span>
                <svg className="w-full max-w-[120px] aspect-square bg-[#FAF7EE] rounded border border-gray-200" viewBox="0 0 100 100">
                  <line x1="10" y1="50" x2="90" y2="50" stroke="#ccc" strokeWidth="0.5" />
                  <line x1="50" y1="10" x2="50" y2="90" stroke="#ccc" strokeWidth="0.5" />
                  {/* Single Line */}
                  <line x1="20" y1="80" x2="80" y2="20" stroke="#2C4A7C" strokeWidth="2" />
                  <circle cx="50" cy="50" r="2.5" fill="#2C4A7C" />
                  <circle cx="35" cy="65" r="2.5" fill="#2C4A7C" />
                  <circle cx="65" cy="35" r="2.5" fill="#2C4A7C" />
                </svg>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-batik-muted mb-1 font-medium">SPLDV / 2 Persamaan (1 Solusi Unik)</span>
                <svg className="w-full max-w-[120px] aspect-square bg-[#FAF7EE] rounded border border-gray-200" viewBox="0 0 100 100">
                  <line x1="10" y1="50" x2="90" y2="50" stroke="#ccc" strokeWidth="0.5" />
                  <line x1="50" y1="10" x2="50" y2="90" stroke="#ccc" strokeWidth="0.5" />
                  {/* Line 1 */}
                  <line x1="20" y1="80" x2="80" y2="20" stroke="#2C4A7C" strokeWidth="1.5" />
                  {/* Line 2 */}
                  <line x1="20" y1="30" x2="80" y2="70" stroke="#6B3A2A" strokeWidth="1.5" />
                  {/* Solution Dot */}
                  <circle cx="56" cy="44" r="4.5" fill="#C9A84C" stroke="#fff" strokeWidth="1.5" />
                  <text x="56" y="36" fontSize="8" fontWeight="bold" fill="#C9A84C" textAnchor="middle">Solusi</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // 2. Metode Substitusi
    {
      title: "Metode Substitusi",
      context: "Pengrajin punya catatan 2 resep campuran pewarna soga. Dengan metode substitusi (mengganti), dia bisa mengetahui jumlah tepat setiap warna.",
      badge: "Level 1",
      color: "border-batik-blue",
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-batik-surface-dark border-l-4 border-batik-blue rounded-xl space-y-2">
            <h4 className="font-serif font-bold text-batik-blue text-sm">Langkah-Langkah Substitusi:</h4>
            <ol className="text-xs space-y-1.5 text-batik-dark list-decimal pl-4 font-sans leading-relaxed">
              <li>Pilih salah satu persamaan yang paling sederhana, lalu nyatakan salah satu variabel dalam variabel lain (contoh: <code className="bg-white px-1">x = ...</code> atau <code className="bg-white px-1">y = ...</code>).</li>
              <li>Sustitusikan (gantikan) nilai variabel tersebut ke dalam persamaan yang kedua.</li>
              <li>Selesaikan persamaan linear satu variabel yang terbentuk untuk mendapat nilai satu variabel.</li>
              <li>Substitusikan balik nilai variabel yang didapat tersebut ke persamaan pertama untuk mencari variabel kedua.</li>
            </ol>
          </div>

          {/* Highlight Box */}
          <div className="bg-[#FAF7EE] border-2 border-dashed border-batik-blue rounded-xl p-3">
            <span className="text-[10px] font-bold text-batik-blue uppercase tracking-wider block mb-1">Rumus Visual Substitusi</span>
            <div className="bg-white p-2.5 rounded font-mono text-xs text-batik-dark space-y-1">
              <p>Persamaan (1): <strong className="text-batik-blue">x = 2y + 5</strong></p>
              <p>Persamaan (2): 3<strong className="text-batik-blue">(2y + 5)</strong> + 4y = 29</p>
              <p className="pl-4 text-batik-muted">&darr;</p>
              <p className="pl-4">6y + 15 + 4y = 29 &rArr; 10y = 14 &rArr; <strong className="text-batik-green">y = 1.4</strong></p>
              <p>Substitusi balik: x = 2(<strong className="text-batik-green">1.4</strong>) + 5 = <strong className="text-batik-blue">7.8</strong></p>
            </div>
          </div>

          <div className="bg-white border border-batik-gold/30 rounded-xl p-4">
            <h4 className="font-serif text-xs font-bold text-batik-brown uppercase mb-2">Contoh Pembahasan Nyata:</h4>
            <div className="text-xs space-y-2 text-batik-dark font-sans">
              <p className="font-semibold text-batik-brown">Masalah Kain Yogyakarta:</p>
              <p className="italic bg-[#FAF7EE] p-2 rounded">
                Tiga lembar kain A + dua lembar kain B = Rp700.000 ... (1)<br />
                Satu lembar kain A + satu lembar kain B = Rp300.000 ... (2)
              </p>
              <div className="space-y-1.5 pt-1.5 pl-2 border-l-2 border-batik-gold">
                <p><strong>Langkah 1:</strong> Dari pers (2), ubah bentuknya:<br />
                  <code className="bg-gray-100 px-1 font-bold">A = 300.000 - B</code> ... (*)</p>
                <p><strong>Langkah 2:</strong> Masukkan (*) ke pers (1):<br />
                  <code className="bg-gray-100 px-1">3(300.000 - B) + 2B = 700.000</code><br />
                  <code className="bg-gray-100 px-1">900.000 - 3B + 2B = 700.000</code><br />
                  <code className="bg-gray-100 px-1">-B = -200.000</code> &rArr; <code className="bg-gray-100 px-1 font-bold text-batik-green">B = 200.000</code></p>
                <p><strong>Langkah 3:</strong> Substitusikan balik nilai B ke dalam (*):<br />
                  <code className="bg-gray-100 px-1">A = 300.000 - 200.000 = 100.000</code></p>
              </div>
              <p className="font-bold text-batik-green mt-2">&check; Hasil akhir: A = Rp100.000, B = Rp200.000</p>
            </div>
          </div>

          {/* Pros / Cons */}
          <div className="grid grid-cols-2 gap-3 text-[11px]">
            <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg">
              <strong className="text-emerald-800 block mb-1">✓ Keutamaan</strong>
              Sangat efisien jika salah satu variabel memiliki koefisien 1 atau -1 (mudah diisolasi).
            </div>
            <div className="bg-rose-50 border border-rose-200 p-2.5 rounded-lg">
              <strong className="text-rose-800 block mb-1">✗ Kelemahan</strong>
              Cukup rumit jika koefisien variabel berupa angka besar, negatif, atau pecahan yang sulit dioperasikan.
            </div>
          </div>
        </div>
      )
    },

    // 3. Metode Eliminasi
    {
      title: "Metode Eliminasi",
      context: "Pengrajin ingin melenyapkan/menghilangkan (eliminasi) salah satu variabel soga secara cerdas.",
      badge: "Level 1",
      color: "border-batik-gold",
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-batik-surface-dark border-l-4 border-batik-gold rounded-xl space-y-2">
            <h4 className="font-serif font-bold text-batik-gold text-sm">Langkah-Langkah Eliminasi:</h4>
            <ol className="text-xs space-y-1.5 text-batik-dark list-decimal pl-4 font-sans leading-relaxed">
              <li>Samakan koefisien variabel yang akan dieliminasi dengan cara mengalikan kedua persamaan dengan angka tertentu.</li>
              <li>Jika koefisien bertanda sama (keduanya + ataueduanya -), <strong>kurangkan</strong> kedua persamaan.</li>
              <li>Jika koefisien bertanda beda (+ dan -), <strong>tambahkan</strong> kedua persamaan.</li>
              <li>Selesaikan persamaan satu variabel baru yang tersisa untuk mendapat nilai variabel tersebut.</li>
            </ol>
          </div>

          {/* Highlight Box */}
          <div className="bg-[#FAF7EE] border-2 border-dashed border-batik-gold rounded-xl p-3">
            <span className="text-[10px] font-bold text-batik-gold uppercase tracking-wider block mb-1">Strategi Penyetaraan Koefisian</span>
            <div className="bg-white p-2.5 rounded font-mono text-xs text-batik-dark space-y-1">
              <p>Persamaan (1): 2x + 3y = 12</p>
              <p>Persamaan (2): x + 2y = 7</p>
              <p className="text-blue-800 font-semibold">&rArr; Ingin eliminasi x? Kalikan (2) dengan 2:</p>
              <p className="pl-4 text-emerald-800">2x + 4y = 14 ... (2&apos;)</p>
              <p className="text-rose-800 font-semibold">&rArr; Kurangi (2&apos;) dengan (1):</p>
              <p className="pl-4">(2x + 4y) - (2x + 3y) = 14 - 12 &rArr; <strong className="text-batik-gold">y = 2</strong></p>
            </div>
          </div>

          <div className="bg-white border border-batik-gold/30 rounded-xl p-4">
            <h4 className="font-serif text-xs font-bold text-batik-brown uppercase mb-2">Contoh Kasus Eliminasi:</h4>
            <div className="text-xs space-y-2 text-batik-dark font-sans">
              <p className="italic bg-[#FAF7EE] p-2 rounded text-center">
                Persamaan (1): 2A + B = 350.000<br />
                Persamaan (2): 3A + 2B = 600.000
              </p>
              <div className="space-y-1.5 pl-2 border-l-2 border-batik-gold">
                <p><strong>Langkah 1:</strong> Kalikan pers (1) dengan 2 untuk menyamakan koefisien B:</p>
                <p className="font-mono bg-gray-100 p-1 pl-3 rounded">4A + 2B = 700.000 ... (1&apos;)</p>
                <p><strong>Langkah 2:</strong> Kurangkan pers (1&apos;) dengan pers (2) semula:</p>
                <p className="font-mono bg-gray-100 p-1.5 pl-3 rounded whitespace-pre-line">
                  (4A + 2B) - (3A + 2B) = 700.000 - 600.000
                  &rArr; <span className="font-bold text-batik-gold">A = 100.000</span>
                </p>
                <p><strong>Langkah 3:</strong> Selesaikan B dengan substitusi balik A ke pers (1):</p>
                <p className="font-mono bg-gray-100 p-1 pl-3 rounded">2(100.000) + B = 350.000 &rArr; B = Rp150.000</p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // 4. Rangkuman Substitusi & Eliminasi
    {
      title: "Rangkuman: Substitusi & Eliminasi",
      context: "Memahami perbedaan operasional dan keselarasan kedua metode mendasar.",
      badge: "Ringkasan",
      color: "border-batik-gold",
      content: (
        <div className="space-y-4">
          <p className="text-xs text-batik-dark leading-relaxed font-sans">
            Meskipun cara kerjanya berbeda, metode substitusi dan metode eliminasi pasti akan selalu menghasilkan koordinat jawaban solusi (x, y) yang sama persis.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-batik-brown text-white font-serif">
                  <th className="p-2 border border-batik-gold">Aspek</th>
                  <th className="p-2 border border-batik-gold">Metode Substitusi</th>
                  <th className="p-2 border border-batik-gold">Metode Eliminasi</th>
                </tr>
              </thead>
              <tbody className="font-sans text-batik-dark">
                <tr className="bg-white">
                  <td className="p-2 border border-gray-200 font-semibold">Langkah 1</td>
                  <td className="p-2 border border-gray-200">Isolasi sebuah variabel di satu ruas terpisah</td>
                  <td className="p-2 border border-gray-200">Samakan nilai mutlak koefisien variabel sasaran</td>
                </tr>
                <tr className="bg-[#FAF7EE]">
                  <td className="p-2 border border-gray-200 font-semibold">Langkah 2</td>
                  <td className="p-2 border border-gray-200">Substitusikan variabel tersebut ke persamaan kedua</td>
                  <td className="p-2 border border-gray-200">Jumlahkan atau kurangkan kedua persamaan itu</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-2 border border-gray-200 font-semibold">Paling Cocok</td>
                  <td className="p-2 border border-gray-200 text-batik-blue font-semibold">Variabel berkoefisien 1 atau -1</td>
                  <td className="p-2 border border-gray-200 text-batik-gold font-semibold">Koefisien mudah dikalikan / disetarakan</td>
                </tr>
                <tr className="bg-[#FAF7EE]">
                  <td className="p-2 border border-gray-200 font-semibold">Tingkat Kesulitan</td>
                  <td className="p-2 border border-gray-200">Bisa memicu angka pecahan yang rumit di tengah jalan</td>
                  <td className="p-2 border border-gray-200">Memerlukan ekstra perkalian kelipatan di awal langkah</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-yellow-50 border-l-4 border-batik-gold rounded-xl">
            <h5 className="font-bold text-xs text-amber-800 mb-1 flex items-center gap-1">💡 Tips Sukses SMP:</h5>
            <ul className="text-[11px] text-amber-900 space-y-1 list-disc list-inside">
              <li>Pilih metode menyamping setelah mengamati koefisien koor sistem dahulu.</li>
              <li>Selalu uji kebenaran titik (x, y) kamu dengan mensubstitusikan angka tersebut ke kedua persamaan asli.</li>
            </ul>
          </div>
        </div>
      )
    },

    // 5. Glosarium
    {
      title: "Glosarium: Istilah Penting",
      context: "Kamus kecil istilah matematika Aljabar Linear khusus untuk siswa SMP kelas 8-9.",
      badge: "Kamus",
      color: "border-batik-green",
      content: (
        <div className="space-y-3">
          {[
            { term: "Variabel", desc: "Simbol (biasanya ditulis x, y, m, n atau a, b) yang melambangkan suatu nilai yang belum diketahui secara pasti." },
            { term: "Koefisien", desc: "Angka konstanta yang bersanding langsung di depan variabel. Contohnya angka 3 pada suku aljabar 3x." },
            { term: "Konstanta", desc: "Suku aljabar yang berdiri sendiri berupa angka murni tanpa disandingi variabel di belakangnya." },
            { term: "PLDV", desc: "Singkatan dari Persamaan Linear Dua Variabel. Sebuah kesetaraan aljabar linear berpangkat tertinggi satu." },
            { term: "SPLDV", desc: "Sistem Persamaan Linear Dua Variabel. Gabungan dari sekumpulan PLDV simultan untuk dicari satu solusinya." },
            { term: "Solusi", desc: "Nilai penentu variabel (x, y) yang bernilai benar bila disubstitusikan ke dalam sistem persamaan." },
            { term: "Substitusi", desc: "Teknik penyelesaian dengan cara mengganti ekspresi suatu variabel dengan ekspresi variabel yang sepadan." },
            { term: "Eliminasi", desc: "Teknik melenyapkan salah satu variabel sasaran dari sistem lewat operasi selisih atau jumlah." },
            { term: "Kombinasi", desc: "Gabungan bertahap taktis antara teknik eliminasi di langkah utama lalu dilanjutkan substitusi di langkah akhir." }
          ].map((item, idx) => (
            <div key={idx} className="p-3 bg-white border border-gray-200 rounded-lg hover:border-batik-gold/30 transition-colors">
              <strong className="text-xs text-batik-brown font-serif block">{item.term}</strong>
              <p className="text-[11px] text-batik-muted mt-1 leading-normal font-sans">{item.desc}</p>
            </div>
          ))}
        </div>
      )
    },

    // 6. Eksplorasi Redirect
    {
      title: "Eksplorasi Mandiri",
      context: "Waktunya mengasah intuisi visual matematika dengan simulator interaktif grafik batik Yogyakarta.",
      badge: "Eksplorasi",
      color: "border-batik-brown",
      content: (
        <div className="space-y-4 text-center py-6">
          <div className="mx-auto w-16 h-16 bg-batik-surface-dark border border-batik-gold rounded-full flex items-center justify-center text-batik-brown mb-4">
            <Route className="w-8 h-8" />
          </div>
          <h4 className="font-serif font-bold text-batik-brown text-md">Ingin Merekayasa Persamaan Sendiri?</h4>
          <p className="text-xs text-batik-muted max-w-sm mx-auto font-sans leading-relaxed">
            Pada menu Eksplorasi, kamu dapat mengubah koefisien a, b, dan c sesukamu menggunakan slider, dan melihat garis koordinat bergeser real-time!
          </p>
          <button
            onClick={() => onNavigateTab('eksplorasi')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-batik-brown text-white font-bold text-xs rounded-lg hover:bg-batik-brown/90 transition shadow cursor-pointer mx-auto mt-4 font-sans"
          >
            Buka Menu Eksplorasi <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )
    },

    // 7. Peta Konsep
    {
      title: "Peta Konsep SPLDV",
      context: "Diagram visual rute pemetaan materi Sistem Persamaan Linear Dua Variabel. Klik pada kotak berlogo untuk langsung lompat ke materi terkait!",
      badge: "Peta",
      color: "border-batik-green",
      content: (
        <div className="space-y-4 flex flex-col items-center">
          {/* Node Clicking Interactivity Banner */}
          <span className="text-[10px] bg-batik-green/10 text-batik-green px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
            💡 Klik Node di Bawah untuk Memilih Bab!
          </span>

          <div className="w-full bg-white border border-batik-gold/30 rounded-xl p-3 flex justify-center">
            <svg className="w-full max-w-[340px] h-auto" viewBox="0 0 320 280">
              {/* Main SPLDV Node */}
              <g className="cursor-pointer group" onClick={() => setCurrentIndex(0)}>
                <rect x="75" y="10" width="170" height="40" rx="8" fill="#6B3A2A" stroke="#C9A84C" strokeWidth="2" className="group-hover:fill-[#542d20] transition-colors" />
                <text x="160" y="34" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Lora">SPLDV (2 Persamaan)</text>
              </g>

              {/* Path Lines */}
              <line x1="160" y1="50" x2="160" y2="90" stroke="#8B7355" strokeWidth="2" />
              <line x1="85" y1="90" x2="235" y2="90" stroke="#8B7355" strokeWidth="2" />
              <line x1="85" y1="90" x2="85" y2="110" stroke="#8B7355" strokeWidth="2" />
              <line x1="235" y1="90" x2="235" y2="110" stroke="#8B7355" strokeWidth="2" />

              {/* Sub Node 1: Aljabar */}
              <g className="cursor-pointer group" onClick={() => setCurrentIndex(0)}>
                <rect x="30" y="110" width="110" height="35" rx="6" fill="#2C4A7C" stroke="#C9A84C" strokeWidth="1.5" className="group-hover:fill-[#1f3457] transition-colors" />
                <text x="85" y="131" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Nunito">Metode Aljabar</text>
              </g>

              {/* Sub Node 2: Grafik */}
              <g className="cursor-pointer group" onClick={() => setCurrentIndex(8)}>
                <rect x="180" y="110" width="110" height="35" rx="6" fill="#FAF7EE" stroke="#6B3A2A" strokeWidth="2" className="group-hover:bg-gray-100 transition-colors" />
                <text x="235" y="131" fill="#6B3A2A" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Nunito">Metode Grafik</text>
              </g>

              {/* Connector paths for Aljabar split */}
              <line x1="85" y1="145" x2="85" y2="170" stroke="#8B7355" strokeWidth="1.5" />
              <line x1="30" y1="170" x2="140" y2="170" stroke="#8B7355" strokeWidth="1.5" />
              <line x1="30" y1="170" x2="30" y2="190" stroke="#8B7355" strokeWidth="1.5" />
              <line x1="140" y1="170" x2="140" y2="190" stroke="#8B7355" strokeWidth="1.5" />

              {/* Substitusi Node */}
              <g className="cursor-pointer group" onClick={() => setCurrentIndex(1)}>
                <rect x="5" y="190" width="85" height="30" rx="5" fill="#2C4A7C" stroke="#C9A84C" strokeWidth="1" className="group-hover:fill-[#1e3357] transition-colors" />
                <text x="47" y="208" fill="#FFFFFF" fontSize="10" textAnchor="middle" fontFamily="Nunito">Substitusi</text>
              </g>

              {/* Eliminasi Node */}
              <g className="cursor-pointer group" onClick={() => setCurrentIndex(2)}>
                <rect x="95" y="190" width="85" height="30" rx="5" fill="#C9A84C" stroke="#2C4A7C" strokeWidth="1" className="group-hover:fill-[#b59640] transition-colors" />
                <text x="137" y="208" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Nunito">Eliminasi</text>
              </g>

              {/* Connector from Substitusi & Eliminasi to Kombinasi */}
              <line x1="47" y1="220" x2="47" y2="235" stroke="#2C4A7C" strokeWidth="1" />
              <line x1="137" y1="220" x2="137" y2="235" stroke="#2C4A7C" strokeWidth="1" />
              <line x1="47" y1="235" x2="137" y2="235" stroke="#2C4A7C" strokeWidth="1" />
              <line x1="92" y1="235" x2="92" y2="245" stroke="#2C4A7C" strokeWidth="1" />

              {/* Kombinasi Node */}
              <g className="cursor-pointer group" onClick={() => setCurrentIndex(7)}>
                <rect x="50" y="245" width="85" height="30" rx="5" fill="#5B8A52" stroke="#FAF7EE" strokeWidth="1" className="group-hover:fill-[#4a7042] transition-colors" />
                <text x="92" y="263" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Nunito">Kombinasi</text>
              </g>
            </svg>
          </div>
        </div>
      )
    },

    // 8. Metode Kombinasi
    {
      title: "Metode Kombinasi",
      context: "Pengrajin soga menggabungkan teknik substitusi dan eliminasi untuk perpaduan efisiensi terbaik.",
      badge: "Level 2",
      color: "border-batik-green",
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-batik-surface-dark border-l-4 border-batik-green rounded-xl text-xs space-y-1 text-batik-dark font-sans leading-relaxed">
            <p><strong>Metode Kombinasi (Campuran)</strong> adalah teknik pengerjaan SPLDV dengan menggabungkan dua cara sekaligus:</p>
            <ol className="list-decimal pl-4 space-y-1 mt-1">
              <li>Mula-mula gunakan teknik <strong>Eliminasi</strong> untuk menyingkirkan variabel pertama.</li>
              <li>Setelah nilai salah satu variabel pertama diperoleh, gunakan teknik <strong>Substitusi</strong> untuk mendapat variabel kedua dengan cepat.</li>
            </ol>
            <p className="mt-1 font-semibold text-batik-green">&rArr; Metode ini adalah yang paling sering disukai karena mengantisipasi kelipatan berlebihan.</p>
          </div>

          <div className="bg-white border border-batik-gold/30 rounded-xl p-4">
            <h4 className="font-serif text-xs font-bold text-batik-brown uppercase mb-2">Contoh Kerja Kombinasi:</h4>
            <div className="text-xs space-y-2 text-batik-dark font-sans">
              <p className="italic bg-[#FAF7EE] p-2 rounded">
                Persamaan (1): 2x + 3y = 23<br />
                Persamaan (2): 3x + 2y = 22
              </p>

              <div className="space-y-2 pl-2 border-l-2 border-batik-green">
                <div>
                  <p className="font-bold text-batik-brown">Langkah 1: Eliminasi x</p>
                  <p>Kalikan (1) dengan 3, kalikan (2) dengan 2:</p>
                  <p className="font-mono bg-gray-100 p-1 rounded mt-1">
                    6x + 9y = 69 ... (1&apos;)<br />
                    6x + 4y = 44 ... (2&apos;)
                  </p>
                  <p>Kurangkan: 5y = 25 &rArr; <strong className="text-batik-green">y = 5</strong></p>
                </div>

                <div>
                  <p className="font-bold text-batik-brown">Langkah 2: Substitusi balik y = 5 ke pers (1)</p>
                  <p className="font-mono bg-gray-100 p-1.5 rounded mt-1">
                    2x + 3(5) = 23<br />
                    2x + 15 = 23<br />
                    2x = 8 &rArr; <strong className="text-batik-blue">x = 4</strong>
                  </p>
                </div>
              </div>
              <p className="font-bold text-batik-green mt-2">&check; Pasangan Solusi Akhir: x = 4, y = 5</p>
            </div>
          </div>
        </div>
      )
    },

    // 9. Metode Grafik
    {
      title: "Metode Grafik",
      context: "Pengrajin memvisualisasikan dua resep pewarna di grafik Cartesian untuk melihat letak solusi persimpangan.",
      badge: "Grafik",
      color: "border-batik-brown",
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-batik-surface-dark border-l-4 border-batik-brown rounded-xl text-xs space-y-1.5 text-batik-dark font-sans leading-relaxed">
            <p>Secara geometris, setiap persamaan linear dua variabel dapat digambarkan sebagai sebuah <strong>garis lurus</strong> di bidang koordinat Cartesian.</p>
            <p><strong>Metode Grafik</strong> mencari koordinat titik persekutuan (titik potong atau persimpangan) yang dilalui oleh kedua garis SPLDV tersebut.</p>
            <p>Koordinat titik potong tersebut <code className="bg-white px-1.5 font-bold">(x, y)</code> merupakan solusi murni dari SPLDV.</p>
          </div>

          <div className="bg-[#FAF7EE] border-2 border-dashed border-batik-brown rounded-xl p-3">
            <span className="text-[10px] font-bold text-batik-brown uppercase tracking-wider block mb-1">Mencari Koordinat Titik Garis</span>
            <div className="bg-white p-2.5 rounded font-mono text-[11px] text-batik-dark space-y-1">
              <p>Persamaan (1): 2x + y = 5 &rArr; <strong className="text-batik-brown">y = -2x + 5</strong></p>
              <p className="mt-1">Tiga titik bantu utama:</p>
              <p>• Jika x = 0 &rArr; y = 5 &rArr; <code className="bg-gray-100 px-1">(0, 5)</code></p>
              <p>• Jika x = 1 &rArr; y = 3 &rArr; <code className="bg-gray-100 px-1">(1, 3)</code></p>
              <p>• Jika x = 2 &rArr; y = 1 &rArr; <code className="bg-gray-100 px-1">(2, 1)</code></p>
            </div>
          </div>

          <div className="bg-white border border-batik-gold/30 rounded-xl p-4">
            <h4 className="font-serif text-xs font-bold text-batik-brown uppercase mb-2">Contoh Kasus Grafik:</h4>
            <div className="text-xs space-y-2 text-batik-dark font-sans">
              <p className="font-semibold text-batik-brown">Persamaan:</p>
              <p className="italic bg-[#FAF7EE] p-2 rounded">
                (1) x + y = 10 &rArr; y = -x + 10<br />
                (2) x - y = 2  &rArr; y = x - 2
              </p>
              
              <div className="bg-gray-50 border border-gray-200 p-3 rounded">
                <p className="font-medium text-[11px] mb-1">Tabel Nilai Titik Koordinat:</p>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                  <div className="bg-white p-1.5 border rounded">
                    <strong>Garis (1): y = -x + 10</strong>
                    <p>x = 0 &rarr; y = 10 &rArr; (0,10)</p>
                    <p>x = 5 &rarr; y = 5 &rArr; (5,5)</p>
                    <p>x = 10 &rarr; y = 0 &rArr; (10,0)</p>
                  </div>
                  <div className="bg-white p-1.5 border rounded">
                    <strong>Garis (2): y = x - 2</strong>
                    <p>x = 0 &rarr; y = -2 &rArr; (0,-2)</p>
                    <p>x = 5 &rarr; y = 3 &rArr; (5,3)</p>
                    <p>x = 10 &rarr; y = 8 &rArr; (10,8)</p>
                  </div>
                </div>
              </div>

              {/* Inline Mini Interactive Coordinate Plot SVG */}
              <div className="flex flex-col items-center pt-2">
                <span className="text-[10px] text-batik-muted mb-1 font-semibold">Tampilan Titik Potong di Koordinat Cartesian</span>
                <svg className="w-full max-w-[160px] aspect-square bg-[#FAF7EE] border rounded" viewBox="0 0 100 100">
                  <line x1="10" y1="50" x2="90" y2="50" stroke="#ccc" strokeWidth="0.5" />
                  <line x1="50" y1="10" x2="50" y2="90" stroke="#ccc" strokeWidth="0.5" />
                  {/* Grid numbers helper */}
                  <text x="92" y="53" fontSize="6" fill="#888">X</text>
                  <text x="53" y="14" fontSize="6" fill="#888">Y</text>
                  
                  {/* Garis (1) y = -x + 10 -> (0, 10) to (10, 0) */}
                  <line x1="30" y1="30" x2="80" y2="80" stroke="#2C4A7C" strokeWidth="1.5" />
                  {/* Garis (2) y = x - 2 -> (0,-2) to (10, 8) */}
                  <line x1="30" y1="74" x2="80" y2="24" stroke="#6B3A2A" strokeWidth="1.5" />

                  {/* Intersection point at (6, 4) -> scaled to pixel nicely */}
                  <circle cx="61" cy="43" r="3.5" fill="#C9A84C" stroke="#fff" strokeWidth="1" />
                  <text x="69" y="41" fontSize="6" fontWeight="bold" fill="#C9A84C">(6, 4)</text>
                </svg>
              </div>
              <p className="font-bold text-batik-green text-center mt-2">&check; Solusi Titik Potong: (6, 4)</p>
            </div>
          </div>
        </div>
      )
    },

    // 10. Tes Akhir Redirect
    {
      title: "Tes Akhir Modul",
      context: "Waktunya menguji keseluruhan pemahaman materi mengenai SPLDV.",
      badge: "Evaluasi",
      color: "border-batik-blue",
      content: (
        <div className="space-y-4 text-center py-6">
          <div className="mx-auto w-16 h-16 bg-batik-surface-dark border border-batik-gold rounded-full flex items-center justify-center text-batik-blue mb-4 animate-bounce">
            <Award className="w-8 h-8 text-batik-blue" />
          </div>
          <h4 className="font-serif font-bold text-batik-blue text-md">Sudah Siap Melakukan Tes Akhir?</h4>
          <p className="text-xs text-batik-muted max-w-sm mx-auto font-sans leading-relaxed">
            Tes akhir berisi 10 soal acak berskala waktu (45 menit total) untuk mendeteksi tingkat pemahamanmu terhadap metode substitusi, eliminasi, komb, dan grafik.
          </p>
          <div className="p-3 bg-batik-surface-dark/50 border border-dashed border-batik-muted/30 rounded-xl max-w-xs mx-auto text-[10px] text-batik-muted">
            ⚠️ Pastikan kamu sudah memahami materi dengan baik dan menyiapkan alat tulis coret-coret!
          </div>
          <button
            onClick={() => onNavigateTab('tes-akhir')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-batik-blue text-white font-bold text-xs rounded-lg hover:bg-batik-blue/90 transition shadow cursor-pointer mx-auto mt-2 font-sans"
          >
            Mulai Tes Akhir Sekarang <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4 pb-28">
      {/* Chapter Selection Bar */}
      <div className="bg-white border border-batik-gold/30 rounded-xl p-3 shadow-sm flex items-center justify-between gap-2 overflow-x-auto">
        <span className="text-[11px] font-bold text-batik-brown font-serif whitespace-nowrap">Daftar Isi:</span>
        <select
          value={currentIndex}
          onChange={(e) => setCurrentIndex(Number(e.target.value))}
          className="bg-batik-surface-dark border border-batik-gold px-2 py-1 rounded text-xs text-batik-dark font-sans focus:outline-none focus:ring-1 focus:ring-batik-gold cursor-pointer"
        >
          {chapters.map((ch, idx) => (
            <option key={idx} value={idx}>
              {idx + 1}. {ch.badge} - {ch.title}
            </option>
          ))}
        </select>
      </div>

      {/* Main Chapter Content Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.2 }}
          className={`bg-white border-l-4 rounded-xl p-5 shadow-sm space-y-4 ${chapters[currentIndex].color}`}
        >
          {/* Breadcrumbs / Headers */}
          <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-3">
            <div className="text-[10px] text-batik-muted uppercase font-semibold tracking-wider font-sans">
              Bab {currentIndex + 1} / 10
            </div>
            <span className="text-[10px] bg-batik-surface-dark text-batik-brown border border-batik-gold/30 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              {chapters[currentIndex].badge}
            </span>
          </div>

          <h2 className="font-serif text-xl font-bold text-batik-brown leading-tight">
            {chapters[currentIndex].title}
          </h2>

          <p className="text-xs text-batik-muted font-sans italic pl-3 border-l-[3px] border-batik-gold/40 leading-relaxed">
            &ldquo;{chapters[currentIndex].context}&rdquo;
          </p>

          {/* Chapter Specific Formatted Code Block / Paragraphs */}
          <div className="pt-2">
            {chapters[currentIndex].content}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Prev/Next Sequential Controllers */}
      <div className="flex items-center justify-between gap-4 mt-2">
        <button
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(prev => prev - 1)}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            currentIndex === 0
              ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
              : 'text-batik-brown bg-white border border-batik-gold/30 hover:bg-batik-surface-dark'
          }`}
        >
          <ChevronLeft className="w-4 h-4" /> Sebelumnya
        </button>

        <span className="text-xs text-batik-muted font-sans font-bold">
          {currentIndex + 1} / 10
        </span>

        <button
          disabled={currentIndex === chapters.length - 1}
          onClick={() => setCurrentIndex(prev => prev + 1)}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            currentIndex === chapters.length - 1
              ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
              : 'text-white bg-batik-gold hover:bg-batik-gold/90'
          }`}
        >
          Berikutnya <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
