'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// ─── Mock data ─────────────────────────────────────────────────────────────────

const P = 'https://images.pexels.com/photos';
const IMGS = {
  a: `${P}/4997548/pexels-photo-4997548.jpeg?auto=compress&cs=tinysrgb&w=800&h=800`,
  b: `${P}/4997547/pexels-photo-4997547.jpeg?auto=compress&cs=tinysrgb&w=800&h=800`,
};
const BG = '#f4f3f1';

const DIAMONDS: Record<string, {
  id: string; carat: number; shape: string; color: string; clarity: string;
  cut: string; price: number; compValue: number; quality: string; cert: string;
  img: string; imgBg: string; origin: string;
}> = {
  'oval-001': { id: 'oval-001', carat: 2.03, shape: 'Oval', color: 'I', clarity: 'VVS2', cut: 'Excellent', price: 1005, compValue: 1450, quality: '17/18', cert: 'IGI',  img: IMGS.a, imgBg: BG, origin: 'Natural' },
  'oval-002': { id: 'oval-002', carat: 2.59, shape: 'Oval', color: 'J', clarity: 'VS1',  cut: 'Excellent', price: 1350, compValue: 2000, quality: '18/18', cert: 'IGI',  img: IMGS.b, imgBg: BG, origin: 'Natural' },
  'oval-003': { id: 'oval-003', carat: 1.90, shape: 'Oval', color: 'D', clarity: 'VS1',  cut: 'Excellent', price: 1225, compValue: 1782, quality: '17/18', cert: 'GIA',  img: IMGS.a, imgBg: BG, origin: 'Natural' },
  'oval-004': { id: 'oval-004', carat: 2.14, shape: 'Oval', color: 'H', clarity: 'VS2',  cut: 'RC Ideal',  price: 1180, compValue: 1720, quality: '18/18', cert: 'IGI',  img: IMGS.b, imgBg: BG, origin: 'Natural' },
  'oval-005': { id: 'oval-005', carat: 1.76, shape: 'Oval', color: 'G', clarity: 'SI1',  cut: 'Excellent', price:  890, compValue: 1310, quality: '17/18', cert: 'IGI',  img: IMGS.a, imgBg: BG, origin: 'Natural' },
  'oval-006': { id: 'oval-006', carat: 2.31, shape: 'Oval', color: 'I', clarity: 'VS1',  cut: 'RC Ideal',  price: 1420, compValue: 2100, quality: '18/18', cert: 'GCAL', img: IMGS.b, imgBg: BG, origin: 'Natural' },
  'oval-007': { id: 'oval-007', carat: 1.52, shape: 'Oval', color: 'F', clarity: 'VVS1', cut: 'Excellent', price: 1050, compValue: 1580, quality: '18/18', cert: 'GIA',  img: IMGS.a, imgBg: BG, origin: 'Natural' },
  'oval-008': { id: 'oval-008', carat: 2.47, shape: 'Oval', color: 'H', clarity: 'VS2',  cut: 'RC Ideal',  price: 1680, compValue: 2450, quality: '18/18', cert: 'IGI',  img: IMGS.b, imgBg: BG, origin: 'Natural' },
  'oval-009': { id: 'oval-009', carat: 1.88, shape: 'Oval', color: 'J', clarity: 'SI1',  cut: 'Excellent', price:  820, compValue: 1240, quality: '16/18', cert: 'IGI',  img: IMGS.a, imgBg: BG, origin: 'Natural' },
};

const FALLBACK = DIAMONDS['oval-001'];

// ─── Cut modal ────────────────────────────────────────────────────────────────

