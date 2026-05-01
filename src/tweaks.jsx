// Tweaks panel (toggleable via toolbar or in-page button)
const { useState: useT, useEffect: useTE } = React;

function Tweaks() {
  const [visible, setVisible] = useT(false);
  const [t, setT] = useT(window.ThemeStore.get());

  useTE(() => {
    const onMsg = (e) => {
      if (e.data?.type === '__activate_edit_mode') setVisible(true);
      if (e.data?.type === '__deactivate_edit_mode') setVisible(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const patch = (p) => {
    const next = window.ThemeStore.set(p);
    setT(next);
  };

  if (!visible) return null;

  return (
    <div className="tweaks-panel">
      <header>
        <span>Tweaks</span>
        <button onClick={() => setVisible(false)}>×</button>
      </header>
      <div className="section">
        <div className="row">
          <label>Dark mode</label>
          <div className="toggle">
            <button className={!t.dark?'active':''} onClick={() => patch({ dark: false })}>Light</button>
            <button className={t.dark?'active':''} onClick={() => patch({ dark: true })}>Dark</button>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="row">
          <label>Font scale</label>
          <div className="toggle">
            <button className={(!t.fontScale || t.fontScale===1)?'active':''} onClick={() => patch({ fontScale: 1 })}>Regular</button>
            <button className={t.fontScale===1.12?'active':''} onClick={() => patch({ fontScale: 1.12 })}>Large</button>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="row">
          <label>Progress</label>
          <button className="danger" onClick={() => { if (confirm('Reset all learning progress?')) window.ProgressStore.reset(); }}>Reset</button>
        </div>
      </div>
      <div className="section" style={{ fontSize: 12, color: 'var(--ink-muted)' }}>
        Tweaks persist locally in your browser. Use the toolbar toggle to show or hide this panel.
      </div>
    </div>
  );
}

window.Tweaks = Tweaks;
