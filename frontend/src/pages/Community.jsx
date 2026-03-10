import { useState } from 'react';
import { motion } from 'framer-motion';
import { Rss, ExternalLink, Loader } from 'lucide-react';

const RSS_SOURCES = [
  { url: 'https://www.downtoearth.org/rss', name: 'Down To Earth', tags: 'india climate' },
  { url: 'https://electrek.co/feed/', name: 'Electrek', tags: 'ev' },
  { url: 'https://feeds.feedburner.com/carbonbrief', name: 'Carbon Brief', tags: 'climate' },
];

const STATIC_ARTICLES = [
  { title: "India's EV boom masks a coal problem no one's talking about", source: 'Down To Earth', date: 'Mar 2025', url: 'https://www.downtoearth.org', tags: 'india' },
  { title: 'Lifecycle analysis confirms hybrid advantage in coal-heavy grids', source: 'Carbon Brief', date: 'Feb 2025', url: 'https://www.carbonbrief.org', tags: 'ev climate' },
  { title: 'Battery disposal: the ignored crisis in India\'s EV revolution', source: 'Electrek', date: 'Feb 2025', url: 'https://electrek.co', tags: 'ev' },
  { title: 'Tata Nexon EV crosses 1 lakh sales — but what\'s the lifecycle carbon?', source: 'MoneyControl', date: 'Jan 2025', url: 'https://moneycontrol.com', tags: 'india ev' },
  { title: 'CEA India 2023 report: state-by-state grid intensity update', source: 'CEA India', date: 'Jan 2025', url: 'https://cea.nic.in', tags: 'india' },
  { title: 'Why Norway\'s EVs are 10× cleaner than India\'s — the grid story', source: 'Carbon Brief', date: 'Dec 2024', url: 'https://www.carbonbrief.org', tags: 'climate' },
];

export default function Community() {
  const [filter, setFilter] = useState('all');
  const [liveArticles, setLiveArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  async function loadRSS() {
    setLoading(true);
    let all = [];
    for (const src of RSS_SOURCES) {
      try {
        const api = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(src.url)}&count=4`;
        const res = await fetch(api);
        const data = await res.json();
        if (data.status === 'ok' && data.items) {
          data.items.forEach(item => all.push({ ...item, sourceName: src.name, tags: src.tags }));
        }
      } catch { /* skip */ }
    }
    all.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    setLiveArticles(all.slice(0, 9));
    setLoading(false);
    setLoaded(true);
  }

  const articles = loaded && liveArticles.length ? liveArticles.map(a => ({
    title: a.title,
    source: a.sourceName,
    date: a.pubDate ? new Date(a.pubDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '',
    url: a.link,
    tags: a.tags || '',
  })) : STATIC_ARTICLES;

  const filtered = filter === 'all' ? articles : articles.filter(a => a.tags.includes(filter));

  return (
    <div style={{ paddingTop: 72 }}>
      <div className="page-hero">
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 40px' }}>
          <div className="section-label" style={{ color: 'var(--olive-muted)' }}>Community</div>
          <h1 className="page-hero__title">Stay informed.<br /><em style={{ fontStyle: 'italic', color: 'var(--olive-muted)' }}>Stay honest.</em></h1>
          <p className="page-hero__sub">Real news from trusted sources on EVs, climate, and the greenwashing crisis.</p>
        </div>
      </div>

      <section style={{ background: 'var(--cream)', padding: '60px 0 100px' }}>
        <div className="container">
          {/* Counter + Load button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 20 }}>
            <div style={{ background: 'var(--cream-dark)', border: '1px solid var(--border)', borderRadius: 12, padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--olive)' }}>3,241+</span>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>comparisons made on CarbonWise</span>
            </div>
            {!loaded && (
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={loadRSS} disabled={loading} className="btn btn--primary">
                {loading ? <><Loader size={14} className="spin" /> Loading live feed...</> : <><Rss size={14} /> Load Live Articles</>}
              </motion.button>
            )}
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
            {['all', 'ev', 'india', 'climate'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`filter-pill ${filter === f ? 'active' : ''}`}>
                {f === 'all' ? 'All' : f === 'ev' ? 'EV' : f === 'india' ? 'India' : 'Climate'}
              </button>
            ))}
            <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', alignSelf: 'center' }}>{filtered.length} articles</span>
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {filtered.map((a, i) => (
              <motion.a key={i} href={a.url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(0,0,0,0.10)' }} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px 24px 20px', display: 'flex', flexDirection: 'column', gap: 10, textDecoration: 'none', color: 'inherit', transition: 'all 0.2s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 700 }}>{a.source}</span>
                  <ExternalLink size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, lineHeight: 1.35, color: 'var(--black)' }}>{a.title}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', marginTop: 'auto', paddingTop: 8, borderTop: '1px solid var(--border)' }}>{a.date || 'Recent'}</div>
              </motion.a>
            ))}
          </div>

          {loaded && liveArticles.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', background: 'var(--cream-dark)', borderRadius: 14, marginTop: 20 }}>
              ⚠️ Could not load live feed. Showing curated articles above.
            </div>
          )}
        </div>
      </section>
      <style>{`.spin{animation:spin 1s linear infinite}@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@media(max-width:768px){div[style*="grid-template-columns: repeat(3"]{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
