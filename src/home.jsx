// Course home (index)
const { useState, useEffect, useMemo } = React;

function Logomark() {
  return (
    <svg className="hero-mark" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="14" width="44" height="36" rx="2"/>
      <line x1="32" y1="14" x2="32" y2="50"/>
      <line x1="16" y1="22" x2="28" y2="22"/>
      <line x1="16" y1="30" x2="28" y2="30"/>
      <line x1="16" y1="38" x2="24" y2="38"/>
      <line x1="36" y1="22" x2="48" y2="22"/>
      <line x1="36" y1="30" x2="48" y2="30"/>
      <line x1="36" y1="38" x2="44" y2="38"/>
      <line x1="10" y1="50" x2="54" y2="50" strokeWidth="3"/>
    </svg>
  );
}

function SearchIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><line x1="20" y1="20" x2="16.5" y2="16.5"/></svg>;
}

function Check() {
  return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="5,12 10,17 19,7"/></svg>;
}

function PartCard({ part, expanded, onToggle }) {
  const Icon = window.Icons[part.icon];
  const [, bump] = useState(0);
  useEffect(() => {
    const h = () => bump(n => n+1);
    window.addEventListener('progress-updated', h);
    return () => window.removeEventListener('progress-updated', h);
  }, []);
  const prog = window.ProgressStore.partProgress(part);
  const available = true;
  const totalMin = part.chapters.reduce((s, c) => s + c.minutes, 0);

  return (
    <div className={`part-card c-${part.color} ${expanded ? 'expanded' : ''} ${available ? '' : 'placeholder'}`}>
      <div className="art" onClick={onToggle}>
        <span className="num">Part {part.number}</span>
        <span className="chap-count">{part.chapters.length} chapters</span>
        <Icon c="currentColor" />
      </div>
      <div className="body" onClick={onToggle}>
        <h3>{part.title}</h3>
        <p className="blurb">{part.blurb}</p>
        <div className="meta">
          <span>{part.chapters.length} lessons</span>
          <span className="dot"></span>
          <span>{totalMin} min</span>
          <span className="dot"></span>
          <span>1 quiz · 1 essay</span>
        </div>
      </div>
      <div className="progress-row">
        <div className="bar"><i style={{ width: `${prog.pct * 100}%` }}/></div>
        <span style={{ fontSize: 11, color: 'var(--ink-muted)', fontVariantNumeric: 'tabular-nums', minWidth: 28, textAlign: 'right' }}>{prog.done}/{prog.total}</span>
      </div>
      <div className="footer">
        <span className="tag">{available ? 'Available now' : 'Coming soon'}</span>
        <span className="pct">{Math.round(prog.pct * 100)}%</span>
      </div>
      {expanded && (
        <div className="chapter-list" onClick={e => e.stopPropagation()}>
          {part.chapters.map((c, i) => {
            const st = window.ProgressStore.getChapter(c.id);
            const cls = st.completed ? 'is-done' : (st.started ? 'is-started' : '');
            const href = available ? `chapter.html?id=${c.id}` : '#';
            return (
              <a key={c.id} href={href} className={cls} onClick={e => { if (!available) e.preventDefault(); }}>
                <span className="idx">{String(i+1).padStart(2,'0')}</span>
                <span className="t">{c.title}</span>
                <span className="m">{c.minutes} min</span>
                <span className="done">{st.completed ? <Check/> : null}</span>
              </a>
            );
          })}
          {!available && (
            <div style={{ padding: '12px 24px', fontSize: 12, color: 'var(--ink-muted)', fontStyle: 'italic' }}>
              All eight Parts are now available.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CourseHome() {
  const [expanded, setExpanded] = useState('p1'); // open Part 1 by default
  const [view, setView] = useState('grid');
  const [query, setQuery] = useState('');
  const [, bump] = useState(0);
  useEffect(() => {
    const h = () => bump(n => n+1);
    window.addEventListener('progress-updated', h);
    return () => window.removeEventListener('progress-updated', h);
  }, []);

  const total = window.ProgressStore.totalProgress(window.COURSE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return window.COURSE.parts;
    return window.COURSE.parts.map(p => ({
      ...p,
      chapters: p.chapters.filter(c => c.title.toLowerCase().includes(q) || p.title.toLowerCase().includes(q)),
    })).filter(p => p.chapters.length || p.title.toLowerCase().includes(q));
  }, [query]);

  return (
    <div>
      <header className="hero wrap">
        <Logomark/>
        <h1>Accounting, from<br/>first principles.</h1>
        <p className="lede">{window.COURSE.subtitle} Built for students, grade 10 and up, who are thinking seriously about a career in accounting, audit, finance, or investing.</p>
      </header>

      <div className="wrap top-toolbar">
        <div className="search">
          <SearchIcon/>
          <input placeholder="Search parts and chapters…" value={query} onChange={e => setQuery(e.target.value)}/>
        </div>
        <div className="progress-overall">
          <div className="progress-overall-header">
            <span className="label">Your progress</span>
            <span className="count">{total.done} of {total.total} chapters · {Math.round(total.pct*100)}%</span>
          </div>
          <div className="bar"><i style={{ width: `${total.pct * 100}%` }}/></div>
        </div>
        <div className="view-toggle">
          <button className={view==='grid'?'active':''} onClick={()=>setView('grid')}>Grid</button>
          <button className={view==='list'?'active':''} onClick={()=>setView('list')}>List</button>
        </div>
      </div>

      <main className="wrap">
        {view === 'grid' ? (
          <div className="part-grid">
            {filtered.map(p => (
              <PartCard key={p.id} part={p} expanded={expanded===p.id} onToggle={() => setExpanded(e => e===p.id ? null : p.id)}/>
            ))}
          </div>
        ) : (
          <div style={{ padding: '12px 0 80px' }}>
            {filtered.map(p => {
              const available = p.id === 'p7';
              const prog = window.ProgressStore.partProgress(p);
              return (
                <div key={p.id} style={{ borderBottom: '1px solid var(--line)', padding: '24px 0' }}>
                  <div style={{ display:'flex', alignItems:'baseline', gap:16, marginBottom:8 }}>
                    <span className="eyebrow">Part {p.number}</span>
                    <h3 style={{ fontSize: 26 }}>{p.title}</h3>
                    <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--ink-muted)' }}>{prog.done}/{prog.total} · {Math.round(prog.pct*100)}%</span>
                  </div>
                  <p style={{ color:'var(--ink-muted)', fontSize: 14, marginBottom: 12, maxWidth: 640 }}>{p.blurb}</p>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px,1fr))', gap: 6 }}>
                    {p.chapters.map((c, i) => {
                      const st = window.ProgressStore.getChapter(c.id);
                      return (
                        <a key={c.id} href={available ? `chapter.html?id=${c.id}` : '#'}
                           onClick={e => { if (!available) e.preventDefault(); }}
                           style={{ display:'flex', alignItems:'center', gap: 10, padding: '8px 12px', borderRadius: 8, textDecoration:'none', color: available ? 'var(--ink)' : 'var(--ink-muted)', border:'1px solid var(--line-soft)', fontSize: 13.5 }}>
                          <span style={{ fontFamily:'var(--f-mono)', fontSize: 11, color:'var(--ink-muted)' }}>{String(i+1).padStart(2,'0')}</span>
                          <span style={{ flex:1 }}>{c.title}</span>
                          <span style={{ fontSize: 11, color:'var(--ink-muted)' }}>{c.minutes}m</span>
                          {st.completed && <span style={{ width:14, height:14, borderRadius:'50%', background:'var(--ok)', display:'inline-flex', alignItems:'center', justifyContent:'center', color:'#fff' }}><Check/></span>}
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <footer className="foot wrap">
        <span className="sig">A structured curriculum, companies over chapters, stories over drills.</span>
        <span>Original educational material · Part 7 sample live</span>
      </footer>
    </div>
  );
}

window.CourseHome = CourseHome;
