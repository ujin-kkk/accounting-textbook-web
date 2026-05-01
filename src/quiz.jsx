// Quiz (instant feedback) + AI essay grading via window.claude.complete
const { useState: useQS } = React;

function Quiz({ chapterId, items }) {
  const [answers, setAnswers] = useQS({}); // qIdx -> chosen option idx
  const pick = (qi, oi) => {
    if (answers[qi] !== undefined) return; // already answered
    const next = { ...answers, [qi]: oi };
    setAnswers(next);
    // if all answered, save
    if (Object.keys(next).length === items.length) {
      const score = items.reduce((s, q, i) => s + (next[i] === q.correct ? 1 : 0), 0);
      window.ProgressStore.saveQuiz(chapterId, score, items.length);
    }
  };
  const answeredAll = Object.keys(answers).length === items.length;
  const score = items.reduce((s, q, i) => s + (answers[i] === q.correct ? 1 : 0), 0);

  const reset = () => setAnswers({});

  return (
    <section className="quiz-section" id="quiz">
      <div className="section-eyebrow">Check your understanding</div>
      <h2>Quick quiz — five questions</h2>
      <p className="quiz-sub">Pick an answer to see whether it's right. Try to answer every question before you read the solutions.</p>

      {items.map((q, qi) => {
        const chosen = answers[qi];
        const answered = chosen !== undefined;
        return (
          <div className="quiz-q" key={qi}>
            <div className="qnum">Q{String(qi+1).padStart(2,'0')} / {String(items.length).padStart(2,'0')}</div>
            <div className="qtext">{q.q}</div>
            {q.options.map((opt, oi) => {
              let cls = 'opt';
              if (answered) {
                if (oi === q.correct) cls += ' is-correct';
                else if (oi === chosen) cls += ' is-wrong';
              }
              const letter = String.fromCharCode(65 + oi);
              return (
                <button key={oi} className={cls} disabled={answered} onClick={() => pick(qi, oi)}>
                  <span className="letter">{letter}</span>
                  <span>{opt}</span>
                </button>
              );
            })}
            {answered && (
              <div className="explain">
                <b>{chosen === q.correct ? '✓ Correct.' : '✗ Not quite.'}</b> {q.explain}
              </div>
            )}
          </div>
        );
      })}

      {answeredAll && (
        <div className="quiz-summary">
          <div className="score">
            {score} / {items.length}
            <small>{score === items.length ? 'perfect score' : (score >= 3 ? 'solid, keep going' : 'give it another look')}</small>
          </div>
          <button className="btn ghost" onClick={reset}>Retake quiz</button>
        </div>
      )}
    </section>
  );
}

function Essay({ chapterId, prompt, rubric }) {
  const saved = window.ProgressStore.getChapter(chapterId).essay;
  const [text, setText] = useQS(saved?.text || '');
  const [result, setResult] = useQS(saved?.result || null);
  const [loading, setLoading] = useQS(false);
  const [error, setError] = useQS(null);

  const wc = text.trim().split(/\s+/).filter(Boolean).length;

  const submit = async () => {
    if (!text.trim() || wc < 20) {
      setError('Please write at least ~20 words before submitting.');
      return;
    }
    setError(null);
    setLoading(true);

    const system = `You are a patient accounting tutor grading a high school IB student (age 16-17) writing about accounting. Be encouraging but honest.
Rubric: ${rubric.join(' | ')}. Each category is scored 0–10.
Return JSON ONLY in this exact shape (no prose around it):
{"concept": <0-10>, "logic": <0-10>, "specificity": <0-10>, "overall": "<short verdict, one sentence>", "strengths": ["..","..","..."], "improvements": ["..","..","..."]}
Be concrete; quote or paraphrase student's own phrases in feedback.`;

    const user = `Prompt:\n${prompt}\n\nStudent response:\n${text}\n\nReturn the JSON only.`;

    try {
      const raw = await window.claude.complete({
        messages: [
          { role: 'user', content: system + '\n\n' + user }
        ],
      });
      // Try to extract JSON
      let obj;
      const m = raw.match(/\{[\s\S]*\}/);
      if (m) obj = JSON.parse(m[0]);
      else throw new Error('Could not parse AI response.');
      setResult(obj);
      window.ProgressStore.saveEssay(chapterId, { text, result: obj });
      window.ProgressStore.markCompleted(chapterId);
    } catch (e) {
      setError('Something went wrong grading your response. You can try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const tryAgain = () => { setResult(null); setError(null); };

  return (
    <section className="essay-section" id="essay">
      <div className="section-eyebrow" style={{ fontFamily:'var(--f-sans)', fontSize: 11.5, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--ink-muted)', marginBottom: 12 }}>Short response · AI-graded</div>
      <h2>Write a short response</h2>
      <div className="prompt-box">{prompt}</div>
      <div className="rubric-hints">
        {rubric.map((r, i) => <span key={i} className="tag">{r}</span>)}
      </div>
      <textarea
        placeholder="Write 3–6 sentences. Make a clear claim, support it with at least one specific example, and close with a recommendation or takeaway."
        value={text}
        onChange={e => setText(e.target.value)}
        disabled={loading}
      />
      <div className="wc">{wc} words · at least ~80 words recommended</div>
      <div className="essay-actions">
        {result ? (
          <button className="btn ghost" onClick={tryAgain}>Write a new version</button>
        ) : (
          <button className="btn" onClick={submit} disabled={loading || !text.trim()}>
            {loading ? 'Grading…' : 'Submit for AI feedback'}
          </button>
        )}
      </div>

      {loading && (
        <div className="ai-loading">
          <span className="dot"/><span className="dot"/><span className="dot"/>
          <span>Reading your response and checking it against the rubric…</span>
        </div>
      )}

      {error && !loading && (
        <div className="ai-loading" style={{ color: 'var(--err)' }}>{error}</div>
      )}

      {result && !loading && (
        <div className="ai-result">
          <h3>Feedback</h3>
          <div className="overall">
            <span>{result.overall}</span>
            <span style={{ fontFamily:'var(--f-mono)', fontSize: 16, opacity: 0.8 }}>
              {(result.concept + result.logic + result.specificity)} / 30
            </span>
          </div>
          <div className="score-grid">
            <div className="cell"><div className="label">Concept</div><div className="val">{result.concept}<small>/10</small></div></div>
            <div className="cell"><div className="label">Logic</div><div className="val">{result.logic}<small>/10</small></div></div>
            <div className="cell"><div className="label">Specificity</div><div className="val">{result.specificity}<small>/10</small></div></div>
          </div>
          <div className="comments">
            <h4>Strengths</h4>
            <ul>{(result.strengths||[]).map((s, i) => <li key={i}>{s}</li>)}</ul>
            <h4>How to improve</h4>
            <ul>{(result.improvements||[]).map((s, i) => <li key={i}>{s}</li>)}</ul>
          </div>
        </div>
      )}
    </section>
  );
}

window.Quiz = Quiz;
window.Essay = Essay;
