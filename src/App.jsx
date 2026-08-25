import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Archive,
  Bell,
  BriefcaseBusiness,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  FileText,
  Filter,
  LayoutDashboard,
  Mail,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Sparkles,
  Star,
  Users,
} from 'lucide-react'

const candidates = [
  { name: 'Maya Chen', role: 'Product Designer', initials: 'MC', tone: 'lavender', stage: 'Interview', score: 94, time: '2h ago', location: 'San Francisco, CA', tags: ['Figma', 'Research'] },
  { name: 'Ethan Brooks', role: 'Product Designer', initials: 'EB', tone: 'peach', stage: 'Review', score: 91, time: '4h ago', location: 'New York, NY', tags: ['Figma', 'Prototyping'] },
  { name: 'Priya Shah', role: 'Product Designer', initials: 'PS', tone: 'mint', stage: 'Sourced', score: 88, time: 'Yesterday', location: 'Austin, TX', tags: ['Systems', 'UX'] },
  { name: 'Jordan Lee', role: 'Product Designer', initials: 'JL', tone: 'yellow', stage: 'Offer', score: 96, time: 'Yesterday', location: 'Toronto, CA', tags: ['Strategy', 'Figma'] },
  { name: 'Noah Williams', role: 'Product Designer', initials: 'NW', tone: 'blue', stage: 'Review', score: 84, time: '2d ago', location: 'Chicago, IL', tags: ['UX', 'Research'] },
]

const stages = ['All candidates', 'Sourced', 'Review', 'Interview', 'Offer']

const seedCandidates = candidates

async function getCandidates() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000/api'}/candidates`)
    if (!response.ok) throw new Error('API unavailable')
    return await response.json()
  } catch {
    return seedCandidates
  }
}

