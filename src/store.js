// localStorage-backed learning progress
(function(){
  const KEY = 'acct_course_progress_v1';
  const THEME_KEY = 'acct_course_theme_v1';

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch(e) { return {}; }
  }
  function save(s) { localStorage.setItem(KEY, JSON.stringify(s)); }

  const state = load();
  if (!state.chapters) state.chapters = {}; // {chapterId: {completed, quiz: {score, total}, essay: {submitted}}}
  if (!state.lastChapter) state.lastChapter = null;

  window.ProgressStore = {
    get: () => state,
    getChapter: (id) => state.chapters[id] || { completed: false, quiz: null, essay: null, started: false },
    markStarted(id) {
      if (!state.chapters[id]) state.chapters[id] = { completed: false, quiz: null, essay: null, started: true };
      else state.chapters[id].started = true;
      state.lastChapter = id;
      save(state);
      window.dispatchEvent(new Event('progress-updated'));
    },
    markCompleted(id) {
      if (!state.chapters[id]) state.chapters[id] = {};
      state.chapters[id].completed = true;
      state.chapters[id].started = true;
      save(state);
      window.dispatchEvent(new Event('progress-updated'));
    },
    saveQuiz(id, score, total) {
      if (!state.chapters[id]) state.chapters[id] = { started: true };
      state.chapters[id].quiz = { score, total };
      save(state);
      window.dispatchEvent(new Event('progress-updated'));
    },
    saveEssay(id, result) {
      if (!state.chapters[id]) state.chapters[id] = { started: true };
      state.chapters[id].essay = result;
      save(state);
      window.dispatchEvent(new Event('progress-updated'));
    },
    reset() {
      localStorage.removeItem(KEY);
      state.chapters = {};
      state.lastChapter = null;
      save(state);
      window.dispatchEvent(new Event('progress-updated'));
    },
    // part progress helpers
    partProgress(part) {
      const total = part.chapters.length;
      const done = part.chapters.filter(c => (state.chapters[c.id] || {}).completed).length;
      return { done, total, pct: total ? done/total : 0 };
    },
    totalProgress(course) {
      let total = 0, done = 0;
      course.parts.forEach(p => { total += p.chapters.length; done += p.chapters.filter(c => (state.chapters[c.id]||{}).completed).length; });
      return { done, total, pct: total ? done/total : 0 };
    },
  };

  // Theme (for tweaks)
  window.ThemeStore = {
    get() { try { return JSON.parse(localStorage.getItem(THEME_KEY)) || {}; } catch(e){ return {}; } },
    set(patch) {
      const cur = this.get();
      const next = { ...cur, ...patch };
      localStorage.setItem(THEME_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event('theme-updated'));
      return next;
    },
    apply() {
      const t = this.get();
      if (t.dark) document.documentElement.setAttribute('data-theme', 'dark');
      else document.documentElement.removeAttribute('data-theme');
      if (t.fontScale) document.documentElement.style.setProperty('--font-scale', t.fontScale);
      else document.documentElement.style.removeProperty('--font-scale');
    }
  };
  window.ThemeStore.apply();
  window.addEventListener('theme-updated', () => window.ThemeStore.apply());
})();
