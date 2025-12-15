import { useEffect, useMemo, useRef, useState } from 'react'
import { FiSearch, FiX, FiMinus, FiPlus, FiArrowRight } from 'react-icons/fi'
import { MenuDrawer } from './HomePage.jsx'
import Footer from './Footer.jsx'
import HeaderBar from './HeaderBar.jsx'

const baseItems = [
  { id: 1, title: 'ALPINE FIELD JACKET', price: 245, size: 'M', color: 'Olive', img: '/assets/wishlist/jacket.jpg' },
  { id: 2, title: 'TERRA HIKING BOOTS', price: 189, size: '42', color: 'Black', img: '/assets/wishlist/boots.jpg' },
  { id: 3, title: 'MERINO WOOL SWEATER', price: 120, size: 'M', color: 'Gray', img: '/assets/wishlist/sweater.jpg' },
]

export default function BagPage({ currentRoute, onNavigate, onProfileClick, onCheckout }) {
  const brand = 'MARHAS'
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const searchCloseTimer = useRef(null)
  // removed unused hoverOpenTimer
  useEffect(() => {
    const onRoute = () => setDrawerOpen(false)
    window.addEventListener('hashchange', onRoute)
    return () => window.removeEventListener('hashchange', onRoute)
  }, [])
  const [items, setItems] = useState(() => {
    const fromWishlist = (() => {
      try {
        const w = JSON.parse(localStorage.getItem('wishlist_v2') || '[]')
        return w.filter(i => i.added).map((i, idx) => ({
          id: 100 + idx,
          title: i.title,
          price: i.price,
          size: 'M',
          color: 'Black',
          img: i.img,
          qty: 1
        }))
      } catch { return [] }
    })()
    const saved = localStorage.getItem('bag_v1')
    return saved ? JSON.parse(saved) : (fromWishlist.length ? fromWishlist : baseItems.map(i => ({ ...i, qty: 1 })))
  })
  useEffect(() => {
    localStorage.setItem('bag_v1', JSON.stringify(items))
  }, [items])
  const [promo, setPromo] = useState('')
  const [discount, setDiscount] = useState(0)
  // removed unused openSearch
  const scheduleCloseSearch = (ms = 1200) => {
    clearTimeout(searchCloseTimer.current)
    searchCloseTimer.current = setTimeout(() => {
      if (!searchFocused) setSearchOpen(false)
    }, ms)
  }
  const filtered = items.filter(i => i.title.toLowerCase().includes(searchQuery.toLowerCase()))
  const subtotal = useMemo(() => filtered.reduce((sum, i) => sum + i.price * (i.qty || 1), 0), [filtered])
  const shipping = 0
  const tax = 0
  const total = Math.max(0, subtotal - discount + shipping + tax)
  const setQty = (id, delta) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, (i.qty || 1) + delta) } : i))
  }
  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id))
  const applyPromo = () => {
    const code = promo.trim().toLowerCase()
    if (code === 'save10') setDiscount(Math.round(subtotal * 0.1))
    else if (code === 'freeship') setDiscount(0)
    else setDiscount(0)
  }

  return (
    <div className="bag-dark position-relative">
      <div className="overlay"></div>
      <HeaderBar
        brand={brand}
        onMenuClick={() => setDrawerOpen(true)}
        onBrandClick={() => { window.location.hash = '#/landing' }}
        onWishlistClick={() => {}}
        onProfileClick={onProfileClick}
        onCartClick={() => {}}
        renderSearch={() => (
          <>
            {searchOpen ? (
              <form className="nav-search-form" role="search" onSubmit={(e) => { e.preventDefault(); const q = String(searchQuery || '').trim(); setSearchOpen(false); if (q) { const hash = `#/search?q=${encodeURIComponent(q)}`; if (window.location.hash !== hash) window.location.hash = hash; else { const withReload = hash + (hash.includes('?') ? '&' : '?') + `_r=${Date.now()}`; window.location.hash = withReload } } }}>
                <FiSearch aria-label="Search" className="me-2" />
                <input
                  className="nav-search-input"
                  type="text"
                  placeholder="Search bag"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => { setSearchFocused(true); clearTimeout(searchCloseTimer.current) }}
                  onBlur={() => { setSearchFocused(false); scheduleCloseSearch(600) }}
                />
              </form>
            ) : (
              <FiSearch className="fs-5 header-icon icon-hover" role="button" tabIndex={0} onClick={() => setSearchOpen(true)} />
            )}
          </>
        )}
      />
      <MenuDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onNavigate={onNavigate} currentRoute={currentRoute} />

      <main className="container-fluid bag-content">
        <div className="text-center anim-zoom-in">
          <h1 className="wish-title">YOUR BAG</h1>
          <div className="wish-count">{filtered.length} ITEMS</div>
        </div>

        <div className="row g-4">
          <div className="col-12 col-xl-8">
            <div className="bag-list">
              {filtered.map(i => (
                <div key={i.id} className="bag-item">
                  <button className="bag-remove" onClick={() => remove(i.id)}><FiX /></button>
                  <div className="bag-thumb">
                    <img src={i.img} alt={i.title} />
                  </div>
                  <div className="bag-info">
                    <div className="bag-name">{i.title}</div>
                    <div className="bag-meta">Size: {i.size}</div>
                    <div className="bag-meta">Color: {i.color}</div>
                    <div className="bag-qty d-flex align-items-center gap-3">
                      <button className="qty-btn" onClick={() => setQty(i.id, -1)}><FiMinus /></button>
                      <span className="qty">{i.qty || 1}</span>
                      <button className="qty-btn" onClick={() => setQty(i.id, 1)}><FiPlus /></button>
                    </div>
                  </div>
                  <div className="bag-price">${(i.price * (i.qty || 1)).toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 col-xl-4">
            <div className="bag-summary">
              <div className="summary-title">SUMMARY</div>
              <div className="summary-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="summary-row"><span>Estimated Shipping</span><span>Free</span></div>
              <div className="summary-row"><span>Tax</span><span>$0.00</span></div>
              {discount > 0 && <div className="summary-row"><span>Discount</span><span>-${discount.toFixed(2)}</span></div>}
              <div className="summary-divider"></div>
              <div className="summary-total"><span>TOTAL</span><span>${total.toFixed(2)}</span></div>
              <div className="d-grid my-3">
                <button className="btn btn-dark btn-lg" onClick={onCheckout}>CHECKOUT</button>
              </div>
              <div className="promo-entry d-flex align-items-center gap-2">
                <input
                  className="form-control"
                  placeholder="Enter promo code"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                />
                <button className="btn btn-outline-dark" onClick={applyPromo}><FiArrowRight /></button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer brand={brand} />
    </div>
  )
}
