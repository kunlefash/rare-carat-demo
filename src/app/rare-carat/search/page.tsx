'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// ─── Plain-English label data ────────────────────────────────────────────────

const COLOR_OPTIONS = [
  { grade: 'D', tier: 'Colorless', meaning: 'Absolutely no color — the rarest' },
  { grade: 'E', tier: 'Colorless', meaning: 'No color visible even to experts' },
  { grade: 'F', tier: 'Colorless', meaning: 'Slight color only a gemologist can see' },
  { grade: 'G', tier: 'Near Colorless', meaning: 'Looks white in a ring — great value' },
  { grade: 'H', tier: 'Near Colorless', meaning: 'Slight warmth, looks white face-up' },
  { grade: 'I', tier: 'Near Colorless', meaning: 'Faint tint, hard to notice' },
  { grade: 'J', tier: 'Near Colorless', meaning: 'Slight tint visible face-up' },
  { grade: 'K', tier: 'Faint Yellow', meaning: 'Noticeable warmth — maximizes size' },
];

const CLARITY_OPTIONS = [
  { grade: 'FL', label: 'Flawless', meaning: 'No imperfections — perfectly clean' },
  { grade: 'IF', label: 'Internally Flawless', meaning: 'Tiny surface blemishes only' },
  { grade: 'VVS1', label: 'VVS1', meaning: 'Tiny pinpoints, invisible even under magnification' },
  { grade: 'VVS2', label: 'VVS2', meaning: 'Tiny inclusions, hard to find under 10× magnification' },
  { grade: 'VS1', label: 'VS1', meaning: 'Very minor inclusions — invisible to the naked eye' },
  { grade: 'VS2', label: 'VS2', meaning: 'Minor inclusions — not visible without a loupe' },
  { grade: 'SI1', label: 'SI1', meaning: 'Inclusions visible under magnification, clean to naked eye' },
  { grade: 'SI2', label: 'SI2', meaning: 'Inclusions sometimes visible without magnification' },
];

const CUT_OPTIONS = [
  { grade: 'RC Ideal', label: 'Rare Carat Ideal', meaning: 'Maximum sparkle — our highest standard, better than Excellent', highlight: true },
  { grade: 'Excellent', label: 'Excellent', meaning: 'Outstanding brilliance — top GIA grade' },
  { grade: 'Very Good', label: 'Very Good', meaning: 'Superior fire and brilliance, slightly less precise angles' },
  { grade: 'Good', label: 'Good', meaning: 'Reflects most light — solid choice on a tight budget' },
];

const SHAPES = [
  { value: 'round', label: 'Round', pct: '40%' },
  { value: 'oval', label: 'Oval', pct: '15%' },
  { value: 'cushion', label: 'Cushion', pct: '12%' },
  { value: 'princess', label: 'Princess', pct: '8%' },
  { value: 'emerald', label: 'Emerald', pct: '7%' },
  { value: 'pear', label: 'Pear', pct: '6%' },
  { value: 'radiant', label: 'Radiant', pct: '5%' },
  { value: 'marquise', label: 'Marquise', pct: '4%' },
];

