import { useMemo, useState } from 'react'
import { FiSearch, FiFilter, FiUploadCloud } from 'react-icons/fi'
import HeaderBar from './HeaderBar.jsx'
import DashSidebar from './DashSidebar.jsx'
import Footer from './Footer.jsx'

export default function CustomerDetails({ onNavigate }) {
  const brand = 'MARHAS'
  const [q, setQ] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [status, setStatus] = useState('All')
  const [minOrders, setMinOrders] = useState(0)
  const [spendMin, setSpendMin] = useState(0)
  const customers = [
    { name: 'Alice Freeman', email: 'alice.free@example.com', phone: '(205) 555-0100', orders: 14, spend: 2400.5, status: 'Active', join: 'Jan 12, 2023' },
    { name: 'Robert Fox', email: 'robert.fox@example.com', phone: '(201) 555-0124', orders: 45, spend: 12890.0, status: 'Active', join: 'Dec 04, 2022' },
    { name: 'Darlene Robertson', email: 'darlene.rob@example.com', phone: '(302) 555-0107', orders: 2, spend: 154.5, status: 'Inactive', join: 'Mar 23, 2023' },
    { name: 'Jerome Bell', email: 'jerome.bell@example.com', phone: '(229) 555-0109', orders: 28, spend: 4320.0, status: 'Active', join: 'Feb 11, 2023' },
  ]
  const filtered = useMemo(() => {
    const s = q.toLowerCase()
    const byQuery = customers.filter(c => c.name.toLowerCase().includes(s) || c.email.toLowerCase().includes(s))
    const byStatus = status === 'All' ? byQuery : byQuery.filter(c => String(c.status).toLowerCase() === String(status).toLowerCase())
    const byOrders = byStatus.filter(c => c.orders >= Number(minOrders || 0))
    const bySpend = byOrders.filter(c => c.spend >= Number(spendMin || 0))
    return bySpend
  }, [q, status, minOrders, spendMin])
  const exportCSV = () => {
    const header = ['Name','Email','Phone','Orders','Total Spend','Status','Join Date']
    const rows = filtered.map(c => [c.name, c.email, c.phone, c.orders, c.spend.toFixed(2), c.status, c.join])
    const csv = [header, ...rows].map(row => row.map(x => `"${String(x).replace(/"/g,'""')}"`).join(',')).join('\n')
    const blob = new window.Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'customers.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
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
        <DashSidebar onNavigate={onNavigate} open={true} active="customerDetails" />
        <section className="dash-content">
          <div className="dash-head">
            <div className="dash-title">Customers</div>
            <div className="dash-sub">Manage your customer base and detailed profiles</div>
          </div>
          <div className="dash-cards">
            <div className="dash-card">
              <div className="dash-card-key">Total Customers</div>
              <div className="dash-card-val">24,592</div>
            </div>
            <div className="dash-card">
              <div className="dash-card-key">Active Members</div>
              <div className="dash-card-val">18,200</div>
            </div>
            <div className="dash-card">
              <div className="dash-card-key">New This Month</div>
              <div className="dash-card-val">1,492</div>
            </div>
          </div>
          <div className="dash-table">
            <div className="dash-table-head">
              <div className="dash-search">
                <FiSearch />
                <input className="dash-input" placeholder="Search customer..." value={q} onChange={(e) => setQ(e.target.value)} />
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
                  <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option>All</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Min Orders</label>
                  <input className="form-input" type="number" min="0" value={minOrders} onChange={(e) => setMinOrders(Number(e.target.value || 0))} />
                </div>
                <div className="form-field">
                  <label className="form-label">Min Spend</label>
                  <input className="form-input" type="number" min="0" step="0.01" value={spendMin} onChange={(e) => setSpendMin(Number(e.target.value || 0))} />
                </div>
              </div>
            )}
            <div className="dash-row header">
              <div>Customer</div><div>Phone</div><div>Orders</div><div>Total Spend</div><div>Status</div><div>Join Date</div>
            </div>
            {filtered.map((c) => (
              <div key={c.email} className="dash-row">
                <div className="dash-col-customer">
                  <div className="avatar"><img src="/assets/images/MENS.jfif" alt={c.name} /></div>
                  <div className="c-info">
                    <div className="c-name">{c.name}</div>
                    <div className="c-email">{c.email}</div>
                  </div>
                </div>
                <div>{c.phone}</div>
                <div>{c.orders} orders</div>
                <div>${c.spend.toFixed(2)}</div>
                <div className={`status ${/Active/i.test(c.status) ? 'ok' : 'warn'}`}>{c.status}</div>
                <div>{c.join}</div>
              </div>
            ))}
          </div>
          <Footer brand={brand} />
        </section>
      </main>
    </div>
  )
}
