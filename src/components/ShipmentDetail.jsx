import { useEffect, useMemo, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import HeaderBar from './HeaderBar.jsx'
import DashSidebar from './DashSidebar.jsx'
import Footer from './Footer.jsx'

export default function ShipmentDetail({ onNavigate, id }) {
  const brand = 'MARHAS'
  const base = [
    { sid: '#SHP-4520', oid: '#4520', name: 'Alice Freeman', email: 'alice.free@example.com', carrier: 'FedEx', status: 'In Transit', date: 'Dec 18, 2025', img: '/assets/images/WOMENS.jfif', items: [{ title: 'Alpine Jacket', qty: 1, price: 145 }, { title: 'Merino Sweater', qty: 1, price: 100 }] },
    { sid: '#SHP-4519', oid: '#4519', name: 'Robert Fox', email: 'robert.fox@example.com', carrier: 'UPS', status: 'Delivered', date: 'Dec 16, 2025', img: '/assets/images/MENS.jfif', items: [{ title: 'Hiking Boots', qty: 1, price: 120.5 }] },
    { sid: '#SHP-4518', oid: '#4518', name: 'Darlene Robertson', email: 'darlene.rob@example.com', carrier: 'DHL', status: 'Out for Delivery', date: 'Dec 15, 2025', img: '/assets/images/KIDS.jfif', items: [{ title: 'Leather Backpack', qty: 1, price: 89 }] },
    { sid: '#SHP-4517', oid: '#4517', name: 'Jerome Bell', email: 'jerome.bell@example.com', carrier: 'USPS', status: 'Exception', date: 'Dec 14, 2025', img: '/assets/images/MENS.jfif', items: [{ title: 'Smartwatch', qty: 1, price: 350 }] },
  ]
  const [shipment, setShipment] = useState(null)
  const [status, setStatus] = useState('')
  const [saved, setSaved] = useState(false)
  const findShipment = useMemo(() => {
    const sid = '#SHP-' + String(id || '').replace(/^#?SHP-?/, '')
    return base.find(r => r.sid === sid) || (() => {
      try { return JSON.parse(sessionStorage.getItem('selected_shipment_v1') || 'null') || null } catch { return null }
    })()
  }, [id])
  useEffect(() => {
    const savedMap = (() => { try { return JSON.parse(localStorage.getItem('shipments_status_v1') || '{}') || {} } catch { return {} } })()
    const sh = findShipment
    if (!sh) return
    const current = savedMap[sh.sid] || sh.status
    setShipment({ ...sh, status: current })
    setStatus(current)
  }, [findShipment])
  const save = () => {
    if (!shipment) return
    try {
      const m = JSON.parse(localStorage.getItem('shipments_status_v1') || '{}') || {}
      m[shipment.sid] = status
      localStorage.setItem('shipments_status_v1', JSON.stringify(m))
    } catch {}
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }
  const statusClass = (s) =>
    /Delivered/i.test(s) ? 'ok' :
    /Out for Delivery/i.test(s) ? 'warn' :
    /Exception|Failed/i.test(s) ? 'bad' :
    'proc'
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
          <div className="dash-head d-flex justify-content-between align-items-center">
            <div>
              <div className="dash-title">Shipment Detail</div>
              <div className="dash-sub">Update shipment status and view items</div>
            </div>
            <div className="d-flex gap-2">
              <button className="btn-soft" onClick={() => onNavigate?.('shipment')}>Back to Shipments</button>
              <button className="btn-soft primary" onClick={save}>Save Status</button>
            </div>
          </div>
          {saved && <div className="mb-2" style={{fontWeight:700,color:'#27ae60'}}>Status saved</div>}
          {shipment && (
            <>
              <div className="dash-cards">
                <div className="dash-card">
                  <div className="dash-card-key">Shipment ID</div>
                  <div className="dash-card-val">{shipment.sid}</div>
                </div>
                <div className="dash-card">
                  <div className="dash-card-key">Order ID</div>
                  <div className="dash-card-val">{shipment.oid}</div>
                </div>
                <div className="dash-card">
                  <div className="dash-card-key">Status</div>
                  <div className={`dash-card-val status ${statusClass(status)}`}>{status}</div>
                </div>
                <div className="dash-card">
                  <div className="dash-card-key">Carrier</div>
                  <div className="dash-card-val">{shipment.carrier}</div>
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
                        <option>In Transit</option>
                        <option>Out for Delivery</option>
                        <option>Delivered</option>
                        <option>Exception</option>
                      </select>
                    </div>
                    <div className="d-flex gap-2">
                      <button className="btn-soft" onClick={() => setStatus('In Transit')}>Mark In Transit</button>
                      <button className="btn-soft" onClick={() => setStatus('Out for Delivery')}>Mark Out for Delivery</button>
                      <button className="btn-soft" onClick={() => setStatus('Delivered')}>Mark Delivered</button>
                      <button className="btn-soft" onClick={() => setStatus('Exception')}>Mark Exception</button>
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
                    {shipment.items.map((it, i) => (
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
