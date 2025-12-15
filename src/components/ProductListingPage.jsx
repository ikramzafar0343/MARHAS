import { useEffect, useRef, useState } from 'react'
import { FiSearch, FiGrid, FiList, FiSliders } from 'react-icons/fi'
import { CiGrid2V } from 'react-icons/ci'
import { homepageCategories, categoryProductData, ProductCard, MenuDrawer } from './HomePage.jsx'
import Footer from './Footer.jsx'
import HeaderBar from './HeaderBar.jsx'

export default function ProductListingPage({ currentRoute, onNavigate, onProfileClick, onCartClick, _onBackToHome, onWishlistClick, onViewProduct, initialCat, initialGender, initialSale }) {
  const brand = 'MARHAS'

  const categories = homepageCategories
  const [activeCat, setActiveCat] = useState(initialCat || 'shirts')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const trackRef = useRef(null)
  const [itemW, setItemW] = useState(180)
  const [gridCols, setGridCols] = useState('auto')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const searchCloseTimer = useRef(null)
  const [openSections, setOpenSections] = useState({
    color: false,
    product: false,
    size: false,
    season: false,
    price: false,
    gender: false,
    fit: false,
    sort: false,
  })
  const toggleSection = (key) => setOpenSections(s => ({ ...s, [key]: !s[key] }))
  const [filterGender, setFilterGender] = useState('all')
  const [filterFit, setFilterFit] = useState('any')
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [sortKey, setSortKey] = useState('featured')
  useEffect(() => {
    if (initialCat) setActiveCat(initialCat)
    if (initialGender) {
      const g = String(initialGender).toLowerCase()
      setFilterGender(g === 'men' ? 'Men' : g === 'women' ? 'Women' : g === 'kids' ? 'Kids' : 'all')
    }
  }, [initialCat, initialGender])
  const measure = () => {
    const el = trackRef.current?.querySelector('.plp-cat-item')
    if (el) setItemW(el.offsetWidth + 18)
  }
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
  
  useEffect(() => { measure() }, [])
  useEffect(() => {
    const idx = categories.findIndex(c => c.slug === activeCat)
    if (idx >= 0) {
      trackRef.current?.scrollTo({ left: idx * itemW, behavior: 'smooth' })
    }
  }, [activeCat, itemW])

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
        <div className="plp-subnav">
          <div className="plp-subnav-inner container-fluid">
            <div className="plp-tabs">
              <div
                className="plp-cats-viewport"
                onMouseEnter={measure}
                onFocus={measure}
                style={{ width: `${itemW * 6}px`, maxWidth: '100%', margin: '0 auto', overflow: 'hidden' }}
              >
                <div className="plp-cats-track" ref={trackRef}>
                  {categories.map(c => (
                    <div key={c.slug} className="plp-cat-item">
                      <button
                        type="button"
                        className={`cat-tab ${activeCat === c.slug ? 'active' : ''}`}
                        onClick={() => setActiveCat(c.slug)}
                      >
                        {c.label}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="plp-tools">
              <CiGrid2V
                className={`home-icon ${gridCols === 2 ? 'active' : ''}`}
                aria-label="Two column view"
                role="button"
                tabIndex={0}
                onClick={() => setGridCols(2)}
              />
              <FiGrid
                className={`home-icon ${gridCols === 4 ? 'active' : ''}`}
                aria-label="Grid view"
                role="button"
                tabIndex={0}
                onClick={() => setGridCols(4)}
              />
              <FiList
                className={`home-icon ${gridCols === 'list' ? 'active' : ''}`}
                aria-label="List view (cards as list)"
                role="button"
                tabIndex={0}
                onClick={() => { setGridCols('list'); setFiltersOpen(true) }}
              />
              <FiSliders
                className="home-icon"
                aria-label="Filters"
                role="button"
                tabIndex={0}
                onClick={() => setFiltersOpen(true)}
              />
            </div>
          </div>
        </div>
        <section className="plp-grid container">
          <div className={`plp-grid-inner ${gridCols === 2 ? 'two-cols' : gridCols === 4 ? 'four-cols' : gridCols === 'list' ? 'list-view' : ''}`}>
            {(() => {
              const base = activeCat === 'all'
                ? Object.keys(categoryProductData).flatMap(k => categoryProductData[k].items)
                : (categoryProductData[activeCat]?.items || [])
              const filtered = base.filter(i => {
                if (initialSale) {
                  const onSale = Number(i.discount || 0) > 0
                  if (!onSale) return false
                }
                if (filterGender !== 'all' && i.gender !== filterGender) return false
                if (filterFit !== 'any' && i.fit !== filterFit) return false
                const sp = Number(i.salePrice || 0)
                if (priceMin !== '' && sp < Number(priceMin)) return false
                if (priceMax !== '' && sp > Number(priceMax)) return false
                return true
              })
              const sorted = [...filtered].sort((a, b) => {
                if (sortKey === 'price_low') return Number(a.salePrice) - Number(b.salePrice)
                if (sortKey === 'price_high') return Number(b.salePrice) - Number(a.salePrice)
                if (sortKey === 'featured') return Number(b.discount || 0) - Number(a.discount || 0)
                return 0
              })
              return sorted
            })().map((item, idx) => (
              <div key={idx} className="plp-grid-item anim-fade-up" style={{ animationDelay: `${idx * 60}ms` }}>
                <ProductCard item={item} variant="plp" onClick={() => onViewProduct?.(item)} />
              </div>
            ))}
          </div>
        </section>
        <div className={`filter-overlay ${filtersOpen ? 'show' : ''}`} onClick={() => setFiltersOpen(false)} />
        <aside className={`filter-drawer ${filtersOpen ? 'open' : ''}`} aria-hidden={!filtersOpen}>
          <div className="filter-header">
            <div className="filter-title">Filters</div>
            <button className="drawer-close" aria-label="Close" onClick={() => setFiltersOpen(false)}>×</button>
          </div>
          <div className="filter-body">
            <div className={`filter-section ${openSections.color ? 'open' : ''}`}>
              <button className="filter-section-header" type="button" onClick={() => toggleSection('color')}>Color</button>
              {openSections.color && (
              <div className="filter-section-body grid-2">
                <button className="chip">Black</button>
                <button className="chip">White</button>
                <button className="chip">Grey</button>
                <button className="chip">Blue</button>
                <button className="chip">Green</button>
                <button className="chip">Brown</button>
              </div>
              )}
            </div>
            <div className={`filter-section ${openSections.product ? 'open' : ''}`}>
              <button className="filter-section-header" type="button" onClick={() => toggleSection('product')}>Product Type</button>
              {openSections.product && (
              <div className="filter-section-body grid-2">
                <button className="chip">Shirts</button>
                <button className="chip">Jeans</button>
                <button className="chip">Trousers</button>
              </div>
              )}
            </div>
            <div className={`filter-section ${openSections.size ? 'open' : ''}`}>
              <button className="filter-section-header" type="button" onClick={() => toggleSection('size')}>Size</button>
              {openSections.size && (
              <div className="filter-section-body grid-3">
                <button className="chip">S</button>
                <button className="chip">M</button>
                <button className="chip">L</button>
                <button className="chip">XL</button>
                <button className="chip">XXL</button>
              </div>
              )}
            </div>
            <div className={`filter-section ${openSections.season ? 'open' : ''}`}>
              <button className="filter-section-header" type="button" onClick={() => toggleSection('season')}>Season</button>
              {openSections.season && (
              <div className="filter-section-body grid-2">
                <button className="chip">Summer</button>
                <button className="chip">Winter</button>
              </div>
              )}
            </div>
            <div className={`filter-section ${openSections.price ? 'open' : ''}`}>
              <button className="filter-section-header" type="button" onClick={() => toggleSection('price')}>Price</button>
              {openSections.price && (
              <div className="filter-section-body">
                <div className="price-row">
                  <input type="number" placeholder="Min" value={priceMin} onChange={e => setPriceMin(e.target.value)} />
                  <span className="dash">—</span>
                  <input type="number" placeholder="Max" value={priceMax} onChange={e => setPriceMax(e.target.value)} />
                </div>
              </div>
              )}
            </div>
            <div className={`filter-section ${openSections.gender ? 'open' : ''}`}>
              <button className="filter-section-header" type="button" onClick={() => toggleSection('gender')}>Gender</button>
              {openSections.gender && (
              <div className="filter-section-body grid-3">
                <button className={`chip ${filterGender === 'Men' ? 'active' : ''}`} onClick={() => setFilterGender('Men')}>Men</button>
                <button className={`chip ${filterGender === 'Women' ? 'active' : ''}`} onClick={() => setFilterGender('Women')}>Women</button>
                <button className={`chip ${filterGender === 'Kids' ? 'active' : ''}`} onClick={() => setFilterGender('Kids')}>Kids</button>
                <button className={`chip ${filterGender === 'all' ? 'active' : ''}`} onClick={() => setFilterGender('all')}>All</button>
              </div>
              )}
            </div>
            <div className={`filter-section ${openSections.fit ? 'open' : ''}`}>
              <button className="filter-section-header" type="button" onClick={() => toggleSection('fit')}>Fit Type</button>
              {openSections.fit && (
              <div className="filter-section-body grid-2">
                <button className={`chip ${filterFit === 'Regular Fit' ? 'active' : ''}`} onClick={() => setFilterFit('Regular Fit')}>Regular Fit</button>
                <button className={`chip ${filterFit === 'Relaxed' ? 'active' : ''}`} onClick={() => setFilterFit('Relaxed')}>Relaxed</button>
                <button className={`chip ${filterFit === 'any' ? 'active' : ''}`} onClick={() => setFilterFit('any')}>Any</button>
              </div>
              )}
            </div>
            <div className={`filter-section ${openSections.sort ? 'open' : ''}`}>
              <button className="filter-section-header" type="button" onClick={() => toggleSection('sort')}>Sort</button>
              {openSections.sort && (
              <div className="filter-section-body grid-2">
                <button className={`chip ${sortKey === 'featured' ? 'active' : ''}`} onClick={() => setSortKey('featured')}>Featured</button>
                <button className={`chip ${sortKey === 'price_low' ? 'active' : ''}`} onClick={() => setSortKey('price_low')}>Price: Low to High</button>
                <button className={`chip ${sortKey === 'price_high' ? 'active' : ''}`} onClick={() => setSortKey('price_high')}>Price: High to Low</button>
              </div>
              )}
            </div>
          </div>
          <div className="filter-actions">
            <button className="btn-soft-primary" onClick={() => setFiltersOpen(false)}>Apply Filter</button>
            <button
              className="btn-soft"
              onClick={() => {
                setFilterGender('all')
                setFilterFit('any')
                setPriceMin('')
                setPriceMax('')
                setSortKey('featured')
              }}
            >
              Clear All
            </button>
          </div>
        </aside>
      </main>
      <Footer brand={brand} />
      <MenuDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onNavigate={onNavigate} currentRoute={currentRoute} />
    </div>
  )
}
