import { useState } from 'react'
import { FiSearch, FiTrendingUp, FiChevronRight } from 'react-icons/fi'
import HeaderBar from './HeaderBar.jsx'
import DashSidebar from './DashSidebar.jsx'
import Footer from './Footer.jsx'

export default function SellerDashboard({ onNavigate }) {
  const brand = 'MARHAS'
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const latestOrders = [
    { id: '#2456JL', prod: 'Nike Sportswear', date: 'Jan 12, 12:23 pm', price: '$ 134.00', pay: 'Transfer', status: 'Processing' },
    { id: '#5435DF', prod: 'Acqua di Parma', date: 'May 01, 01:13 pm', price: '$ 23.00', pay: 'Credit Card', status: 'Completed' },
    { id: '#9876XC', prod: 'Allen Solly', date: 'Sep 20, 09:08 am', price: '$ 441.00', pay: 'Transfer', status: 'Completed' },
  ]
  const exportLatestOrders = () => {
    const header = ['Order ID','Product','Order Date','Price','Payment','Status']
    const rows = latestOrders.map(r => [r.id, r.prod, r.date, r.price, r.pay, r.status])
    const csv = [header, ...rows].map(row => row.map(x => `"${String(x).replace(/"/g,'""')}"`).join(',')).join('\n')
    const blob = new window.Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'latest_orders.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }
  return (
    <div className="bag-dark position-relative">
      <HeaderBar
        brand={brand}
        onMenuClick={() => setSidebarOpen(s => !s)}
        onBrandClick={() => { window.location.hash = '#/landing' }}
        onWishlistClick={() => {}}
        onProfileClick={() => {}}
        onCartClick={() => {}}
        renderSearch={() => <FiSearch aria-label="Search" className="fs-5 header-icon icon-hover" role="button" tabIndex={0} />}
      />
      <main className="dash-main">
        <DashSidebar onNavigate={onNavigate} open={sidebarOpen} active="sellerDashboard" />
        <section className="dash-content">
          <div className="dash-head">
            <div className="dash-title">Welcome back, Seller</div>
            <div className="dash-sub">Here’s your current sales overview</div>
          </div>
          <div className="dash-cards">
            <div className="dash-card dark">
              <div className="dash-card-key">AVG. Order Value</div>
              <div className="dash-card-val">$ 77.21</div>
              <div className="dash-card-trend up"><FiTrendingUp /> +3.16%</div>
            </div>
            <div className="dash-card">
              <div className="dash-card-key">Total Orders</div>
              <div className="dash-card-val">2,107</div>
              <div className="dash-card-trend down">-1.18%</div>
            </div>
            <div className="dash-card">
              <div className="dash-card-key">Lifetime Value</div>
              <div className="dash-card-val">$ 653</div>
              <div className="dash-card-trend up">+2.24%</div>
            </div>
          </div>
          <div className="dash-panels">
            <div className="dash-panel">
              <div className="dash-panel-head">
                <div className="dash-panel-title">Sales Overtime</div>
                <div className="dash-legend">
                  <span className="legend revenue">Revenue</span>
                  <span className="legend order">Order</span>
                </div>
              </div>
              <div className="dash-chart">
                <div className="chart-line revenue"></div>
                <div className="chart-line order"></div>
                <div className="chart-x">
                  <span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span>
                </div>
              </div>
            </div>
            <div className="dash-panel">
              <div className="dash-panel-head">
                <div className="dash-panel-title">Top Selling Product</div>
                <button className="btn-soft" onClick={() => onNavigate?.('manageInventory')}>See All Product</button>
              </div>
              <div className="dash-list">
                <div className="dash-list-item">
                  <div className="dash-list-thumb"><img src="/assets/images/MENS.jfif" alt="Top product" /></div>
                  <div className="dash-list-info">
                    <div className="dash-list-title">Red Tape Sports Shoes</div>
                    <div className="dash-list-meta">12,479 Sales</div>
                  </div>
                  <div className="dash-list-status ok">Available</div>
                </div>
                <div className="dash-list-item">
                  <div className="dash-list-thumb"><img src="/assets/images/WOMENS.jfif" alt="Top product" /></div>
                  <div className="dash-list-info">
                    <div className="dash-list-title">Fastrack FS1 Pro Smartwatch</div>
                    <div className="dash-list-meta">1,543 Sales</div>
                  </div>
                  <div className="dash-list-status ok">Available</div>
                </div>
                <div className="dash-list-item">
                  <div className="dash-list-thumb"><img src="/assets/images/KIDS.jfif" alt="Top product" /></div>
                  <div className="dash-list-info">
                    <div className="dash-list-title">Leriya Fashion Men’s Shirt</div>
                    <div className="dash-list-meta">7,222 Sales</div>
                  </div>
                  <div className="dash-list-status ok">Available</div>
                </div>
              </div>
            </div>
          </div>
          <div className="dash-table">
            <div className="dash-table-head">
              <div className="dash-panel-title">Latest Orders</div>
              <div className="dash-actions">
                <button className="btn-soft" onClick={() => onNavigate?.('storeSetting')}>Customize</button>
                <button className="btn-soft" onClick={() => { try { sessionStorage.setItem('orders_search_v1', 'Processing') } catch {}; onNavigate?.('orders') }}>Filter</button>
                <button className="btn-soft" onClick={exportLatestOrders}>Export</button>
              </div>
            </div>
            <div className="dash-table-body">
              <div className="dash-row header">
                <div>Order ID</div><div>Product</div><div>Order Date</div><div>Price</div><div>Payment</div><div>Status</div><div>Action</div>
              </div>
              {latestOrders.map((r) => (
                <div key={r.id} className="dash-row">
                  <div>{r.id}</div>
                  <div>{r.prod}</div>
                  <div>{r.date}</div>
                  <div>{r.price}</div>
                  <div>{r.pay}</div>
                  <div className={`status ${/Completed/i.test(r.status) ? 'ok' : 'warn'}`}>{r.status}</div>
                  <div><button className="btn-soft" onClick={() => { try { sessionStorage.setItem('orders_search_v1', r.id) } catch {}; onNavigate?.('orders') }}><FiChevronRight /></button></div>
                </div>
              ))}
            </div>
          </div>
          <Footer brand={brand} />
        </section>
      </main>
    </div>
  )
}
