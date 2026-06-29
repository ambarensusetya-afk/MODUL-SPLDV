import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Play, Info, AlertTriangle, TableProperties } from 'lucide-react';

type Method = 'substitusi' | 'eliminasi' | 'kombinasi' | 'grafik';

export default function Eksplorasi() {
  const [method, setMethod] = useState<Method>('grafik');

  // Equation 1 parameters: a1*x + b1*y = c1
  const [a1, setA1] = useState(2);
  const [b1, setB1] = useState(1);
  const [c1, setC1] = useState(8);

  // Equation 2 parameters: a2*x + b2*y = c2
  const [a2, setA2] = useState(1);
  const [b2, setB2] = useState(3);
  const [c2, setC2] = useState(9);

  const [highlightIntersection, setHighlightIntersection] = useState(false);
  const [hoverCoord, setHoverCoord] = useState<{ x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Math Solvers
  const det = a1 * b2 - a2 * b1;
  const hasUniqueSolution = det !== 0;

  let xSol = 0;
  let ySol = 0;
  let isCoincident = false; // Infinitely many solutions
  let isParallel = false; // No solutions

  if (hasUniqueSolution) {
    xSol = (c1 * b2 - c2 * b1) / det;
    ySol = (a1 * c2 - a2 * c1) / det;
  } else {
    // parallel or coincident
    // check if proportional
    const isProportionalC = (a1 !== 0 && a2 !== 0 && c1 / a1 === c2 / a2) || (b1 !== 0 && b2 !== 0 && c1 / b1 === c2 / b2);
    if (isProportionalC) {
      isCoincident = true;
    } else {
      isParallel = true;
    }
  }

  const handleReset = () => {
    setA1(2);
    setB1(1);
    setC1(8);
    setA2(1);
    setB2(3);
    setC2(9);
    setHighlightIntersection(false);
  };

  const handleTriggerHighlight = () => {
    if (hasUniqueSolution) {
      setHighlightIntersection(true);
      setTimeout(() => setHighlightIntersection(false), 2000);
    }
  };

  // SVG grid sizing parameters
  const gridSize = 16; // -8 to 8
  const width = 300;
  const height = 300;
  const center = 150;
  const scale = 150 / 8; // Pixels per math unit (18.75 px/unit)

  // Map math coordinate (x,y) to SVG coordinate (u,v)
  const toSvgX = (x: number) => center + x * scale;
  const toSvgY = (y: number) => center - y * scale;

  // Map mouse pixel to coordinate
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    // Convert pixel to grid value
    const mx = (px - (rect.width / 2)) / (rect.width / gridSize);
    const my = -((py - (rect.height / 2)) / (rect.height / gridSize));

    // Round to nearest 0.5 or integer
    setHoverCoord({
      x: Math.round(mx * 2) / 2,
      y: Math.round(my * 2) / 2
    });
  };

  const handleMouseLeave = () => {
    setHoverCoord(null);
  };

  // Helper to render lines in SVG
  // Express line ax + by = c in y = (c - ax) / b or x = (c - by) / a
  // Find intersection with boundaries x = -8 and x = 8
  const getLineCoordinates = (a: number, b: number, c: number) => {
    if (a === 0 && b === 0) return { x1: 0, y1: 0, x2: 0, y2: 0 };

    if (b === 0) { // vertical line: x = c / a
      const x = c / a;
      return {
        x1: toSvgX(x),
        y1: toSvgY(-8),
        x2: toSvgX(x),
        y2: toSvgY(8)
      };
    }

    // Standard slanted line
    const yAtMinX = (c - a * -8) / b;
    const yAtMaxX = (c - a * 8) / b;
    return {
      x1: toSvgX(-8),
      y1: toSvgY(yAtMinX),
      x2: toSvgX(8),
      y2: toSvgY(yAtMaxX)
    };
  };

  const line1Coords = getLineCoordinates(a1, b1, c1);
  const line2Coords = getLineCoordinates(a2, b2, c2);

  // Helper formulas for step-by-step solvers
  const formatCoeff = (val: number, name: string, isFirst = false) => {
    if (val === 0) return '';
    if (val === 1) return isFirst ? name : `+ ${name}`;
    if (val === -1) return `- ${name}`;
    if (val > 0) return isFirst ? `${val}${name}` : `+ ${val}${name}`;
    return `- ${Math.abs(val)}${name}`;
  };

  const eqDisplay1 = `${formatCoeff(a1, 'x', true)} ${formatCoeff(b1, 'y') || ''} = ${c1}`.trim();
  const eqDisplay2 = `${formatCoeff(a2, 'x', true)} ${formatCoeff(b2, 'y') || ''} = ${c2}`.trim();

  return (
    <div className="space-y-6 pb-24">
      {/* Tab Selectors for 4 Methods */}
      <div className="bg-white border border-batik-gold/30 rounded-xl p-2 shadow-sm flex overflow-x-auto gap-1">
        {(['substitusi', 'eliminasi', 'kombinasi', 'grafik'] as Method[]).map((m) => {
          const isActive = method === m;
          const label = m.charAt(0).toUpperCase() + m.slice(1);
          return (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`flex-1 py-2 px-3 text-center rounded-lg text-xs font-serif font-bold transition whitespace-nowrap cursor-pointer ${
                isActive
                  ? m === 'substitusi'
                    ? 'bg-batik-blue text-white'
                    : m === 'eliminasi'
                    ? 'bg-batik-gold text-white'
                    : m === 'kombinasi'
                    ? 'bg-batik-green text-white'
                    : 'bg-batik-brown text-white'
                  : 'text-batik-muted bg-transparent hover:bg-batik-surface-dark'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Vertical Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* CONTROL PANEL (40% width in desktop, stacked in mobile) */}
        <div className="bg-white border-l-4 border-batik-gold rounded-xl p-5 shadow-sm space-y-4 md:col-span-5">
          <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2">
            <h3 className="font-serif font-bold text-batik-brown">Panel Koefisien</h3>
            <button
              onClick={handleReset}
              className="p-1 text-batik-muted hover:text-batik-brown rounded hover:bg-gray-100 transition cursor-pointer flex items-center gap-1 text-[11px] font-sans font-bold"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          {/* Equation 1 Controls */}
          <div className="space-y-3 bg-[#FAF7EE] p-3 rounded-lg border border-batik-blue/20">
            <span className="text-[10px] bg-batik-blue/10 text-batik-blue px-2 py-0.5 rounded font-bold uppercase tracking-wider">
              Persamaan (1)
            </span>
            <div className="text-center font-mono text-xs font-bold text-batik-blue my-1">
              {eqDisplay1 || '0 = ' + c1}
            </div>

            {/* Sliders a1, b1, c1 */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono font-semibold text-gray-600">a₁ (koefisien x): {a1}</span>
                <input
                  type="range" min="-5" max="5" step="1" value={a1}
                  onChange={(e) => setA1(Number(e.target.value))}
                  className="w-1/2 accent-batik-blue cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono font-semibold text-gray-600">b₁ (koefisien y): {b1}</span>
                <input
                  type="range" min="-5" max="5" step="1" value={b1}
                  onChange={(e) => setB1(Number(e.target.value))}
                  className="w-1/2 accent-batik-blue cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono font-semibold text-gray-600">c₁ (konstanta): {c1}</span>
                <input
                  type="range" min="-8" max="8" step="1" value={c1}
                  onChange={(e) => setC1(Number(e.target.value))}
                  className="w-1/2 accent-batik-blue cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Equation 2 Controls */}
          <div className="space-y-3 bg-[#FAF7EE] p-3 rounded-lg border border-batik-brown/20">
            <span className="text-[10px] bg-batik-brown/10 text-batik-brown px-2 py-0.5 rounded font-bold uppercase tracking-wider">
              Persamaan (2)
            </span>
            <div className="text-center font-mono text-xs font-bold text-batik-brown my-1">
              {eqDisplay2 || '0 = ' + c2}
            </div>

            {/* Sliders a2, b2, c2 */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono font-semibold text-gray-600">a₂ (koefisien x): {a2}</span>
                <input
                  type="range" min="-5" max="5" step="1" value={a2}
                  onChange={(e) => setA2(Number(e.target.value))}
                  className="w-1/2 accent-batik-brown cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono font-semibold text-gray-600">b₂ (koefisien y): {b2}</span>
                <input
                  type="range" min="-5" max="5" step="1" value={b2}
                  onChange={(e) => setB2(Number(e.target.value))}
                  className="w-1/2 accent-batik-brown cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono font-semibold text-gray-600">c₂ (konstanta): {c2}</span>
                <input
                  type="range" min="-8" max="8" step="1" value={c2}
                  onChange={(e) => setC2(Number(e.target.value))}
                  className="w-1/2 accent-batik-brown cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleTriggerHighlight}
            disabled={!hasUniqueSolution}
            className={`w-full py-3 text-white font-bold rounded-xl transition duration-200 flex items-center justify-center gap-2 cursor-pointer shadow ${
              hasUniqueSolution ? 'bg-batik-brown hover:bg-batik-brown/90 shadow' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            <Play className="w-4 h-4 fill-white" /> Selesaikan!
          </button>
        </div>

        {/* COORDINATE GRID (60% width in desktop, stacked in mobile) */}
        <div className="bg-white border border-batik-gold/30 rounded-xl p-5 shadow-sm md:col-span-7 flex flex-col items-center space-y-4">
          <div className="flex justify-between items-center w-full">
            <span className="text-xs text-batik-muted font-bold flex items-center gap-1 uppercase tracking-wider">
              {method === 'grafik' ? '📈 Tampilan Geometri' : '🧮 Alur Aljabar'}
            </span>
            {hoverCoord && (
              <span className="text-[10px] bg-batik-gold/15 text-batik-brown px-2 py-0.5 rounded font-mono font-semibold">
                Koordinat Mouse: ({hoverCoord.x}, {hoverCoord.y})
              </span>
            )}
          </div>

          {/* Coordinate Canvas Block */}
          <div className="relative border-2 border-batik-gold rounded-xl overflow-hidden bg-[#FAF7EE] p-1 shadow-inner w-full max-w-[320px] aspect-square flex items-center justify-center">
            {/* Draw coordinate system with SVG */}
            <svg
              ref={svgRef}
              className="w-full h-full cursor-crosshair select-none"
              viewBox="0 0 300 300"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Grid lines */}
              {Array.from({ length: 17 }).map((_, i) => {
                const coord = i - 8;
                const pos = toSvgX(coord);
                return (
                  <React.Fragment key={i}>
                    {/* Vertical grid line */}
                    {coord !== 0 && (
                      <line x1={pos} y1={0} x2={pos} y2={height} stroke="#E2D4B7" strokeWidth="0.5" strokeDasharray="1,2" />
                    )}
                    {/* Horizontal grid line */}
                    {coord !== 0 && (
                      <line x1={0} y1={pos} x2={width} y2={pos} stroke="#E2D4B7" strokeWidth="0.5" strokeDasharray="1,2" />
                    )}
                  </React.Fragment>
                );
              })}

              {/* Sumbu X and Y axes */}
              <line x1={0} y1={center} x2={width} y2={center} stroke="#2C1810" strokeWidth="2" />
              <line x1={center} y1={0} x2={center} y2={height} stroke="#2C1810" strokeWidth="2" />

              {/* Labels on even numbers only */}
              {[-8, -6, -4, -2, 2, 4, 6, 8].map((coord) => (
                <React.Fragment key={coord}>
                  {/* Sumbu X labels */}
                  <text x={toSvgX(coord)} y={center + 12} fontSize="8" fill="#2C1810" textAnchor="middle" fontWeight="bold">
                    {coord}
                  </text>
                  {/* Sumbu Y labels */}
                  <text x={center - 10} y={toSvgY(coord) + 3} fontSize="8" fill="#2C1810" textAnchor="middle" fontWeight="bold">
                    {coord}
                  </text>
                </React.Fragment>
              ))}
              <text x={center + 10} y={center + 12} fontSize="8" fill="#2C1810" fontWeight="bold">0</text>

              {/* Plotted Line 1 (Blue) */}
              <line
                x1={line1Coords.x1}
                y1={line1Coords.y1}
                x2={line1Coords.x2}
                y2={line1Coords.y2}
                stroke="#2C4A7C"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Plotted Line 2 (Brown) */}
              <line
                x1={line2Coords.x1}
                y1={line2Coords.y1}
                x2={line2Coords.x2}
                y2={line2Coords.y2}
                stroke="#6B3A2A"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Render Unique Solution Point */}
              {hasUniqueSolution && xSol >= -8 && xSol <= 8 && ySol >= -8 && ySol <= 8 && (
                <g>
                  {/* Interactive pulsating ring */}
                  <circle
                    cx={toSvgX(xSol)}
                    cy={toSvgY(ySol)}
                    r={highlightIntersection ? 15 : 6}
                    fill={highlightIntersection ? "#C9A84C" : "transparent"}
                    opacity={highlightIntersection ? 0.3 : 0}
                    className="transition-all duration-700 ease-out"
                  />
                  {/* Solution Dot */}
                  <circle
                    cx={toSvgX(xSol)}
                    cy={toSvgY(ySol)}
                    r="4.5"
                    fill="#C9A84C"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                  {/* Tooltip near solution */}
                  <g transform={`translate(${toSvgX(xSol) > 150 ? toSvgX(xSol) - 65 : toSvgX(xSol) + 8}, ${toSvgY(ySol) - 10})`}>
                    <rect width="55" height="15" rx="3" fill="#2C1810" opacity="0.85" />
                    <text x="27" y="10" fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle">
                      ({xSol.toFixed(1)}, {ySol.toFixed(1)})
                    </text>
                  </g>
                </g>
              )}
            </svg>
          </div>

          {/* Warning for determinant = 0 (Parallel or Identical Lines) */}
          {!hasUniqueSolution && (
            <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-xs w-full max-w-[320px]">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <div>
                <p className="font-bold">
                  {isCoincident ? 'Garis Berhimpit' : 'Garis Sejajar'}
                </p>
                <p className="text-[10px] text-amber-700 leading-tight">
                  {isCoincident
                    ? 'Determinannya nol dan rasio sama. Solusi tidak terhingga.'
                    : 'Kedua garis sejajar, tidak ada persekutuan titik potong.'}
                </p>
              </div>
            </div>
          )}

          {/* Value mappings table for GRAFIK mode */}
          {method === 'grafik' && (
            <div className="w-full text-xs bg-batik-surface-dark/40 border border-batik-gold/20 p-3 rounded-xl space-y-2">
              <div className="flex gap-1.5 items-center font-bold text-batik-brown text-[11px]">
                <TableProperties className="w-3.5 h-3.5" />
                <span>Tabel Bantu Koordinat Grafik:</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-[10px] font-mono">
                {/* Line 1 values */}
                <div className="bg-white p-2 rounded border border-batik-blue/20">
                  <span className="font-bold text-batik-blue">Garis 1 (Biru):</span>
                  <div className="grid grid-cols-3 text-center border-t border-gray-100 mt-1 pt-1 font-bold">
                    <span>x</span>
                    <span>y</span>
                    <span>Titik</span>
                  </div>
                  {[-2, 0, 2].map(xVal => {
                    const yVal = b1 !== 0 ? (c1 - a1 * xVal) / b1 : NaN;
                    return (
                      <div key={xVal} className="grid grid-cols-3 text-center text-gray-600 mt-1">
                        <span>{xVal}</span>
                        <span>{isNaN(yVal) ? '-' : yVal.toFixed(1)}</span>
                        <span>{isNaN(yVal) ? '-' : `(${xVal}, ${yVal.toFixed(1)})`}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Line 2 values */}
                <div className="bg-white p-2 rounded border border-batik-brown/20">
                  <span className="font-bold text-batik-brown">Garis 2 (Coklat):</span>
                  <div className="grid grid-cols-3 text-center border-t border-gray-100 mt-1 pt-1 font-bold">
                    <span>x</span>
                    <span>y</span>
                    <span>Titik</span>
                  </div>
                  {[-2, 0, 2].map(xVal => {
                    const yVal = b2 !== 0 ? (c2 - a2 * xVal) / b2 : NaN;
                    return (
                      <div key={xVal} className="grid grid-cols-3 text-center text-gray-600 mt-1">
                        <span>{xVal}</span>
                        <span>{isNaN(yVal) ? '-' : yVal.toFixed(1)}</span>
                        <span>{isNaN(yVal) ? '-' : `(${xVal}, ${yVal.toFixed(1)})`}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* STEP-BY-STEP DYNAMIC MATHEMATICAL SOLUTION BANNER */}
      {hasUniqueSolution ? (
        <div className="bg-white border border-batik-gold/30 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-1.5 pb-2 border-b border-gray-100 text-batik-brown font-serif font-bold text-sm">
            <Info className="w-4 h-4 text-batik-gold" />
            <span>Penyelesaian Metode {method.toUpperCase()} secara Step-by-Step:</span>
          </div>

          {/* SUBSTITUSI METHOD BANNER */}
          {method === 'substitusi' && (
            <div className="text-xs space-y-2 text-batik-dark font-sans leading-relaxed">
              <p><strong>Langkah 1:</strong> Isolasi variabel dari Persamaan (1) atau (2):</p>
              {b1 !== 0 ? (
                <div className="pl-3 border-l-2 border-batik-blue bg-[#FAF7EE] p-2 rounded font-mono">
                  y = ({c1} - {a1}x) / {b1}
                  {a1 % b1 === 0 && c1 % b1 === 0 && (
                    <span> = {c1 / b1} + {(-a1 / b1) >= 0 ? `+ ${-a1 / b1}` : `${-a1 / b1}`}x</span>
                  )}
                </div>
              ) : (
                <div className="pl-3 border-l-2 border-batik-blue bg-[#FAF7EE] p-2 rounded font-mono">
                  x = {c1} / {a1} = {(c1 / a1).toFixed(1)}
                </div>
              )}

              <p><strong>Langkah 2:</strong> Substitusikan formula di atas ke persamaan berikutnya:</p>
              <div className="pl-3 border-l-2 border-batik-blue bg-[#FAF7EE] p-2 rounded font-mono text-gray-700">
                {b1 !== 0 ? (
                  <span>
                    {a2}x + {b2}(({c1} - {a1}x) / {b1}) = {c2}
                  </span>
                ) : (
                  <span>
                    {a2}({(c1 / a1).toFixed(1)}) + {b2}y = {c2}
                  </span>
                )}
              </div>

              <p><strong>Langkah 3:</strong> Hitung nilai variabel pertama:</p>
              <div className="pl-3 border-l-2 border-batik-green bg-[#FAF7EE] p-2 rounded font-mono font-bold text-batik-green">
                Nilai x = {xSol.toFixed(2)} (dibulatkan)
              </div>

              <p><strong>Langkah 4:</strong> Substitusi balik untuk mendapat variabel kedua:</p>
              <div className="pl-3 border-l-2 border-batik-green bg-[#FAF7EE] p-2 rounded font-mono font-bold text-batik-blue">
                Nilai y = {ySol.toFixed(2)} (dibulatkan)
              </div>
            </div>
          )}

          {/* ELIMINASI METHOD BANNER */}
          {method === 'eliminasi' && (
            <div className="text-xs space-y-2 text-batik-dark font-sans leading-relaxed">
              <p><strong>Langkah 1:</strong> Kalikan kedua persamaan demi menyamakan koefisien variabel x:</p>
              <div className="pl-3 border-l-2 border-batik-gold bg-[#FAF7EE] p-2 rounded font-mono text-gray-700 space-y-1">
                <p>• Persamaan (1) dikalikan {Math.abs(a2 || 1)}: {a1 * Math.abs(a2 || 1)}x + {b1 * Math.abs(a2 || 1)}y = {c1 * Math.abs(a2 || 1)}</p>
                <p>• Persamaan (2) dikalikan {Math.abs(a1 || 1)}: {a2 * Math.abs(a1 || 1)}x + {b2 * Math.abs(a1 || 1)}y = {c2 * Math.abs(a1 || 1)}</p>
              </div>

              <p><strong>Langkah 2:</strong> Lakukan eliminasi untuk mencari nilai y:</p>
              <div className="pl-3 border-l-2 border-batik-gold bg-[#FAF7EE] p-2 rounded font-mono">
                Rasio pengurang: y = {ySol.toFixed(2)}
              </div>

              <p><strong>Langkah 3:</strong> Samakan koefisien y untuk mendapat nilai x:</p>
              <div className="pl-3 border-l-2 border-batik-green bg-[#FAF7EE] p-2 rounded font-mono text-gray-700 space-y-1">
                <p>• Persamaan (1) dikalikan {Math.abs(b2 || 1)}: {a1 * Math.abs(b2 || 1)}x + {b1 * Math.abs(b2 || 1)}y = {c1 * Math.abs(b2 || 1)}</p>
                <p>• Persamaan (2) dikalikan {Math.abs(b1 || 1)}: {a2 * Math.abs(b1 || 1)}x + {b2 * Math.abs(b1 || 1)}y = {c2 * Math.abs(b1 || 1)}</p>
              </div>

              <div className="pl-3 border-l-2 border-batik-green bg-[#FAF7EE] p-2 rounded font-mono font-bold text-batik-green">
                Solusi koordinat eliminasi penuh: x = {xSol.toFixed(2)}, y = {ySol.toFixed(2)}
              </div>
            </div>
          )}

          {/* KOMBINASI METHOD BANNER */}
          {method === 'kombinasi' && (
            <div className="text-xs space-y-2 text-batik-dark font-sans leading-relaxed">
              <p><strong>Langkah 1 (Eliminasi):</strong> Eliminasi variabel y terlebih dahulu:</p>
              <div className="pl-3 border-l-2 border-batik-green bg-[#FAF7EE] p-2 rounded font-mono text-gray-700">
                Menyetarakan koefisien y dan melakukan pengurangan menghasilkan nilai x = {xSol.toFixed(2)}
              </div>

              <p><strong>Langkah 2 (Substitusi):</strong> Gantikan x = {xSol.toFixed(2)} ke Persamaan (1) yang paling sederhana:</p>
              <p className="font-mono bg-[#FAF7EE] p-2 rounded pl-3 border-l-2 border-batik-green">
                {a1}({xSol.toFixed(2)}) + {b1}y = {c1} &rArr; {b1}y = {c1} - {(a1 * xSol).toFixed(2)}
              </p>

              <div className="pl-3 border-l-2 border-batik-green bg-[#FAF7EE] p-2 rounded font-mono font-bold text-batik-blue">
                Nilai y hasil substitusi balikan: y = {ySol.toFixed(2)}
              </div>
            </div>
          )}

          {/* GRAFIK METHOD BANNER */}
          {method === 'grafik' && (
            <div className="text-xs space-y-2 text-batik-dark font-sans leading-relaxed">
              <p>Masing-masing persamaan linear dibentuk menjadi persamaan garis lurus:</p>
              <div className="pl-3 border-l-2 border-batik-brown bg-[#FAF7EE] p-2.5 rounded font-mono text-gray-700 space-y-2">
                <p className="text-batik-blue font-bold">Garis Biru (1): y = {-a1/b1 !== 0 ? `${(-a1/b1).toFixed(1)}x` : ''} {c1/b1 >= 0 ? `+ ${(c1/b1).toFixed(1)}` : `- ${Math.abs(c1/b1).toFixed(1)}`}</p>
                <p className="text-batik-brown font-bold">Garis Coklat (2): y = {-a2/b2 !== 0 ? `${(-a2/b2).toFixed(1)}x` : ''} {c2/b2 >= 0 ? `+ ${(c2/b2).toFixed(1)}` : `- ${Math.abs(c2/b2).toFixed(1)}`}</p>
              </div>
              <p>Mencari koordinat persilangan titik potong di mana kedua garis bertemu:</p>
              <div className="pl-3 border-l-2 border-batik-brown bg-[#FAF7EE] p-2.5 rounded font-mono text-xs font-bold text-center text-batik-brown">
                Titik Temu: x = {xSol.toFixed(2)}, y = {ySol.toFixed(2)} &rArr; Koordinat ({xSol.toFixed(1)}, {ySol.toFixed(1)})
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-xs text-red-800 text-center font-sans font-semibold">
          ⚠️ Persamaan sejajar / berhimpit tidak memiliki penyelesaian koordinat persimpangan tunggal.
        </div>
      )}
    </div>
  );
}
