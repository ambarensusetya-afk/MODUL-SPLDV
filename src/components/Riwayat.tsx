import { motion } from 'motion/react';
import { Award, Trash2, Calendar, FileText, BarChart2, Star } from 'lucide-react';
import { ScoreRecord } from '../types';

interface RiwayatProps {
  scores: ScoreRecord[];
  onClearHistory: () => void;
}

export default function Riwayat({ scores, onClearHistory }: RiwayatProps) {
  // Find highest score in final exam or practice
  const highestTestScore = scores
    .filter(s => s.type === 'tes-akhir')
    .reduce((max, curr) => (curr.score > max ? curr.score : max), 0);

  const highestLatihanScore = scores
    .filter(s => s.type === 'latihan')
    .reduce((max, curr) => (curr.score > max ? curr.score : max), 0);

  const displayHighScore = Math.max(highestTestScore, highestLatihanScore * 10);

  const handleDeleteHistory = () => {
    const isConfirmed = window.confirm(
      "Apakah kamu yakin ingin menghapus seluruh riwayat pengerjaan nilai belajarmu? Tindakan ini tidak dapat dibatalkan."
    );
    if (isConfirmed) {
      onClearHistory();
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* High score stats summary dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Highest Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-2 border-dashed border-batik-gold rounded-2xl p-5 text-center flex flex-col items-center justify-center space-y-2 shadow-sm"
        >
          <Award className="w-10 h-10 text-batik-gold" />
          <div>
            <span className="text-[10px] text-batik-muted uppercase font-semibold font-sans tracking-wider block">
              Skor Terbaik Kumulatif
            </span>
            <h3 className="font-serif text-2xl font-bold text-batik-brown">
              {displayHighScore > 0 ? `${displayHighScore} / 100` : '0 / 100'}
            </h3>
          </div>
          <p className="text-[10px] text-emerald-800 font-sans italic">
            🏆 Rekor pengerjaan tertinggi diraih!
          </p>
        </motion.div>

        {/* Competency Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border-l-4 border-batik-green rounded-2xl p-5 flex flex-col justify-center space-y-2 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-batik-green/10 text-batik-green rounded-lg">
              <BarChart2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-batik-green font-serif">Aktivitas Uji</span>
          </div>
          <div className="text-xs text-batik-dark space-y-1 font-sans">
            <p>Total Pengerjaan: <strong>{scores.length} kali</strong></p>
            <p>Sesi Latihan Lulus: <strong>{scores.filter(s => s.status === 'Lulus').length} kali</strong></p>
          </div>
        </motion.div>
      </div>

      {/* History Log Title */}
      <div className="bg-white border border-batik-gold/30 rounded-xl p-4 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="font-serif font-bold text-batik-brown flex items-center gap-1.5">
            <FileText className="w-4.5 h-4.5 text-batik-gold" /> Log Riwayat Nilai Belajar
          </h3>
          {scores.length > 0 && (
            <button
              onClick={handleDeleteHistory}
              id="btn-hapus-riwayat"
              className="text-[11px] font-sans font-bold text-rose-700 hover:text-rose-800 hover:bg-rose-50 px-2 py-1 rounded transition duration-150 flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> Hapus Riwayat
            </button>
          )}
        </div>

        {/* Empty history layout */}
        {scores.length === 0 ? (
          <div className="text-center py-10 space-y-2">
            <Star className="w-10 h-10 text-gray-300 mx-auto animate-pulse" />
            <p className="text-xs text-batik-muted font-sans font-medium">
              Belum ada riwayat pengerjaan nilai yang terekam.
            </p>
            <p className="text-[10px] text-batik-muted/70 max-w-xs mx-auto">
              Silakan menyelesaikan sesi Latihan Soal atau mencoba Tes Akhir Modul untuk mencatatkan progres pertamamu!
            </p>
          </div>
        ) : (
          /* Scoring Table */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-batik-surface-dark border-b border-batik-gold/30 text-batik-muted font-serif">
                  <th className="p-3">Tanggal &amp; Waktu</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Tingkat</th>
                  <th className="p-3">Skor</th>
                  <th className="p-3">Hasil Evaluasi</th>
                </tr>
              </thead>
              <tbody className="font-sans text-batik-dark divide-y divide-gray-100">
                {scores.map((record) => (
                  <tr key={record.id} className="hover:bg-[#FAF7EE]/50 transition-colors">
                    <td className="p-3 font-mono text-[11px] text-gray-600 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-batik-gold" />
                      {record.date}
                    </td>
                    <td className="p-3 font-semibold uppercase text-xs">
                      {record.type === 'tes-akhir' ? 'TES AKHIR' : 'LATIHAN'}
                    </td>
                    <td className="p-3 font-medium">
                      {record.level ? record.level.toUpperCase() : 'CAMPURAN'}
                    </td>
                    <td className="p-3 font-bold font-mono">
                      {record.type === 'tes-akhir' ? `${record.score} %` : `${record.score} / ${record.totalQuestions}`}
                    </td>
                    <td className="p-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        record.status === 'Lulus'
                          ? 'bg-emerald-100 text-emerald-800'
                          : record.status === 'Coba Lagi'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
