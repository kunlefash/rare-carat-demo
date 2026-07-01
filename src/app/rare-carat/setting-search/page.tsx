'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

const RING_STYLES = [
  { name: 'Solitaire',    emoji: '💍' },
  { name: 'Halo',         emoji: '✨' },
  { name: 'Hidden Halo',  emoji: '💎' },
  { name: 'Pavé',         emoji: '💎' },
  { name: 'Three Stone',  emoji: '💎' },
  { name: 'Vintage',      emoji: '🌸' },
  { name: 'Bezel',        emoji: '⭕' },
];

const RINGS = [
  { id: 1, name: 'Linda 1.5mm Comfort Fit',    metal: '14K White Gold', price: 490,  badge: 'Best Seller' },
  { id: 2, name: 'Bellora Pavé Hidden Halo',   metal: '14K White Gold', price: 680,  badge: 'Hidden Halo' },
  { id: 3, name: 'Vivian Solitaire',           metal: '14K Yellow Gold', price: 390, badge: 'Best Seller' },
  { id: 4, name: 'Hayden Curved Vine Lab',     metal: '14K White Gold', price: 550,  badge: 'Color+' },
  { id: 5, name: 'Aria Classic Solitaire',     metal: '14K Rose Gold',   price: 420, badge: null },
  { id: 6, name: 'Monroe Cathedral',           metal: '18K White Gold',  price: 790, badge: 'Best Seller' },
  { id: 7, name: 'Celeste Twisted Band',       metal: '14K Yellow Gold', price: 610, badge: null },
  { id: 8, name: 'Ember Vintage Milgrain',     metal: '14K White Gold',  price: 720, badge: null },
];

const METAL_COLORS = ['#E8E8E8', '#D4AF37', '#E8A090', '#C0C0C0'];

