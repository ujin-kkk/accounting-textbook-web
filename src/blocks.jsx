// Learning page block components (diagrams, tryit, callout, etc.)
const { useState: useStateB } = React;

function BlockLead({ text }) { return <div className="block lead">{text}</div>; }
function BlockH2({ text }) { return <h2 className="block h2">{text}</h2>; }
function BlockP({ text }) { return <p className="block p">{text}</p>; }

function Callout({ variant, title, text }) {
  const letter = variant === 'career' ? 'C' : 'i';
  return (
    <div className={`callout ${variant||''}`}>
      <div className="ico">{letter}</div>
      <div>
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
    </div>
  );
}

function Example({ title, rows }) {
  return (
    <div className="example">
      <header><span className="tag"></span><span>{title}</span></header>
      <table><tbody>
        {rows.map((r, i) => <tr key={i}><td>{r[0]}</td><td>{r[1]}</td></tr>)}
      </tbody></table>
    </div>
  );
}

function Glossary({ terms }) {
  return (
    <div className="glossary">
      {terms.map((t, i) => (
        <div className="term-row" key={i}>
          <div className="term">{t.term}</div>
          <div className="def">{t.def}</div>
        </div>
      ))}
    </div>
  );
}

function TryIt({ prompt, answer, explain }) {
  const [val, setVal] = useStateB('');
  const [show, setShow] = useStateB(false);
  return (
    <div className="tryit">
      <div className="lbl">Try it yourself</div>
      <div className="prompt">{prompt}</div>
      <div className="controls">
        <input placeholder="Your answer…" value={val} onChange={e => setVal(e.target.value)} onKeyDown={e => e.key==='Enter' && setShow(true)}/>
        <button className="btn" onClick={() => setShow(true)}>Check</button>
      </div>
      {show && (
        <div className="reveal">
          <b>Answer:</b> {answer}. &nbsp;{explain}
        </div>
      )}
    </div>
  );
}