const MOCK_RESULTS = [
  { id: 'oval-001', carat: 2.47, shape: 'Oval', color: 'H', colorTier: 'Near Colorless', clarity: 'VS1', clarityLabel: 'Very minor inclusions', cut: 'RC Ideal', price: 2280, compValue: 3420, score: 98, priceScore: 'Great', label: 'Overall pick', labelColor: '#16A34A' },
  { id: 'oval-002', carat: 2.58, shape: 'Oval', color: 'I', colorTier: 'Near Colorless', clarity: 'VS2', clarityLabel: 'Minor inclusions', cut: 'RC Ideal', price: 2180, compValue: 3280, score: 95, priceScore: 'Great', label: 'Biggest size', labelColor: '#7C3AED' },
  { id: 'oval-003', carat: 2.31, shape: 'Oval', color: 'G', colorTier: 'Near Colorless', clarity: 'VS1', clarityLabel: 'Very minor inclusions', cut: 'Excellent', price: 2480, compValue: 3650, score: 97, priceScore: 'Great', label: null, labelColor: null },
  { id: 'oval-004', carat: 2.01, shape: 'Oval', color: 'F', colorTier: 'Colorless', clarity: 'VVS2', clarityLabel: 'Tiny inclusions', cut: 'Excellent', price: 2380, compValue: 3200, score: 96, priceScore: 'Good', label: null, labelColor: null },
  { id: 'oval-005', carat: 1.93, shape: 'Oval', color: 'H', colorTier: 'Near Colorless', clarity: 'VS2', clarityLabel: 'Minor inclusions', cut: 'RC Ideal', price: 1890, compValue: 2780, score: 94, priceScore: 'Great', label: null, labelColor: null },
  { id: 'oval-006', carat: 2.14, shape: 'Oval', color: 'G', colorTier: 'Near Colorless', clarity: 'SI1', clarityLabel: 'Eye-clean', cut: 'Very Good', price: 1980, compValue: 2950, score: 91, priceScore: 'Great', label: 'Best budget', labelColor: '#D97706' },
];

// ─── Shape SVG icons ──────────────────────────────────────────────────────────
function ShapeIcon({ shape, size = 32 }: { shape: string; size?: number }) {
  const s = size;
  const icons: Record<string, React.ReactNode> = {
    round: <ellipse cx={s/2} cy={s/2} rx={s*0.38} ry={s*0.38} fill="currentColor" />,
    oval: <ellipse cx={s/2} cy={s/2} rx={s*0.28} ry={s*0.4} fill="currentColor" />,
    cushion: <rect x={s*0.14} y={s*0.14} width={s*0.72} height={s*0.72} rx={s*0.14} fill="currentColor" />,
    princess: <rect x={s*0.16} y={s*0.16} width={s*0.68} height={s*0.68} fill="currentColor" />,
    emerald: <rect x={s*0.12} y={s*0.2} width={s*0.76} height={s*0.6} rx={s*0.06} fill="currentColor" />,
    pear: <path d={`M${s*0.5},${s*0.08} C${s*0.8},${s*0.08} ${s*0.85},${s*0.5} ${s*0.5},${s*0.92} C${s*0.15},${s*0.5} ${s*0.2},${s*0.08} ${s*0.5},${s*0.08}Z`} fill="currentColor" />,
    radiant: <path d={`M${s*0.2},${s*0.12} L${s*0.8},${s*0.12} L${s*0.92},${s*0.25} L${s*0.92},${s*0.75} L${s*0.8},${s*0.88} L${s*0.2},${s*0.88} L${s*0.08},${s*0.75} L${s*0.08},${s*0.25}Z`} fill="currentColor" />,
    marquise: <ellipse cx={s/2} cy={s/2} rx={s*0.44} ry={s*0.24} fill="currentColor" />,
  };
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
      <g className="text-[#1B2D44]">{icons[shape] ?? icons.round}</g>
    </svg>
  );
}

// ─── Tooltip ─────────────────────────────────────────────────────────────────
function Tooltip({ text }: { text: string }) {
  return (
    <span className="group relative inline-flex ml-1 cursor-help">
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className="text-gray-400">
        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
        <text x="10" y="14" textAnchor="middle" fontSize="11" fill="currentColor" fontWeight="600">i</text>
      </svg>
      <span className="absolute left-4 top-0 z-50 w-52 bg-[#1B2D44] text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
        {text}
      </span>
    </span>
  );
}