function SettingSearchContent() {
  const sp = useSearchParams();
  const router = useRouter();

  const diamondId    = sp.get('id') ?? 'oval-001';
  const diamondCarat = sp.get('carat') ?? '2.03';
  const diamondColor = sp.get('color') ?? 'I';
  const diamondClarity = sp.get('clarity') ?? 'VVS2';
  const diamondShape = sp.get('shape') ?? 'Oval';
  const diamondPrice = sp.get('price') ?? '1005';

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
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
            <button className="relative text-[#1B2D44] hover:opacity-70">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              <span className="absolute -top-1.5 -right-1.5 bg-[#D946EF] text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">2</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Builder bar — step 2 active, diamond summary in step 1 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 divide-x divide-gray-200">
            {/* Step 1 — completed */}
            <div className="flex items-center gap-3 py-3 px-0">
              <div className="w-7 h-7 rounded-full bg-[#5BA832] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">✓</div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Diamond</p>
                <p className="text-xs font-semibold text-gray-800 truncate">
                  {diamondCarat}ct · {diamondColor} · {diamondClarity} · {diamondShape}
                </p>
                <p className="text-xs text-gray-500">${Number(diamondPrice).toLocaleString()}</p>
              </div>
              <div className="ml-auto flex gap-2 flex-shrink-0">
                <Link href={`/rare-carat/diamond/${diamondId}`} className="text-[10px] text-[#4B5EFF] hover:underline">View</Link>
                <Link href="/rare-carat/search" className="text-[10px] text-gray-400 hover:underline">Remove</Link>
              </div>
            </div>
            {/* Step 2 — active */}
            <div className="flex items-center gap-3 py-3 px-4 border-b-2 border-[#1B2D44] bg-[#F8FAFC]">
              <div className="w-7 h-7 rounded-full bg-[#1B2D44] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">2</div>
              <div>
                <p className="text-xs text-gray-500">Choose your</p>
                <p className="text-sm font-bold text-[#1B2D44]">Setting</p>
              </div>
            </div>
            {/* Step 3 */}
            <div className="flex items-center gap-3 py-3 px-4">
              <div className="w-7 h-7 rounded-full border-2 border-gray-200 text-gray-300 text-xs font-bold flex items-center justify-center flex-shrink-0">3</div>
              <div>
                <p className="text-xs text-gray-300">Complete</p>
                <p className="text-sm font-medium text-gray-300">Ring</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Engagement rings</h1>

        {/* Style grid */}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-8">
          {RING_STYLES.map((style) => (
            <div key={style.name} className="flex-shrink-0 w-36 h-28 bg-[#1B2D44] rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity relative group">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="70" height="60" viewBox="0 0 100 80" fill="none">
                  <ellipse cx="50" cy="58" rx="32" ry="11" stroke="#C5CDD8" strokeWidth="5" fill="none" />
                  <circle cx="50" cy="28" r="16" fill="#E8EDF3" stroke="#C5CDD8" strokeWidth="1.2" />
                  <polygon points="50,14 60,24 57,42 43,42 40,24" fill="white" stroke="#D0D8E4" strokeWidth="0.7" />
                </svg>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-2 pb-2">
                <p className="text-white text-xs font-semibold">{style.name}</p>
              </div>
            </div>
          ))}
          <div className="flex-shrink-0 w-10 h-28 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-200 cursor-pointer transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        </div>

        {/* Search + controls */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 flex-1 min-w-48">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input placeholder="Search for Nature or 6 Prong" className="text-sm text-gray-600 flex-1 outline-none bg-transparent placeholder-gray-400" />
          </div>
          <button className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
            Reset
          </button>
          <button className="flex items-center gap-2 text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50">
            Sort by: <span className="font-semibold">Best Sellers</span>
            <svg width="12" height="12" viewBox="0 0 20 20" fill="none"><path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
          <button className="flex items-center gap-2 text-sm font-semibold text-white bg-[#4B5EFF] rounded-lg px-4 py-2 hover:bg-[#3a4ecc]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/></svg>
            Filters
          </button>
        </div>

        {/* Result count */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-semibold text-gray-800">569 results</p>
            <p className="text-xs text-gray-500">Still looking? <a href="#" className="text-[#4B5EFF] hover:underline">Go custom</a></p>
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" className="accent-[#1B2D44]" />
            Quick ship
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          </label>
        </div>

        <p className="text-xs text-center text-gray-500 bg-blue-50 border border-blue-100 rounded-lg py-2 px-3 mb-6">
          Only showing compatible results with your diamond.{' '}
          <Link href="/rare-carat/search" className="text-[#4B5EFF] hover:underline">Remove diamond</Link>
        </p>

        {/* Ring grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {RINGS.map((ring) => (
            <div key={ring.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all cursor-pointer group">
              <div className="relative h-44 bg-[#1B2D44] flex items-center justify-center">
                {ring.badge && (
                  <span className="absolute top-2 left-2 bg-white/90 text-gray-700 text-[10px] font-semibold px-2 py-0.5 rounded">
                    {ring.badge}
                  </span>
                )}
                {ring.badge === 'Best Seller' && (
                  <span className="absolute top-2 left-2 bg-white/90 text-gray-700 text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                    Best Seller
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                  </span>
                )}
                <button className="absolute top-2 right-2 w-7 h-7 bg-white/80 rounded-full flex items-center justify-center hover:bg-white text-gray-400 hover:text-red-400 transition-colors">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
                {/* Ring SVG placeholder */}
                <svg width="90" height="75" viewBox="0 0 100 80" fill="none">
                  <ellipse cx="50" cy="58" rx="34" ry="12" stroke="#C5CDD8" strokeWidth="6" fill="none" />
                  <circle cx="50" cy="28" r="18" fill="#E8EDF3" stroke="#C5CDD8" strokeWidth="1.5" />
                  <polygon points="50,12 63,25 59,45 41,45 37,25" fill="white" stroke="#D0D8E4" strokeWidth="0.8" />
                </svg>
              </div>
              <div className="p-3">
                <div className="flex gap-1 mb-2">
                  {METAL_COLORS.map(c => (
                    <div key={c} className="w-4 h-4 rounded-full border border-gray-200" style={{ background: c }} />
                  ))}
                </div>
                <p className="text-xs font-semibold text-gray-800 group-hover:text-[#1B2D44] leading-snug">{ring.name}</p>
                <p className="text-[11px] text-gray-400">{ring.metal}</p>
                <p className="text-sm font-bold text-gray-900 mt-1">${ring.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SettingSearchPage() {
  return (
    <Suspense>
      <SettingSearchContent />
    </Suspense>
  );
}
