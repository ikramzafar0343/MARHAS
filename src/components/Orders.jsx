import { useEffect, useMemo, useState } from 'react'
import { FiSearch, FiFilter, FiUploadCloud } from 'react-icons/fi'
import HeaderBar from './HeaderBar.jsx'
import DashSidebar from './DashSidebar.jsx'
import Footer from './Footer.jsx'

export default function Orders({ onNavigate }) {
  const brand = 'MARHAS'
  const [q, setQ] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [statusFilter, setStatusFilter] = useState('All')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const base = [
    { id: '#4520', name: 'Alice Freeman', email: 'alice.free@example.com', date: 'Dec 15, 2025', status: 'Processing', total: 245.00, img: '/assets/images/WOMENS.jfif' },
    { id: '#4519', name: 'Robert Fox', email: 'robert.fox@example.com', date: 'Dec 14, 2025', status: 'Completed', total: 120.50, img: '/assets/images/MENS.jfif' },
    { id: '#4518', name: 'Darlene Robertson', email: 'darlene.rob@example.com', date: 'Dec 14, 2025', status: 'Pending', total: 89.00, img: '/assets/images/KIDS.jfif' },
    { id: '#4517', name: 'Jerome Bell', email: 'jerome.bell@example.com', date: 'Dec 13, 2025', status: 'Cancelled', total: 350.00, img: '/assets/images/MENS.jfif' },
  ]
  const [orders, setOrders] = useState(base)
  const filtered = useMemo(() => {
    const s = q.toLowerCase()
    const byQuery = orders.filter(o =>
      o.id.toLowerCase().includes(s) ||
      o.name.toLowerCase().includes(s) ||
      o.email.toLowerCase().includes(s))
    const byStatus = statusFilter === 'All' ? byQuery : byQuery.filter(o => String(o.status).toLowerCase() === String(statusFilter).toLowerCase())
    const parse = (str) => {
      try { return new Date(str) } catch { return null }
    }
    const start = startDate ? parse(startDate) : null
    const end = endDate ? parse(endDate) : null
    const byDate = byStatus.filter(o => {
      const d = parse(o.date)
      if (!d) return true
      const afterStart = start ? d >= start : true
      const beforeEnd = end ? d <= end : true
      return afterStart && beforeEnd
    })
    return byDate
  }, [q, orders, statusFilter, startDate, endDate])
  const statusClass = (s) =>
    /Completed|Delivered/i.test(s) ? 'ok' :
    /Pending/i.test(s) ? 'warn' :
    /Cancelled/i.test(s) ? 'bad' :
    'proc'
  useEffect(() => {
    try {
      const initial = sessionStorage.getItem('orders_search_v1') || ''
      if (initial) {
        setQ(initial)
        sessionStorage.removeItem('orders_search_v1')
      }
      const saved = JSON.parse(localStorage.getItem('orders_status_v1') || '{}') || {}
      setOrders(base.map(o => ({ ...o, status: saved[o.id] || o.status })))
    } catch {}
  }, [])
  const exportCSV = () => {
    const header = ['Order ID','Customer','Email','Date','Status','Total']
    const rows = filtered.map(o => [o.id, o.name, o.email, o.date, o.status, o.total.toFixed(2)])
    const csv = [header, ...rows].map(row => row.map(x => `"${String(x).replace(/"/g,'""')}"`).join(',')).join('\n')
    const blob = new window.Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'orders.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }
  const goDetail = (order) => {
    try { sessionStorage.setItem('selected_order_v1', JSON.stringify(order)) } catch {}
    onNavigate?.('orderDetail', { id: order.id.replace('#','') })
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
        <DashSidebar onNavigate={onNavigate} open={true} active="orders" />
        <section className="dash-content">
          <div className="dash-head">
            <div className="dash-title">Orders</div>
            <div className="dash-sub">Manage and track your store’s orders</div>
          </div>
          <div className="dash-cards">
            <div className="dash-card">
              <div className="dash-card-key">Total Orders</div>
              <div className="dash-card-val">4,520</div>
            </div>
            <div className="dash-card">
              <div className="dash-card-key">Pending Orders</div>
              <div className="dash-card-val">125</div>
            </div>
            <div className="dash-card">
              <div className="dash-card-key">Completed Orders</div>
              <div className="dash-card-val">4,300</div>
            </div>
          </div>
          <div className="dash-table">
            <div className="dash-table-head">
              <div className="dash-search">
                <FiSearch />
                <input className="dash-input" placeholder="Search order ID or customer..." value={q} onChange={(e) => setQ(e.target.value)} />
              </div>
              <div className="dash-actions">
                <button className="btn-soft" onClick={() => setShowFilters(s => !s)}><FiFilter /> Filter</button>
                <button className="btn-soft" onClick={exportCSV}><FiUploadCloud /> Export</button>
              </div>
            </div>
            {showFilters && (
              <div className="p-2" style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'8px'}}>
                <div className="form-field">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option>All</option>
                    <option>Pending</option>
                    <option>Ready</option>
                    <option>Processed</option>
                    <option>Delivered</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
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
              <div>Order ID</div><div>Customer</div><div>Date</div><div>Status</div><div>Order Detail</div><div>Total</div><div>Action</div>
            </div>
            {filtered.map((o) => (
              <div key={o.id} className="dash-row">
                <div>{o.id}</div>
                <div className="dash-col-customer">
                  <div className="avatar"><img src={o.img} alt={o.name} /></div>
                  <div>
                    <div className="c-name">{o.name}</div>
                    <div className="c-email">{o.email}</div>
                  </div>
                </div>
                <div>{o.date}</div>
                <div className={`status ${statusClass(o.status)}`}>{o.status}</div>
                <div><button className="btn-soft" onClick={() => goDetail(o)}>View</button></div>
                <div>${o.total.toFixed(2)}</div>
                <div><button className="btn-soft" onClick={() => goDetail(o)}>...</button></div>
              </div>
            ))}
          </div>
          <Footer brand={brand} />
        </section>
      </main>
    </div>
  )
}
