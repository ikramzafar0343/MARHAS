import { useEffect, useMemo, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { categoryProductData, ProductCard, MenuDrawer } from './HomePage.jsx'
import Footer from './Footer.jsx'
import HeaderBar from './HeaderBar.jsx'

export default function SearchResultsPage({ currentRoute, onNavigate, q = '', cat, gender, onProfileClick, onWishlistClick, onCartClick, _onBackToListing, onViewProduct }) {
  const brand = 'MARHAS'
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState(q || '')
  useEffect(() => {
    const onRoute = () => setDrawerOpen(false)
    window.addEventListener('hashchange', onRoute)
    return () => window.removeEventListener('hashchange', onRoute)
  }, [])
  const submitSearch = (e) => {
    e.preventDefault()
    const val = String(searchQuery || '').trim()
    setSearchOpen(false)
    const hash = `#/search${val ? `?q=${encodeURIComponent(val)}` : ''}`
    if (window.location.hash !== hash) window.location.hash = hash
    else { const withReload = hash + (hash.includes('?') ? '&' : '?') + `_r=${Date.now()}`; window.location.hash = withReload }
  }
  const query = String(q || '').trim().toLowerCase()
  const allItems = useMemo(() =>
    Object.values(categoryProductData).flatMap(c => c.items.map(i => ({ ...i }))),
    []
  )
  const filtered = useMemo(() => {
    let base = allItems
    if (cat && categoryProductData[cat]) base = categoryProductData[cat].items
    const byQ = query
      ? base.filter(i =>
          (i.title || '').toLowerCase().includes(query) ||
          (i.colors || '').toLowerCase().includes(query) ||
          (i.fit || '').toLowerCase().includes(query) ||
          (i.gender || '').toLowerCase().includes(query))
      : base
    const byGender = gender ? byQ.filter(i => i.gender === gender) : byQ
    return byGender
  }, [query, cat, gender, allItems])
  return (
    <div className="bag-dark position-relative">
      <HeaderBar
        brand={brand}
        onMenuClick={() => setDrawerOpen(true)}
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
                  onBlur={() => setSearchOpen(false)}
                />
              </form>
            ) : (
              <FiSearch aria-label="Search" className="fs-5 header-icon icon-hover" role="button" tabIndex={0} onClick={() => setSearchOpen(true)} />
            )}
          </>
        )}
      />
      <main>
        <section className="plp-grid container">
          <div className="plp-grid-inner">
            {filtered.map((item, idx) => (
              <div key={idx} className="plp-grid-item anim-fade-up" style={{ animationDelay: `${idx * 50}ms` }}>
                <ProductCard item={item} variant="plp" onClick={() => onViewProduct?.(item)} />
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="container" style={{ padding: '24px' }}>
                No results for “{q}”
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer brand={brand} />
      <MenuDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onNavigate={onNavigate} currentRoute={currentRoute} />
    </div>
  )
}
