import { useMemo, useState } from 'react'
import { FiSearch, FiCheckCircle } from 'react-icons/fi'
import { MenuDrawer } from './HomePage.jsx'
import Footer from './Footer.jsx'
import HeaderBar from './HeaderBar.jsx'

export default function ConfirmationPage({ currentRoute, onNavigate, onProfileClick, onWishlistClick, onCartClick, onContinue }) {
  const brand = 'MARHAS'
  const [drawerOpen, setDrawerOpen] = useState(false)
  const order = useMemo(() => {
    try {
      const saved = localStorage.getItem('last_order_v1')
      return saved ? JSON.parse(saved) : null
    } catch { return null }
  }, [])
  const items = order?.items || []
  const totals = order?.totals || { subtotal: 0, promoDiscount: 0, shipping: 0, total: 0 }
  const firstName = order?.firstName || 'Customer'
  const city = order?.city || 'City'
  const contactEmail = order?.email || ''
  const paymentLabel = order?.paymentMethod === 'card' ? 'Debit - Credit Card' : 'Cash on Delivery (COD)'
  const shipLabel = order?.shippingMethod === 'card'
    ? 'FREE SHIPPING + FBR POS FEE 1 PKR'
    : 'FLAT SHIPPING 249 PKR + FBR POS FEE 1 PKR'
  const orderId = `#${Math.random().toString(36).slice(2, 10).toUpperCase()}`
  return (
    <div className="bag-dark position-relative">
      <HeaderBar
        brand={brand}
        onMenuClick={() => setDrawerOpen(true)}
        onBrandClick={() => { window.location.hash = '#/landing' }}
        onWishlistClick={onWishlistClick}
        onProfileClick={onProfileClick}
        onCartClick={onCartClick}
        renderSearch={() => <FiSearch aria-label="Search" className="fs-5 header-icon icon-hover" role="button" tabIndex={0} />}
      />
      <main className="container-fluid oc-main">
        <div className="oc-grid">
          <section className="oc-left">
            <div className="oc-header">
              <FiCheckCircle className="oc-check" />
              <div>
                <div className="oc-conf">Confirmation {orderId}</div>
                <div className="oc-thanks">Thank you, {firstName.toUpperCase()}!</div>
              </div>
            </div>
            <div className="oc-map">
              <div className="oc-badge">
                <div className="oc-badge-title">Shipping address</div>
                <div className="oc-badge-city">{city.toUpperCase()}</div>
              </div>
              <div className="oc-map-canvas"></div>
            </div>
            <div className="oc-note">
              <div className="oc-note-title">Your order is confirmed</div>
              <div className="oc-note-sub">You'll receive a confirmation email soon</div>
            </div>
            <div className="oc-card">
              <div className="oc-card-title">Order details</div>
              <div className="oc-details">
                <div className="oc-detail-block">
                  <div className="oc-detail-title">Contact information</div>
                  <div className="oc-detail-text">{contactEmail}</div>
                </div>
                <div className="oc-detail-block">
                  <div className="oc-detail-title">Shipping address</div>
                  <div className="oc-detail-text">
                    {order?.firstName} {order?.lastName}<br />
                    {order?.address}<br />
                    {order?.city} {order?.postal}<br />
                    {order?.country}<br />
                    {order?.phone}
                  </div>
                </div>
                <div className="oc-detail-block">
                  <div className="oc-detail-title">Shipping method</div>
                  <div className="oc-detail-text">{shipLabel}</div>
                </div>
                <div className="oc-detail-block">
                  <div className="oc-detail-title">Payment method</div>
                  <div className="oc-detail-text">{paymentLabel} • PKR Rs {totals.total.toFixed(2)}</div>
                </div>
                <div className="oc-detail-block">
                  <div className="oc-detail-title">Billing address</div>
                  <div className="oc-detail-text">
                    {order?.firstName} {order?.lastName}<br />
                    {order?.address}<br />
                    {order?.city} {order?.postal}<br />
                    {order?.country}<br />
                    {order?.phone}
                  </div>
                </div>
              </div>
              <div className="d-grid my-2">
                <button className="btn-soft-primary" onClick={onContinue}>Continue shopping</button>
              </div>
              <div className="oc-links">
                <a href="#" className="footer-link">Refund policy</a>
                <a href="#" className="footer-link">Terms of service</a>
              </div>
            </div>
          </section>
          <aside className="oc-right">
            <div className="co-summary">
              <div className="co-items">
                {items.map((i) => (
                  <div key={i.id} className="co-item">
                    <div className="co-thumb"><img src={i.img} alt={i.title} /></div>
                    <div className="co-item-info">
                      <div className="co-item-title">{i.title}</div>
                      <div className="co-item-meta">{i.color} / {i.size} / Qty {i.qty || 1}</div>
                    </div>
                    <div className="co-item-price">Rs {(i.price * (i.qty || 1)).toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div className="co-lines">
                <div className="co-line"><span>Subtotal</span><span>Rs {totals.subtotal.toFixed(2)}</span></div>
                <div className="co-line"><span>Shipping</span><span>Rs {totals.shipping.toFixed(2)}</span></div>
                {totals.promoDiscount > 0 && <div className="co-line"><span>Discount</span><span>-Rs {totals.promoDiscount.toFixed(2)}</span></div>}
                <div className="co-total"><span>Total</span><span>PKR Rs {totals.total.toFixed(2)}</span></div>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer brand={brand} />
      <MenuDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onNavigate={onNavigate} currentRoute={currentRoute} />
    </div>
  )
}
