import { useEffect, useMemo, useState } from 'react'
import { FiSearch, FiFilter, FiUploadCloud } from 'react-icons/fi'
import HeaderBar from './HeaderBar.jsx'
import DashSidebar from './DashSidebar.jsx'
import Footer from './Footer.jsx'

export default function Shipment({ onNavigate }) {
  const brand = 'MARHAS'
  const [q, setQ] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [carrierFilter, setCarrierFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const base = [
    { sid: '#SHP-4520', oid: '#4520', name: 'Alice Freeman', email: 'alice.free@example.com', carrier: 'FedEx', status: 'In Transit', date: 'Dec 18, 2025', img: '/assets/images/WOMENS.jfif' },
    { sid: '#SHP-4519', oid: '#4519', name: 'Robert Fox', email: 'robert.fox@example.com', carrier: 'UPS', status: 'Delivered', date: 'Dec 16, 2025', img: '/assets/images/MENS.jfif' },
    { sid: '#SHP-4518', oid: '#4518', name: 'Darlene Robertson', email: 'darlene.rob@example.com', carrier: 'DHL', status: 'Out for Delivery', date: 'Dec 15, 2025', img: '/assets/images/KIDS.jfif' },
    { sid: '#SHP-4517', oid: '#4517', name: 'Jerome Bell', email: 'jerome.bell@example.com', carrier: 'USPS', status: 'Exception', date: 'Dec 14, 2025', img: '/assets/images/MENS.jfif' },
  ]
  const [rows, setRows] = useState(base)
  const carriers = useMemo(() => Array.from(new Set(base.map(r => r.carrier))), [base])
  const filtered = useMemo(() => {
    const s = q.toLowerCase()
    const byQuery = rows.filter(r =>
      r.sid.toLowerCase().includes(s) ||
      r.oid.toLowerCase().includes(s) ||
      r.name.toLowerCase().includes(s) ||
      r.email.toLowerCase().includes(s) ||
      r.carrier.toLowerCase().includes(s)
    )
    const byCarrier = carrierFilter === 'All' ? byQuery : byQuery.filter(r => r.carrier === carrierFilter)
    const byStatus = statusFilter === 'All' ? byCarrier : byCarrier.filter(r => String(r.status).toLowerCase() === String(statusFilter).toLowerCase())
    const parse = (str) => { try { return new Date(str) } catch { return null } }
    const start = startDate ? parse(startDate) : null
    const end = endDate ? parse(endDate) : null
    const byDate = byStatus.filter(r => {
      const d = parse(r.date)
      if (!d) return true
      const afterStart = start ? d >= start : true
      const beforeEnd = end ? d <= end : true
      return afterStart && beforeEnd
    })
    return byDate
  }, [q, rows, carrierFilter, statusFilter, startDate, endDate])
  const statusClass = (s) =>
    /Delivered/i.test(s) ? 'ok' :
    /Out for Delivery/i.test(s) ? 'warn' :
    /Exception|Failed/i.test(s) ? 'bad' :
    'proc'
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('shipments_status_v1') || '{}') || {}
      setRows(base.map(r => ({ ...r, status: saved[r.sid] || r.status })))
    } catch {}
  }, [])
  const exportCSV = () => {
    const header = ['Shipment ID','Order ID','Customer','Email','Carrier','Status','Delivery Date']
    const rowsCsv = filtered.map(r => [r.sid, r.oid, r.name, r.email, r.carrier, r.status, r.date])
    const csv = [header, ...rowsCsv].map(row => row.map(x => `"${String(x).replace(/"/g,'""')}"`).join(',')).join('\n')
    const blob = new window.Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'shipments.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }
  const goDetail = (r) => {
    try { sessionStorage.setItem('selected_shipment_v1', JSON.stringify(r)) } catch {}
    const id = String(r.sid || '').replace(/^#SHP-/, '')
    onNavigate?.('shipmentDetail', { id })
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
        <DashSidebar onNavigate={onNavigate} open={true} active="shipment" />
        <section className="dash-content">
          <div className="dash-head">
            <div className="dash-title">Shipments</div>
            <div className="dash-sub">Manage and track your store’s shipments</div>
          </div>
          <div className="dash-cards">
            <div className="dash-card">
              <div className="dash-card-key">Total Shipments</div>
              <div className="dash-card-val">4,520</div>
            </div>
            <div className="dash-card">
              <div className="dash-card-key">In Transit</div>
              <div className="dash-card-val">125</div>
            </div>
            <div className="dash-card">
              <div className="dash-card-key">Delivered</div>
              <div className="dash-card-val">4,300</div>
            </div>
            <div className="dash-card">
              <div className="dash-card-key">Failed Delivery</div>
              <div className="dash-card-val">95</div>
            </div>
          </div>
          <div className="dash-table">
            <div className="dash-table-head">
              <div className="dash-search">
                <FiSearch />
                <input className="dash-input" placeholder="Search shipment ID, order ID or customer..." value={q} onChange={(e) => setQ(e.target.value)} />
              </div>
              <div className="dash-actions">
                <button className="btn-soft" onClick={() => setShowFilters(s => !s)}><FiFilter /> Filter</button>
                <button className="btn-soft" onClick={exportCSV}><FiUploadCloud /> Export</button>
              </div>
            </div>
            {showFilters && (
              <div className="p-2" style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'8px'}}>
                <div className="form-field">
                  <label className="form-label">Carrier</label>
                  <select className="form-select" value={carrierFilter} onChange={(e) => setCarrierFilter(e.target.value)}>
                    <option>All</option>
                    {carriers.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option>All</option>
                    <option>In Transit</option>
                    <option>Out for Delivery</option>
                    <option>Delivered</option>
                    <option>Exception</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Start date</label>
                  <input className="form-input" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="form-field">
                  <label className="form-label">End date</label>
                  <input className="form-input" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>
            )}
            <div className="dash-row header">
              <div>Shipment ID</div><div>Order ID</div><div>Customer</div><div>Carrier</div><div>Status</div><div>Delivery Date</div><div>Action</div>
            </div>
            {filtered.map((r) => (
              <div key={r.sid} className="dash-row">
                <div>{r.sid}</div>
                <div>{r.oid}</div>
                <div className="dash-col-customer">
                  <div className="avatar"><img src={r.img} alt={r.name} /></div>
                  <div>
                    <div className="c-name">{r.name}</div>
                    <div className="c-email">{r.email}</div>
                  </div>
                </div>
                <div>{r.carrier}</div>
                <div className={`status ${statusClass(r.status)}`}>{r.status}</div>
                <div>{r.date}</div>
                <div><button className="btn-soft" onClick={() => goDetail(r)}>...</button></div>
              </div>
            ))}
          </div>
          <Footer brand={brand} />
        </section>
      </main>
    </div>
  )
}
