import { useMemo, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { MenuDrawer } from './HomePage.jsx'
import Footer from './Footer.jsx'
import HeaderBar from './HeaderBar.jsx'

export default function CheckoutPage({ currentRoute, onNavigate, onProfileClick, onWishlistClick, onCartClick, onOrderComplete }) {
  const brand = 'MARHAS'
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribe, setSubscribe] = useState(true)
  const [country, setCountry] = useState('Pakistan')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postal, setPostal] = useState('')
  const [phone, setPhone] = useState('')
  const [saveInfo, setSaveInfo] = useState(false)
  const [shippingMethod, setShippingMethod] = useState('cod')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [billingSame, setBillingSame] = useState(true)
  const [promo, setPromo] = useState('')
  const [appliedPromo, setAppliedPromo] = useState('')
  const bagItems = useMemo(() => {
    try {
      const saved = localStorage.getItem('bag_v1')
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  }, [])
  const subtotal = bagItems.reduce((s, i) => s + (i.price * (i.qty || 1)), 0)
  const shipping = shippingMethod === 'cod' ? 250 : 1
  const promoDiscount = appliedPromo === 'PROMO10' ? subtotal * 0.10 : 0
  const total = Math.max(0, subtotal - promoDiscount + shipping)
  const applyPromo = () => {
    setAppliedPromo(promo.trim().toUpperCase())
  }
  const completeOrder = () => {
    const order = {
      email,
      subscribe,
      country,
      firstName,
      lastName,
      address,
      city,
      postal,
      phone,
      saveInfo,
      shippingMethod,
      paymentMethod,
      billingSame,
      promo: appliedPromo,
      items: bagItems,
      totals: { subtotal, promoDiscount, shipping, total }
    }
    localStorage.setItem('last_order_v1', JSON.stringify(order))
    if (typeof onOrderComplete === 'function') onOrderComplete()
  }
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
      <main className="container-fluid co-main">
        <div className="co-grid">
          <section className="co-left">
            <div className="co-section">
              <div className="co-title">Contact</div>
              <input className="co-input" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
              <label className="co-check">
                <input type="checkbox" checked={subscribe} onChange={e => setSubscribe(e.target.checked)} />
                <span>Email me with news and offers</span>
              </label>
            </div>
            <div className="co-section">
              <div className="co-title">Delivery</div>
              <select className="co-select" value={city} onChange={e => setCity(e.target.value)}>
                <option value="">Select city from dropdown</option>
                <option>Karachi</option>
                <option>Lahore</option>
                <option>Islamabad</option>
                <option>Rawalpindi</option>
                <option>Faisalabad</option>
              </select>
              <select className="co-select" value={country} onChange={e => setCountry(e.target.value)}>
                <option>Pakistan</option>
              </select>
              <div className="co-row">
                <input className="co-input" placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                <input className="co-input" placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)} />
              </div>
              <input className="co-input" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
              <div className="co-row">
                <input className="co-input" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
                <input className="co-input" placeholder="Postal code (optional)" value={postal} onChange={e => setPostal(e.target.value)} />
              </div>
              <input className="co-input" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
              <label className="co-check">
                <input type="checkbox" checked={saveInfo} onChange={e => setSaveInfo(e.target.checked)} />
                <span>Save this information for next time</span>
              </label>
              <div className="co-subtitle">Shipping method</div>
              <div className="co-radio-group">
                <label className={`co-radio ${shippingMethod === 'cod' ? 'active' : ''}`}>
                  <input type="radio" name="ship" checked={shippingMethod === 'cod'} onChange={() => setShippingMethod('cod')} />
                  <div className="co-radio-main">
                    <div className="co-radio-title">FLAT SHIPPING 249 PKR + FBR POS FEE 1 PKR</div>
                    <div className="co-radio-sub">Cash on Delivery (COD)</div>
                  </div>
                  <div className="co-price">Rs 250.00</div>
                </label>
                <label className={`co-radio ${shippingMethod === 'card' ? 'active' : ''}`}>
                  <input type="radio" name="ship" checked={shippingMethod === 'card'} onChange={() => setShippingMethod('card')} />
                  <div className="co-radio-main">
                    <div className="co-radio-title">FREE SHIPPING + FBR POS FEE 1 PKR</div>
                    <div className="co-radio-sub">Debit - Credit Card</div>
                  </div>
                  <div className="co-price">Rs 1.00</div>
                </label>
              </div>
              <div className="co-title">Payment</div>
              <div className="co-muted">All transactions are secure and encrypted.</div>
              <div className="co-radio-group">
                <label className={`co-radio ${paymentMethod === 'cod' ? 'active' : ''}`}>
                  <input type="radio" name="pay" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                  <div className="co-radio-main">
                    <div className="co-radio-title">Cash on Delivery (COD)</div>
                  </div>
                </label>
                <label className={`co-radio ${paymentMethod === 'card' ? 'active' : ''}`}>
                  <input type="radio" name="pay" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                  <div className="co-radio-main">
                    <div className="co-radio-title">Debit - Credit Card</div>
                  </div>
                </label>
              </div>
              <div className="co-title">Billing address</div>
              <div className="co-radio-group">
                <label className={`co-radio ${billingSame ? 'active' : ''}`}>
                  <input type="radio" name="bill" checked={billingSame} onChange={() => setBillingSame(true)} />
                  <div className="co-radio-main">
                    <div className="co-radio-title">Same as shipping address</div>
                  </div>
                </label>
                <label className={`co-radio ${!billingSame ? 'active' : ''}`}>
                  <input type="radio" name="bill" checked={!billingSame} onChange={() => setBillingSame(false)} />
                  <div className="co-radio-main">
                    <div className="co-radio-title">Use a different billing address</div>
                  </div>
                </label>
              </div>
              <div className="d-grid my-3">
                <button className="btn-soft-primary btn-lg" onClick={completeOrder}>Complete order</button>
              </div>
              <div className="co-links">
                <a href="#" className="footer-link">Refund policy</a>
                <a href="#" className="footer-link">Terms of service</a>
              </div>
            </div>
          </section>
          <aside className="co-right">
            <div className="co-summary">
              <div className="co-items">
                {bagItems.map((i) => (
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
              <div className="co-code">
                <input className="co-input" placeholder="Discount code or gift card" value={promo} onChange={e => setPromo(e.target.value)} />
                <button className="btn-soft" onClick={applyPromo}>Apply</button>
              </div>
              <div className="co-lines">
                <div className="co-line"><span>Subtotal</span><span>Rs {subtotal.toFixed(2)}</span></div>
                <div className="co-line"><span>Shipping</span><span>Rs {shipping.toFixed(2)}</span></div>
                {promoDiscount > 0 && <div className="co-line"><span>Discount</span><span>-Rs {promoDiscount.toFixed(2)}</span></div>}
                <div className="co-total"><span>Total</span><span>PKR Rs {total.toFixed(2)}</span></div>
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
