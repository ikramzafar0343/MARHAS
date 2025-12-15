import { useEffect, useState, useRef } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'
import { MenuDrawer } from './HomePage.jsx'
import Footer from './Footer.jsx'
import HeaderBar from './HeaderBar.jsx'

const sample = [
  { id: 1, title: 'ALPINE FIELD JACKET', price: 245, img: '/assets/images/MENS.jfif', fallback: '/assets/images/MENS.jfif' },
  { id: 2, title: 'TERRA HIKING BOOTS', price: 189, img: '/assets/images/MENS.jfif', fallback: '/assets/images/MENS.jfif' },
  { id: 3, title: 'MERINO WOOL SWEATER', price: 120, img: '/assets/images/WOMENS.jfif', fallback: '/assets/images/WOMENS.jfif' },
  { id: 4, title: 'EXPEDITION BACKPACK', price: 155, img: '/assets/images/KIDS.jfif', fallback: '/assets/images/KIDS.jfif' },
]

export default function WishlistPage({ currentRoute, onNavigate, onProfileClick, _onBackToHome, onCartClick }) {
  const brand = 'MARHAS'
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('wishlist_v2')
    return saved ? JSON.parse(saved) : sample
  })
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const searchCloseTimer = useRef(null)
  // removed unused hoverOpenTimer
  const [sortOpen, setSortOpen] = useState(false)
  const [sortKey, setSortKey] = useState('recent')
  useEffect(() => {
    localStorage.setItem('wishlist_v2', JSON.stringify(items))
  }, [items])
  useEffect(() => {
    const onRoute = () => setDrawerOpen(false)
    window.addEventListener('hashchange', onRoute)
    return () => window.removeEventListener('hashchange', onRoute)
  }, [])
  const remove = (id) => setItems((prev) => prev.filter((i) => i.id !== id))
  const addToBag = (id) => {
    setItems(prev => {
      const target = prev.find(i => i.id === id)
      if (target) {
        try {
          const bag = JSON.parse(localStorage.getItem('bag_v1') || '[]') || []
          const idx = bag.findIndex(b => String(b.title || '') === String(target.title || ''))
          if (idx >= 0) {
            bag[idx].qty = Math.max(1, Number(bag[idx].qty || 1) + 1)
          } else {
            bag.unshift({
              id: Date.now(),
              title: target.title,
              price: Number(target.price || 0),
              size: 'M',
              color: 'Black',
              img: target.img,
              qty: 1,
            })
          }
          localStorage.setItem('bag_v1', JSON.stringify(bag))
        } catch {}
      }
      return prev.filter(i => i.id !== id)
    })
  }
  const count = items.length
  const filtered = searchQuery.trim()
    ? items.filter(i => i.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : items
  const sorted = [...filtered].sort((a, b) => {
    if (sortKey === 'price_low') return a.price - b.price
    if (sortKey === 'price_high') return b.price - a.price
    if (sortKey === 'alpha') return a.title.localeCompare(b.title)
    return b.id - a.id
  })
  // removed unused openSearch
  const scheduleCloseSearch = (ms = 1200) => {
    clearTimeout(searchCloseTimer.current)
    searchCloseTimer.current = setTimeout(() => {
      if (!searchFocused) setSearchOpen(false)
    }, ms)
  }

  return (
    <div className="wishlist-dark position-relative">
      <div className="overlay"></div>
      <HeaderBar
        brand={brand}
        onMenuClick={() => setDrawerOpen(true)}
        onBrandClick={() => { window.location.hash = '#/landing' }}
        onWishlistClick={() => {}}
        onProfileClick={onProfileClick}
        onCartClick={onCartClick}
        renderSearch={() => (
          <>
            {searchOpen ? (
              <form className="nav-search-form" role="search" onSubmit={(e) => { e.preventDefault(); const q = String(searchQuery || '').trim(); setSearchOpen(false); if (q) { const hash = `#/search?q=${encodeURIComponent(q)}`; if (window.location.hash !== hash) window.location.hash = hash; else { const withReload = hash + (hash.includes('?') ? '&' : '?') + `_r=${Date.now()}`; window.location.hash = withReload } } }}>
                <FiSearch aria-label="Search" className="me-2" />
                <input
                  className="nav-search-input"
                  type="text"
                  placeholder="Search wishlist"
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
      <MenuDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onNavigate={onNavigate} currentRoute={currentRoute} />

      <main className="container-fluid wishlist-content">
        <div className="text-center anim-zoom-in">
          <h1 className="wish-title">YOUR WISHLIST</h1>
          <div className="wish-count">{count} ITEMS</div>
        </div>
        <div className="wish-actions d-flex justify-content-end gap-2 mb-3">
          <div className="position-relative">
            <button className="btn btn-outline-dark btn-sm d-flex align-items-center gap-1" onClick={() => setSortOpen(o => !o)}>
              Sort
            </button>
            {sortOpen && (
              <div className="sort-menu">
                <button className="dropdown-item" onClick={() => { setSortKey('recent'); setSortOpen(false) }}>Recent</button>
                <button className="dropdown-item" onClick={() => { setSortKey('alpha'); setSortOpen(false) }}>Alphabetical</button>
                <button className="dropdown-item" onClick={() => { setSortKey('price_low'); setSortOpen(false) }}>Price: Low to High</button>
                <button className="dropdown-item" onClick={() => { setSortKey('price_high'); setSortOpen(false) }}>Price: High to Low</button>
              </div>
            )}
          </div>
          <button
            className="btn btn-dark btn-sm"
            onClick={() => {
              setItems(prev => {
                try {
                  const bag = JSON.parse(localStorage.getItem('bag_v1') || '[]') || []
                  prev.forEach(target => {
                    const idx = bag.findIndex(b => String(b.title || '') === String(target.title || ''))
                    if (idx >= 0) bag[idx].qty = Math.max(1, Number(bag[idx].qty || 1) + 1)
                    else bag.unshift({
                      id: Date.now() + (Math.random() * 1000 | 0),
                      title: target.title,
                      price: Number(target.price || 0),
                      size: 'M',
                      color: 'Black',
                      img: target.img,
                      qty: 1,
                    })
                  })
                  localStorage.setItem('bag_v1', JSON.stringify(bag))
                } catch {}
                return []
              })
            }}
          >
            Move all to Bag
          </button>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4 anim-fade-up">
          {sorted.map((item) => (
            <div key={item.id} className="col d-flex">
              <div className="wish-card h-100 d-flex flex-column">
                <button className="wish-remove" aria-label="Remove" onClick={() => remove(item.id)}>
                  <FiX />
                </button>
                <div className="wish-thumb">
                  <img src={item.img} alt={item.title} loading="lazy" onError={(e) => { if (item.fallback) e.currentTarget.src = item.fallback }} />
                </div>
                <div className="wish-info">
                  <div className="wish-name">{item.title}</div>
                  <div className="wish-price">${item.price.toFixed(2)}</div>
                </div>
                <div className="d-grid mt-auto">
                  <button
                    className={`btn ${item.added ? 'btn-dark' : 'btn-outline-dark'} btn-lg`}
                    onClick={() => addToBag(item.id)}
                  >
                    {item.added ? 'ADDED TO BAG' : 'ADD TO BAG'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer brand={brand} />
    </div>
  )
}