function Diagram({ variant, caption }) {
  // Each variant is a unique SVG illustration
  let svg;
  if (variant === 'timeline') {
    svg = (
      <svg viewBox="0 0 640 200" fill="none">
        <line x1="40" y1="120" x2="600" y2="120" stroke="var(--ink)" strokeWidth="1.5"/>
        {[0,1,2,3,4].map(i => <circle key={i} cx={60 + i*135} cy="120" r="4" fill="var(--ink)"/>)}
        <rect x="60" y="60" width="120" height="36" rx="4" fill="var(--sky)" opacity="0.4"/>
        <text x="120" y="82" textAnchor="middle" fontFamily="var(--f-sans)" fontSize="12" fill="var(--ink)">R&D capitalized</text>
        <rect x="195" y="60" width="120" height="36" rx="4" fill="var(--sky)" opacity="0.6"/>
        <text x="255" y="82" textAnchor="middle" fontSize="12" fill="var(--ink)">Build cost (asset)</text>
        <rect x="330" y="60" width="255" height="36" rx="4" fill="var(--sky)" opacity="0.9"/>
        <text x="457" y="82" textAnchor="middle" fontSize="12" fill="var(--ink)">Depreciation over 10–15 year orbit life</text>
        <text x="60" y="148" fontSize="11" fill="var(--ink-muted)">Year 0</text>
        <text x="195" y="148" fontSize="11" fill="var(--ink-muted)">Build 3–5y</text>
        <text x="330" y="148" fontSize="11" fill="var(--ink-muted)">Launch</text>
        <text x="465" y="148" fontSize="11" fill="var(--ink-muted)">Mid-life</text>
        <text x="590" y="148" fontSize="11" textAnchor="end" fill="var(--ink-muted)">End of life</text>
      </svg>
    );
  } else if (variant === 'subscription') {
    svg = (
      <svg viewBox="0 0 640 220" fill="none">
        <rect x="20" y="30" width="100" height="60" rx="6" fill="var(--sky)" opacity="0.7"/>
        <text x="70" y="60" textAnchor="middle" fontSize="13" fill="var(--ink)" fontWeight="600">$120 cash</text>
        <text x="70" y="78" textAnchor="middle" fontSize="11" fill="var(--ink)">Jan 1</text>
        <path d="M 125 60 L 175 60" stroke="var(--ink)" strokeWidth="1.5" markerEnd="url(#arr)"/>
        <defs><marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--ink)"/></marker></defs>
        <rect x="180" y="20" width="140" height="80" rx="6" stroke="var(--ink)" strokeWidth="1.2" fill="var(--bg)"/>
        <text x="250" y="46" textAnchor="middle" fontSize="12" fill="var(--ink-muted)">Balance sheet</text>
        <text x="250" y="66" textAnchor="middle" fontSize="13" fill="var(--ink)">Deferred revenue</text>
        <text x="250" y="86" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--ink)">$120 (liability)</text>
        <path d="M 320 60 L 380 60" stroke="var(--ink)" strokeWidth="1.5" markerEnd="url(#arr)"/>
        <g transform="translate(385, 20)">
          {[0,1,2].map(i => (
            <g key={i} transform={`translate(0, ${i*55})`}>
              <rect width="240" height="45" rx="6" fill="var(--sky)" opacity={0.3 + i*0.2}/>
              <text x="12" y="20" fontSize="11" fill="var(--ink-muted)">{["End Jan","End Feb","End Mar"][i]}</text>
              <text x="12" y="36" fontSize="13" fill="var(--ink)" fontWeight="600">Recognize $10 revenue</text>
              <text x="228" y="36" fontSize="12" textAnchor="end" fill="var(--ink-muted)">def. rev → ${110 - i*10}</text>
            </g>
          ))}
        </g>
      </svg>
    );
  } else if (variant === 'gpu') {
    svg = (
      <svg viewBox="0 0 640 200" fill="none">
        <line x1="60" y1="160" x2="600" y2="160" stroke="var(--ink)" strokeWidth="1.2"/>
        <line x1="60" y1="30" x2="60" y2="160" stroke="var(--ink)" strokeWidth="1.2"/>
        {/* 4-year bars */}
        {[0,1,2,3].map(i => (
          <rect key={`a${i}`} x={80 + i*60} y={60} width={40} height={100} fill="var(--plum)" opacity="0.75"/>
        ))}
        {/* 6-year bars */}
        {[0,1,2,3,4,5].map(i => (
          <rect key={`b${i}`} x={340 + i*38} y={93} width={26} height={67} fill="var(--olive)" opacity="0.75"/>
        ))}
        <text x="160" y="180" fontSize="11" textAnchor="middle" fill="var(--ink-muted)">4-year useful life — $250M/yr</text>
        <text x="440" y="180" fontSize="11" textAnchor="middle" fill="var(--ink-muted)">6-year useful life — $167M/yr</text>
        <text x="50" y="34" fontSize="10" textAnchor="end" fill="var(--ink-muted)">Depr.</text>
      </svg>
    );
  } else if (variant === 'scopes') {
    svg = (
      <svg viewBox="0 0 640 220" fill="none">
        {/* concentric for a laptop mfgr */}
        <circle cx="320" cy="110" r="95" fill="var(--sky)" opacity="0.25"/>
        <circle cx="320" cy="110" r="55" fill="var(--sky)" opacity="0.45"/>
        <circle cx="320" cy="110" r="22" fill="var(--sky)" opacity="0.9"/>
        <text x="320" y="114" textAnchor="middle" fontSize="11" fill="var(--ink)" fontWeight="600">1</text>
        <text x="320" y="72" textAnchor="middle" fontSize="11" fill="var(--ink)" fontWeight="600">Scope 2</text>
        <text x="320" y="30" textAnchor="middle" fontSize="12" fill="var(--ink)" fontWeight="600">Scope 3</text>
        <g fontSize="11" fill="var(--ink-soft)">
          <text x="440" y="40">Supplier chips, aluminium</text>
          <text x="440" y="58">Factory power abroad</text>
          <text x="440" y="76">Transport, packaging</text>
          <text x="440" y="94">Customer electricity use</text>
          <text x="440" y="112">End-of-life disposal</text>
        </g>
        <g fontSize="11" fill="var(--ink-soft)">
          <text x="120" y="85" textAnchor="end">Assembly plant gas</text>
          <text x="120" y="103" textAnchor="end">Company vehicles</text>
          <text x="120" y="135" textAnchor="end">Purchased grid electricity</text>
        </g>
        <line x1="125" y1="103" x2="295" y2="110" stroke="var(--ink-muted)" strokeWidth="0.7"/>
        <line x1="125" y1="135" x2="275" y2="110" stroke="var(--ink-muted)" strokeWidth="0.7"/>
        <line x1="435" y1="40" x2="360" y2="60" stroke="var(--ink-muted)" strokeWidth="0.7"/>
      </svg>
    );
  } else if (variant === 'taccount') {
    svg = (
      <svg viewBox="0 0 640 220" fill="none">
        <text x="320" y="24" textAnchor="middle" fontSize="12" fill="var(--ink-muted)" letterSpacing="0.1em">THE T-ACCOUNT — "CASH"</text>
        <line x1="160" y1="50" x2="480" y2="50" stroke="var(--ink)" strokeWidth="1.5"/>
        <line x1="320" y1="50" x2="320" y2="200" stroke="var(--ink)" strokeWidth="1.5"/>
        <text x="240" y="44" textAnchor="middle" fontSize="11" fill="var(--ink-muted)" letterSpacing="0.1em">DEBIT (in)</text>
        <text x="400" y="44" textAnchor="middle" fontSize="11" fill="var(--ink-muted)" letterSpacing="0.1em">CREDIT (out)</text>
        <text x="240" y="78" textAnchor="middle" fontSize="14" fontFamily="var(--f-mono)" fill="var(--ink)">+30,000</text>
        <text x="160" y="78" textAnchor="start" fontSize="10" fill="var(--ink-muted)">Owner</text>
        <text x="240" y="100" textAnchor="middle" fontSize="14" fontFamily="var(--f-mono)" fill="var(--ink)">+20,000</text>
        <text x="160" y="100" textAnchor="start" fontSize="10" fill="var(--ink-muted)">Loan</text>
        <text x="400" y="78" textAnchor="middle" fontSize="14" fontFamily="var(--f-mono)" fill="var(--ink)">−15,000</text>
        <text x="480" y="78" textAnchor="end" fontSize="10" fill="var(--ink-muted)">Machine</text>
        <text x="400" y="100" textAnchor="middle" fontSize="14" fontFamily="var(--f-mono)" fill="var(--ink)">−3,000</text>
        <text x="480" y="100" textAnchor="end" fontSize="10" fill="var(--ink-muted)">Beans</text>
        <line x1="160" y1="130" x2="480" y2="130" stroke="var(--ink)" strokeWidth="0.8"/>
        <text x="240" y="154" textAnchor="middle" fontSize="13" fontFamily="var(--f-mono)" fill="var(--ink)" fontWeight="600">50,000</text>
        <text x="400" y="154" textAnchor="middle" fontSize="13" fontFamily="var(--f-mono)" fill="var(--ink)" fontWeight="600">18,000</text>
        <text x="320" y="190" textAnchor="middle" fontSize="14" fontFamily="var(--f-serif)" fill="var(--ink)">Balance: 32,000 Dr</text>
      </svg>
    );
  } else if (variant === 'journal') {
    svg = (
      <svg viewBox="0 0 640 240" fill="none">
        <rect x="40" y="30" width="560" height="180" rx="6" fill="var(--bg)" stroke="var(--line)"/>
        <line x1="40" y1="60" x2="600" y2="60" stroke="var(--line)"/>
        <line x1="120" y1="30" x2="120" y2="210" stroke="var(--line)"/>
        <line x1="380" y1="30" x2="380" y2="210" stroke="var(--line)"/>
        <line x1="490" y1="30" x2="490" y2="210" stroke="var(--line)"/>
        <text x="80" y="50" textAnchor="middle" fontSize="10" fill="var(--ink-muted)" letterSpacing="0.1em">DATE</text>
        <text x="250" y="50" textAnchor="middle" fontSize="10" fill="var(--ink-muted)" letterSpacing="0.1em">ACCOUNT</text>
        <text x="435" y="50" textAnchor="middle" fontSize="10" fill="var(--ink-muted)" letterSpacing="0.1em">DEBIT</text>
        <text x="545" y="50" textAnchor="middle" fontSize="10" fill="var(--ink-muted)" letterSpacing="0.1em">CREDIT</text>
        <text x="80" y="88" textAnchor="middle" fontSize="11" fill="var(--ink)">Mar 1</text>
        <text x="132" y="88" fontSize="12" fill="var(--ink)" fontWeight="600">Cash</text>
        <text x="485" y="88" textAnchor="end" fontFamily="var(--f-mono)" fontSize="12" fill="var(--ink)">20,000</text>
        <text x="150" y="108" fontSize="12" fill="var(--ink)"> Bank Loan (liability)</text>
        <text x="595" y="108" textAnchor="end" fontFamily="var(--f-mono)" fontSize="12" fill="var(--ink)">20,000</text>
        <text x="150" y="128" fontSize="10" fill="var(--ink-muted)" fontStyle="italic">To record loan from bank</text>
        <line x1="40" y1="148" x2="600" y2="148" stroke="var(--line)" strokeDasharray="2,3"/>
        <text x="80" y="170" textAnchor="middle" fontSize="11" fill="var(--ink)">Mar 5</text>
        <text x="132" y="170" fontSize="12" fill="var(--ink)" fontWeight="600">Equipment</text>
        <text x="485" y="170" textAnchor="end" fontFamily="var(--f-mono)" fontSize="12" fill="var(--ink)">15,000</text>
        <text x="150" y="190" fontSize="12" fill="var(--ink)"> Cash</text>
        <text x="595" y="190" textAnchor="end" fontFamily="var(--f-mono)" fontSize="12" fill="var(--ink)">15,000</text>
      </svg>
    );
  } else if (variant === 'flow') {
    svg = (
      <svg viewBox="0 0 640 140" fill="none">
        {["Transaction", "Journal entry", "Post to ledger", "Trial balance", "Adjustments", "Financial statements"].map((t, i) => {
          const x = 30 + i*102;
          return (
            <g key={i}>
              <rect x={x} y="50" width="92" height="40" rx="6" fill="var(--rose)" opacity={0.35 + i*0.08}/>
              <text x={x+46} y="74" textAnchor="middle" fontSize="11" fill="var(--ink)" fontWeight="600">{t}</text>
              {i < 5 && <path d={`M ${x+96} 70 L ${x+100} 70`} stroke="var(--ink)" strokeWidth="1.2" markerEnd="url(#arr2)"/>}
            </g>
          );
        })}
        <defs><marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--ink)"/></marker></defs>
        <text x="320" y="122" textAnchor="middle" fontSize="11" fill="var(--ink-muted)" fontStyle="italic">The accounting cycle — every transaction follows this path</text>
      </svg>
    );
  } else if (variant === 'equation') {
    svg = (
      <svg viewBox="0 0 640 180" fill="none">
        <rect x="40" y="60" width="150" height="70" rx="6" fill="var(--olive)" opacity="0.75"/>
        <text x="115" y="90" textAnchor="middle" fontSize="13" fill="var(--ink)" fontWeight="600">Assets</text>
        <text x="115" y="110" textAnchor="middle" fontSize="11" fill="var(--ink)">things you own</text>
        <text x="210" y="102" fontSize="28" fontFamily="var(--f-serif)" fill="var(--ink)">=</text>
        <rect x="240" y="60" width="160" height="70" rx="6" fill="var(--rose)" opacity="0.75"/>
        <text x="320" y="90" textAnchor="middle" fontSize="13" fill="var(--ink)" fontWeight="600">Liabilities</text>
        <text x="320" y="110" textAnchor="middle" fontSize="11" fill="var(--ink)">what you owe</text>
        <text x="418" y="102" fontSize="28" fontFamily="var(--f-serif)" fill="var(--ink)">+</text>
        <rect x="448" y="60" width="150" height="70" rx="6" fill="var(--sand)" opacity="0.85"/>
        <text x="523" y="90" textAnchor="middle" fontSize="13" fill="var(--ink)" fontWeight="600">Equity</text>
        <text x="523" y="110" textAnchor="middle" fontSize="11" fill="var(--ink)">owners' claim</text>
        <text x="320" y="40" textAnchor="middle" fontSize="12" fill="var(--ink-muted)" letterSpacing="0.1em">THE ACCOUNTING EQUATION</text>
        <text x="320" y="158" textAnchor="middle" fontSize="11" fill="var(--ink-muted)" fontStyle="italic">Always balances. Every transaction keeps both sides equal.</text>
      </svg>
    );
  } else if (variant === 'stakeholders') {
    svg = (
      <svg viewBox="0 0 640 240" fill="none">
        <circle cx="320" cy="120" r="46" fill="var(--olive)" opacity="0.85"/>
        <text x="320" y="118" textAnchor="middle" fontSize="13" fill="#F5F1E8" fontWeight="600">A company's</text>
        <text x="320" y="134" textAnchor="middle" fontSize="13" fill="#F5F1E8" fontWeight="600">books</text>
        {[
          ["Investors", 90, 50, "are we making money?"],
          ["Lenders", 550, 50, "can they repay?"],
          ["Employees", 90, 190, "is the job stable?"],
          ["Tax authority", 550, 190, "what is owed?"],
          ["Managers", 320, 20, "where to invest?"],
          ["Regulators", 320, 220, "is it honest?"],
        ].map(([label, x, y, q], i) => (
          <g key={i}>
            <line x1="320" y1="120" x2={x} y2={y} stroke="var(--ink-muted)" strokeWidth="0.8" strokeDasharray="3,3"/>
            <rect x={x-55} y={y-18} width="110" height="36" rx="6" fill="var(--bg)" stroke="var(--line)"/>
            <text x={x} y={y-3} textAnchor="middle" fontSize="12" fill="var(--ink)" fontWeight="600">{label}</text>
            <text x={x} y={y+12} textAnchor="middle" fontSize="10" fill="var(--ink-muted)" fontStyle="italic">{q}</text>
          </g>
        ))}
      </svg>
    );
  } else if (variant === 'threebooks') {
    svg = (
      <svg viewBox="0 0 640 200" fill="none">
        {[
          ["Business", "var(--olive)", "Profit, tax, competition.", "Cafe, factory, SaaS"],
          ["Personal", "var(--rose)", "Save, spend, invest.", "Household budget"],
          ["Government", "var(--sand)", "Public service, not profit.", "City, ministry"],
        ].map(([title, color, sub, ex], i) => (
          <g key={i} transform={`translate(${40 + i*200}, 30)`}>
            <rect width="170" height="140" rx="10" fill={color} opacity="0.35"/>
            <rect x="14" y="16" width="142" height="108" rx="6" fill="var(--bg)" stroke={color}/>
            <text x="85" y="44" textAnchor="middle" fontSize="15" fill="var(--ink)" fontWeight="600">{title}</text>
            <line x1="30" y1="58" x2="140" y2="58" stroke="var(--line)"/>
            <text x="85" y="82" textAnchor="middle" fontSize="11" fill="var(--ink-soft)">{sub}</text>
            <text x="85" y="108" textAnchor="middle" fontSize="10.5" fill="var(--ink-muted)" fontStyle="italic">{ex}</text>
          </g>
        ))}
      </svg>
    );
  } else if (variant === 'revexp') {
    svg = (
      <svg viewBox="0 0 640 200" fill="none">
        <text x="320" y="28" textAnchor="middle" fontSize="12" fill="var(--ink-muted)" letterSpacing="0.1em">ONE MONTH AT A CAFÉ</text>
        <rect x="60" y="60" width="180" height="80" rx="6" fill="var(--olive)" opacity="0.65"/>
        <text x="150" y="88" textAnchor="middle" fontSize="13" fill="var(--ink)" fontWeight="600">Revenue</text>
        <text x="150" y="108" textAnchor="middle" fontSize="22" fill="var(--ink)" fontFamily="var(--f-mono)">$20,000</text>
        <text x="150" y="126" textAnchor="middle" fontSize="10" fill="var(--ink-muted)">drinks sold</text>
        <text x="262" y="108" fontSize="24" fill="var(--ink)">−</text>
        <rect x="292" y="60" width="180" height="80" rx="6" fill="var(--rose)" opacity="0.65"/>
        <text x="382" y="88" textAnchor="middle" fontSize="13" fill="var(--ink)" fontWeight="600">Expenses</text>
        <text x="382" y="108" textAnchor="middle" fontSize="22" fill="var(--ink)" fontFamily="var(--f-mono)">$14,000</text>
        <text x="382" y="126" textAnchor="middle" fontSize="10" fill="var(--ink-muted)">beans, wages, rent</text>
        <text x="494" y="108" fontSize="24" fill="var(--ink)">=</text>
        <rect x="520" y="60" width="90" height="80" rx="6" fill="var(--sand)" opacity="0.9" stroke="var(--ink)" strokeWidth="1.2"/>
        <text x="565" y="88" textAnchor="middle" fontSize="13" fill="var(--ink)" fontWeight="600">Profit</text>
        <text x="565" y="112" textAnchor="middle" fontSize="20" fill="var(--ink)" fontFamily="var(--f-mono)">$6,000</text>
        <text x="320" y="176" textAnchor="middle" fontSize="11" fill="var(--ink-muted)" fontStyle="italic">Revenue is earned when delivered, not when cash arrives.</text>
      </svg>
    );
  } else if (variant === 'principles') {
    svg = (
      <svg viewBox="0 0 640 220" fill="none">
        {[
          ["Entity", "The business is separate from its owner."],
          ["Going concern", "Assume the business continues operating."],
          ["Accrual", "Record when earned/incurred, not when cash moves."],
          ["Matching", "Pair costs with the revenue they produced."],
          ["Consistency", "Use the same methods each period."],
          ["Prudence", "Don't overstate assets or understate costs."],
        ].map(([t, d], i) => {
          const col = i % 2, row = Math.floor(i / 2);
          return (
            <g key={i} transform={`translate(${40 + col*300}, ${20 + row*62})`}>
              <rect x="0" y="0" width="260" height="48" rx="6" fill="var(--bg)" stroke="var(--line)"/>
              <circle cx="22" cy="24" r="10" fill="var(--olive)" opacity="0.85"/>
              <text x="22" y="28" textAnchor="middle" fontSize="11" fill="#F5F1E8" fontWeight="600">{i+1}</text>
              <text x="42" y="20" fontSize="12.5" fill="var(--ink)" fontWeight="600">{t}</text>
              <text x="42" y="36" fontSize="10.5" fill="var(--ink-muted)">{d}</text>
            </g>
          );
        })}
      </svg>
    );
  } else if (variant === 'projectflow') {
    svg = (
      <svg viewBox="0 0 640 180" fill="none">
        {["Pick a business", "Set up chart of accounts", "Record transactions", "Close & report", "Reflect"].map((t, i) => {
          const x = 30 + i*122;
          return (
            <g key={i}>
              <circle cx={x+50} cy="80" r="26" fill="var(--olive)" opacity={0.25 + i*0.12}/>
              <text x={x+50} y="84" textAnchor="middle" fontSize="14" fill="var(--ink)" fontFamily="var(--f-serif)" fontWeight="600">{i+1}</text>
              <text x={x+50} y="128" textAnchor="middle" fontSize="11" fill="var(--ink)" fontWeight="600">{t}</text>
              {i < 4 && <line x1={x+78} y1="80" x2={x+122} y2="80" stroke="var(--ink)" strokeWidth="1" strokeDasharray="3,3"/>}
            </g>
          );
        })}
        <text x="320" y="160" textAnchor="middle" fontSize="11" fill="var(--ink-muted)" fontStyle="italic">The project arc across Part 8</text>
      </svg>
    );
  } else if (variant === 'ratios') {
    svg = (
      <svg viewBox="0 0 640 220" fill="none">
        {[
          ["Profit margin", "Net profit / Revenue", "how much profit per dollar of sales"],
          ["Current ratio", "Current assets / Current liab.", "can we pay near-term bills?"],
          ["Debt-to-equity", "Total liabilities / Equity", "how levered is the business?"],
          ["Return on equity", "Net profit / Equity", "how well is owners' money working?"],
        ].map(([t, f, d], i) => {
          const col = i % 2, row = Math.floor(i / 2);
          return (
            <g key={i} transform={`translate(${40 + col*300}, ${24 + row*96})`}>
              <rect width="270" height="80" rx="8" fill="var(--rose)" opacity="0.3"/>
              <rect x="10" y="10" width="250" height="60" rx="5" fill="var(--bg)" stroke="var(--line)"/>
              <text x="24" y="32" fontSize="13" fill="var(--ink)" fontWeight="600">{t}</text>
              <text x="24" y="50" fontSize="11" fill="var(--ink-soft)" fontFamily="var(--f-mono)">{f}</text>
              <text x="24" y="64" fontSize="10" fill="var(--ink-muted)" fontStyle="italic">{d}</text>
            </g>
          );
        })}
      </svg>
    );
  } else if (variant === 'auditchecklist') {
    svg = (
      <svg viewBox="0 0 640 220" fill="none">
        <rect x="60" y="20" width="520" height="180" rx="8" fill="var(--bg)" stroke="var(--line)"/>
        <text x="80" y="44" fontSize="12" fill="var(--ink-muted)" letterSpacing="0.1em">AUDIT TOUCHPOINTS</text>
        {[
          ["Bank statement matches Cash in books?", true],
          ["Physical inventory count matches records?", true],
          ["Every invoice supported by a delivery note?", true],
          ["Payroll matches employment contracts?", false],
          ["Depreciation schedule consistent year-over-year?", true],
          ["All related-party transactions disclosed?", false],
        ].map(([t, ok], i) => (
          <g key={i} transform={`translate(80, ${64 + i*22})`}>
            <rect width="14" height="14" rx="2" fill={ok ? "var(--olive)" : "var(--bg)"} stroke="var(--ink)"/>
            {ok && <path d="M3 7 L6 10 L11 4" stroke="#F5F1E8" strokeWidth="1.5" fill="none"/>}
            <text x="24" y="12" fontSize="12" fill="var(--ink)">{t}</text>
          </g>
        ))}
      </svg>
    );
  } else if (variant === 'auditors') {
    svg = (
      <svg viewBox="0 0 640 220" fill="none">
        <rect x="60" y="30" width="240" height="160" rx="8" fill="var(--olive)" opacity="0.3"/>
        <text x="180" y="58" textAnchor="middle" fontSize="13" fill="var(--ink)" fontWeight="600">External auditor</text>
        <text x="180" y="80" textAnchor="middle" fontSize="11" fill="var(--ink-soft)">Independent firm</text>
        <line x1="90" y1="98" x2="270" y2="98" stroke="var(--line)"/>
        <text x="180" y="118" textAnchor="middle" fontSize="11" fill="var(--ink-muted)">Serves: outside readers</text>
        <text x="180" y="136" textAnchor="middle" fontSize="11" fill="var(--ink-muted)">Reports to: shareholders</text>
        <text x="180" y="154" textAnchor="middle" fontSize="11" fill="var(--ink-muted)">Annual opinion letter</text>
        <text x="180" y="172" textAnchor="middle" fontSize="10" fill="var(--ink-muted)" fontStyle="italic">Big 4: Deloitte, PwC, EY, KPMG</text>
        <rect x="340" y="30" width="240" height="160" rx="8" fill="var(--rose)" opacity="0.35"/>
        <text x="460" y="58" textAnchor="middle" fontSize="13" fill="var(--ink)" fontWeight="600">Internal auditor</text>
        <text x="460" y="80" textAnchor="middle" fontSize="11" fill="var(--ink-soft)">Company employee</text>
        <line x1="370" y1="98" x2="550" y2="98" stroke="var(--line)"/>
        <text x="460" y="118" textAnchor="middle" fontSize="11" fill="var(--ink-muted)">Serves: management & board</text>
        <text x="460" y="136" textAnchor="middle" fontSize="11" fill="var(--ink-muted)">Reports to: audit committee</text>
        <text x="460" y="154" textAnchor="middle" fontSize="11" fill="var(--ink-muted)">Continuous reviews</text>
        <text x="460" y="172" textAnchor="middle" fontSize="10" fill="var(--ink-muted)" fontStyle="italic">Often the path to CFO</text>
      </svg>
    );
  } else if (variant === 'controls') {
    svg = (
      <svg viewBox="0 0 640 200" fill="none">
        <text x="320" y="26" textAnchor="middle" fontSize="12" fill="var(--ink-muted)" letterSpacing="0.1em">FIVE KINDS OF INTERNAL CONTROL</text>
        {[
          ["Authorization", "Only the CFO can approve > $50K"],
          ["Segregation", "One person invoices, another collects"],
          ["Documentation", "Every payment needs a signed form"],
          ["Reconciliation", "Match books to bank monthly"],
          ["Physical", "Cash in a safe, not a drawer"],
        ].map(([t, d], i) => (
          <g key={i} transform={`translate(${20 + i*124}, 50)`}>
            <rect width="108" height="100" rx="8" fill="var(--sand)" opacity="0.45"/>
            <circle cx="54" cy="32" r="14" fill="var(--olive)" opacity="0.85"/>
            <text x="54" y="37" textAnchor="middle" fontSize="13" fill="#F5F1E8" fontFamily="var(--f-serif)" fontWeight="600">{i+1}</text>
            <text x="54" y="60" textAnchor="middle" fontSize="11.5" fill="var(--ink)" fontWeight="600">{t}</text>
            <foreignObject x="6" y="66" width="96" height="32">
              <div xmlns="http://www.w3.org/1999/xhtml" style={{ fontSize: 9.5, color: 'var(--ink-muted)', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.25 }}>{d}</div>
            </foreignObject>
          </g>
        ))}
      </svg>
    );
  } else if (variant === 'opinion') {
    svg = (
      <svg viewBox="0 0 640 200" fill="none">
        <text x="320" y="26" textAnchor="middle" fontSize="12" fill="var(--ink-muted)" letterSpacing="0.1em">FOUR POSSIBLE AUDIT OPINIONS</text>
        {[
          ["Unqualified", "var(--olive)", "clean — fairly presented"],
          ["Qualified", "var(--sand)", "mostly OK, specific issue"],
          ["Adverse", "var(--rose)", "statements are misleading"],
          ["Disclaimer", "var(--line)", "could not form an opinion"],
        ].map(([t, col, d], i) => (
          <g key={i} transform={`translate(${40 + i*148}, 54)`}>
            <rect width="128" height="110" rx="8" fill={col} opacity="0.5"/>
            <rect x="10" y="10" width="108" height="90" rx="6" fill="var(--bg)" stroke={col}/>
            <text x="64" y="40" textAnchor="middle" fontSize="13" fill="var(--ink)" fontWeight="600">{t}</text>
            <line x1="28" y1="52" x2="100" y2="52" stroke={col}/>
            <foreignObject x="14" y="58" width="100" height="38">
              <div xmlns="http://www.w3.org/1999/xhtml" style={{ fontSize: 10, color: 'var(--ink-muted)', fontStyle: 'italic', textAlign: 'center' }}>{d}</div>
            </foreignObject>
          </g>
        ))}
      </svg>
    );
  } else if (variant === 'growth') {
    const items = [
      ["Sustainability assurance", 95, 'olive'],
      ["AI / intangibles valuation", 82, 'plum'],
      ["Transaction advisory (M&A)", 68, 'terracotta'],
      ["Forensic / fraud investigation", 55, 'sand'],
      ["Tax (multinational)", 48, 'rose'],
      ["Traditional audit (developed)", 15, 'sky'],
      ["Manual bookkeeping", -30, 'sage'],
    ];
    svg = (
      <svg viewBox="0 0 640 260" fill="none">
        <line x1="240" y1="10" x2="240" y2="240" stroke="var(--ink)" strokeWidth="1"/>
        {items.map((it, i) => {
          const y = 24 + i*32;
          const w = Math.abs(it[1])*2.8;
          const x = it[1] >= 0 ? 240 : 240 - w;
          return (
            <g key={i}>
              <text x="230" y={y+5} textAnchor="end" fontSize="11.5" fill="var(--ink-soft)">{it[0]}</text>
              <rect x={x} y={y-9} width={w} height="18" rx="2" fill={`var(--${it[2]})`} opacity="0.85"/>
              <text x={it[1] >= 0 ? x+w+6 : x-6} y={y+4} fontSize="11" textAnchor={it[1]>=0?'start':'end'} fill="var(--ink-muted)" fontFamily="var(--f-mono)">{it[1]>0?'+':''}{it[1]}%</text>
            </g>
          );
        })}
      </svg>
    );
  }
  return (
    <div className="diagram">
      {svg}
      <div className="cap">{caption}</div>
    </div>
  );
}

function renderBlock(b, i) {
  switch (b.kind) {
    case 'lead': return <BlockLead key={i} text={b.text}/>;
    case 'h2': return <BlockH2 key={i} text={b.text}/>;
    case 'p': return <BlockP key={i} text={b.text}/>;
    case 'callout': return <Callout key={i} {...b}/>;
    case 'example': return <Example key={i} {...b}/>;
    case 'glossary': return <Glossary key={i} {...b}/>;
    case 'tryit': return <TryIt key={i} {...b}/>;
    case 'diagram': return <Diagram key={i} {...b}/>;
    default: return null;
  }
}

window.renderBlock = renderBlock;
