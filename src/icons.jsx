// SVG Icons for Part cards — simple geometric, original
const Icons = {
  pillar: ({ c = 'currentColor' }) => (
    <svg viewBox="0 0 80 80" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round">
      <rect x="18" y="22" width="44" height="6"/>
      <rect x="20" y="54" width="40" height="6"/>
      <rect x="16" y="60" width="48" height="4"/>
      <line x1="26" y1="28" x2="26" y2="54"/>
      <line x1="34" y1="28" x2="34" y2="54"/>
      <line x1="46" y1="28" x2="46" y2="54"/>
      <line x1="54" y1="28" x2="54" y2="54"/>
      <path d="M22 22 L40 12 L58 22"/>
    </svg>
  ),
  ledger: ({ c = 'currentColor' }) => (
    <svg viewBox="0 0 80 80" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="18" y="18" width="44" height="52" rx="2"/>
      <line x1="40" y1="18" x2="40" y2="70"/>
      <line x1="24" y1="30" x2="36" y2="30"/>
      <line x1="24" y1="40" x2="36" y2="40"/>
      <line x1="24" y1="50" x2="36" y2="50"/>
      <line x1="44" y1="30" x2="56" y2="30"/>
      <line x1="44" y1="40" x2="56" y2="40"/>
      <line x1="44" y1="50" x2="56" y2="50"/>
    </svg>
  ),
  stack: ({ c = 'currentColor' }) => (
    <svg viewBox="0 0 80 80" fill="none" stroke={c} strokeWidth="2.2" strokeLinejoin="round">
      <rect x="14" y="44" width="52" height="18" rx="2"/>
      <rect x="20" y="30" width="40" height="18" rx="2" fill="var(--bg-card)"/>
      <rect x="26" y="16" width="28" height="18" rx="2" fill="var(--bg-card)"/>
    </svg>
  ),
  cup: ({ c = 'currentColor' }) => (
    <svg viewBox="0 0 80 80" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 28 L22 56 Q22 66 32 66 L46 66 Q56 66 56 56 L56 28 Z"/>
      <path d="M56 36 L64 36 Q70 36 70 44 Q70 52 64 52 L56 52"/>
      <path d="M30 16 Q28 22 32 24 Q34 26 32 30" />
      <path d="M40 14 Q38 20 42 22 Q44 24 42 28" />
    </svg>
  ),
  chart: ({ c = 'currentColor' }) => (
    <svg viewBox="0 0 80 80" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="16" y1="64" x2="64" y2="64"/>
      <line x1="16" y1="64" x2="16" y2="16"/>
      <polyline points="22,54 32,42 42,48 54,26"/>
      <circle cx="22" cy="54" r="2.5" fill={c}/>
      <circle cx="32" cy="42" r="2.5" fill={c}/>
      <circle cx="42" cy="48" r="2.5" fill={c}/>
      <circle cx="54" cy="26" r="2.5" fill={c}/>
    </svg>
  ),
  seal: ({ c = 'currentColor' }) => (
    <svg viewBox="0 0 80 80" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="40" cy="36" r="18"/>
      <path d="M32 40 L38 46 L50 32"/>
      <path d="M30 50 L24 68 L32 62 L40 68 L48 62 L56 68 L50 50"/>
    </svg>
  ),
  orbit: ({ c = 'currentColor' }) => (
    <svg viewBox="0 0 80 80" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round">
      <ellipse cx="40" cy="40" rx="28" ry="12" transform="rotate(-25 40 40)"/>
      <ellipse cx="40" cy="40" rx="28" ry="12" transform="rotate(25 40 40)"/>
      <circle cx="40" cy="40" r="6" fill={c}/>
      <circle cx="62" cy="28" r="3" fill={c}/>
    </svg>
  ),
  compass: ({ c = 'currentColor' }) => (
    <svg viewBox="0 0 80 80" fill="none" stroke={c} strokeWidth="2.2" strokeLinejoin="round">
      <circle cx="40" cy="40" r="24"/>
      <polygon points="40,22 46,40 40,58 34,40" fill={c} stroke="none"/>
      <circle cx="40" cy="40" r="2.5" fill="var(--bg-card)"/>
    </svg>
  ),
};

window.Icons = Icons;
