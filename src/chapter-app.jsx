// Chapter page app
const { useEffect: useCE, useState: useCS, useMemo: useCM } = React;

function ChapterApp() {
  const id = new URLSearchParams(window.location.search).get('id') || 'p7c1';
  const ch = window.CHAPTERS[id];
  const [scrollPct, setScrollPct] = useCS(0);

  useCE(() => {
    if (!ch) return;
    window.ProgressStore.markStarted(id);
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
      setScrollPct(Math.min(1, Math.max(0, pct)));
      if (pct > 0.92) window.ProgressStore.markCompleted(id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [id]);

  const { prev, next } = useCM(() => {
    if (!ch) return { prev: null, next: null };
    const part = window.COURSE.parts.find(p => p.id === ch.partId);
    const idx = part.chapters.findIndex(c => c.id === id);
    return {
      prev: part.chapters[idx-1] || null,
      next: part.chapters[idx+1] || null,
    };
  }, [id]);

  if (!ch) {
    return (
      <div className="wrap" style={{ padding: 80 }}>
        <h1>Chapter not found</h1>
        <p style={{ color: 'var(--ink-muted)', marginTop: 16 }}>Return to the <a href="index.html">course index</a>.</p>
      </div>
    );
  }

  const part = window.COURSE.parts.find(p => p.id === ch.partId);
  const Icon = window.Icons[part.icon];

  return (
    <div className={`c-${ch.color}`}>
      <div className="subnav">
        <div className="wrap subnav-inner">
          <span className="title-lbl">{ch.title}</span>
          <div className="ch-progress" title="Scroll progress"><i style={{ width: `${scrollPct*100}%` }}/></div>
          <a href="index.html" className="small-btn" style={{ textDecoration: 'none' }}>← Course index</a>
        </div>
      </div>

      <header className="chap-header wrap">
        <div className="crumbs">
          <a href="index.html">Course index</a>
          <span className="sep">/</span>
          <span>Part {ch.partNumber} · {ch.partTitle}</span>
          <span className="sep">/</span>
          <span>Chapter {ch.chapterNumber}</span>
        </div>
        <div className="chap-title-row">
          <div>
            <div className="part-tag">Part {ch.partNumber} · Chapter {ch.chapterNumber}</div>
            <h1>{ch.title}</h1>
            <p className="sub">{ch.subtitle}</p>
            <div className="chap-meta">
              <span>◷ {ch.minutes} min read</span>
              <span>✦ 5-question quiz</span>
              <span>✎ 1 short response (AI-graded)</span>
            </div>
          </div>
          <div className="mini-art">
            <Icon c="currentColor"/>
          </div>
        </div>
      </header>

      <main className="wrap">
        <div className="learn-body">
          {ch.blocks.map((b, i) => window.renderBlock(b, i))}
        </div>

        <window.Quiz chapterId={id} items={ch.quiz}/>
        <window.Essay chapterId={id} prompt={ch.essay.prompt} rubric={ch.essay.rubric}/>

        <nav className="chap-nav">
          <div className="row">
            {prev ? (
              <a href={`chapter.html?id=${prev.id}`}>
                <div className="dir">← Previous chapter</div>
                <div className="t">{prev.title}</div>
              </a>
            ) : <span/>}
            {next ? (
              <a href={`chapter.html?id=${next.id}`} className="next">
                <div className="dir">Next chapter →</div>
                <div className="t">{next.title}</div>
              </a>
            ) : (
              <a href="index.html" className="next">
                <div className="dir">End of Part 7 →</div>
                <div className="t">Back to course index</div>
              </a>
            )}
          </div>
        </nav>
      </main>

      <window.Tweaks/>
    </div>
  );
}

// Mount
const _root = ReactDOM.createRoot(document.getElementById('app'));
_root.render(<ChapterApp/>);
