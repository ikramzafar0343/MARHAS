import { useEffect, useMemo, useState } from 'react'
import { FiSearch, FiFilter, FiUploadCloud } from 'react-icons/fi'
import HeaderBar from './HeaderBar.jsx'
import DashSidebar from './DashSidebar.jsx'
import Footer from './Footer.jsx'

const Stars = ({ n = 0 }) => {
  const arr = [1,2,3,4,5]
  return (
    <div className="rating">
      {arr.map(i => <span key={i} className={`star ${i <= n ? 'on' : 'off'}`}>★</span>)}
    </div>
  )
}

export default function Feedback({ onNavigate }) {
  const brand = 'MARHAS'
  const [q, setQ] = useState('')
  const base = [
    { name: 'Alice Freeman', email: 'alice.free@example.com', rating: 5, comment: 'Great product, fast shipping!', date: 'Dec 14, 2025', status: 'Published', img: '/assets/images/WOMENS.jfif' },
    { name: 'Robert Fox', email: 'robert.fox@example.com', rating: 4, comment: 'Good, but packaging could be better.', date: 'Dec 13, 2025', status: 'Published', img: '/assets/images/MENS.jfif' },
    { name: 'Darlene Robertson', email: 'darlene.rob@example.com', rating: 2, comment: 'Item arrived damaged.', date: 'Dec 12, 2025', status: 'Pending', img: '/assets/images/KIDS.jfif' },
    { name: 'Jerome Bell', email: 'jerome.bell@example.com', rating: 5, comment: 'Excellent service!', date: 'Dec 11, 2025', status: 'Published', img: '/assets/images/MENS.jfif' },
    { name: 'Eleanor Pena', email: 'eleanor.pena@example.com', rating: 1, comment: 'Terrible experience.', date: 'Dec 10, 2025', status: 'Archived', img: '/assets/images/WOMENS.jfif' },
  ]
  const [rows, setRows] = useState(base)
  const [filterOpen, setFilterOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState('')
  const [minRating, setMinRating] = useState(0)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('feedback_status_v1') || '{}') || {}
      setRows(base.map(r => ({ ...r, status: saved[r.email] || r.status })))
    } catch {}
  }, [])
  const filtered = useMemo(() => {
    const s = q.toLowerCase()
    const byQuery = rows.filter(f =>
      f.name.toLowerCase().includes(s) ||
      f.email.toLowerCase().includes(s) ||
      f.comment.toLowerCase().includes(s))
    const byStatus = statusFilter ? byQuery.filter(f => f.status === statusFilter) : byQuery
    const byRating = Number(minRating) > 0 ? byStatus.filter(f => f.rating >= Number(minRating)) : byStatus
    const parse = (str) => { try { return new Date(str) } catch { return null } }
    const start = startDate ? parse(startDate) : null
    const end = endDate ? parse(endDate) : null
    const byDate = byRating.filter(f => {
      const d = parse(f.date)
      if (!d) return true
      const afterStart = start ? d >= start : true
      const beforeEnd = end ? d <= end : true
      return afterStart && beforeEnd
    })
    return byDate
  }, [q, rows, statusFilter, minRating, startDate, endDate])
  const statusClass = (s) => (/Published/i.test(s) ? 'ok' : /Pending/i.test(s) ? 'warn' : 'muted')
  const total = rows.length
  const positive = rows.filter(r => r.rating >= 4).length
  const negative = rows.filter(r => r.rating <= 2).length
  const setStatus = (email, status) => {
    setRows(prev => prev.map(r => r.email === email ? { ...r, status } : r))
    try {
      const saved = JSON.parse(localStorage.getItem('feedback_status_v1') || '{}') || {}
      saved[email] = status
      localStorage.setItem('feedback_status_v1', JSON.stringify(saved))
    } catch {}
  }
  const exportCSV = () => {
    const header = ['Customer','Email','Rating','Comment','Date','Status']
    const data = filtered.map(f => [f.name, f.email, f.rating, f.comment, f.date, f.status])
    const csv = [header.join(','), ...data.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(','))].join('\n')
    const blob = new window.Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'feedback.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }
  return (
    <div className="bag-dark position-relative">
      <HeaderBar
        brand={brand}
        onMenuClick={() => {}}
        onBrandClick={() => { window.location.hash = '#/landing' }}
        onWishlistClick={() => {}}
        onProfileClick={() => {}}
        onCartClick={() => {}}
        renderSearch={() => <FiSearch aria-label="Search" className="fs-5 header-icon icon-hover" role="button" tabIndex={0} />}
      />
      <main className="dash-main">
        <DashSidebar onNavigate={onNavigate} open={true} active="feedback" />
        <section className="dash-content">
          <div className="dash-head">
            <div className="dash-title">Feedback</div>
            <div className="dash-sub">Manage and review feedback from your customers</div>
          </div>
          <div className="dash-cards">
            <div className="dash-card">
              <div className="dash-card-key">Total Feedback</div>
              <div className="dash-card-val">{total}</div>
            </div>
            <div className="dash-card">
              <div className="dash-card-key">Positive Feedback</div>
              <div className="dash-card-val">{positive}</div>
            </div>
            <div className="dash-card">
              <div className="dash-card-key">Negative Feedback</div>
              <div className="dash-card-val">{negative}</div>
            </div>
          </div>
          <div className="dash-table">
            <div className="dash-table-head">
              <div className="dash-search">
                <FiSearch />
                <input className="dash-input" placeholder="Search feedback..." value={q} onChange={(e) => setQ(e.target.value)} />
              </div>
              <div className="dash-actions">
                <button className="btn-soft" onClick={() => setFilterOpen(v => !v)}><FiFilter /> Filter</button>
                <button className="btn-soft" onClick={exportCSV}><FiUploadCloud /> Export</button>
              </div>
            </div>
            {filterOpen && (
              <div className="dash-filters">
                <div className="form-field">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="">All</option>
                    <option>Published</option>
                    <option>Pending</option>
                    <option>Archived</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Min Rating</label>
                  <select className="form-select" value={minRating} onChange={(e) => setMinRating(Number(e.target.value || 0))}>
                    <option value="0">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Start Date</label>
                  <input className="form-input" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="form-field">
                  <label className="form-label">End Date</label>
                  <input className="form-input" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>
            )}
            <div className="dash-row header">
              <div>Customer</div><div>Rating</div><div>Comment</div><div>Date</div><div>Status</div><div>Action</div>
            </div>
            {filtered.map((f) => (
              <div key={f.email} className="dash-row">
                <div className="dash-col-customer">
                  <div className="avatar"><img src={f.img} alt={f.name} /></div>
                  <div>
                    <div className="c-name">{f.name}</div>
                    <div className="c-email">{f.email}</div>
                  </div>
                </div>
                <div><Stars n={f.rating} /></div>
                <div>{f.comment}</div>
                <div>{f.date}</div>
                <div className={`status ${statusClass(f.status)}`}>{f.status}</div>
                <div className="d-flex gap-1">
                  <button className="btn-soft" onClick={() => setStatus(f.email, 'Published')}>Publish</button>
                  <button className="btn-soft" onClick={() => setStatus(f.email, 'Pending')}>Pending</button>
                  <button className="btn-soft" onClick={() => setStatus(f.email, 'Archived')}>Archive</button>
                </div>
              </div>
            ))}
          </div>
          <Footer brand={brand} />
        </section>
      </main>
    </div>
  )
}
