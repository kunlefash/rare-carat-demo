'use client';

import { useState, Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// ─── Lab vs Natural modal ─────────────────────────────────────────────────────
function LabVsNaturalModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const rows = [
    { label: 'Origin', lab: 'Grown in a lab in weeks', natural: 'Formed underground over billions of years' },
    { label: 'Chemistry', lab: 'Identical to natural — same carbon crystal structure', natural: 'Identical to lab — same carbon crystal structure' },
    { label: 'Price', lab: '60–80% less than natural', natural: 'Significantly higher; reflects rarity' },
    { label: 'Sparkle', lab: 'Exactly the same — indistinguishable even to experts', natural: 'Exactly the same — indistinguishable even to experts' },
    { label: 'Certifications', lab: 'IGI, GCAL (most common)', natural: 'GIA, IGI (most common)' },
    { label: 'Eco impact', lab: 'Lower mining footprint', natural: 'Mining-intensive; varies by source' },
    { label: 'Resale value', lab: 'Rapidly declining as prices fall', natural: 'Holds value better historically' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-lg font-bold text-[#1B2D44]">Lab vs. Natural Diamonds</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5">
          <p className="text-sm text-gray-500 mb-5">
            The short answer: they&apos;re the <strong className="text-gray-800">same diamond</strong>, just made differently.
            Lab diamonds aren&apos;t fake — they have the exact same physical, chemical, and optical properties as mined diamonds.
          </p>

          {/* Comparison table */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 bg-[#F8FAFC] text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              <div className="px-4 py-3"></div>
              <div className="px-4 py-3 border-l border-gray-200 text-[#4B5EFF]">✦ Lab Grown</div>
              <div className="px-4 py-3 border-l border-gray-200">Natural</div>
            </div>
            {rows.map((row, i) => (
              <div key={row.label} className={`grid grid-cols-3 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-[#FAFBFC]'}`}>
                <div className="px-4 py-3 font-semibold text-gray-700 text-xs">{row.label}</div>
                <div className="px-4 py-3 text-gray-600 text-xs border-l border-gray-100">{row.lab}</div>
                <div className="px-4 py-3 text-gray-600 text-xs border-l border-gray-100">{row.natural}</div>
              </div>
            ))}
          </div>

          {/* Bottom callout */}
          <div className="mt-5 bg-[#f0f2ff] border border-[#4B5EFF]/20 rounded-xl p-4">
            <p className="text-sm font-semibold text-[#1B2D44] mb-1">Which should you choose?</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              If budget and size matter most → <strong>lab grown</strong>. You get a bigger, higher-quality stone for the same price.
              If long-term resale or sentimental rarity matters → <strong>natural</strong>.
              Either way, nobody can tell the difference by looking.
            </p>
          </div>

          <div className="mt-5 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-[#1B2D44] text-white font-semibold py-2.5 rounded-full text-sm hover:bg-[#253f5e] transition-colors"
            >
              Got it
            </button>
            <Link
              href="/rare-carat/quiz"
              onClick={onClose}
              className="flex-1 border-2 border-[#1B2D44] text-[#1B2D44] font-semibold py-2.5 rounded-full text-sm text-center hover:bg-gray-50 transition-colors"
            >
              Help me decide →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SHAPES = [
  { value: 'round', label: 'Round' },
  { value: 'oval', label: 'Oval' },
  { value: 'cushion', label: 'Cushion' },
  { value: 'princess', label: 'Princess' },
  { value: 'emerald', label: 'Emerald' },
  { value: 'pear', label: 'Pear' },
  { value: 'heart', label: 'Heart' },
  { value: 'radiant', label: 'Radiant' },
  { value: 'marquise', label: 'Marquise' },
];

const COLOR_LABELS = ['K', 'J', 'I', 'H', 'G', 'F', 'E', 'D'];
const COLOR_MEANINGS: Record<string, string> = {
  D: 'Colorless — absolutely no color, the rarest grade',
  E: 'Colorless — no color visible even to an expert',
  F: 'Colorless — slight color only a gemologist can detect',
  G: 'Near Colorless — looks white in a ring, best value',
  H: 'Near Colorless — slight warmth, looks white face-up',
  I: 'Near Colorless — faint tint, hard to notice in a setting',
  J: 'Near Colorless — slight tint visible face-up',
  K: 'Faint Yellow — noticeable warmth, maximizes carat size',
};

const CLARITY_LABELS = ['SI2', 'SI1', 'VS2', 'VS1', 'VVS2', 'VVS1', 'IF', 'FL'];
const CLARITY_MEANINGS: Record<string, string> = {
  FL: 'Flawless — no imperfections, perfectly clean',
  IF: 'Internally Flawless — tiny surface marks only',
  VVS1: 'Very Very Slightly Included — inclusions nearly impossible to see under 10×',
  VVS2: 'Very Very Slightly Included — tiny inclusions, hard to find under magnification',
  VS1: 'Very Slightly Included — very minor inclusions, invisible to the naked eye',
  VS2: 'Very Slightly Included — minor inclusions, not visible without a loupe',
  SI1: 'Slightly Included — inclusions visible under 10×, eye-clean to most people',
  SI2: 'Slightly Included — inclusions may be visible without magnification',
};

const CUT_LABELS = ['Good', 'Very Good', 'Excellent', 'RC Ideal'];
const CUT_MEANINGS: Record<string, string> = {
  'RC Ideal': 'Rare Carat Ideal — maximum sparkle, stricter than GIA Excellent',
  'Excellent': 'Excellent — outstanding brilliance, top GIA grade',
  'Very Good': 'Very Good — superior fire and brilliance',
  'Good': 'Good — reflects most light that enters the diamond',
};

const MOCK_RESULTS = [
  { id: 'oval-001', carat: 2.03, shape: 'Oval', color: 'I', clarity: 'VVS2', cut: 'Excellent Cut', price: 1005, compValue: 1450, quality: '18/18', label: 'Overall pick', labelBg: '#5BA832' },
  { id: 'oval-002', carat: 2.59, shape: 'Oval', color: 'J', clarity: 'VS1', cut: 'Excellent Cut', price: 1350, compValue: 2000, quality: '18/18', label: 'Biggest size', labelBg: '#6D28D9' },
  { id: 'oval-003', carat: 1.90, shape: 'Oval', color: 'D', clarity: 'VS1', cut: 'Excellent Cut', price: 1225, compValue: 1782, quality: '17/18', label: 'Highest quality', labelBg: '#1D4ED8' },
  { id: 'oval-004', carat: 2.14, shape: 'Oval', color: 'H', clarity: 'VS2', cut: 'RC Ideal Cut', price: 1180, compValue: 1720, quality: '18/18', label: null, labelBg: null },
  { id: 'oval-005', carat: 1.76, shape: 'Oval', color: 'G', clarity: 'SI1', cut: 'Excellent Cut', price: 890, compValue: 1310, quality: '17/18', label: null, labelBg: null },
  { id: 'oval-006', carat: 2.31, shape: 'Oval', color: 'I', clarity: 'VS1', cut: 'RC Ideal Cut', price: 1420, compValue: 2100, quality: '18/18', label: null, labelBg: null },
  { id: 'oval-007', carat: 1.52, shape: 'Oval', color: 'F', clarity: 'VVS1', cut: 'Excellent Cut', price: 1050, compValue: 1580, quality: '18/18', label: null, labelBg: null },
  { id: 'oval-008', carat: 2.47, shape: 'Oval', color: 'H', clarity: 'VS2', cut: 'RC Ideal Cut', price: 1680, compValue: 2450, quality: '18/18', label: null, labelBg: null },
  { id: 'oval-009', carat: 1.88, shape: 'Oval', color: 'J', clarity: 'SI1', cut: 'Excellent Cut', price: 820, compValue: 1240, quality: '16/18', label: null, labelBg: null },
];

// ─── Shape SVG ────────────────────────────────────────────────────────────────
function ShapeSVG({ shape }: { shape: string }) {
  const paths: Record<string, React.ReactNode> = {
    round: <ellipse cx="20" cy="20" r="13" stroke="currentColor" strokeWidth="1.5" fill="none" />,
    oval: <ellipse cx="20" cy="20" rx="9" ry="13" stroke="currentColor" strokeWidth="1.5" fill="none" />,
    cushion: <rect x="8" y="8" width="24" height="24" rx="5" stroke="currentColor" strokeWidth="1.5" fill="none" />,
    princess: <rect x="9" y="9" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" />,
    emerald: <rect x="7" y="11" width="26" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />,
    pear: <path d="M20,7 C26,7 28,13 28,17 C28,23 24,32 20,33 C16,32 12,23 12,17 C12,13 14,7 20,7Z" stroke="currentColor" strokeWidth="1.5" fill="none" />,
    heart: <path d="M20,28 C20,28 9,20 9,13.5 C9,10 11.5,8 14.5,8 C16.5,8 18.5,9 20,11 C21.5,9 23.5,8 25.5,8 C28.5,8 31,10 31,13.5 C31,20 20,28 20,28Z" stroke="currentColor" strokeWidth="1.5" fill="none" />,
    radiant: <path d="M12,9 L28,9 L31,12 L31,28 L28,31 L12,31 L9,28 L9,12 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />,
    marquise: <ellipse cx="20" cy="20" rx="14" ry="8" stroke="currentColor" strokeWidth="1.5" fill="none" />,
  };
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      {paths[shape] ?? paths.round}
    </svg>
  );
}

// ─── Info tooltip ─────────────────────────────────────────────────────────────
function InfoIcon({ tooltip }: { tooltip: string }) {
  return (
    <span className="group relative inline-flex cursor-help ml-1">
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className="text-gray-400">
        <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
        <text x="10" y="14.5" textAnchor="middle" fontSize="10" fill="currentColor" fontWeight="700">i</text>
      </svg>
      <span className="pointer-events-none absolute left-5 top-0 z-50 w-56 bg-[#1B2D44] text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-xl whitespace-normal">
        {tooltip}
      </span>
    </span>
  );
}

// ─── Range slider with labeled ticks ─────────────────────────────────────────
function LabeledRangeSlider({
  labels, value, onChange, tooltipMap, label, tooltip,
}: {
  labels: string[];
  value: number;
  onChange: (v: number) => void;
  tooltipMap: Record<string, string>;
  label: string;
  tooltip: string;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1 mb-2">
        <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">{label}</span>
        <InfoIcon tooltip={tooltip} />
      </div>
      <input
        type="range"
        min={0}
        max={labels.length - 1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 appearance-none bg-gray-200 rounded-full accent-[#1B2D44] cursor-pointer"
      />
      <div className="flex justify-between mt-1.5">
        {labels.map((l, i) => (
          <button
            key={l}
            onMouseEnter={() => setHovered(l)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onChange(i)}
            className={`text-[10px] font-medium transition-colors ${i === value ? 'text-[#1B2D44] font-bold' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {l}
          </button>
        ))}
      </div>
      {hovered && tooltipMap[hovered] && (
        <p className="mt-1.5 text-[11px] text-[#1B2D44] bg-[#f0f4f8] rounded px-2 py-1.5 leading-snug">
          <strong>{hovered}</strong> — {tooltipMap[hovered]}
        </p>
      )}
    </div>
  );
}

// ─── Diamond card ─────────────────────────────────────────────────────────────
function DiamondCard({ d, saleBadge = false }: { d: typeof MOCK_RESULTS[0]; saleBadge?: boolean }) {
  const savings = Math.round((1 - d.price / d.compValue) * 100);
  return (
    <Link href={`/rare-carat/diamond/${d.id}`} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group bg-white block">
      <div className="relative bg-[#F5F7FA] h-44 flex items-center justify-center">
        {saleBadge && (
          <span className="absolute top-2 left-2 bg-[#E53E3E] text-white text-[10px] font-bold px-2 py-0.5 rounded">4th of July Sale</span>
        )}
        {d.label && (
          <span className="absolute top-2 left-2 text-white text-[10px] font-bold px-2.5 py-1 rounded" style={{ backgroundColor: d.labelBg ?? '#1B2D44' }}>
            {d.label}
          </span>
        )}
        <button className="absolute top-2 right-2 text-gray-300 hover:text-red-400 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        {/* Diamond illustration */}
        <svg viewBox="0 0 120 110" width="100" height="92" fill="none">
          <ellipse cx="60" cy="58" rx="48" ry="46" fill="white" stroke="#d8e0ea" strokeWidth="1.5" />
          <path d="M60,16 L92,44 L76,92 L44,92 L28,44 Z" fill="white" stroke="#c8d4e0" strokeWidth="1" />
          <path d="M28,44 L60,44 L92,44" stroke="#dde6f0" strokeWidth="0.8" />
          <path d="M60,16 L60,44" stroke="#dde6f0" strokeWidth="0.8" />
          <path d="M60,16 L92,44 M60,16 L28,44" stroke="#e4ecf4" strokeWidth="0.6" />
          <path d="M44,92 L60,44 L76,92" stroke="#dde6f0" strokeWidth="0.8" />
          <ellipse cx="60" cy="58" rx="22" ry="21" fill="white" stroke="#e8eff7" strokeWidth="0.6" opacity="0.7" />
        </svg>
      </div>
      <div className="p-3">
        <p className="font-semibold text-gray-900 text-sm leading-snug">
          {d.carat.toFixed(2)} Carat · {d.color} · {d.clarity}
        </p>
        <p className="text-gray-500 text-xs mb-2">{d.cut}</p>
        <p className="text-xl font-bold text-gray-900">${d.price.toLocaleString()}</p>
        <p className="text-xs text-gray-400">
          Comp. value: <span className="line-through">${d.compValue.toLocaleString()}</span>
          {' '}
          <span className="text-green-600 font-medium">−{savings}%</span>
        </p>
        <p className="text-xs text-green-600 font-medium mt-1">✓ {d.quality} quality</p>
      </div>
    </Link>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
function SearchContent() {
  const searchParams = useSearchParams();
  const initShape = searchParams.get('shape') || 'oval';
  const fromRec = searchParams.get('recommended') === '1';

  const [origin, setOrigin] = useState<'lab' | 'natural'>('lab');
  const [labModalOpen, setLabModalOpen] = useState(false);
  const [selectedShape, setSelectedShape] = useState(initShape);
  const [colorIdx, setColorIdx] = useState(3);         // default H
  const [clarityIdx, setClarityIdx] = useState(3);     // default VS1
  const [cutIdx, setCutIdx] = useState(3);             // default RC Ideal
  const [caratMax, setCaratMax] = useState(70);        // index on 0-100 slider
  const [priceMin, setPriceMin] = useState('$350');
  const [priceMax, setPriceMax] = useState('$4,000,000');
  const [advOpen, setAdvOpen] = useState(false);
  const [quickShip, setQuickShip] = useState(false);
  const [imgFilter, setImgFilter] = useState(true);
  const [view, setView] = useState<'visual' | 'list'>('visual');
  const [sort, setSort] = useState('Best Value');
  const [priceScoreFilters, setPriceScoreFilters] = useState<string[]>([]);
  const [qualityFilters, setQualityFilters] = useState<string[]>([]);

  function toggleStr(arr: string[], v: string, set: (a: string[]) => void) {
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  }

  const aiPicks = MOCK_RESULTS.slice(0, 3);
  const regularResults = MOCK_RESULTS.slice(3);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>

      {labModalOpen && <LabVsNaturalModal onClose={() => setLabModalOpen(false)} />}

      {/* ── Announcement bar ───────────────────────────────────── */}
      <div className="bg-[#8B1818] text-white text-xs py-2 px-4 flex items-center justify-between">
        <span className="hidden sm:block text-white/90">(855) 720-4858</span>
        <p className="text-center font-medium flex-1">4th of July Sale · Save up to 40%* · Diamonds, Rings and Jewelry</p>
        <div className="hidden sm:flex items-center gap-3 text-white/80">
          <a href="#" className="hover:text-white">Contact us</a>
          <span>|</span>
          <a href="#" className="hover:text-white">Sign in</a>
        </div>
      </div>

      {/* ── Nav ────────────────────────────────────────────────── */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/rare-carat" className="flex-shrink-0">
              <div className="flex items-end gap-1 leading-none">
                <span className="text-[#1B2D44] font-bold text-2xl" style={{ fontFamily: 'Georgia, serif' }}>rare</span>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="mb-0.5">
                  <path d="M12 21C12 21 3 14.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.82 3.85 12 5C12.18 3.85 13.76 3 15.5 3C18.58 3 21 5.42 21 8.5C21 14.5 12 21 12 21Z" fill="#D946EF" />
                </svg>
                <span className="text-[#1B2D44] font-bold text-2xl" style={{ fontFamily: 'Georgia, serif' }}>carat</span>
              </div>
              <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">America&apos;s #1 Rated Jeweler</p>
            </Link>

            <div className="hidden md:flex items-center gap-7 text-sm text-[#1B2D44] font-medium">
              {['Engagement rings', 'Wedding bands', 'Diamonds', 'Earrings', 'Necklaces', 'Bracelets', 'Gifts'].map((l) => (
                <a key={l} href="#" className="hover:opacity-70">{l}</a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button className="text-[#1B2D44] hover:opacity-70">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
              </button>
              <button className="text-[#1B2D44] hover:opacity-70">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
              </button>
              <button className="relative text-[#1B2D44] hover:opacity-70">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>
                <span className="absolute -top-1.5 -right-1.5 bg-[#D946EF] text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">2</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Builder bar ────────────────────────────────────────── */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-stretch divide-x divide-gray-200">
            {/* Step 1 - active */}
            <div className="flex-1 flex items-center gap-3 py-3 px-4 bg-white border-b-2 border-[#1B2D44]">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1B2D44] text-white text-xs font-bold flex items-center justify-center">1</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-900">Diamond</p>
                <p className="text-xs text-gray-400 truncate">Choose your diamond</p>
              </div>
            </div>
            {/* Step 2 */}
            <div className="flex-1 flex items-center gap-3 py-3 px-4 text-gray-400">
              <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-200 text-xs font-bold flex items-center justify-center text-gray-300">2</span>
              <div>
                <p className="text-xs font-semibold">Setting</p>
                <p className="text-xs">Choose a setting</p>
              </div>
            </div>
            {/* Step 3 */}
            <div className="flex-1 flex items-center gap-3 py-3 px-4 text-gray-400">
              <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-200 text-xs font-bold flex items-center justify-center text-gray-300">3</span>
              <div>
                <p className="text-xs font-semibold">Complete</p>
                <p className="text-xs">Ring</p>
              </div>
              <div className="ml-auto">
                <svg width="32" height="32" viewBox="0 0 50 50" fill="none">
                  <circle cx="25" cy="25" r="18" stroke="#d0d8e0" strokeWidth="3" fill="none" />
                  <circle cx="25" cy="10" r="4" fill="#e8ecf0" stroke="#d0d8e0" strokeWidth="1" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Filter section ─────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-2xl font-semibold text-gray-900 text-center mb-1">Search for Diamonds</h1>

          {/* AI advisor — prominent per our change */}
          <div className="flex justify-center mb-5">
            <Link
              href="/rare-carat/quiz"
              className="inline-flex items-center gap-2 bg-[#F0F2FF] border border-[#4B5EFF]/30 text-[#4B5EFF] font-semibold text-sm px-5 py-2 rounded-full hover:bg-[#e5e8ff] transition-colors"
            >
              <span className="text-base">✦</span>
              Not sure? Let our AI find your perfect diamond →
            </Link>
          </div>

          {/* Lab / Natural */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOrigin('lab')}
                className={`px-8 py-2 text-sm font-semibold transition-colors ${origin === 'lab' ? 'bg-[#1B2D44] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                Lab
              </button>
              <button
                onClick={() => setOrigin('natural')}
                className={`px-8 py-2 text-sm font-semibold border-l border-gray-200 transition-colors ${origin === 'natural' ? 'bg-[#1B2D44] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                Natural
              </button>
            </div>
            <button onClick={() => setLabModalOpen(true)} className="ml-4 text-sm text-[#4B5EFF] hover:underline">What&apos;s the difference?</button>
          </div>

          {/* ── BASIC FILTERS ── */}
          <div className="space-y-6">
            {/* Shape */}
            <div className="flex items-start gap-4">
              <div className="w-20 flex-shrink-0 pt-1">
                <span className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                  SHAPE
                  <InfoIcon tooltip="The outline shape of the diamond. Round is the most popular and sparkles most; fancy shapes (oval, cushion, etc.) offer more carat for the same price." />
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SHAPES.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSelectedShape(s.value)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-all ${
                      selectedShape === s.value
                        ? 'border-[#1B2D44] bg-[#f0f4f8] text-[#1B2D44]'
                        : 'border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-600'
                    }`}
                    title={s.label}
                  >
                    <ShapeSVG shape={s.value} />
                    <span className="text-[9px] font-medium leading-none">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color + Price row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <LabeledRangeSlider
                label="COLOR"
                tooltip="Diamond color is graded D (colorless) to Z (yellow). D–F are colorless; G–J are near-colorless and look white in a ring. Most people can't see the difference between D–H face-up."
                labels={COLOR_LABELS}
                value={colorIdx}
                onChange={setColorIdx}
                tooltipMap={COLOR_MEANINGS}
              />
              {/* Price */}
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">PRICE</span>
                  <InfoIcon tooltip="Set your budget range. Rare Carat shows you AI comparison values so you always know if you're getting a fair deal." />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 w-28 focus:outline-none focus:border-[#1B2D44]"
                  />
                  <div className="flex-1 h-px bg-gray-200" />
                  <input
                    type="text"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 w-32 focus:outline-none focus:border-[#1B2D44]"
                  />
                </div>
              </div>
            </div>

            {/* ── Advanced toggle ── */}
            <div>
              <button
                onClick={() => setAdvOpen((v) => !v)}
                className="flex items-center gap-2 text-sm font-semibold text-[#4B5EFF] hover:text-[#3a4ecc]"
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className={`transition-transform ${advOpen ? 'rotate-180' : ''}`}>
                  <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                {advOpen ? 'Hide' : 'Show'} advanced filters
                {!advOpen && <span className="text-gray-400 font-normal">(Carat · Clarity · Cut)</span>}
              </button>

              {advOpen && (
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Carat */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                        CARAT
                        <InfoIcon tooltip="Carat is the weight of the diamond. Bigger isn't always better — a well-cut 1.8ct can look larger than a poorly-cut 2ct." />
                      </span>
                      <span className="text-xs text-gray-500">0 – {(caratMax / 20).toFixed(1)}ct</span>
                    </div>
                    <input
                      type="range" min={0} max={100} value={caratMax}
                      onChange={(e) => setCaratMax(Number(e.target.value))}
                      className="w-full h-1 appearance-none bg-gray-200 rounded-full accent-[#1B2D44] cursor-pointer"
                    />
                    <div className="flex justify-between mt-1.5 text-[10px] text-gray-400 font-medium">
                      <span>0</span><span>100</span>
                    </div>
                  </div>

                  {/* Cut */}
                  <LabeledRangeSlider
                    label="CUT"
                    tooltip="Cut determines how much a diamond sparkles. Rare Carat Ideal is our highest standard — stricter than GIA Excellent. Cut matters more than color or clarity."
                    labels={CUT_LABELS}
                    value={cutIdx}
                    onChange={setCutIdx}
                    tooltipMap={CUT_MEANINGS}
                  />

                  {/* Clarity */}
                  <LabeledRangeSlider
                    label="CLARITY"
                    tooltip="Clarity grades the number of tiny imperfections (inclusions). VS2 and above are 'eye-clean' — you can't see the inclusions without a magnifying loupe."
                    labels={CLARITY_LABELS}
                    value={clarityIdx}
                    onChange={setClarityIdx}
                    tooltipMap={CLARITY_MEANINGS}
                  />
                </div>
              )}
            </div>

            {/* Quick ship + Reset */}
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" checked={quickShip} onChange={(e) => setQuickShip(e.target.checked)} className="accent-[#1B2D44]" />
                <span className="text-sm text-gray-600">Quick ship</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400"><rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
              </label>
              <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 4v6h-6" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Results controls ───────────────────────────────────── */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4 flex-wrap">
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
            Track this search
            <div className={`relative w-9 h-5 rounded-full transition-colors ${imgFilter ? 'bg-gray-200' : 'bg-gray-200'}`}>
              <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform" />
            </div>
          </label>

          <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setView('visual')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm ${view === 'visual' ? 'bg-[#1B2D44] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg>
              Visual
            </button>
            <button
              onClick={() => setView('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm border-l border-gray-200 ${view === 'list' ? 'bg-[#1B2D44] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
              List
            </button>
          </div>

          <p className="text-sm text-gray-500 flex-1">
            <span className="font-semibold text-gray-900">951,840</span> {origin === 'lab' ? 'lab-grown' : 'natural'} diamonds found
          </p>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:border-[#1B2D44]"
          >
            <option>Best Value</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Carat: Largest first</option>
          </select>
        </div>
      </div>

      {/* Ships / date row */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center gap-3">
          <button className="flex items-center gap-1 text-sm font-medium text-gray-700">
            Ships as loose diamonds by
            <InfoIcon tooltip="Shows only diamonds that ship as loose stones, compatible with the setting you choose." />
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
          <button className="border border-gray-200 rounded-md px-3 py-1 text-sm text-gray-600 flex items-center gap-1 hover:border-gray-400">
            Any date
            <svg width="12" height="12" viewBox="0 0 20 20" fill="none"><path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>
      </div>

      {/* ── Main two-column layout ─────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex gap-6">

        {/* LEFT SIDEBAR */}
        <aside className="w-64 flex-shrink-0 space-y-4">

          {/* GIA cert search */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50">
              <span className="text-sm font-semibold text-gray-700">Search by GIA/IGI Cert No.</span>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className="rotate-180"><path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </div>
            <div className="px-4 pb-4 flex gap-2">
              <input type="text" placeholder="GIA/IGI Number" className="flex-1 border border-gray-200 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-[#1B2D44]" />
              <button className="bg-[#1B2D44] text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-[#253f5e]">SUBMIT</button>
            </div>
          </div>

          {/* Popular filters */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm font-semibold text-gray-700">Popular filters</span>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className="rotate-180"><path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </div>
            <div className="px-4 pb-4 space-y-2.5">
              {[
                { label: 'Image or Video Available', icon: '📷', checked: imgFilter, onChange: () => setImgFilter((v) => !v) },
                { label: 'Search for Rings', icon: '💍', checked: false, onChange: () => {} },
                { label: 'Search for Pendants', icon: '📿', checked: false, onChange: () => {} },
              ].map((f) => (
                <label key={f.label} className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" checked={f.checked} onChange={f.onChange} className="accent-[#1B2D44] w-4 h-4" />
                  <span className="text-xs text-gray-600">{f.label}</span>
                </label>
              ))}
              {/* Take the quiz — AI option in sidebar */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <Link href="/rare-carat/quiz" className="flex items-center gap-2 text-xs text-[#4B5EFF] font-semibold hover:underline">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#4B5EFF" /></svg>
                  Take the Quiz
                </Link>
              </div>
            </div>
          </div>

          {/* Rare Carat Scores */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm font-semibold text-gray-700">Rare Carat Scores</span>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className="rotate-180"><path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </div>
            <div className="px-4 pb-4 space-y-4">
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1">
                  Price Score
                  <InfoIcon tooltip="Our AI compares each diamond's price to similar stones to determine if you're getting a great, good, or fair deal." />
                </p>
                {['Great Price', 'Good Price', 'Fair Price'].map((v) => (
                  <label key={v} className="flex items-center gap-2 py-1 cursor-pointer">
                    <input type="checkbox" checked={priceScoreFilters.includes(v)} onChange={() => toggleStr(priceScoreFilters, v, setPriceScoreFilters)} className="accent-[#1B2D44] w-4 h-4" />
                    <span className="text-xs text-gray-600">{v}</span>
                  </label>
                ))}
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1">
                  Quality Check
                  <InfoIcon tooltip="Our gemologists check each diamond against 18 quality criteria. 18/18 means it passes every check." />
                </p>
                {['Meets all checks', 'Misses 1', 'Misses 2', 'Misses 3'].map((v) => (
                  <label key={v} className="flex items-center gap-2 py-1 cursor-pointer">
                    <input type="checkbox" checked={qualityFilters.includes(v)} onChange={() => toggleStr(qualityFilters, v, setQualityFilters)} className="accent-[#1B2D44] w-4 h-4" />
                    <span className="text-xs text-gray-600">{v}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN RESULTS */}
        <main className="flex-1 min-w-0">

          {fromRec && (
            <div className="mb-4 bg-[#f0f2ff] border border-[#4B5EFF]/20 rounded-lg px-4 py-3 flex items-center justify-between text-sm">
              <span className="text-[#4B5EFF] font-medium">✦ Showing all results from your recommendation</span>
              <Link href="/rare-carat/recommendation" className="text-[#4B5EFF] font-semibold hover:underline">← Back to my picks</Link>
            </div>
          )}

          {/* Preset chips */}
          <div className="flex gap-2 mb-5 flex-wrap">
            {['<1ct', '1ct+', '1.5ct+', '2ct+', '2.5ct+', '3ct+', '3.5ct+', '4ct+', '5ct+', 'Sweet Spot', 'Top Quality', 'Budget'].map((chip) => (
              <button key={chip} className="px-3 py-1 rounded-md border border-gray-200 text-xs font-medium text-gray-600 hover:border-[#1B2D44] hover:text-[#1B2D44] transition-colors bg-white">
                {chip}
              </button>
            ))}
          </div>

          {/* Top AI picks */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#4B5EFF"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
              <span className="font-semibold text-gray-900">Top AI picks</span>
              <span className="text-gray-400 text-sm">· Based on your filters</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {aiPicks.map((d) => <DiamondCard key={d.id} d={d} />)}
            </div>
          </div>

          {/* Regular results grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {regularResults.map((d, i) => <DiamondCard key={d.id} d={d} saleBadge={i < 3} />)}
          </div>

          <div className="mt-8 flex justify-center">
            <button className="border border-gray-300 text-gray-600 font-medium px-8 py-2.5 rounded-lg hover:border-[#1B2D44] hover:text-[#1B2D44] transition-colors text-sm">
              Load more diamonds
            </button>
          </div>
        </main>
      </div>

      {/* Compare bar */}
      <div className="fixed bottom-4 left-4 z-50">
        <button className="bg-[#D946EF] text-white font-semibold px-5 py-2.5 rounded-full shadow-lg hover:bg-[#c026d3] transition-colors flex items-center gap-2 text-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
          Compare
        </button>
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
