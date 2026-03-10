import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Share2 } from 'lucide-react';
import { CARS, calcLifecycle } from '../data';

const INSIGHTS = [
  { stat: '5×', desc: 'A Nexon EV in Himachal is 5× cleaner than a Nexon EV in Jharkhand', src: 'CarbonWise data' },
  { stat: '31t', desc: 'CO₂ saved over 10 years by choosing a Prius over a Creta in Maharashtra', src: 'CarbonWise model' },
  { stat: '12t', desc: 'Manufacturing carbon hidden in every EV before it moves 1 km', src: 'EPA lifecycle study' },
  { stat: '67%', desc: "India's electricity from coal — the context every EV buyer needs", src: 'CEA 2023' },
];

function RatingBadge({ rating }) {
  const cls = rating === 'A+' ? 'rating-aplus' : rating === 'A' ? 'rating-a' : rating === 'B' ? 'rating-b' : 'rating-c';
  return <div className={`rating ${cls}`}>{rating}</div>;
}

export default function Insights() {
  const [filter, setFilter] = useState('all');

  const allCars = Object.keys(CARS).map(k => calcLifecycle(k, 0.82, 40, 8)).filter(Boolean).sort((a,b) => a.total - b.total);
  const filtered = filter === 'all' ? allCars : allCars.filter(c => c.type === filter);
  const maxCO2 = Math.max(...allCars.map(c => c.total));

  return (
    <div style={{ paddingTop: 72 }}>
      <div className="page-hero">
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 40px' }}>
          <div className="section-label" style={{ color: 'var(--olive-muted)' }}>Data Insights</div>
          <h1 className="page-hero__title">What the data<br /><em style={{ fontStyle: 'italic', color: 'var(--olive-muted)' }}>actually says.</em></h1>
          <p className="page-hero__sub">Original findings from our lifecycle model. Maharashtra grid · 40km/day · 8 years.</p>
        </div>
      </div>

      {/* Key stats */}
      <section style={{ background: 'var(--cream-dark)', padding: '72px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
            {INSIGHTS.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 16, padding: 28 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 700, color: 'var(--olive)', lineHeight: 1, marginBottom: 10 }}>{s.stat}</div>
                <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: 10 }}>{s.desc}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '.1em', textTransform: 'uppercase' }}>{s.src}</div>
                <button onClick={() => navigator.clipboard.writeText(s.stat + ' — ' + s.desc)} style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 14, fontSize: 11, color: 'var(--olive)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', letterSpacing: '.08em' }}>
                  <Share2 size={11} /> SHARE STAT
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full leaderboard */}
      <section style={{ background: 'var(--cream)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div className="section-label">Full Leaderboard</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700 }}>Every car.<br />Ranked honestly.</h2>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['all','ev','hybrid','ice'].map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`filter-pill ${filter === f ? 'active' : ''}`}>
                  {f === 'all' ? 'All' : f.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--cream-dark)', borderBottom: '1px solid var(--border)' }}>
                  {['#','Vehicle','Type','Mfg','Fuel CO₂','Total CO₂','Bar','Rating'].map(h => (
                    <th key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '14px 20px', textAlign: 'left', fontWeight: 400 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((car, i) => {
                  const pct = (car.total / maxCO2) * 100;
                  const barColor = car.total < 30 ? 'var(--green-ok)' : car.total < 55 ? 'var(--amber)' : 'var(--rust)';
                  return (
                    <motion.tr key={car.key} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '18px 20px', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: i === 0 ? '#D4A82A' : i === 1 ? '#A0A8A0' : i === 2 ? '#C47840' : 'var(--text-muted)' }}>{String(i+1).padStart(2,'0')}</td>
                      <td style={{ padding: '18px 20px' }}>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{car.name}</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{car.brand}</div>
                      </td>
                      <td style={{ padding: '18px 20px' }}><span className={`type-badge type-${car.type}`}>{car.type.toUpperCase()}</span></td>
                      <td style={{ padding: '18px 20px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-secondary)' }}>{car.mfg}t</td>
                      <td style={{ padding: '18px 20px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-secondary)' }}>{car.fuel}t</td>
                      <td style={{ padding: '18px 20px', fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, color: barColor }}>{car.total}t</td>
                      <td style={{ padding: '18px 20px', paddingRight: 8 }}>
                        <div style={{ height: 5, width: 120, background: 'var(--cream-mid)', borderRadius: 3, overflow: 'hidden' }}>
                          <motion.div initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ height: '100%', background: barColor, borderRadius: 3 }} />
                        </div>
                      </td>
                      <td style={{ padding: '18px 20px' }}><RatingBadge rating={car.rating} /></td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: 28, padding: 20, background: 'var(--cream-dark)', borderRadius: 12 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '.06em' }}>
              ⓘ Maharashtra grid (0.82 kg CO₂/kWh) · 40 km/day · 8 years ownership · Sources: EPA, EEA, CEA India, ARAI
            </p>
          </div>
          <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/compare" className="btn btn--primary">Compare Any Two Cars →</Link>
            <Link to="/calculator" className="btn btn--outline">Personalise My Result</Link>
          </div>
        </div>
      </section>
      <style>{`@media(max-width:768px){div[style*="grid-template-columns: repeat(4"]{grid-template-columns:repeat(2,1fr)!important}table{font-size:12px}}`}</style>
    </div>
  );
}
