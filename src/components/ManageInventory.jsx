import { useMemo, useState } from 'react'
import { FiSearch, FiFilter, FiUploadCloud } from 'react-icons/fi'
import HeaderBar from './HeaderBar.jsx'
import DashSidebar from './DashSidebar.jsx'
import Footer from './Footer.jsx'

export default function ManageInventory({ onNavigate }) {
  const brand = 'MARHAS'
  const [q, setQ] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const data = [
    { name: 'Nike Air Max 270', sku: 'NK-AM-270-BLK', cat: 'Footwear', price: 145, stock: 45, status: 'Published', sales: 1240, img: '/assets/images/MENS.jfif' },
    { name: 'Sony WH-1000XM5', sku: 'SN-WH-1000-BLK', cat: 'Electronics', price: 348, stock: 12, status: 'Low Stock', sales: 856, img: '/assets/images/WOMENS.jfif' },
    { name: 'Classic Leather Backpack', sku: 'SKU-LB-CLS-BRN-01', cat: 'Accessories', price: 89, stock: 0, status: 'Out of Stock', sales: 230, img: '/assets/images/MENS.jfif' },
    { name: 'Apple Watch Series 9', sku: 'AP-WS9-MID-45', cat: 'Accessories', price: 399, stock: 89, status: 'Published', sales: 3421, img: '/assets/images/WOMENS.jfif' },
  ]
  const categories = useMemo(() => Array.from(new Set(data.map(p => p.cat))), [data])
  const statuses = useMemo(() => Array.from(new Set(data.map(p => p.status))), [data])
  const [cat, setCat] = useState('All')
  const [status, setStatus] = useState('All')
  const [stock, setStock] = useState('All') // All | In Stock | Low | Out
  const filtered = useMemo(() => {
    const byQuery = data.filter(p =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.sku.toLowerCase().includes(q.toLowerCase()))
    const byCat = cat === 'All' ? byQuery : byQuery.filter(p => p.cat === cat)
    const byStatus = status === 'All' ? byCat : byCat.filter(p => p.status === status)
    const byStock = (() => {
      if (stock === 'All') return byStatus
      if (stock === 'In Stock') return byStatus.filter(p => p.stock > 20)
      if (stock === 'Low') return byStatus.filter(p => p.stock > 0 && p.stock <= 20)
      if (stock === 'Out') return byStatus.filter(p => p.stock === 0)
      return byStatus
    })()
    return byStock
  }, [q, cat, status, stock, data])
  const exportCSV = () => {
    const header = ['Product Name','SKU','Category','Price','Stock','Status','Sales']
    const rows = filtered.map(p => [p.name, p.sku, p.cat, p.price.toFixed(2), p.stock, p.status, p.sales])
    const csv = [header, ...rows].map(row => row.map(x => `"${String(x).replace(/"/g,'""')}"`).join(',')).join('\n')
    const blob = new window.Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'inventory.csv'
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
        <DashSidebar onNavigate={onNavigate} open={true} active="manageInventory" />
        <section className="dash-content">
          <div className="dash-head d-flex justify-content-between align-items-center">
            <div>
              <div className="dash-title">Products</div>
              <div className="dash-sub">Manage your product catalog and inventory</div>
            </div>
            <div className="d-flex gap-2">
              <button className="btn-soft primary" onClick={() => onNavigate?.('addProduct')}>Add New Product</button>
            </div>
          </div>
          <div className="dash-cards">
            <div className="dash-card">
              <div className="dash-card-key">Total Products</div>
              <div className="dash-card-val">1,249</div>
            </div>
            <div className="dash-card">
              <div className="dash-card-key">Low Stock Alert</div>
              <div className="dash-card-val">12</div>
            </div>
            <div className="dash-card">
              <div className="dash-card-key">Top Category</div>
              <div className="dash-card-val">Electronics</div>
            </div>
          </div>
          <div className="dash-table">
            <div className="dash-table-head">
              <div className="dash-search">
                <FiSearch />
                <input className="dash-input" placeholder="Search by name, SKU…" value={q} onChange={(e) => setQ(e.target.value)} />
              </div>
              <div className="dash-actions">
                <button className="btn-soft" onClick={() => setShowFilters(s => !s)}><FiFilter /> Filters</button>
                <button className="btn-soft" onClick={exportCSV}><FiUploadCloud /> Export</button>
              </div>
            </div>
            {showFilters && (
              <div className="p-2" style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'8px'}}>
                <div className="form-field">
                  <label className="form-label">Category</label>
                  <select className="form-select" value={cat} onChange={(e) => setCat(e.target.value)}>
                    <option>All</option>
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option>All</option>
                    {statuses.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Stock</label>
                  <select className="form-select" value={stock} onChange={(e) => setStock(e.target.value)}>
                    <option>All</option>
                    <option>In Stock</option>
                    <option>Low</option>
                    <option>Out</option>
                  </select>
                </div>
              </div>
            )}
            <div className="dash-row header">
              <div>Product Name</div><div>Category</div><div>Price</div><div>Stock</div><div>Status</div><div>Sales</div>
            </div>
            {filtered.map((p) => (
              <div key={p.sku} className="dash-row">
                <div className="dash-col-product">
                  <div className="avatar"><img src={p.img} alt={p.name} /></div>
                  <div className="p-info">
                    <div className="p-name">{p.name}</div>
                    <div className="p-sku">SKU: {p.sku}</div>
                  </div>
                </div>
                <div>{p.cat}</div>
                <div>${p.price.toFixed(2)}</div>
                <div><span className={`stock-dot ${p.stock > 20 ? 'ok' : p.stock > 0 ? 'warn' : 'bad'}`}></span> {p.stock} in stock</div>
                <div className={`status ${/Published/i.test(p.status) ? 'ok' : /Low Stock/i.test(p.status) ? 'warn' : 'bad'}`}>{p.status}</div>
                <div>{p.sales}</div>
              </div>
            ))}
          </div>
          <Footer brand={brand} />
        </section>
      </main>
    </div>
  )
}