function App() {
  const [query, setQuery] = useState('')
  const [activeStage, setActiveStage] = useState('All candidates')
  const [shortlisted, setShortlisted] = useState(['Maya Chen', 'Jordan Lee'])
  const [activeNav, setActiveNav] = useState('Overview')
  const [notice, setNotice] = useState('')
  const { data: candidateData = seedCandidates } = useQuery({
    queryKey: ['candidates'],
    queryFn: getCandidates,
    staleTime: 30_000,
  })

  const visibleCandidates = useMemo(() => candidateData.filter((candidate) => {
    const matchesStage = activeStage === 'All candidates' || candidate.stage === activeStage
    const search = query.toLowerCase()
    return matchesStage && `${candidate.name} ${candidate.role} ${candidate.location}`.toLowerCase().includes(search)
  }), [activeStage, candidateData, query])

  const toggleShortlist = (name) => {
    setShortlisted((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name])
    setNotice(shortlisted.includes(name) ? `${name} removed from shortlist` : `${name} added to shortlist`)
    window.setTimeout(() => setNotice(''), 2400)
  }

  const showNotice = (message) => {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 2400)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark"><Sparkles size={16} /></span><span>talent<span className="brand-dot">.</span>flow</span></div>
        <div className="workspace-switcher"><span className="workspace-avatar">A</span><span><strong>Acme, Inc.</strong><small>Hiring workspace</small></span><ChevronDown size={15} /></div>
        <nav className="primary-nav" aria-label="Primary navigation">
          {[['Overview', LayoutDashboard], ['Candidates', Users], ['Jobs', BriefcaseBusiness], ['Messages', Mail]].map(([label, Icon]) => <button key={label} className={activeNav === label ? 'nav-item active' : 'nav-item'} onClick={() => setActiveNav(label)}><Icon size={18} />{label}{label === 'Messages' && <span className="nav-count">3</span>}</button>)}
        </nav>
        <div className="nav-section-label">Workspace</div>
        <nav className="secondary-nav"><button className="nav-item"><FileText size={18} />Templates</button><button className="nav-item"><Archive size={18} />Archive</button></nav>
        <div className="sidebar-bottom"><button className="nav-item"><Settings size={18} />Settings</button><button className="nav-item"><CircleHelp size={18} />Help center</button><div className="user-row"><span className="user-avatar">AK</span><span><strong>Alex Kim</strong><small>Recruiting lead</small></span><MoreHorizontal size={17} /></div></div>
      </aside>

      <main className="main-content">
        <header className="topbar"><div className="breadcrumb">Workspace <ChevronRight size={14} /> <span>Overview</span></div><div className="top-actions"><button className="icon-button" aria-label="Notifications"><Bell size={19} /><span className="notification-dot" /></button><button className="avatar-button">AK</button></div></header>
        <div className="content-wrap">
          <section className="welcome-row"><div><p className="eyebrow">Tuesday, August 25, 2026</p><h1>Good morning, Alex <span className="wave">✦</span></h1><p className="subtitle">Here’s what’s happening with your hiring pipeline today.</p></div><button className="primary-button" onClick={() => showNotice('Candidate intake is ready to connect')}><Plus size={17} /> Add candidate</button></section>

          <section className="metric-grid" aria-label="Hiring metrics"><div className="metric-card metric-featured"><div className="metric-icon"><Users size={17} /></div><span className="metric-label">Total candidates</span><strong>248</strong><span className="metric-change up">↗ 12.5% <em>vs last month</em></span></div><div className="metric-card"><div className="metric-icon peach-icon"><BriefcaseBusiness size={17} /></div><span className="metric-label">Active jobs</span><strong>8</strong><span className="metric-change up">↗ 2 <em>this month</em></span></div><div className="metric-card"><div className="metric-icon mint-icon"><Star size={17} /></div><span className="metric-label">Avg. match score</span><strong>87%</strong><span className="metric-change up">↗ 4.2% <em>vs last month</em></span></div><div className="metric-card"><div className="metric-icon yellow-icon"><FileText size={17} /></div><span className="metric-label">Time to hire</span><strong>18 <small>days</small></strong><span className="metric-change down">↘ 3 days <em>vs last month</em></span></div></section>

          <section className="pipeline-section"><div className="section-heading"><div><h2>Hiring pipeline</h2><p>Track your candidates across every stage.</p></div><button className="text-button">View full pipeline <ChevronRight size={16} /></button></div><div className="pipeline-grid">{[['Sourced', 86, '16%', 'purple'], ['Review', 52, '11%', 'peach'], ['Interview', 24, '9%', 'mint'], ['Offer', 8, '4%', 'yellow']].map(([label, count, percentage, color]) => <div className="pipeline-card" key={label}><div className="pipeline-top"><span className={`stage-dot ${color}`} /> <span>{label}</span><MoreHorizontal size={16} /></div><strong>{count}</strong><div className="progress-track"><div className={`progress-fill ${color}`} style={{ width: `${Math.max(count / 86 * 100, 14)}%` }} /></div><span className="pipeline-percentage">{percentage} of total candidates</span></div>)}</div></section>

          <section className="candidate-section"><div className="section-heading"><div><h2>Recent candidates</h2><p>Review and manage your latest applicants.</p></div><button className="text-button" onClick={() => { setActiveStage('All candidates'); setQuery('') }}>Reset view <ChevronRight size={16} /></button></div><div className="toolbar"><div className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search candidates..." /></div><div className="stage-tabs">{stages.map((stage) => <button key={stage} className={activeStage === stage ? 'stage-tab active' : 'stage-tab'} onClick={() => setActiveStage(stage)}>{stage.replace(' candidates', '')}</button>)}</div><button className="filter-button" onClick={() => showNotice('Advanced filters are coming next')}><Filter size={16} /> Filters</button></div><div className="candidate-table"><div className="table-header"><span>Candidate</span><span>Stage</span><span>Match score</span><span>Applied</span><span /></div>{visibleCandidates.map((candidate) => <div className="candidate-row" key={candidate.name}><div className="candidate-cell"><span className={`candidate-avatar ${candidate.tone}`}>{candidate.initials}</span><span><strong>{candidate.name}</strong><small>{candidate.role} · {candidate.location}</small></span></div><span className={`status-pill ${candidate.stage.toLowerCase()}`}>{candidate.stage}</span><span className="score"><Sparkles size={14} /> {candidate.score}%</span><span className="applied-time">{candidate.time}</span><div className="row-actions"><button className={shortlisted.includes(candidate.name) ? 'star-button selected' : 'star-button'} aria-label={`Shortlist ${candidate.name}`} onClick={() => toggleShortlist(candidate.name)}><Star size={17} fill={shortlisted.includes(candidate.name) ? 'currentColor' : 'none'} /></button><button className="more-button" aria-label={`More actions for ${candidate.name}`} onClick={() => showNotice(`Actions for ${candidate.name}`)}><MoreHorizontal size={17} /></button></div></div>)}{visibleCandidates.length === 0 && <div className="empty-state">No candidates match your search.</div>}</div></section>

          <footer className="footer-note"><span><span className="online-dot" />All systems operational</span><span>Last synced just now</span></footer>
          {notice && <div className="toast" role="status">{notice}</div>}
        </div>
      </main>
    </div>
  )
}

export default App
