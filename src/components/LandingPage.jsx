import { useState, useEffect, useRef } from 'react'
import { FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { MenuDrawer } from './HomePage.jsx'
import HeaderBar from './HeaderBar.jsx'

export default function LandingPage({ currentRoute, onProfileClick, onWishlistClick, onCartClick, onNavigate }) {
  const brand = 'MARHAS'
  const leftLabel = 'SUMMER COLLECTION'
  const rightLabel = 'WINTER 25/26'
  const categoryData = [
    {
      key: 'men',
      label: 'Men',
      tagline: 'Discover the premium collection crafted for the modern aesthetic. Limited time offers on selected items.',
      subcategories: ['Shirts', 'Pants', 'Jackets'],
      bgLocal: '/assets/images/MENS.jfif',
      bgFallback: '/assets/images/MENS.jfif'
    },
    {
      key: 'women',
      label: 'Women',
      tagline: 'Explore elegant styles and exclusive deals.',
      subcategories: ['Dresses', 'Tops', 'Jeans'],
      bgLocal: '/assets/images/WOMENS.jfif',
      bgFallback: '/assets/images/WOMENS.jfif'
    },
    {
      key: 'kids',
      label: 'Kids',
      tagline: 'Fun, comfortable, and trendy outfits.',
      subcategories: ['Boys', 'Girls', 'Baby'],
      bgLocal: '/assets/images/KIDS.jfif',
      bgFallback: '/assets/images/KIDS.jfif'
    }
  ]
  const [categoryIndex, setCategoryIndex] = useState(0)
  const currentCategory = categoryData[categoryIndex]
  const [season, setSeason] = useState('sale')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const searchCloseTimer = useRef(null)
  const hoverOpenTimer = useRef(null)
  const touchStartY = useRef(0)
  const touchEndY = useRef(0)
  useEffect(() => {
    const onWheel = (e) => {
      const next = (s) => (s === 'summer' ? 'sale' : s === 'sale' ? 'winter' : 'summer')
      const prev = (s) => (s === 'winter' ? 'sale' : s === 'sale' ? 'summer' : 'winter')
      if (e.deltaY > 8) setSeason((s) => next(s))
      else if (e.deltaY < -8) setSeason((s) => prev(s))
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [])
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setDrawerOpen(false)
    }
    if (drawerOpen) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [drawerOpen])
  const searchMatches = (q) => {
    const t = q.trim().toLowerCase()
    if (!t) return []
    const results = []
    categoryData.forEach((c, idx) => {
      if (c.label.toLowerCase().includes(t)) results.push({ type: 'category', label: c.label, index: idx })
      c.subcategories.forEach((s) => {
        if (s.toLowerCase().includes(t)) results.push({ type: 'subcategory', label: `${c.label} • ${s}`, index: idx })
      })
    })
    return results.slice(0, 6)
  }
  const searchResults = searchMatches(searchQuery)
  const openSearch = () => {
    clearTimeout(searchCloseTimer.current)
    clearTimeout(hoverOpenTimer.current)
    hoverOpenTimer.current = setTimeout(() => setSearchOpen(true), 150)
  }
  const scheduleCloseSearch = (ms = 2000) => {
    clearTimeout(searchCloseTimer.current)
    searchCloseTimer.current = setTimeout(() => {
      if (!searchFocused) setSearchOpen(false)
    }, ms)
  }
  const onSubmitSearch = (e) => {
    e.preventDefault()
    if (searchResults.length > 0) {
      setCategoryIndex(searchResults[0].index)
      setSearchOpen(false)
    }
  }
  const subMap = {
    shirts: 'shirts',
    pants: 'trousers',
    jackets: 'accessories',
    dresses: 'shirts',
    tops: 'tshirts',
    jeans: 'jeans',
    boys: 'tshirts',
    girls: 'tshirts',
    baby: 'tshirts',
  }
  const nextCategory = () => setCategoryIndex((i) => (i + 1) % categoryData.length)
  const prevCategory = () => setCategoryIndex((i) => (i - 1 + categoryData.length) % categoryData.length)
  const centerTitle = season === 'winter' ? rightLabel : season === 'summer' ? leftLabel : 'SALE'
  const leftSideText = season === 'summer' ? 'SALE' : leftLabel
  const rightSideText = season === 'winter' ? 'SALE' : rightLabel
  const seasonDescription =
    season === 'winter'
      ? 'Curated winter layers, exclusive offers.'
      : season === 'summer'
      ? 'Breezy staples and light layers.'
      : 'Limited time offers on selected items.'
  const footerItems = [currentCategory.label, ...currentCategory.subcategories, 'Special Prices']

  return (
    <div
      className="landing position-relative"
      style={{ ['--bg-url']: `url(${currentCategory.bgLocal}), url(${currentCategory.bgFallback})` }}
      onTouchStart={(e) => { touchStartY.current = e.changedTouches[0].clientY }}
      onTouchEnd={(e) => {
        touchEndY.current = e.changedTouches[0].clientY
        const diff = touchEndY.current - touchStartY.current
        const next = (s) => (s === 'summer' ? 'sale' : s === 'sale' ? 'winter' : 'summer')
        const prev = (s) => (s === 'winter' ? 'sale' : s === 'sale' ? 'summer' : 'winter')
        if (Math.abs(diff) > 40) {
          if (diff > 0) setSeason((s) => next(s))
          else setSeason((s) => prev(s))
        }
      }}
    >
      <div className="overlay"></div>
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
              <form className="nav-search-form" role="search" onSubmit={onSubmitSearch}>
                <FiSearch className="me-2" />
                <input
                  className="nav-search-input"
                  type="text"
                  placeholder="Search categories"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => { setSearchFocused(true); clearTimeout(searchCloseTimer.current) }}
                  onBlur={() => { setSearchFocused(false); scheduleCloseSearch(600) }}
                />
              </form>
            ) : (
              <FiSearch aria-label="Search" className="fs-5 header-icon icon-hover" role="button" tabIndex={0} onClick={openSearch} />
            )}
            {searchOpen && searchResults.length > 0 && (
              <div className="nav-search-results">
                {searchResults.map((r) => (
                  <button
                    key={`${r.type}-${r.label}`}
                    className="result-item"
                    onMouseEnter={() => clearTimeout(searchCloseTimer.current)}
                    onClick={() => { setCategoryIndex(r.index); setSearchOpen(false) }}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      />
      <MenuDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={onNavigate}
        currentRoute={currentRoute}
        navData={categoryData.map(c => ({ key: c.key, label: c.label, subs: c.subcategories }))}
      />

      <button aria-label="Left" className="label-arrow left" onClick={prevCategory}>
        <FiChevronLeft />
      </button>
      <div className="side-label left">{leftSideText}</div>
      <div className="side-label right">{rightSideText}</div>
      <button aria-label="Right" className="label-arrow right" onClick={nextCategory}>
        <FiChevronRight />
      </button>

      <main className="h-100 d-flex align-items-center justify-content-center text-center">
        <div className="hero" key={`${currentCategory.key}-${season}`}>
          <h1 className="display-title anim-zoom-in">{centerTitle}</h1>
          <p className="lead anim-fade-up anim-delay-200">
            {seasonDescription}
          </p>
          <p className="lead anim-fade-up anim-delay-200">
            {currentCategory.tagline}
          </p>
          <div className="anim-fade-up anim-delay-400">
            <button
              className="btn btn-light btn-lg fw-semibold rounded-pill px-4"
              onClick={() => {
                const gender = currentCategory.key === 'men' ? 'men' : currentCategory.key === 'women' ? 'women' : 'kids'
                if (typeof onNavigate === 'function') onNavigate('home', { gender })
                else window.location.hash = `#/home?gender=${encodeURIComponent(gender)}`
              }}
            >
              SHOP NOW
            </button>
          </div>
        </div>
      </main>

      <footer className="position-absolute bottom-0 w-100">
        <div className="container-fluid">
          <div className="category-bar d-flex justify-content-center gap-4 text-uppercase">
            {footerItems.map((c, i) => {
              const isSpecial = /Special/i.test(c)
              const classes = `category-item ${i === 0 ? 'active' : ''} ${isSpecial ? 'accent' : ''}`
              return (
                <span
                  key={c}
                  className={classes}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    const slug = i === 0 ? null : (subMap[String(c || '').toLowerCase()] || 'shirts')
                    if (typeof onNavigate === 'function') {
                      if (slug) onNavigate('productListing', { cat: slug })
                      else onNavigate('productListing')
                    } else {
                      if (slug) window.location.hash = `#/productListing?cat=${encodeURIComponent(slug)}`
                      else window.location.hash = '#/productListing'
                    }
                  }}
                >
                  {c}
                </span>
              )
            })}
          </div>
        </div>
    
      </footer>
    </div>
  )
}
