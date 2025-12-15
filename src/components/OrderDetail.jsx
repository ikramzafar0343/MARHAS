import { useEffect, useMemo, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import HeaderBar from './HeaderBar.jsx'
import DashSidebar from './DashSidebar.jsx'
import Footer from './Footer.jsx'

export default function OrderDetail({ onNavigate, id }) {
  const brand = 'MARHAS'
  const base = [
    { id: '#4520', name: 'Alice Freeman', email: 'alice.free@example.com', date: 'Dec 15, 2025', status: 'Processing', total: 245.00, img: '/assets/images/WOMENS.jfif', items: [{ title: 'Alpine Jacket', qty: 1, price: 145 }, { title: 'Merino Sweater', qty: 1, price: 100 }] },
    { id: '#4519', name: 'Robert Fox', email: 'robert.fox@example.com', date: 'Dec 14, 2025', status: 'Completed', total: 120.50, img: '/assets/images/MENS.jfif', items: [{ title: 'Hiking Boots', qty: 1, price: 120.5 }] },
    { id: '#4518', name: 'Darlene Robertson', email: 'darlene.rob@example.com', date: 'Dec 14, 2025', status: 'Pending', total: 89.00, img: '/assets/images/KIDS.jfif', items: [{ title: 'Leather Backpack', qty: 1, price: 89 }] },
    { id: '#4517', name: 'Jerome Bell', email: 'jerome.bell@example.com', date: 'Dec 13, 2025', status: 'Cancelled', total: 350.00, img: '/assets/images/MENS.jfif', items: [{ title: 'Smartwatch', qty: 1, price: 350 }] },
  ]
  const [order, setOrder] = useState(null)
  const [status, setStatus] = useState('')
  const [saved, setSaved] = useState(false)
  const findOrder = useMemo(() => {
    const sid = `#${String(id || '').replace(/^#?/, '')}`
    return base.find(o => o.id === sid) || (() => {
      try { return JSON.parse(sessionStorage.getItem('selected_order_v1') || 'null') || null } catch { return null }
    })()
  }, [id])
  useEffect(() => {
    const savedMap = (() => { try { return JSON.parse(localStorage.getItem('orders_status_v1') || '{}') || {} } catch { return {} } })()
    const o = findOrder
    if (!o) return
    const current = savedMap[o.id] || o.status
    setOrder({ ...o, status: current })
    setStatus(current)
  }, [findOrder])
  const save = () => {
    if (!order) return
    try {
      const m = JSON.parse(localStorage.getItem('orders_status_v1') || '{}') || {}
      m[order.id] = status
      localStorage.setItem('orders_status_v1', JSON.stringify(m))
    } catch {}
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }
  const statusClass = (s) => (/Completed|Delivered/i.test(s) ? 'ok' : /Pending|Ready|Processed/i.test(s) ? 'warn' : /Cancelled/i.test(s) ? 'bad' : 'proc')
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
          <div className="dash-head d-flex justify-content-between align-items-center">
            <div>
              <div className="dash-title">Order Detail</div>
              <div className="dash-sub">Manage order status and view items</div>
            </div>
            <div className="d-flex gap-2">
              <button className="btn-soft" onClick={() => onNavigate?.('orders')}>Back to Orders</button>
              <button className="btn-soft primary" onClick={save}>Save Status</button>
            </div>
          </div>
          {saved && <div className="mb-2" style={{fontWeight:700,color:'#27ae60'}}>Status saved</div>}
          {order && (
            <>
              <div className="dash-cards">
                <div className="dash-card">
                  <div className="dash-card-key">Order ID</div>
                  <div className="dash-card-val">{order.id}</div>
                </div>
                <div className="dash-card">
                  <div className="dash-card-key">Customer</div>
                  <div className="dash-card-val">{order.name}</div>
                </div>
                <div className="dash-card">
                  <div className="dash-card-key">Status</div>
                  <div className={`dash-card-val status ${statusClass(status)}`}>{status}</div>
                </div>
                <div className="dash-card">
                  <div className="dash-card-key">Total</div>
                  <div className="dash-card-val">${order.total.toFixed(2)}</div>
                </div>
              </div>
              <div className="dash-panels" style={{gridTemplateColumns:'1fr 1fr'}}>
                <div className="dash-panel">
                  <div className="dash-panel-head">
                    <div className="dash-panel-title">Status</div>
                  </div>
                  <div className="form-grid" style={{gridTemplateColumns:'1fr'}}>
                    <div className="form-field">
                      <label className="form-label">Update Status</label>
                      <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option>Pending</option>
                        <option>Ready</option>
                        <option>Processed</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>
                    </div>
                    <div className="d-flex gap-2">
                      <button className="btn-soft" onClick={() => setStatus('Ready')}>Mark Ready</button>
                      <button className="btn-soft" onClick={() => setStatus('Processed')}>Mark Processed</button>
                      <button className="btn-soft" onClick={() => setStatus('Delivered')}>Mark Delivered</button>
                      <button className="btn-soft" onClick={() => setStatus('Cancelled')}>Cancel</button>
                    </div>
                  </div>
                </div>
                <div className="dash-panel">
                  <div className="dash-panel-head">
                    <div className="dash-panel-title">Items</div>
                  </div>
                  <div className="dash-table-body">
                    <div className="dash-row header">
                      <div>Item</div><div>Qty</div><div>Price</div>
                    </div>
                    {order.items.map((it, i) => (
                      <div key={i} className="dash-row">
                        <div>{it.title}</div>
                        <div>{it.qty}</div>
                        <div>${it.price.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Footer brand={brand} />
            </>
          )}
        </section>
      </main>
    </div>
  )
}