function CutModal({ cut, onClose }: { cut: string; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose]);

  const grades = ['Good', 'Very Good', 'Excellent', 'RC Ideal'];
  const active = grades.indexOf(cut) !== -1 ? cut : 'Excellent';
  const rows = [
    { prop: 'Cut', target: 'Excellent or better', value: cut },
    { prop: 'Symmetry', target: 'Very Good or better', value: 'Excellent' },
    { prop: 'Polish', target: 'Very Good or better', value: 'Excellent' },
    { prop: 'Girdle Percentage', target: '2.5% – 4%', value: '4.0%' },
    { prop: 'Culet', target: 'None or Very Small', value: 'None' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="font-bold text-gray-900">Cut <span className="text-gray-400 font-normal text-sm ml-1">{grades.indexOf(active) + 1}/{grades.length}</span></h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="px-6 py-5">
          {/* Grade scale */}
          <div className="flex items-end justify-center gap-4 mb-6 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 bg-[#EEF2FF] text-[#4B5EFF] text-[11px] font-semibold px-3 py-0.5 rounded-full">Your diamond</div>
            {grades.map((g) => (
              <div key={g} className={`flex flex-col items-center gap-2 ${g === active ? 'opacity-100' : 'opacity-30'}`}>
                <svg width="40" height="44" viewBox="0 0 40 44" fill="none">
                  <polygon points="20,2 36,14 30,42 10,42 4,14" stroke="#4B5EFF" strokeWidth="1.5" fill={g === active ? '#EEF2FF' : 'none'} />
                  <line x1="4" y1="14" x2="36" y2="14" stroke="#4B5EFF" strokeWidth="1" />
                  <line x1="20" y1="2" x2="10" y2="42" stroke="#4B5EFF" strokeWidth="0.5" />
                  <line x1="20" y1="2" x2="30" y2="42" stroke="#4B5EFF" strokeWidth="0.5" />
                  <line x1="20" y1="14" x2="4" y2="14" stroke="#4B5EFF" strokeWidth="0.5" />
                  <line x1="20" y1="14" x2="36" y2="14" stroke="#4B5EFF" strokeWidth="0.5" />
                </svg>
                <span className={`text-xs font-medium ${g === active ? 'text-[#1B2D44] font-bold border-b-2 border-[#4B5EFF] pb-0.5' : 'text-gray-400'}`}>{g}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Cut is the most important factor. When an experienced gemologist picks up a grading report, their eyes go directly to cut values — depth, table, girdle, polish and symmetry all work together to determine how brilliantly your diamond sparkles.
          </p>
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 bg-gray-50 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              <div className="px-4 py-2.5">Property</div>
              <div className="px-4 py-2.5 border-l border-gray-200">Target</div>
              <div className="px-4 py-2.5 border-l border-gray-200">Diamond</div>
            </div>
            {rows.map((r, i) => (
              <div key={r.prop} className={`grid grid-cols-3 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="px-4 py-2.5 text-xs font-medium text-gray-700">{r.prop}</div>
                <div className="px-4 py-2.5 text-xs text-gray-500 border-l border-gray-100">{r.target}</div>
                <div className="px-4 py-2.5 text-xs text-green-700 font-semibold border-l border-gray-100">✓ {r.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Color modal ──────────────────────────────────────────────────────────────

function ColorModal({ color, onClose }: { color: string; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose]);

  const groups = [
    { label: '(K-Z)', desc: 'Faint to light yellow', range: ['K','J'] },
    { label: '(G-J)', desc: 'Near colorless', range: ['G','H','I','J'] },
    { label: '(D-F)', desc: 'Colorless', range: ['D','E','F'] },
  ];
  const activeGroup = groups.find(g => g.range.includes(color)) ?? groups[1];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="font-bold text-gray-900">Color <span className="text-gray-400 font-normal text-sm ml-1">3/3</span></h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="px-6 py-5">
          <div className="flex items-end justify-center gap-6 mb-6 relative pt-6">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#EEF2FF] text-[#4B5EFF] text-[11px] font-semibold px-3 py-0.5 rounded-full">Your diamond</div>
            {groups.map((g) => {
              const active = g.label === activeGroup.label;
              return (
                <div key={g.label} className={`flex flex-col items-center gap-2 ${active ? 'opacity-100' : 'opacity-30'}`}>
                  <div className="flex gap-0.5">
                    {[0, 1].map((i) => (
                      <svg key={i} width="26" height="30" viewBox="0 0 40 44" fill="none">
                        <polygon points="20,2 36,14 30,42 10,42 4,14"
                          stroke="#4B5EFF" strokeWidth="1.5"
                          fill={active ? (i === 0 ? '#EEF2FF' : '#E0E7FF') : 'none'}
                        />
                      </svg>
                    ))}
                  </div>
                  <span className={`text-xs font-medium ${active ? 'text-[#1B2D44] font-bold border-b-2 border-[#4B5EFF] pb-0.5' : 'text-gray-400'}`}>{g.label}</span>
                </div>
              );
            })}
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Color is graded beginning with D (Colorless). Your <span className="text-[#4B5EFF] font-medium">{color} color</span> diamond falls in the Near Colorless range — it looks white when set in a ring and offers outstanding value over colorless grades.
          </p>
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            {[
              { prop: 'Color', target: 'K–D', value: color },
              { prop: 'Artificial Treatment', target: 'No', value: 'No' },
              { prop: 'Fluorescence Color', target: 'None or Blue', value: 'None' },
              { prop: 'Fluorescence Strength', target: 'Very Strong or less', value: 'None' },
            ].map((r, i) => (
              <div key={r.prop} className={`grid grid-cols-3 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="px-4 py-2.5 text-xs font-medium text-gray-700 border-b border-gray-100">{r.prop}</div>
                <div className="px-4 py-2.5 text-xs text-gray-500 border-l border-b border-gray-100">{r.target}</div>
                <div className="px-4 py-2.5 text-xs text-green-700 font-semibold border-l border-b border-gray-100">✓ {r.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Clarity modal ────────────────────────────────────────────────────────────

function ClarityModal({ clarity, onClose }: { clarity: string; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose]);

  const groups = [
    { label: 'SI2-SI1', range: ['SI2','SI1'] },
    { label: 'VS2-VS1', range: ['VS2','VS1'] },
    { label: 'VVS2-VVS1', range: ['VVS2','VVS1'] },
    { label: 'IF-FL', range: ['IF','FL'] },
  ];
  const activeGroup = groups.find(g => g.range.includes(clarity)) ?? groups[1];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="font-bold text-gray-900">Clarity <span className="text-gray-400 font-normal text-sm ml-1">7/7</span></h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="px-6 py-5">
          <div className="flex items-end justify-center gap-3 mb-6 relative pt-6">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#EEF2FF] text-[#4B5EFF] text-[11px] font-semibold px-3 py-0.5 rounded-full">Your diamond</div>
            {groups.map((g) => {
              const active = g.label === activeGroup.label;
              return (
                <div key={g.label} className={`flex flex-col items-center gap-2 ${active ? 'opacity-100' : 'opacity-30'}`}>
                  <svg width="38" height="42" viewBox="0 0 40 44" fill="none">
                    <polygon points="20,2 36,14 30,42 10,42 4,14" stroke="#4B5EFF" strokeWidth="1.5" fill={active ? '#EEF2FF' : 'none'} />
                    <line x1="4" y1="14" x2="36" y2="14" stroke="#4B5EFF" strokeWidth="1" />
                    {active && <circle cx="20" cy="26" r="4" fill="#4B5EFF" fillOpacity="0.3" stroke="#4B5EFF" strokeWidth="1" />}
                  </svg>
                  <span className={`text-[11px] font-medium ${active ? 'text-[#1B2D44] font-bold border-b-2 border-[#4B5EFF] pb-0.5' : 'text-gray-400'}`}>{g.label}</span>
                </div>
              );
            })}
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Your <span className="text-[#4B5EFF] font-medium">{clarity}</span> diamond is Slightly Included — inclusions are visible under 10× magnification but appear eye-clean to most people. Our gemologists always avoid stones with a cavity or chip, as these are structural risks.
          </p>
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            {[
              { prop: 'Clarity', target: 'SI2 or above', value: clarity },
              { prop: 'Cavity', target: 'No', value: 'No' },
              { prop: 'Chip', target: 'No', value: 'No' },
              { prop: 'Etch Channel', target: 'No', value: 'No' },
              { prop: 'Indented Natural', target: 'No', value: 'No' },
            ].map((r, i) => (
              <div key={r.prop} className={`grid grid-cols-3 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="px-4 py-2.5 text-xs font-medium text-gray-700 border-b border-gray-100">{r.prop}</div>
                <div className="px-4 py-2.5 text-xs text-gray-500 border-l border-b border-gray-100">{r.target}</div>
                <div className="px-4 py-2.5 text-xs text-green-700 font-semibold border-l border-b border-gray-100">✓ {r.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── View Size panel ──────────────────────────────────────────────────────────

const SKIN_TONES = ['#FDDCB5', '#F0C28A', '#D4926A', '#A0613A', '#6B3A2A'];

function ViewSizePanel({ carat }: { carat: number }) {
  const [skinTone, setSkinTone] = useState(1);
  const [sliderCarat, setSliderCarat] = useState(carat);

  const diamondPx = Math.round(32 + sliderCarat * 18);

  return (
    <div className="relative h-full flex flex-col">
      {/* Hand image area */}
      <div className="flex-1 relative overflow-hidden rounded-t-xl" style={{ background: '#f5f0eb', minHeight: 320 }}>
        {/* Simulated hand with ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Hand SVG */}
            <svg width="280" height="340" viewBox="0 0 280 340" fill="none">
              <ellipse cx="140" cy="280" rx="70" ry="60" fill={SKIN_TONES[skinTone]} />
              {/* Palm */}
              <rect x="80" y="160" width="120" height="140" rx="20" fill={SKIN_TONES[skinTone]} />
              {/* Fingers */}
              <rect x="88" y="60" width="28" height="120" rx="14" fill={SKIN_TONES[skinTone]} />
              <rect x="122" y="40" width="28" height="130" rx="14" fill={SKIN_TONES[skinTone]} />
              <rect x="156" y="50" width="28" height="120" rx="14" fill={SKIN_TONES[skinTone]} />
              <rect x="188" y="70" width="24" height="100" rx="12" fill={SKIN_TONES[skinTone]} />
              {/* Ring on ring finger (156-184) */}
              <rect x="152" y="148" width="36" height="10" rx="3" fill="#D4AF37" opacity="0.9" />
              {/* Diamond on ring */}
              <polygon
                points={`170,${145 - diamondPx * 0.6} ${170 + diamondPx * 0.4},148 170,${148 + diamondPx * 0.5} ${170 - diamondPx * 0.4},148`}
                fill="white" stroke="#C0C8E0" strokeWidth="1.5" opacity="0.95"
              />
            </svg>
          </div>
        </div>
        {/* Skin tone picker */}
        <div className="absolute top-3 right-3 bg-white/90 rounded-xl shadow p-2 flex flex-col gap-2">
          {SKIN_TONES.map((tone, i) => (
            <button
              key={tone}
              onClick={() => setSkinTone(i)}
              className={`w-7 h-7 rounded-full border-2 transition-all ${skinTone === i ? 'border-[#4B5EFF] scale-110' : 'border-transparent'}`}
              style={{ backgroundColor: tone }}
            />
          ))}
        </div>
      </div>

      {/* Carat slider */}
      <div className="bg-white px-6 py-4 border-t border-gray-100 rounded-b-xl">
        <p className="text-xs text-gray-500 text-center mb-2">Actual diamond size on size 6 finger</p>
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          {[0.2, 1, 2, 3, 4, 5].map(v => <span key={v}>{v}</span>)}
        </div>
        <input
          type="range" min={0.2} max={5} step={0.1} value={sliderCarat}
          onChange={e => setSliderCarat(Number(e.target.value))}
          className="w-full accent-[#4B5EFF]"
        />
        <div className="mt-2 text-center">
          <span className="bg-gray-100 text-gray-800 text-sm font-semibold px-3 py-1 rounded-full">
            Your diamond: {sliderCarat.toFixed(1)} ct
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DiamondDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { id } = use(params);
  const sp = use(searchParams);
  const router = useRouter();

  const d = DIAMONDS[id] ?? FALLBACK;
  const rationale = sp.rationale ?? null;
  const savings = d.compValue - d.price;
  const savingsPct = Math.round((savings / d.compValue) * 100);
  const monthlyPayment = Math.round(d.price / 12);

  const [activeTab, setActiveTab] = useState<'photo' | 'viewsize'>('photo');
  const [cutModal, setCutModal] = useState(false);
  const [colorModal, setColorModal] = useState(false);
  const [clarityModal, setClarityModal] = useState(false);
  const [saleApplied, setSaleApplied] = useState(false);
  const [guaranteeOpen, setGuaranteeOpen] = useState(false);
  const [returnsOpen, setReturnsOpen] = useState(false);
  const [ringStyle, setRingStyle] = useState('Solitaire');

  const RING_STYLES = ['Solitaire', 'Halo', 'Hidden Halo', 'Pavé', 'Three Stone'];

  function chooseThisDiamond() {
    const params = new URLSearchParams({
      id: d.id, carat: String(d.carat), color: d.color,
      clarity: d.clarity, shape: d.shape, price: String(d.price),
    });
    router.push(`/rare-carat/setting-search?${params}`);
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      {cutModal     && <CutModal     cut={d.cut}         onClose={() => setCutModal(false)}     />}
      {colorModal   && <ColorModal   color={d.color}     onClose={() => setColorModal(false)}   />}
      {clarityModal && <ClarityModal clarity={d.clarity} onClose={() => setClarityModal(false)} />}

      {/* Announcement bar */}
      <div className="bg-[#8B1818] text-white text-xs py-2 px-4 text-center font-medium">
        4th of July Sale · Save up to 40%* · Diamonds, Rings and Jewelry
      </div>

      {/* Nav */}
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
              {['Engagement rings','Wedding bands','Diamonds','Earrings','Necklaces','Bracelets','Gifts'].map(l => (
                <a key={l} href="#" className="hover:opacity-70">{l}</a>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <button className="text-[#1B2D44] hover:opacity-70">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              </button>
              <button className="relative text-[#1B2D44] hover:opacity-70">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                <span className="absolute -top-1.5 -right-1.5 bg-[#D946EF] text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">2</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Builder bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 divide-x divide-gray-200">
            <div className="flex items-center gap-3 py-4 bg-white border-b-2 border-[#1B2D44]">
              <div className="w-7 h-7 rounded-full bg-[#1B2D44] text-white text-xs font-bold flex items-center justify-center">1</div>
              <div>
                <p className="text-xs text-gray-500">Choose your</p>
                <p className="text-sm font-bold text-[#1B2D44]">Diamond</p>
              </div>
              <svg width="20" height="24" viewBox="0 0 24 28" fill="none" stroke="#1B2D44" strokeWidth="1.5" className="ml-auto opacity-40">
                <polygon points="12,2 22,9 18,26 6,26 2,9"/>
              </svg>
            </div>
            <div className="flex items-center gap-3 py-4 px-4">
              <div className="w-7 h-7 rounded-full border-2 border-gray-300 text-gray-400 text-xs font-bold flex items-center justify-center">2</div>
              <div>
                <p className="text-xs text-gray-400">Choose your</p>
                <p className="text-sm font-medium text-gray-400">Setting</p>
              </div>
              <button onClick={chooseThisDiamond} className="ml-auto text-xs text-[#4B5EFF] font-semibold hover:underline">Browse</button>
            </div>
            <div className="flex items-center gap-3 py-4 px-4">
              <div className="w-7 h-7 rounded-full border-2 border-gray-200 text-gray-300 text-xs font-bold flex items-center justify-center">3</div>
              <div>
                <p className="text-xs text-gray-300">Complete</p>
                <p className="text-sm font-medium text-gray-300">Ring</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back link */}
      <div className="max-w-7xl mx-auto px-6 py-3">
        <Link href="/rare-carat/search" className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#1B2D44]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          Back to search
        </Link>
      </div>

      {/* AI rationale banner */}
      {rationale && (
        <div className="max-w-7xl mx-auto px-6 mb-4">
          <div className="bg-[#f0f2ff] border border-[#4B5EFF]/30 rounded-xl px-5 py-3 flex items-start gap-3">
            <span className="text-[#4B5EFF] text-base">✦</span>
            <div>
              <p className="text-xs font-bold text-[#4B5EFF] uppercase tracking-wide mb-0.5">Why we picked this for you</p>
              <p className="text-sm text-gray-700">{rationale}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_380px] gap-6">

          {/* Left thumbnail sidebar */}
          <div className="flex lg:flex-col gap-2 lg:gap-3 overflow-x-auto lg:overflow-visible">
            {[
              { key: 'photo', icon: null, label: 'Photo' },
              { key: 'viewsize', icon: '✋', label: 'View Size' },
              { key: 'cert', icon: null, label: 'Certificate' },
              { key: 'dims', icon: null, label: 'Dimensions' },
              { key: 'guar', icon: null, label: 'Guarantee' },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => { if (t.key === 'photo' || t.key === 'viewsize') setActiveTab(t.key as 'photo' | 'viewsize'); }}
                className={`flex-shrink-0 w-[68px] h-[68px] border-2 rounded-lg flex flex-col items-center justify-center gap-1 transition-all text-center
                  ${activeTab === t.key ? 'border-[#4B5EFF] bg-[#f0f2ff]' : 'border-gray-200 bg-white hover:border-gray-300'}`}
              >
                {t.key === 'photo' && (
                  <div className="w-10 h-10 relative">
                    <Image src={d.img} alt="diamond" fill className="object-contain" />
                  </div>
                )}
                {t.key === 'viewsize' && <span className="text-xl">✋</span>}
                {t.key === 'cert' && (
                  <span className="text-[11px] font-bold text-gray-500 border border-gray-300 rounded px-1.5 py-0.5">{d.cert}</span>
                )}
                {t.key === 'dims' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>
                )}
                {t.key === 'guar' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                )}
                <span className="text-[9px] text-gray-400 leading-none">{t.label}</span>
              </button>
            ))}
          </div>

          {/* Main photo / view size */}
          <div className="rounded-xl overflow-hidden border border-gray-100 min-h-[480px] relative" style={{ background: activeTab === 'photo' ? d.imgBg : '#f5f0eb' }}>
            {activeTab === 'photo' && (
              <>
                <Image
                  src={d.img} alt={`${d.carat}ct ${d.shape} diamond`} fill
                  className="object-contain p-8"
                />
                {/* Zoom controls */}
                <div className="absolute top-3 right-3 flex flex-col gap-1">
                  <button className="w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center shadow text-gray-600 hover:bg-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </button>
                  <button className="w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center shadow text-gray-600 hover:bg-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </button>
                </div>
                <button className="absolute top-3 right-14 w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center shadow text-red-400 hover:text-red-500">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
                <div className="absolute bottom-3 left-0 right-0 text-center">
                  <span className="text-xs text-gray-400 bg-white/80 px-2 py-0.5 rounded">Wholesaler direct · {d.cert} Certified</span>
                </div>
              </>
            )}
            {activeTab === 'viewsize' && <ViewSizePanel carat={d.carat} />}
          </div>

          {/* Right panel */}
          <div className="space-y-4">
            {/* Cert + quality */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                {d.cert} CERTIFIED
              </span>
              <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                {d.quality} quality
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              {d.carat.toFixed(2)} Carat {d.shape} {d.origin} Diamond
            </h1>

            {/* Attribute pills */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: `${d.cut} Cut`, onClick: () => setCutModal(true), icon: 'M5 12h14M12 5l7 7-7 7' },
                { label: `${d.color} Color`,   onClick: () => setColorModal(true),   icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z' },
                { label: `${d.clarity} Clarity`, onClick: () => setClarityModal(true), icon: 'M12 2l3 7h7l-5.5 4 2 7-6.5-4-6.5 4 2-7L2 9h7z' },
              ].map((pill) => (
                <button
                  key={pill.label}
                  onClick={pill.onClick}
                  className="border border-gray-200 rounded-xl p-3 text-center hover:border-[#4B5EFF] hover:bg-[#f8f9ff] transition-all group"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.5" className="mx-auto mb-1.5 group-hover:stroke-[#4B5EFF]">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <p className="text-xs text-gray-600 group-hover:text-[#4B5EFF]">{pill.label}</p>
                </button>
              ))}
            </div>

            {/* Price */}
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-gray-900">${d.price.toLocaleString()}</span>
                <span className="text-sm text-gray-400">Comp. value: <span className="line-through">${d.compValue.toLocaleString()}</span></span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                From ${monthlyPayment}/mo or 0% APR with <span className="font-bold italic">Affirm</span>.{' '}
                <a href="#" className="text-[#4B5EFF] hover:underline">See if you qualify</a>
              </p>
            </div>

            {/* Sale box */}
            <div className="border border-red-200 rounded-xl p-4 bg-red-50/30">
              <label className="flex items-center gap-2 cursor-pointer mb-3">
                <input type="checkbox" checked={saleApplied} onChange={e => setSaleApplied(e.target.checked)} className="accent-red-500 w-4 h-4" />
                <span className="font-semibold text-gray-800 text-sm">Apply 4th of July Sale</span>
              </label>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">FREE lab diamond pendant</p>
                    <p className="text-xs text-gray-500">On orders $1000+</p>
                  </div>
                  <span className="text-green-700 font-bold"><span className="line-through text-gray-400 mr-1">$245</span> FREE</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-700">Everyday savings vs. comp value</p>
                  <span className="text-green-700 font-semibold">−${savings.toLocaleString()}</span>
                </div>
                <div className="border-t border-red-200 pt-2 flex justify-between items-center">
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">TOTAL SAVINGS</p>
                  <span className="font-bold text-green-700">${(savings + (saleApplied ? 245 : 0)).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={chooseThisDiamond}
              className="w-full bg-[#4B5EFF] hover:bg-[#3a4ecc] text-white font-semibold py-4 rounded-xl text-base transition-colors"
            >
              Choose this diamond
            </button>
            <p className="text-xs text-center text-gray-400">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline mr-1"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
              30-day returns, no fine print.
            </p>

            {/* Shipping */}
            <p className="text-sm text-center text-gray-600">
              Free insured shipping by <strong>Wednesday, Jul 9</strong><br/>
              if you order in the next hour. <a href="#" className="text-[#4B5EFF] hover:underline">Need it sooner?</a>
            </p>

            {/* Trust icons */}
            <div className="grid grid-cols-3 gap-2 py-2">
              {[
                { label: 'Free 30-day returns & 1-year resizing' },
                { label: 'Guaranteed for life' },
                { label: 'Authenticity inspection' },
              ].map(t => (
                <div key={t.label} className="text-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.5" className="mx-auto mb-1">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <p className="text-[10px] text-gray-500 leading-tight">{t.label}</p>
                </div>
              ))}
            </div>

            {/* Guarantee accordions */}
            {[
              { label: '100% money back guarantee', open: guaranteeOpen, toggle: () => setGuaranteeOpen(v => !v), body: 'Not satisfied? Return your diamond within 30 days for a full refund. No questions asked, no restocking fees.' },
              { label: 'Free returns and resizing', open: returnsOpen, toggle: () => setReturnsOpen(v => !v), body: 'Free return shipping and complimentary ring resizing for the first year. Your ring grows with you.' },
            ].map(acc => (
              <div key={acc.label} className="border-t border-gray-100">
                <button onClick={acc.toggle} className="w-full flex items-center justify-between py-3 text-sm text-gray-700 font-medium hover:text-gray-900">
                  {acc.label}
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className={`transition-transform ${acc.open ? 'rotate-180' : ''}`}>
                    <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
                {acc.open && <p className="pb-3 text-xs text-gray-500 leading-relaxed">{acc.body}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Got questions */}
        <div className="mt-10 border border-gray-200 rounded-2xl p-6 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex -space-x-2">
              {['#F0C28A', '#D4926A', '#FDDCB5'].map((c, i) => (
                <div key={i} className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-sm font-bold" style={{ background: c }}>
                  {['K', 'M', 'S'][i]}
                </div>
              ))}
            </div>
            <div>
              <p className="font-bold text-gray-900">Got questions? Bring them on!</p>
              <p className="text-sm text-gray-500">Virtual shop with one of our diamond experts.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              'Is this diamond bright?', 'Which ring complements this diamond?',
              'Is this a nice diamond?', 'Will this diamond have a lot of sparkle?',
            ].map(q => (
              <button key={q} className="border border-gray-200 rounded-full px-3 py-1.5 text-xs text-gray-600 hover:border-[#4B5EFF] hover:text-[#4B5EFF] transition-colors">
                {q}
              </button>
            ))}
            <button className="border border-gray-200 rounded-full px-3 py-1.5 text-xs text-gray-600 hover:border-gray-300">View more...</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-sm text-gray-700 font-medium hover:bg-gray-50">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              Chat now
            </button>
            <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-sm text-gray-700 font-medium hover:bg-gray-50">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              +1 (855) 720-4858
            </button>
          </div>
        </div>

        {/* See your diamond on a ring */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-1">See your diamond on a ring</h2>
          <p className="text-sm text-gray-500 mb-4">Based on recent orders with a {d.carat.toFixed(1)} carat diamond</p>
          <div className="flex items-center gap-2 mb-5 flex-wrap">
            {RING_STYLES.map(style => (
              <button
                key={style}
                onClick={() => setRingStyle(style)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${ringStyle === style ? 'bg-[#1B2D44] text-white' : 'border border-gray-200 text-gray-600 hover:border-gray-400'}`}
              >
                {style}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Linda 1.5mm Comfort Fit', metal: '14K White Gold', price: '$490' },
              { name: 'Bellora Pavé Hidden Halo', metal: '14K White Gold', price: '$680' },
              { name: 'Vivian Solitaire', metal: '14K Yellow Gold', price: '$390' },
              { name: 'Hayden Curved Vine', metal: '14K White Gold', price: '$550' },
            ].map((ring) => (
              <button key={ring.name} onClick={chooseThisDiamond} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-gray-300 transition-all text-left group">
                <div className="h-36 bg-[#1B2D44] flex items-center justify-center">
                  <svg width="80" height="80" viewBox="0 0 100 80" fill="none">
                    <ellipse cx="50" cy="55" rx="35" ry="12" stroke="#C5CDD8" strokeWidth="6" fill="none" />
                    <circle cx="50" cy="30" r="18" fill="#E8EDF3" stroke="#C5CDD8" strokeWidth="1.5" />
                    <polygon points="50,14 62,26 58,46 42,46 38,26" fill="white" stroke="#D0D8E4" strokeWidth="0.8" />
                  </svg>
                </div>
                <div className="p-3">
                  <div className="flex gap-1 mb-2">
                    {['#E8E8E8','#D4AF37','#E8A090','#C0C0C0'].map(c => (
                      <div key={c} className="w-4 h-4 rounded-full border border-gray-200" style={{ background: c }} />
                    ))}
                  </div>
                  <p className="text-xs font-semibold text-gray-800 group-hover:text-[#1B2D44]">{ring.name}</p>
                  <p className="text-[11px] text-gray-400">{ring.metal}</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">{ring.price}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