// ─── Diamond card ─────────────────────────────────────────────────────────────
function DiamondCard({ d }: { d: typeof MOCK_RESULTS[0] }) {
  const savings = Math.round((1 - d.price / d.compValue) * 100);
  return (
    <Link
      href={`/rare-carat/diamond/${d.id}`}
      className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all group bg-white"
    >
      {/* Image area */}
      <div className="relative bg-gradient-to-b from-gray-50 to-white h-44 flex items-center justify-center">
        {d.label && (
          <span
            className="absolute top-2 left-2 text-white text-[10px] font-bold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: d.labelColor ?? '#1B2D44' }}
          >
            {d.label}
          </span>
        )}
        <div className="absolute top-2 right-2 bg-white border border-gray-100 rounded-full w-10 h-10 flex flex-col items-center justify-center shadow-sm">
          <span className="text-[10px] font-bold text-[#1B2D44] leading-none">{d.score}</span>
          <span className="text-[7px] text-gray-400 leading-none">RC</span>
        </div>
        {/* Diamond SVG */}
        <svg viewBox="0 0 120 110" width="90" height="82" fill="none">
          <ellipse cx="60" cy="55" rx="50" ry="48" fill="white" stroke="#d0d8e8" strokeWidth="2" />
          <path d="M60,12 L90,38 L60,98 L30,38 Z" fill="white" stroke="#c5d0e0" strokeWidth="1" />
          <path d="M30,38 L60,38 L90,38" stroke="#d8e2ee" strokeWidth="0.8" />
          <path d="M60,12 L60,38" stroke="#d8e2ee" strokeWidth="0.8" />
          <ellipse cx="60" cy="55" rx="20" ry="19" fill="white" stroke="#e0e8f0" strokeWidth="0.6" opacity="0.6" />
        </svg>
      </div>

      {/* Details */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <div>
            <p className="font-semibold text-gray-900 text-sm">
              {d.carat.toFixed(2)} ct {d.shape}
            </p>
            <p className="text-xs text-gray-400">
              {d.color} ({d.colorTier}) · {d.clarity} · {d.cut}
            </p>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ml-2 whitespace-nowrap ${
            d.priceScore === 'Great' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
          }`}>
            {d.priceScore} price
          </span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-xl font-bold text-gray-900">${d.price.toLocaleString()}</span>
          <span className="text-xs text-gray-400 line-through">${d.compValue.toLocaleString()}</span>
          <span className="text-xs text-green-600 font-semibold">−{savings}%</span>
        </div>
        <p className="text-xs text-gray-400 mt-0.5">vs. retail comparison value</p>
      </div>
    </Link>
  );
}

// ─── Main search UI (client) ──────────────────────────────────────────────────
function SearchContent() {
  const searchParams = useSearchParams();
  const initShape = searchParams.get('shape') || 'oval';
  const fromRecommendation = searchParams.get('recommended') === '1';

  const [origin, setOrigin] = useState<'lab' | 'natural'>('lab');
  const [selectedShape, setSelectedShape] = useState(initShape);
  const [selectedColors, setSelectedColors] = useState<string[]>(['G', 'H', 'I']);
  const [priceMin, setPriceMin] = useState(500);
  const [priceMax, setPriceMax] = useState(5000);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [selectedClarity, setSelectedClarity] = useState<string[]>(['VS1', 'VS2', 'SI1']);
  const [selectedCuts, setSelectedCuts] = useState<string[]>(['RC Ideal', 'Excellent']);
  const [caratMin, setCaratMin] = useState(1.0);
  const [caratMax, setCaratMax] = useState(3.0);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const [hoveredClarity, setHoveredClarity] = useState<string | null>(null);
  const [hoveredCut, setHoveredCut] = useState<string | null>(null);

  function toggleArr(arr: string[], val: string, set: (a: string[]) => void) {
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  }

  const hoveredColorData = COLOR_OPTIONS.find((c) => c.grade === hoveredColor);
  const hoveredClarityData = CLARITY_OPTIONS.find((c) => c.grade === hoveredClarity);
  const hoveredCutData = CUT_OPTIONS.find((c) => c.grade === hoveredCut);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* ── Nav ─────────────────────────────────────────────────── */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/rare-carat" className="text-[#1B2D44] font-bold text-xl tracking-tight">
            rare <span className="text-[#D946EF]">♥</span> carat
          </Link>
          <div className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
            <Link href="/rare-carat/search" className="font-semibold text-[#1B2D44]">Lab Diamonds</Link>
            <Link href="/rare-carat/search" className="hover:text-[#1B2D44]">Natural Diamonds</Link>
            <Link href="/rare-carat/search" className="hover:text-[#1B2D44]">Education</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/rare-carat/quiz"
              className="bg-[#1B2D44] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#253f5e] transition-colors flex items-center gap-1.5"
            >
              <span className="text-[#D946EF]">✦</span> Get AI advice
            </Link>
          </div>
        </div>
      </nav>

      {/* ── AI Advisor banner ────────────────────────────────────── */}
      {!fromRecommendation && (
        <div className="bg-[#1B2D44] text-white">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-lg flex-shrink-0">🧑</div>
              <div>
                <p className="font-semibold text-sm">Not sure where to start?</p>
                <p className="text-xs text-white/70">Ajay can find your perfect diamond in 2 minutes — no filters needed.</p>
              </div>
            </div>
            <Link
              href="/rare-carat/quiz"
              className="bg-[#D946EF] text-white font-bold text-sm px-5 py-2.5 rounded-full hover:bg-[#c026d3] transition-colors whitespace-nowrap flex-shrink-0"
            >
              ✦ Find my diamond
            </Link>
          </div>
        </div>
      )}

      {fromRecommendation && (
        <div className="bg-[#f0f2ff] border-b border-[#4B5EFF]/20">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <p className="text-sm text-[#4B5EFF] font-medium">
              ✦ Showing all results from your recommendation
            </p>
            <Link href="/rare-carat/recommendation" className="text-sm text-[#4B5EFF] font-semibold hover:underline whitespace-nowrap">
              ← Back to my picks
            </Link>
          </div>
        </div>
      )}

      {/* ── Filter panel ────────────────────────────────────────── */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-5 space-y-5">

          {/* Origin toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOrigin('lab')}
              className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-colors ${origin === 'lab' ? 'bg-[#1B2D44] text-white' : 'border border-gray-200 text-gray-600 hover:border-gray-400'}`}
            >
              Lab Grown
            </button>
            <button
              onClick={() => setOrigin('natural')}
              className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-colors ${origin === 'natural' ? 'bg-[#1B2D44] text-white' : 'border border-gray-200 text-gray-600 hover:border-gray-400'}`}
            >
              Natural
            </button>
            <span className="text-[#4B5EFF] text-xs ml-2 cursor-pointer hover:underline">What&apos;s the difference?</span>
          </div>

          {/* ── BASIC FILTERS ── */}
          <div className="space-y-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Basic Filters</p>

            {/* Shape */}
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-2">Shape</p>
              <div className="flex gap-2 flex-wrap">
                {SHAPES.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSelectedShape(s.value)}
                    className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl border-2 transition-all ${
                      selectedShape === s.value
                        ? 'border-[#1B2D44] bg-[#f0f3f8]'
                        : 'border-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <ShapeIcon shape={s.value} size={28} />
                    <span className="text-[10px] text-gray-600 font-medium">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <div className="flex items-center gap-1 mb-2">
                <p className="text-xs font-semibold text-gray-600">Color</p>
                <Tooltip text="Diamond color is graded D–Z. D is completely colorless (rarest). Most people can't see the difference between D–H face-up in a ring." />
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c.grade}
                    onClick={() => toggleArr(selectedColors, c.grade, setSelectedColors)}
                    onMouseEnter={() => setHoveredColor(c.grade)}
                    onMouseLeave={() => setHoveredColor(null)}
                    className={`w-10 h-10 rounded-lg border-2 font-bold text-sm transition-all ${
                      selectedColors.includes(c.grade)
                        ? 'border-[#1B2D44] bg-[#1B2D44] text-white'
                        : 'border-gray-200 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {c.grade}
                  </button>
                ))}
              </div>
              {hoveredColorData && (
                <div className="flex items-center gap-2 bg-[#f0f3f8] rounded-lg px-3 py-2 text-xs text-gray-700 w-fit">
                  <span className="font-bold text-[#1B2D44]">{hoveredColorData.grade}</span>
                  <span className="text-gray-300">·</span>
                  <span className="font-semibold">{hoveredColorData.tier}</span>
                  <span className="text-gray-300">·</span>
                  <span className="text-gray-500">{hoveredColorData.meaning}</span>
                </div>
              )}
              {!hoveredColorData && (
                <p className="text-xs text-gray-400">Hover a grade to see what it means</p>
              )}
            </div>

            {/* Price */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-gray-600">Price</p>
                <span className="text-xs text-gray-500 font-medium">
                  ${priceMin.toLocaleString()} – ${priceMax.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">$500</span>
                <input
                  type="range" min={500} max={10000} step={250} value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="flex-1 h-1.5 rounded-full appearance-none bg-gray-200 accent-[#1B2D44]"
                />
                <span className="text-xs text-gray-400">$10k</span>
              </div>
            </div>
          </div>

          {/* ── ADVANCED FILTERS toggle ── */}
          <button
            onClick={() => setAdvancedOpen((v) => !v)}
            className="flex items-center gap-2 text-sm font-semibold text-[#4B5EFF] hover:text-[#3a4ecc] transition-colors"
          >
            <svg
              width="14" height="14" viewBox="0 0 20 20" fill="none"
              className={`transition-transform ${advancedOpen ? 'rotate-180' : ''}`}
            >
              <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {advancedOpen ? 'Hide advanced filters' : 'Show advanced filters'}
            <span className="text-gray-400 font-normal text-xs">(Carat · Clarity · Cut · Certification)</span>
          </button>

          {advancedOpen && (
            <div className="space-y-5 pt-2 border-t border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Advanced Filters</p>

              {/* Carat */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-semibold text-gray-600">Carat</p>
                    <Tooltip text="Carat is the weight of the diamond. Bigger isn't always better — a well-cut smaller stone can look larger and sparkle more." />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{caratMin.toFixed(1)} – {caratMax.toFixed(1)} ct</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">0.5</span>
                  <input
                    type="range" min={0.5} max={5} step={0.1} value={caratMax}
                    onChange={(e) => setCaratMax(Number(e.target.value))}
                    className="flex-1 h-1.5 rounded-full appearance-none bg-gray-200 accent-[#1B2D44]"
                  />
                  <span className="text-xs text-gray-400">5ct</span>
                </div>
              </div>

              {/* Clarity */}
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <p className="text-xs font-semibold text-gray-600">Clarity</p>
                  <Tooltip text="Clarity grades how many tiny imperfections (inclusions) a diamond has. VS2 and above are eye-clean — imperfections invisible without magnification." />
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {CLARITY_OPTIONS.map((c) => (
                    <button
                      key={c.grade}
                      onClick={() => toggleArr(selectedClarity, c.grade, setSelectedClarity)}
                      onMouseEnter={() => setHoveredClarity(c.grade)}
                      onMouseLeave={() => setHoveredClarity(null)}
                      className={`px-3 py-1.5 rounded-lg border-2 text-xs font-semibold transition-all ${
                        selectedClarity.includes(c.grade)
                          ? 'border-[#1B2D44] bg-[#1B2D44] text-white'
                          : 'border-gray-200 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {c.grade}
                    </button>
                  ))}
                </div>
                {hoveredClarityData && (
                  <div className="flex items-center gap-2 bg-[#f0f3f8] rounded-lg px-3 py-2 text-xs text-gray-700 w-fit">
                    <span className="font-bold text-[#1B2D44]">{hoveredClarityData.grade}</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-gray-500">{hoveredClarityData.meaning}</span>
                  </div>
                )}
                {!hoveredClarityData && (
                  <p className="text-xs text-gray-400">Hover a grade to see what it means</p>
                )}
              </div>

              {/* Cut */}
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <p className="text-xs font-semibold text-gray-600">Cut</p>
                  <Tooltip text="Cut is the most important factor — it determines how much a diamond sparkles. A well-cut diamond reflects light better than any other grade." />
                </div>
                <div className="flex flex-col gap-2">
                  {CUT_OPTIONS.map((c) => (
                    <button
                      key={c.grade}
                      onClick={() => toggleArr(selectedCuts, c.grade, setSelectedCuts)}
                      onMouseEnter={() => setHoveredCut(c.grade)}
                      onMouseLeave={() => setHoveredCut(null)}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 text-left transition-all ${
                        selectedCuts.includes(c.grade)
                          ? 'border-[#1B2D44] bg-[#f0f3f8]'
                          : 'border-gray-100 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex-1">
                        <p className={`text-sm font-semibold ${c.highlight ? 'text-[#D946EF]' : 'text-gray-800'}`}>
                          {c.label} {c.highlight && '✦'}
                        </p>
                        <p className="text-xs text-gray-400">{c.meaning}</p>
                      </div>
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                        selectedCuts.includes(c.grade) ? 'border-[#1B2D44] bg-[#1B2D44]' : 'border-gray-300'
                      }`}>
                        {selectedCuts.includes(c.grade) && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Results ──────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Results header */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-gray-500 text-sm">
            <span className="text-gray-900 font-semibold text-lg">920,754</span>{' '}
            {origin === 'lab' ? 'lab-grown' : 'natural'} diamonds found
          </p>
          <div className="flex items-center gap-2">
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-white focus:outline-none focus:border-[#1B2D44]">
              <option>Best Value</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Carat: Largest first</option>
              <option>RC Score: Highest</option>
            </select>
          </div>
        </div>

        {/* Quick-pick chips */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {['Eye-clean only', 'Under $2k', '2ct+', 'RC Ideal cut', 'Great price', 'Has video'].map((chip) => (
            <button
              key={chip}
              className="px-3 py-1 rounded-full text-xs font-medium border border-gray-200 text-gray-500 hover:border-[#1B2D44] hover:text-[#1B2D44] transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Diamond grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MOCK_RESULTS.map((d) => (
            <DiamondCard key={d.id} d={d} />
          ))}
        </div>

        {/* Inline AI nudge after first row */}
        <div className="mt-5 mb-5 bg-gradient-to-r from-[#1B2D44] to-[#253f5e] text-white rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4">
          <div className="text-3xl flex-shrink-0">🧑</div>
          <div className="flex-1 text-center sm:text-left">
            <p className="font-bold text-base">Let Ajay do the filtering for you</p>
            <p className="text-white/70 text-sm">Answer 7 quick questions and get 1 perfect pick with a plain-English explanation.</p>
          </div>
          <Link
            href="/rare-carat/quiz"
            className="bg-white text-[#1B2D44] font-bold text-sm px-5 py-2.5 rounded-full hover:bg-gray-100 transition-colors whitespace-nowrap flex-shrink-0"
          >
            ✦ Try the advisor
          </Link>
        </div>

        {/* More cards placeholder */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MOCK_RESULTS.slice(0, 3).map((d, i) => (
            <DiamondCard key={`${d.id}-b${i}`} d={{ ...d, id: d.id + '-b', label: null, labelColor: null }} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button className="border-2 border-gray-200 text-gray-600 font-semibold px-8 py-3 rounded-full hover:border-[#1B2D44] hover:text-[#1B2D44] transition-colors">
            Load more diamonds
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
