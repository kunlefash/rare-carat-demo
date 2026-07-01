import Link from 'next/link';

export default function RareCaratHomepage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* Announcement bar */}
      <div className="bg-[#8B1818] text-white text-xs py-2 px-4 flex items-center justify-between">
        <span className="hidden sm:block text-white/90">(855) 720-4858</span>
        <p className="text-center font-medium flex-1">
          4th of July Sale · Save up to 40%* · Diamonds, Rings and Jewelry
        </p>
        <div className="hidden sm:flex items-center gap-3 text-white/80 text-xs">
          <a href="#" className="hover:text-white">Contact us</a>
          <span>|</span>
          <a href="#" className="hover:text-white">Sign in</a>
        </div>
      </div>

      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/rare-carat" className="flex-shrink-0">
              <div className="flex items-end gap-1 leading-none">
                <span className="text-[#1B2D44] font-bold text-2xl" style={{ fontFamily: 'Georgia, serif' }}>
                  rare
                </span>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="mb-0.5">
                  <path d="M12 21C12 21 3 14.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.82 3.85 12 5C12.18 3.85 13.76 3 15.5 3C18.58 3 21 5.42 21 8.5C21 14.5 12 21 12 21Z" fill="#D946EF" />
                </svg>
                <span className="text-[#1B2D44] font-bold text-2xl" style={{ fontFamily: 'Georgia, serif' }}>
                  carat
                </span>
              </div>
              <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">America&apos;s #1 Rated Jeweler</p>
            </Link>

            <div className="hidden md:flex items-center gap-7 text-sm text-[#1B2D44] font-medium">
              <a href="#" className="hover:opacity-70 transition-opacity">Engagement rings</a>
              <a href="#" className="hover:opacity-70 transition-opacity">Wedding bands</a>
              <a href="#" className="hover:opacity-70 transition-opacity">Diamonds</a>
              <a href="#" className="hover:opacity-70 transition-opacity">Earrings</a>
              <a href="#" className="hover:opacity-70 transition-opacity">Necklaces</a>
              <a href="#" className="hover:opacity-70 transition-opacity">Bracelets</a>
              <a href="#" className="hover:opacity-70 transition-opacity">Gifts</a>
            </div>

            <div className="flex items-center gap-4">
              <button className="text-[#1B2D44] hover:opacity-70">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              </button>
              <button className="text-[#1B2D44] hover:opacity-70">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
              <button className="relative text-[#1B2D44] hover:opacity-70">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                <span className="absolute -top-1.5 -right-1.5 bg-[#D946EF] text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">2</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#EEF2F7] py-20 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-12">
          <div className="flex-1 max-w-xl">
            <h1 className="text-5xl font-bold text-[#1B2D44] mb-4 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
              The smarter way<br />to buy diamonds
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Save up to 40%* by shopping with AI price and quality scores.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/rare-carat/search"
                className="bg-[#1B2D44] text-white font-semibold px-8 py-3.5 rounded-full hover:bg-[#253f5e] transition-colors text-base"
              >
                Start with a diamond
              </Link>
              <Link
                href="/rare-carat/search"
                className="border-2 border-[#1B2D44] text-[#1B2D44] font-semibold px-8 py-3.5 rounded-full hover:bg-gray-50 transition-colors text-base"
              >
                Start with a setting
              </Link>
            </div>
          </div>

          {/* Ring illustration */}
          <div className="hidden md:flex flex-1 justify-center items-center">
            <svg viewBox="0 0 300 280" width="300" height="280" fill="none">
              {/* Ring band */}
              <ellipse cx="150" cy="200" rx="90" ry="30" stroke="#c5cdd8" strokeWidth="18" fill="none" />
              {/* Stone setting prongs */}
              <circle cx="150" cy="120" r="52" fill="#e8edf3" stroke="#c5cdd8" strokeWidth="2" />
              {/* Facets */}
              <polygon points="150,72 190,105 175,155 125,155 110,105" fill="white" stroke="#d0d8e4" strokeWidth="1" />
              <polygon points="150,72 175,105 150,90" fill="#e8edf3" stroke="#d0d8e4" strokeWidth="0.5" />
              <polygon points="175,105 190,105 175,155" fill="#dde4ec" stroke="#d0d8e4" strokeWidth="0.5" />
              <polygon points="125,105 110,105 125,155" fill="#dde4ec" stroke="#d0d8e4" strokeWidth="0.5" />
              <polygon points="150,90 175,105 150,130 125,105" fill="white" stroke="#d0d8e4" strokeWidth="0.5" />
              {/* Prongs */}
              {[0,72,144,216,288].map((angle, i) => (
                <circle key={i} cx={150 + 52 * Math.cos((angle - 90) * Math.PI / 180)} cy={120 + 52 * Math.sin((angle - 90) * Math.PI / 180)} r="5" fill="#c5cdd8" />
              ))}
            </svg>
          </div>
        </div>
      </section>

      {/* Press logos */}
      <section className="py-8 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 flex items-center justify-center gap-10 flex-wrap">
          {['The New York Times', 'NEW YORK POST', 'Forbes', 'USA TODAY'].map((name) => (
            <span key={name} className="text-gray-300 font-semibold text-sm tracking-wide" style={{ fontFamily: name === 'The New York Times' ? 'Georgia, serif' : 'inherit' }}>
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-5 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-center gap-10 flex-wrap text-sm text-gray-600">
          <span className="flex items-center gap-2"><span className="text-green-500">★</span> #1 on Trustpilot</span>
          <span className="flex items-center gap-2">♡ 100K+ happy couples</span>
          <span className="flex items-center gap-2">💡 *Save based on comp. value</span>
          <span className="flex items-center gap-2">✦ AI quality scores</span>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
            {[
              { label: 'Engagement rings', emoji: '💍' },
              { label: 'Earrings', emoji: '✨' },
              { label: 'Wedding rings', emoji: '💍' },
              { label: 'Necklaces', emoji: '📿' },
              { label: '1 carat diamonds', emoji: '💎' },
              { label: 'Three stone', emoji: '💎' },
              { label: 'Solitaire', emoji: '💍' },
              { label: 'Hoops', emoji: '⭕' },
            ].map((c) => (
              <Link key={c.label} href="/rare-carat/search" className="flex flex-col items-center gap-2 group">
                <div className="w-20 h-20 rounded-full bg-[#F0F4F8] flex items-center justify-center text-3xl group-hover:bg-[#E5EAF0] transition-colors">
                  {c.emoji}
                </div>
                <span className="text-xs text-center text-gray-600 font-medium">{c.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
