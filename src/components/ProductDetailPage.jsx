import { useRef, useState } from 'react'
import { FiSearch, FiChevronDown, FiX } from 'react-icons/fi'
import { categoryProductData, ProductCard, MenuDrawer } from './HomePage.jsx'
import Footer from './Footer.jsx'
import HeaderBar from './HeaderBar.jsx'

export default function ProductDetailPage({ currentRoute, onNavigate, onProfileClick, onCartClick, onWishlistClick, onViewProduct, id }) {
  const brand = 'MARHAS'
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const searchCloseTimer = useRef(null)
  // removed unused openSearch
  const scheduleCloseSearch = (ms = 1200) => {
    clearTimeout(searchCloseTimer.current)
    searchCloseTimer.current = setTimeout(() => {
      if (!searchFocused) setSearchOpen(false)
    }, ms)
  }
  const submitSearch = (e) => {
    e.preventDefault()
    const q = String(searchQuery || '').trim()
    setSearchOpen(false)
    if (q) {
      const hash = `#/search?q=${encodeURIComponent(q)}`
      if (window.location.hash !== hash) window.location.hash = hash
      else { const withReload = hash + (hash.includes('?') ? '&' : '?') + `_r=${Date.now()}`; window.location.hash = withReload }
    }
  }
  const slugify = (s) => String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  const allData = Object.entries(categoryProductData)
    .flatMap(([key, cat]) => cat.items.map(item => ({ ...item, __cat: key })))
  const resolved = (() => {
    if (id) {
      const found = allData.find(i => slugify(i.title) === id)
      if (found) return found
    }
    try {
      const saved = sessionStorage.getItem('selected_product_v1')
      if (saved) return JSON.parse(saved)
    } catch {}
    return categoryProductData['shirts'].items[0]
  })()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState('')
  const [drawerSection, setDrawerSection] = useState('comp')
  const sku = 'F0969/03/118-50649210'
  const sizeOptions = ['S-M', 'L-XL']
  const currentCatKey = (resolved && allData.find(i => i.title === resolved.title))?.__cat || 'shirts'
  const also = (categoryProductData[currentCatKey]?.items || [])
    .filter(i => i.title !== resolved.title)
    .slice(0, 4)
  const baseImg = (() => {
    if (resolved?.image) return resolved.image
    if (resolved?.gender === 'Men') return '/assets/images/MENS.jfif'
    if (resolved?.gender === 'Women') return '/assets/images/WOMENS.jfif'
    return '/assets/images/KIDS.jfif'
  })()
  const views = [baseImg, baseImg, baseImg]
  const [activeIdx, setActiveIdx] = useState(0)
  const onWheelImage = (e) => {
    const dir = e.deltaY > 0 ? 1 : -1
    setActiveIdx((prev) => (prev + dir + views.length) % views.length)
  }
  const touchStartRef = useRef(0)
  const onTouchStart = (e) => { touchStartRef.current = e.touches?.[0]?.clientY || 0 }
  const onTouchEnd = (e) => {
    const endY = e.changedTouches?.[0]?.clientY || 0
    const delta = endY - touchStartRef.current
    if (Math.abs(delta) > 24) {
      const dir = delta > 0 ? -1 : 1
      setActiveIdx((prev) => (prev + dir + views.length) % views.length)
    }
  }
  const addToBag = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('bag_v1') || '[]') || []
      const idx = saved.findIndex(b => String(b.title || '') === String(resolved.title || ''))
      if (idx >= 0) {
        saved[idx].qty = Math.max(1, Number(saved[idx].qty || 1) + 1)
      } else {
        saved.unshift({
          id: Date.now(),
          title: resolved.title,
          price: Number(resolved.salePrice || resolved.originalPrice || 0),
          size: selectedSize || sizeOptions[0],
          color: 'Black',
          img: baseImg,
          qty: 1,
        })
      }
      localStorage.setItem('bag_v1', JSON.stringify(saved))
    } catch {}
  }
  return (
    <div className="bag-dark position-relative">
      <HeaderBar
        brand={brand}
        onMenuClick={() => setMenuOpen(true)}
        onBrandClick={() => { window.location.hash = '#/landing' }}
        onWishlistClick={onWishlistClick}
        onProfileClick={onProfileClick}
        onCartClick={onCartClick}
        renderSearch={() => (
          <>
            {searchOpen ? (
              <form className="nav-search-form" role="search" onSubmit={submitSearch}>
                <FiSearch aria-label="Search" className="me-2" />
                <input
                  className="nav-search-input"
                  type="text"
                  placeholder="Search products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => { setSearchFocused(true); clearTimeout(searchCloseTimer.current) }}
                  onBlur={() => { setSearchFocused(false); scheduleCloseSearch(600) }}
                />
              </form>
            ) : (
              <FiSearch aria-label="Search" className="fs-5 header-icon icon-hover" role="button" tabIndex={0} onClick={() => setSearchOpen(true)} />
            )}
          </>
        )}
      />
      <main>
        <section className="pdp-main container-fluid">
          <div className="pdp-grid">
            <div className="pdp-image" onWheel={onWheelImage} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
              <img src={views[activeIdx]} alt={resolved.title} onError={(e) => { e.currentTarget.src = baseImg }} />
              <div className="pdp-thumbs">
                {views.map((src, i) => (
                  <button
                    key={i}
                    className={`pdp-thumb ${activeIdx === i ? 'active' : ''}`}
                    onClick={() => setActiveIdx(i)}
                  >
                    <img src={src} alt={`View ${i + 1}`} onError={(e) => { e.currentTarget.src = baseImg }} />
                  </button>
                ))}
              </div>
            </div>
            <div className="pdp-info">
              <h1 className="pdp-title">{resolved.title}</h1>
              <div className="pdp-sku">{sku}</div>
              <div className="pdp-price">PKR {String(resolved.salePrice).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
              <div className="pdp-desc">
                Elevate your wardrobe with our Quarter Zip-Up Shirt. Made with full sleeves and an elasticated hem, this shirt offers both style and comfort. The perfect addition to any outfit, our shirt exudes sophistication and exclusivity. Embrace the world of luxury with our premium design.
              </div>
              <div className="pdp-prop">
                <div className="pdp-prop-key">FIT</div>
                <div className="pdp-prop-val">{resolved.fit}</div>
              </div>
              <div className="pdp-prop">
                <div className="pdp-prop-key">COLORS</div>
                <div className="pdp-prop-val">
                  <span className="pdp-color-dot" />
                </div>
              </div>
              <div className="pdp-prop">
                <div className="pdp-prop-key">SIZE</div>
                <div className="pdp-prop-val">
                  {sizeOptions.map(s => (
                    <button key={s} className={`pdp-chip ${selectedSize === s ? 'active' : ''}`} onClick={() => setSelectedSize(s)}>{s}</button>
                  ))}
                </div>
              </div>
              <div className="pdp-prop">
                <div className="pdp-prop-key">GENDER</div>
                <div className="pdp-prop-val">{resolved.gender}</div>
              </div>
              <div className="pdp-actions">
                <button className="btn-soft-primary" onClick={addToBag}>Add To Basket</button>
              </div>
              <div className="pdp-accordion">
                <div className="pdp-acc-item">
                  <button className="pdp-acc-header" type="button" onClick={() => { setDrawerSection('comp'); setDrawerOpen(true) }}>
                    Product Details & Composition
                    <FiChevronDown />
                  </button>
                </div>
                <div className="pdp-acc-item">
                  <button className="pdp-acc-header" type="button" onClick={() => { setDrawerSection('delivery'); setDrawerOpen(true) }}>
                    Deliveries & Returns
                    <FiChevronDown />
                  </button>
                </div>
                <div className="pdp-acc-item">
                  <button className="pdp-acc-header" type="button" onClick={() => { setDrawerSection('returns'); setDrawerOpen(true) }}>
                    Special Return Conditions
                    <FiChevronDown />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="pdp-suggest container-fluid">
              <div className="pdp-suggest-title">You May Also Like</div>
              <div className="pdp-suggest-grid">
                {also.map((item, i) => (
                  <div key={i} className="pdp-suggest-item">
                    <ProductCard item={item} variant="plp" onClick={() => onViewProduct?.(item)} />
                  </div>
                ))}
              </div>
            </section>
            <div className={`filter-overlay ${drawerOpen ? 'show' : ''}`} onClick={() => setDrawerOpen(false)} />
            <aside className={`pdp-drawer ${drawerOpen ? 'open' : ''}`} aria-hidden={!drawerOpen}>
              <div className="pdp-drawer-header">
                <div className="pdp-drawer-title">
                  {drawerSection === 'comp' ? 'Product Details & Composition' : drawerSection === 'delivery' ? 'Deliveries & Returns' : 'Special Return Conditions'}
                </div>
                <button className="drawer-close" aria-label="Close" onClick={() => setDrawerOpen(false)}><FiX /></button>
              </div>
              <div className="pdp-drawer-body">
                {drawerSection === 'comp' && (
                  <>
                    <div className="pdp-fit-title">Fit</div>
                    <div className="pdp-fit-desc">Comfort all the way. A relaxed fit with drop shoulders that does not hug the body.</div>
                    <div className="pdp-comp-title">Composition & Care</div>
                    <ul className="pdp-comp-list">
                      <li>100% Cotton</li>
                      <li>Machine wash up to 30C/86F, gentle cycle</li>
                      <li>Do not bleach</li>
                      <li>Iron up to 110C/230F</li>
                      <li>Do not iron directly on prints/embroidery</li>
                      <li>Do not dry clean</li>
                      <li>Do not tumble dry</li>
                    </ul>
                  </>
                )}
                {drawerSection === 'delivery' && (
                  <>
                    <ul className="pdp-comp-list">
                      <li>Standard delivery within 3–5 business days</li>
                      <li>Express delivery available in selected areas</li>
                      <li>Free returns within 30 days</li>
                    </ul>
                  </>
                )}
                {drawerSection === 'returns' && (
                  <>
                    <ul className="pdp-comp-list">
                      <li>Items must be unworn and with tags</li>
                      <li>Original receipt required</li>
                      <li>Final-sale items are non-returnable</li>
                    </ul>
                  </>
                )}
              </div>
            </aside>
      </main>
      <Footer brand={brand} />
      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} onNavigate={onNavigate} currentRoute={currentRoute} />
    </div>
  )
}
