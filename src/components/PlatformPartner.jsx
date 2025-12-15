import { useEffect, useMemo, useState } from 'react'
import { FiSearch, FiFilter, FiUploadCloud, FiX } from 'react-icons/fi'
import { SiStripe, SiMailchimp, SiGoogleanalytics } from 'react-icons/si'
import { FaPaypal, FaFacebookF } from 'react-icons/fa'
import HeaderBar from './HeaderBar.jsx'
import DashSidebar from './DashSidebar.jsx'
import Footer from './Footer.jsx'

export default function PlatformPartner({ onNavigate }) {
  const brand = 'MARHAS'
  const [q, setQ] = useState('')
  const base = [
    { name: 'Stripe', type: 'Payment Gateway', status: 'Connected', icon: SiStripe },
    { name: 'PayPal', type: 'Payment Gateway', status: 'Connected', icon: FaPaypal },
    { name: 'Mailchimp', type: 'Email Marketing', status: 'Not Connected', icon: SiMailchimp },
    { name: 'Google Analytics', type: 'Analytics', status: 'Connected', icon: SiGoogleanalytics },
    { name: 'Facebook Pixel', type: 'Facebook Pixel', status: 'Not Connected', icon: FaFacebookF },
  ]
  const [rows, setRows] = useState(base)
  const [filterOpen, setFilterOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('partners_status_v1') || '{}') || {}
      setRows(base.map(p => ({ ...p, status: saved[p.name] || p.status })))
    } catch {}
  }, [])
  const types = useMemo(() => {
    return Array.from(new Set(rows.map(p => p.type)))
  }, [rows])
  const filtered = useMemo(() => {
    const s = q.toLowerCase()
    const byQuery = rows.filter(p =>
      p.name.toLowerCase().includes(s) ||
      p.type.toLowerCase().includes(s) ||
      p.status.toLowerCase().includes(s))
    const byStatus = statusFilter ? byQuery.filter(p => p.status === statusFilter) : byQuery
    const byType = typeFilter ? byStatus.filter(p => p.type === typeFilter) : byStatus
    return byType
  }, [q, rows, statusFilter, typeFilter])
  const statusClass = (s) => (/Connected/i.test(s) ? 'ok' : 'muted')
  const total = rows.length
  const active = rows.filter(p => /Connected/i.test(p.status)).length
  const inactive = total - active
  const exportCSV = () => {
    const header = ['Partner','Type','Status']
    const data = filtered.map(p => [p.name, p.type, p.status])
    const csv = [header.join(','), ...data.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(','))].join('\n')
    const blob = new window.Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'partners.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }
  const setStatus = (name, status) => {
    setRows(prev => prev.map(p => p.name === name ? { ...p, status } : p))
    try {
      const saved = JSON.parse(localStorage.getItem('partners_status_v1') || '{}')
      saved[name] = status
      localStorage.setItem('partners_status_v1', JSON.stringify(saved))
    } catch {}
  }
  const onManage = (p) => {
    try { sessionStorage.setItem('selected_partner_v1', p.name) } catch {}
    if (typeof onNavigate === 'function') onNavigate('partnerDetail', { id: p.name })
    else { window.location.hash = `#/partnerDetail?id=${encodeURIComponent(p.name)}` }
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
        <DashSidebar onNavigate={onNavigate} open={true} active="platformPartner" />
        <section className="dash-content">
          <div className="dash-head">
            <div className="dash-title">Platform Partners</div>
            <div className="dash-sub">Manage your integrations with third-party services</div>
          </div>
          <div className="dash-cards">
            <div className="dash-card">
              <div className="dash-card-key">Total Partners</div>
              <div className="dash-card-val">{total}</div>
            </div>
            <div className="dash-card">
              <div className="dash-card-key">Active Integrations</div>
              <div className="dash-card-val">{active}</div>
            </div>
            <div className="dash-card">
              <div className="dash-card-key">Inactive Integrations</div>
              <div className="dash-card-val">{inactive}</div>
            </div>
          </div>
          <div className="dash-table">
            <div className="dash-table-head">
              <div className="dash-search">
                <FiSearch />
                <input className="dash-input" placeholder="Search partner name or type..." value={q} onChange={(e) => setQ(e.target.value)} />
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
                    <option>Connected</option>
                    <option>Not Connected</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Type</label>
                  <select className="form-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                    <option value="">All</option>
                    {types.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <button className="btn-soft" onClick={() => { setStatusFilter(''); setTypeFilter('') }}><FiX /> Clear</button>
              </div>
            )}
            <div className="dash-row header">
              <div>Partner</div><div>Type</div><div>Status</div><div>Action</div>
            </div>
            {filtered.map((p) => {
              const Icon = p.icon
              return (
                <div key={p.name} className="dash-row">
                  <div className="dash-col-customer">
                    <div className="avatar" style={{borderRadius:8}}><Icon size={22} /></div>
                    <div className="c-name">{p.name}</div>
                  </div>
                  <div>{p.type}</div>
                  <div className={`status ${statusClass(p.status)}`}>{p.status}</div>
                  <div>
                    {statusClass(p.status) === 'ok'
                      ? <button className="btn-soft" onClick={() => onManage(p)}>Manage</button>
                      : <button className="btn-soft" onClick={() => setStatus(p.name, 'Connected')}>Connect</button>}
                  </div>
                </div>
              )
            })}
          </div>
          <Footer brand={brand} />
        </section>
      </main>
    </div>
  )
}
