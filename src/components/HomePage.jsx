import { useEffect, useRef, useState } from 'react'
import { FiSearch, FiHeart, FiX, FiChevronLeft, FiChevronRight, FiMapPin, FiPhone, FiMail, FiPlus, FiChevronDown, FiChevronUp, FiArrowRight, FiCheckCircle } from 'react-icons/fi'
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaPinterest } from 'react-icons/fa'
import HeaderBar from './HeaderBar.jsx'
import Footer from './Footer.jsx'

export const homepageCategories = [
  { slug: 'all', label: 'ALL' },
  { slug: 'tshirts', label: 'T-SHIRTS' },
  { slug: 'polos', label: 'POLOS' },
  { slug: 'shirts', label: 'SHIRTS' },
  { slug: 'jeans', label: 'JEANS' },
  { slug: 'trousers', label: 'TROUSERS' },
  { slug: 'footwear', label: 'FOOTWEAR' },
  { slug: 'accessories', label: 'ACCESSORIES' },
]

export const categoryProductData = {
  tshirts: {
    title: 'T-Shirts',
    lead: '/assets/images/MENS.jfif',
    description:
      'Comfortable, versatile, and effortless—T-shirts are a must-have for everyday wear. From basic essentials to statement styles, they pair perfectly with jeans, joggers, or layered looks.',
    items: [
      { title: 'Essential Cotton Tee', colors: '1 Color', fit: 'Regular Fit', gender: 'Men', originalPrice: 2499, salePrice: 1199, discount: 52, image: '/assets/images/MENS.jfif' },
      { title: 'Graphic Print Tee', colors: '2 Colors', fit: 'Regular Fit', gender: 'Men', originalPrice: 2999, salePrice: 1799, discount: 40, image: '/assets/images/MENS.jfif' },
      { title: 'Oversized Street Tee', colors: '1 Color', fit: 'Oversized', gender: 'Men', originalPrice: 3299, salePrice: 1999, discount: 39, image: '/assets/images/MENS.jfif' },
      { title: 'Heavyweight Premium Tee', colors: '3 Colors', fit: 'Regular Fit', gender: 'Men', originalPrice: 3499, salePrice: 2299, discount: 34, image: '/assets/images/MENS.jfif' },
      { title: 'Core Ribbed Tee', colors: '2 Colors', fit: 'Slim Fit', gender: 'Women', originalPrice: 2799, salePrice: 1499, discount: 46, image: '/assets/images/WOMENS.jfif' },
      { title: 'Classic Crew Tee', colors: '1 Color', fit: 'Regular Fit', gender: 'Women', originalPrice: 2499, salePrice: 1299, discount: 48, image: '/assets/images/WOMENS.jfif' },
      { title: 'Kids Soft Cotton Tee', colors: '2 Colors', fit: 'Regular Fit', gender: 'Kids', originalPrice: 1999, salePrice: 999, discount: 50, image: '/assets/images/KIDS.jfif' },
      { title: 'Sport Tech Tee', colors: '1 Color', fit: 'Athletic Fit', gender: 'Men', originalPrice: 2699, salePrice: 1499, discount: 44, image: '/assets/images/MENS.jfif' },
    ],
  },
  polos: {
    title: 'Polos',
    lead: '/assets/images/MENS.jfif',
    description: 'Timeless and polished. Polos deliver clean lines and an elevated casual look for everyday wear.',
    items: [
      { title: 'Classic Piqué Polo', colors: '2 Colors', fit: 'Regular Fit', gender: 'Men', originalPrice: 3999, salePrice: 2499, discount: 37, image: '/assets/images/MENS.jfif' },
      { title: 'Contrast Collar Polo', colors: '1 Color', fit: 'Slim Fit', gender: 'Men', originalPrice: 4199, salePrice: 2599, discount: 38, image: '/assets/images/MENS.jfif' },
      { title: 'Women Knit Polo', colors: '2 Colors', fit: 'Regular Fit', gender: 'Women', originalPrice: 4299, salePrice: 2799, discount: 35, image: '/assets/images/WOMENS.jfif' },
      { title: 'Kids Smart Polo', colors: '1 Color', fit: 'Regular Fit', gender: 'Kids', originalPrice: 2999, salePrice: 1699, discount: 43, image: '/assets/images/KIDS.jfif' },
    ],
  },
  shirts: {
    title: 'Shirts',
    lead: '/assets/images/MENS.jfif',
    description: 'Crisp, versatile, and refined—shirts for work and weekends in classic and modern fits.',
    items: [
      { title: 'Oxford Button-Down', colors: '2 Colors', fit: 'Regular Fit', gender: 'Men', originalPrice: 5499, salePrice: 3199, discount: 42, image: '/assets/images/MENS.jfif' },
      { title: 'Linen Relaxed Shirt', colors: '1 Color', fit: 'Relaxed', gender: 'Men', originalPrice: 5699, salePrice: 3399, discount: 40, image: '/assets/images/MENS.jfif' },
      { title: 'Women Satin Shirt', colors: '1 Color', fit: 'Regular Fit', gender: 'Women', originalPrice: 4999, salePrice: 2999, discount: 40, image: '/assets/images/WOMENS.jfif' },
      { title: 'Kids Cotton Shirt', colors: '1 Color', fit: 'Regular Fit', gender: 'Kids', originalPrice: 3499, salePrice: 1999, discount: 43, image: '/assets/images/KIDS.jfif' },
    ],
  },
  jeans: {
    title: 'Jeans',
    lead: '/assets/images/MENS.jfif',
    description: 'Durable, versatile denim in classic and modern fits for everyday wear.',
    items: [
      { title: 'Classic Straight Jeans', colors: '2 Colors', fit: 'Regular Fit', gender: 'Men', originalPrice: 5999, salePrice: 3499, discount: 42, image: '/assets/images/MENS.jfif' },
      { title: 'Slim Taper Jeans', colors: '1 Color', fit: 'Slim Fit', gender: 'Men', originalPrice: 6299, salePrice: 3899, discount: 38, image: '/assets/images/MENS.jfif' },
      { title: 'High-Rise Mom Jeans', colors: '1 Color', fit: 'Relaxed', gender: 'Women', originalPrice: 6499, salePrice: 3999, discount: 38, image: '/assets/images/WOMENS.jfif' },
      { title: 'Kids Stretch Jeans', colors: '1 Color', fit: 'Regular Fit', gender: 'Kids', originalPrice: 4499, salePrice: 2599, discount: 42, image: '/assets/images/KIDS.jfif' },
    ],
  },
  trousers: {
    title: 'Trousers',
    lead: '/assets/images/MENS.jfif',
    description: 'Tailored for comfort and polish, trousers elevate everyday and formal looks.',
    items: [
      { title: 'Smart Chino Trouser', colors: '2 Colors', fit: 'Regular Fit', gender: 'Men', originalPrice: 5499, salePrice: 3299, discount: 40, image: '/assets/images/MENS.jfif' },
      { title: 'Relaxed Cargo Trouser', colors: '1 Color', fit: 'Relaxed', gender: 'Men', originalPrice: 5699, salePrice: 3399, discount: 40, image: '/assets/images/MENS.jfif' },
      { title: 'Wide-Leg Trouser', colors: '1 Color', fit: 'Regular Fit', gender: 'Women', originalPrice: 4999, salePrice: 2999, discount: 40, image: '/assets/images/WOMENS.jfif' },
      { title: 'Kids School Trouser', colors: '1 Color', fit: 'Regular Fit', gender: 'Kids', originalPrice: 3499, salePrice: 1999, discount: 43, image: '/assets/images/KIDS.jfif' },
    ],
  },
  footwear: {
    title: 'Footwear',
    lead: '/assets/images/MENS.jfif',
    description:
      'Complete your look with versatile footwear—designed for comfort, support, and everyday style.',
    items: [
      { title: 'Cushion Slippers', colors: '1 Color', fit: 'Standard', gender: 'Men', originalPrice: 3999, salePrice: 2499, discount: 37, image: '/assets/images/MENS.jfif' },
      { title: 'Contrast Sole Sneaker', colors: '1 Color', fit: 'Standard', gender: 'Men', originalPrice: 4999, salePrice: 3199, discount: 36, image: '/assets/images/MENS.jfif' },
      { title: 'Contrast Trainers', colors: '2 Colors', fit: 'Standard', gender: 'Men', originalPrice: 5299, salePrice: 3499, discount: 34, image: '/assets/images/MENS.jfif' },
      { title: 'Multi-Piece Trainers', colors: '2 Colors', fit: 'Standard', gender: 'Men', originalPrice: 5499, salePrice: 3699, discount: 33, image: '/assets/images/MENS.jfif' },
      { title: 'Knit Slip-On', colors: '1 Color', fit: 'Standard', gender: 'Women', originalPrice: 4899, salePrice: 2999, discount: 39, image: '/assets/images/WOMENS.jfif' },
      { title: 'Platform Sneaker', colors: '1 Color', fit: 'Standard', gender: 'Women', originalPrice: 5199, salePrice: 3399, discount: 35, image: '/assets/images/WOMENS.jfif' },
      { title: 'Kids Velcro Sneakers', colors: '2 Colors', fit: 'Standard', gender: 'Kids', originalPrice: 3499, salePrice: 1999, discount: 43, image: '/assets/images/KIDS.jfif' },
    ],
  },
  accessories: {
    title: 'Accessories',
    lead: '/assets/images/MENS.jfif',
    description:
      'Small details, big impact—accessories add the perfect finishing touch to any outfit.',
    items: [
      { title: 'Leather Wallet', colors: '1 Color', fit: 'Standard', gender: 'Men', originalPrice: 2999, salePrice: 1799, discount: 40, image: '/assets/images/MENS.jfif' },
      { title: '3-Pack Boxers', colors: '1 Color', fit: 'Standard', gender: 'Men', originalPrice: 3499, salePrice: 1999, discount: 43, image: '/assets/images/MENS.jfif' },
      { title: 'Studded Belt', colors: '1 Color', fit: 'Standard', gender: 'Men', originalPrice: 3999, salePrice: 2399, discount: 40, image: '/assets/images/MENS.jfif' },
      { title: 'Buckle Backpack', colors: '1 Color', fit: 'Standard', gender: 'Men', originalPrice: 5999, salePrice: 3599, discount: 40, image: '/assets/images/MENS.jfif' },
      { title: 'Compact Cardholder', colors: '1 Color', fit: 'Standard', gender: 'Women', originalPrice: 2699, salePrice: 1599, discount: 41, image: '/assets/images/WOMENS.jfif' },
      { title: 'Mini Crossbody Bag', colors: '1 Color', fit: 'Standard', gender: 'Women', originalPrice: 5499, salePrice: 3299, discount: 40, image: '/assets/images/WOMENS.jfif' },
      { title: 'Kids Printed Cap', colors: '1 Color', fit: 'Standard', gender: 'Kids', originalPrice: 1999, salePrice: 1199, discount: 40, image: '/assets/images/KIDS.jfif' },
    ],
  },
}
export default function HomePage({ currentRoute, onNavigate, onProfileClick, onWishlistClick, onCartClick, onViewAll, initialGender }) {
  const brand = 'MARHAS'
  const [gender, setGender] = useState('men')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const didInitRef = useRef(false)
  useEffect(() => {
    const onRouteChangeCloseDrawer = () => setDrawerOpen(false)
    window.addEventListener('hashchange', onRouteChangeCloseDrawer)
    return () => window.removeEventListener('hashchange', onRouteChangeCloseDrawer)
  }, [])
  useEffect(() => {
    if (!didInitRef.current && initialGender) {
      didInitRef.current = true
      setGender(initialGender)
      const el = document.querySelector('.after-hero')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [initialGender])

  const suggestions = [
    { id: 'men', label: 'Men' },
    { id: 'women', label: 'Women' },
    { id: 'kids', label: 'Kids' },
    { id: 'sale', label: 'Special Prices' },
  ]
  const searchResults = suggestions.filter(s => s.label.toLowerCase().includes(searchQuery.toLowerCase()))

  // removed unused openSearch and scheduleCloseSearch
  const onSubmitSearch = (e) => {
    e.preventDefault()
    const q = String(searchQuery || '').trim()
    setSearchOpen(false)
    if (q) {
      const hash = `#/search?q=${encodeURIComponent(q)}`
      if (window.location.hash !== hash) window.location.hash = hash
      else { const withReload = hash + (hash.includes('?') ? '&' : '?') + `_r=${Date.now()}`; window.location.hash = withReload }
    }
  }

  return (
    <div className="bag-dark position-relative">
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
              <form className="nav-search-form" onSubmit={onSubmitSearch}>
                <FiSearch aria-hidden="true" />
                <input
                  className="nav-search-input"
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search products"
                />
                {searchResults.length > 0 && (
                  <div className="nav-search-results">
                    {searchResults.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        className="result-item"
                        onClick={() => {
                          const hash = `#/search?q=${encodeURIComponent(r.label)}`
                          setSearchOpen(false)
                          if (window.location.hash !== hash) window.location.hash = hash
                          else { const withReload = hash + (hash.includes('?') ? '&' : '?') + `_r=${Date.now()}`; window.location.hash = withReload }
                        }}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                )}
              </form>
            ) : (
              <FiSearch aria-label="Search" className="fs-5 header-icon icon-hover" role="button" tabIndex={0} onClick={() => setSearchOpen(true)} />
            )}
          </>
        )}
      />

      <main className="container-fluid">
        <div className="home-cats d-flex justify-content-center align-items-center gap-5">
          <a
            href="#"
            className={`home-cat-link ${gender === 'men' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setGender('men'); if (typeof onNavigate === 'function') onNavigate('productListing', { gender: 'men' }) }}
          >
            Men
          </a>
          <a
            href="#"
            className={`home-cat-link ${gender === 'women' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setGender('women'); if (typeof onNavigate === 'function') onNavigate('productListing', { gender: 'women' }) }}
          >
            Women
          </a>
          <a
            href="#"
            className={`home-cat-link ${gender === 'kids' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setGender('kids'); if (typeof onNavigate === 'function') onNavigate('productListing', { gender: 'kids' }) }}
          >
            Juniors
          </a>
        </div>
        <section
          className="home-hero-section position-relative"
          style={{
            ['--hero-url']:
              gender === 'men'
                ? "url('/assets/images/MENS.jfif')"
                : gender === 'women'
                ? "url('/assets/images/WOMENS.jfif')"
                : "url('/assets/images/KIDS.jfif')"
          }}
        >
          <div className="home-hero-overlay"></div>
          <div className="container">
            <div className="home-hero-content text-center anim-zoom-in">
              <div className="small-title mb-2">MID-SEASON SALE</div>
              <h1 className="display-title m-0">UP TO 50% OFF</h1>
              <p className="lead mt-2">Limited time offers on selected styles across collections.</p>
              <div className="d-flex justify-content-center gap-2 mt-2">
                <button
                  className="btn btn-light fw-semibold rounded-pill px-4"
                  onClick={() => {
                    const g = gender
                    if (typeof onNavigate === 'function') onNavigate('productListing', { gender: g, sale: '1', cat: 'all' })
                    else window.location.hash = `#/productListing?gender=${encodeURIComponent(g)}&sale=1&cat=all`
                  }}
                >
                  SHOP SALE
                </button>
                <button
                  className="btn btn-outline-light fw-semibold rounded-pill px-4"
                  onClick={() => {
                    const g = gender
                    if (typeof onNavigate === 'function') onNavigate('productListing', { gender: g, cat: 'all' })
                    else window.location.hash = `#/productListing?gender=${encodeURIComponent(g)}&cat=all`
                  }}
                >
                  VIEW COLLECTIONS
                </button>
              </div>
            </div>
          </div>
        </section>
        <AfterHero gender={gender} onViewAll={onViewAll} onNavigate={onNavigate} />
        <Footer brand={brand} />
      </main>

      <MenuDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={onNavigate}
        currentRoute={currentRoute}
        navData={[
          { key: 'men', label: 'Men', subs: homepageCategories.filter(c => c.slug !== 'all').map(c => c.label) },
          { key: 'women', label: 'Women', subs: homepageCategories.filter(c => c.slug !== 'all').map(c => c.label) },
          { key: 'kids', label: 'Juniors', subs: homepageCategories.filter(c => c.slug !== 'all').map(c => c.label) },
        ]}
      />
    </div>
  )
}

function CategoryTabs({ active, onChange }) {
  const tabs = [
    { id: 'tshirts', label: 'T-SHIRTS' },
    { id: 'polos', label: "POLO'S" },
    { id: 'shirts', label: 'SHIRTS' },
  ]
  return (
    <nav className="cat-tabs" aria-label="Category navigation">
      <div className="cat-tabs-inner">
        {tabs.map(t => (
          <button
            key={t.id}
            type="button"
            className={`cat-tab ${active === t.id ? 'active' : ''}`}
            onClick={() => onChange(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
    </nav>
  )
}

function BottomTabs({ active, onChange }) {
  const tabs = [
    { id: 'jeans', label: 'JEANS' },
    { id: 'trousers', label: 'TROUSERS' },
  ]
  return (
    <nav className="cat-tabs" aria-label="Category navigation">
      <div className="cat-tabs-inner">
        {tabs.map(t => (
          <button
            key={t.id}
            type="button"
            className={`cat-tab ${active === t.id ? 'active' : ''}`}
            onClick={() => onChange(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
    </nav>
  )
}

function CategoryIntro({ title, description }) {
  return (
    <section className="cat-intro">
      <div className="container">
        <h2 className="cat-title">{title}</h2>
        <p className="cat-desc">{description}</p>
      </div>
    </section>
  )
}

export function ProductCard({ item, variant, onClick }) {
  const formatPKR = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const img = item.image ||
    item.gender === 'Men'
      ? '/assets/images/MENS.jfif'
      : item.gender === 'Women'
      ? '/assets/images/WOMENS.jfif'
      : '/assets/images/KIDS.jfif'
  const isSale = Number(item.originalPrice || 0) > Number(item.salePrice || 0)
  const badgeText = isSale ? 'SALE' : 'NEW ARRIVAL'
  const addToWishlist = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('wishlist_v2') || '[]')
      const exists = saved.find((w) => String(w.title || '') === String(item.title || ''))
      if (!exists) {
        const entry = {
          id: Date.now(),
          title: item.title,
          price: Number(item.salePrice || item.originalPrice || 0),
          img,
          added: false,
        }
        saved.unshift(entry)
        localStorage.setItem('wishlist_v2', JSON.stringify(saved))
      }
    } catch {}
  }
  const addToBag = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('bag_v1') || '[]')
      const idx = saved.findIndex((b) => String(b.title || '') === String(item.title || ''))
      if (idx >= 0) {
        saved[idx].qty = Math.max(1, Number(saved[idx].qty || 1) + 1)
      } else {
        const entry = {
          id: Date.now(),
          title: item.title,
          price: Number(item.salePrice || item.originalPrice || 0),
          size: 'M',
          color: 'Black',
          img,
          qty: 1,
        }
        saved.unshift(entry)
      }
      localStorage.setItem('bag_v1', JSON.stringify(saved))
    } catch {}
  }
  return (
    <article className={`product-card ${variant === 'plp' ? 'plp' : ''}`}>
      <span className={`product-badge ${isSale ? 'sale' : 'new'}`}>{badgeText}</span>
      <div className={`product-thumb ${variant === 'plp' ? 'plp' : ''}`} onClick={onClick}>
        <img src={img} alt={item.title} />
        {variant === 'plp' ? (
          <>
            <button
              type="button"
              className="plp-wish"
              aria-label="Add to wishlist"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToWishlist() }}
            ><FiHeart /></button>
            <button
              type="button"
              className="plp-plus"
              aria-label="Add to cart"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToBag() }}
            ><FiPlus /></button>
          </>
        ) : null}
      </div>
      <div className="product-info">
        <div className="product-name">{item.title}</div>
        <div className="product-meta">{item.colors} | {item.fit} | {item.gender}</div>
        {variant === 'plp' ? (
          <div className="price-line">PKR {formatPKR(item.salePrice)}</div>
        ) : (
          <>
            <div className="price-line">PKR {formatPKR(item.salePrice)}</div>
            <div className="compare-line">
              <span className="compare">PKR {formatPKR(item.originalPrice)}</span>
              <span className="sep"> </span>
              <span className="price">PKR {formatPKR(item.salePrice)}</span>
              <span className="discount"> -{item.discount}%</span>
            </div>
          </>
        )}
      </div>
    </article>
  )
}

function EditorialCard({ image }) {
  return (
    <article className="editorial-card">
      <div className="editorial-thumb">
        <img src={image} alt="Category editorial" />
      </div>
    </article>
  )
}

function ProductGrid({ items, lead, onNavigate }) {
  const trackRef = useRef(null)
  const [itemW, setItemW] = useState(280)
  const measure = () => {
    const el = trackRef.current?.querySelector('.slider-item')
    if (el) setItemW(el.offsetWidth + 12)
  }
  const scrollByCards = (n) => {
    trackRef.current?.scrollBy({ left: n * itemW, behavior: 'smooth' })
  }
  const onCardClick = (item) => {
    try { sessionStorage.setItem('selected_product_v1', JSON.stringify(item)) } catch {}
    const slug = String(item?.title || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
    if (typeof onNavigate === 'function') onNavigate('productDetail', { id: slug })
    else {
      const hash = `#/productDetail?id=${slug}`
      if (window.location.hash !== hash) window.location.hash = hash
      else window.location.hash = hash
    }
  }
  return (
    <section className="product-grid container">
      <div className="slider-viewport" onMouseEnter={measure} onFocus={measure}>
        <div className="slider-track" ref={trackRef}>
          {lead ? <div className="slider-item editorial"><EditorialCard image={lead} /></div> : null}
          {items.map((item, idx) => (
            <div key={idx} className="slider-item">
              <ProductCard item={item} onClick={() => onCardClick(item)} />
            </div>
          ))}
        </div>
        <div className="slider-arrows">
          <button type="button" className="slider-arrow left" onClick={() => scrollByCards(-1)}>
            <FiChevronLeft />
          </button>
          <button type="button" className="slider-arrow right" onClick={() => scrollByCards(1)}>
            <FiChevronRight />
          </button>
        </div>
        <div className="slider-edges">
          <span className="edge left"></span>
          <span className="edge right"></span>
        </div>
      </div>
    </section>
  )
}

function CategoryBlock({ title, description, lead, items, slug, onNavigate, gender }) {
  const onViewAll = () => {
    const params = gender ? { cat: slug, gender } : { cat: slug }
    if (typeof onNavigate === 'function') onNavigate('productListing', params)
    else {
      const search = new URLSearchParams(params).toString()
      const hash = `#/productListing` + (search ? `?${search}` : '')
      if (window.location.hash !== hash) window.location.hash = hash
      else { const withReload = hash + (hash.includes('?') ? '&' : '?') + `_r=${Date.now()}`; window.location.hash = withReload }
    }
  }
  return (
    <section className="cat-section">
      <CategoryIntro title={title} description={description} />
      <ProductGrid items={items} lead={lead} onNavigate={onNavigate} />
      <div className="view-all-wrap text-center">
        <button type="button" className="view-all-btn" onClick={onViewAll}>
          VIEW ALL
        </button>
      </div>
    </section>
  )
}

function AfterHero({ gender, onViewAll, onNavigate }) {
  const [tab, setTab] = useState('tshirts')
  const [bottomTab, setBottomTab] = useState('jeans')
  const data = categoryProductData
  const genderLabel = gender === 'men' ? 'Men' : gender === 'women' ? 'Women' : 'Kids'
  const items = data[tab].items.filter(i => i.gender === genderLabel)
  const viewAll = () => {
    if (typeof onViewAll === 'function') {
      onViewAll(tab)
    } else {
      const hash = `#/productListing?cat=${tab}`
      if (window.location.hash !== hash) window.location.hash = hash
      else { const withReload = hash + (hash.includes('?') ? '&' : '?') + `_r=${Date.now()}`; window.location.hash = withReload }
    }
  }
  return (
    <section className="after-hero">
      <CategoryTabs active={tab} onChange={setTab} />
      <CategoryIntro title={data[tab].title} description={data[tab].description} />
      <ProductGrid
        items={items}
        lead={gender === 'men' ? '/assets/images/MENS.jfif' : gender === 'women' ? '/assets/images/WOMENS.jfif' : '/assets/images/KIDS.jfif'}
        onNavigate={onNavigate}
      />
          <div className="view-all-wrap text-center">
            <button type="button" className="view-all-btn" onClick={viewAll}>
              VIEW ALL
            </button>
          </div>
      <BottomTabs active={bottomTab} onChange={setBottomTab} />
      <CategoryBlock
        title={data[bottomTab].title}
        description={data[bottomTab].description}
        lead={gender === 'men' ? '/assets/images/MENS.jfif' : gender === 'women' ? '/assets/images/WOMENS.jfif' : '/assets/images/KIDS.jfif'}
        items={data[bottomTab].items.filter(i => i.gender === genderLabel)}
        slug={bottomTab}
        onNavigate={onNavigate}
        gender={gender}
      />
      <TilesSlider
        tiles={[
          { slug: 'polos', label: "POLO'S", image: gender === 'men' ? '/assets/images/MENS.jfif' : gender === 'women' ? '/assets/images/WOMENS.jfif' : '/assets/images/KIDS.jfif' },
          { slug: 'tshirts', label: 'T-SHIRTS', image: gender === 'men' ? '/assets/images/MENS.jfif' : gender === 'women' ? '/assets/images/WOMENS.jfif' : '/assets/images/KIDS.jfif' },
          { slug: 'shirts', label: 'SHIRTS', image: gender === 'men' ? '/assets/images/MENS.jfif' : gender === 'women' ? '/assets/images/WOMENS.jfif' : '/assets/images/KIDS.jfif' },
          { slug: 'jeans', label: 'JEANS', image: gender === 'men' ? '/assets/images/MENS.jfif' : gender === 'women' ? '/assets/images/WOMENS.jfif' : '/assets/images/KIDS.jfif' },
          { slug: 'trousers', label: 'TROUSERS', image: gender === 'men' ? '/assets/images/MENS.jfif' : gender === 'women' ? '/assets/images/WOMENS.jfif' : '/assets/images/KIDS.jfif' },
        ]}
        onNavigate={onNavigate}
      />
      <CategoryBlock
        title={data.footwear.title}
        description={data.footwear.description}
        lead={gender === 'men' ? '/assets/images/MENS.jfif' : gender === 'women' ? '/assets/images/WOMENS.jfif' : '/assets/images/KIDS.jfif'}
        items={data.footwear.items.filter(i => i.gender === genderLabel)}
        slug="footwear"
        onNavigate={onNavigate}
        gender={gender}
      />
      <FootwearBanner gender={gender} />
      <CategoryBlock
        title={data.accessories.title}
        description={data.accessories.description}
        lead={gender === 'men' ? '/assets/images/MENS.jfif' : gender === 'women' ? '/assets/images/WOMENS.jfif' : '/assets/images/KIDS.jfif'}
        items={data.accessories.items.filter(i => i.gender === genderLabel)}
        slug="accessories"
        onNavigate={onNavigate}
        gender={gender}
      />
      <NewsletterSection />
    </section>
  )
}

export const siteCategories = [
  { key: 'men', label: 'Men', subs: ['Shirts', 'Jeans', 'Trousers', 'T-Shirts', "POLO'S", 'Accessories'] },
  { key: 'women', label: 'Women', subs: ['Shirts', 'Jeans', 'Trousers', 'T-Shirts', "POLO'S", 'Accessories'] },
  { key: 'kids', label: 'Juniors', subs: ['Shirts', 'Jeans', 'Trousers', 'T-Shirts', "POLO'S", 'Accessories'] },
]

export function MenuDrawer({ open, onClose, onNavigate, currentRoute, navData }) {
  const [expanded, setExpanded] = useState({ men: true, women: true, kids: true })
  const subMap = {
    shirts: 'shirts',
    jeans: 'jeans',
    trousers: 'trousers',
    't-shirts': 'tshirts',
    "polo's": 'polos',
    accessories: 'accessories',
  }
  const safeClose = () => {
    try { if (typeof onClose === 'function') onClose() } catch {}
  }
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') safeClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])
  const go = (view, params) => {
    if (typeof onNavigate === 'function') onNavigate(view, params)
    else {
      const search = new URLSearchParams(params || {}).toString()
      const hash = `#/` + view + (search ? `?${search}` : '')
      if (window.location.hash !== hash) window.location.hash = hash
      else { const withReload = hash + (hash.includes('?') ? '&' : '?') + `_r=${Date.now()}`; window.location.hash = withReload }
    }
  }
  const categories = Array.isArray(navData) && navData.length ? navData : siteCategories
  return (
    <>
      <div className={`drawer-overlay ${open ? 'show' : ''}`} onClick={safeClose} />
      <aside
        id="menu-drawer"
        className={`menu-drawer ${open ? 'open' : ''}`}
        tabIndex={-1}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
        onKeyDown={(e) => { if (e.key === 'Escape') safeClose() }}
      >
        <div className="menu-drawer__inner-container">
          <div className="drawer-header d-flex justify-content-between align-items-center">
            <div className="h5 m-0">Menu</div>
            <button type="button" className="drawer-close" aria-label="Close" onClick={safeClose}>
              <FiX />
            </button>
          </div>
        <nav className="drawer-nav">
          <a
            className="drawer-link"
            href="#"
            onClick={(e) => { e.preventDefault(); safeClose(); go('landing') }}
            aria-current={currentRoute === 'landing' ? 'page' : undefined}
          >
            Home
          </a>
          <a
            className="drawer-link"
            href="#"
            onClick={(e) => { e.preventDefault(); safeClose(); go('productListing') }}
            aria-current={currentRoute === 'productListing' ? 'page' : undefined}
          >
            Collections
          </a>
          <a
            className="drawer-link accent"
            href="#"
            onClick={(e) => { e.preventDefault(); safeClose(); go('productListing', { cat: 'all', sale: '1' }) }}
          >
            Sale
          </a>
            {categories.map((cat) => (
              <div className="drawer-section" key={cat.key}>
                <button
                  className="drawer-section-header"
                  onClick={() => setExpanded((prev) => ({ ...prev, [cat.key]: !prev[cat.key] }))}
                  aria-expanded={expanded[cat.key] ? 'true' : 'false'}
                >
                  <span>{cat.label}</span>
                  {expanded[cat.key] ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                <div className={`drawer-subs ${expanded[cat.key] ? 'show' : ''}`}>
                  {(cat.subs || []).map((sub) => (
                    <a
                      key={sub}
                      className="drawer-sub"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        safeClose()
                        const slug = subMap[String(sub || '').toLowerCase()]
                        if (cat.key === 'men') go('home', { gender: 'men' })
                        else if (cat.key === 'women') go('home', { gender: 'women' })
                        else go('home', { gender: 'kids' })
                        if (slug) go('productListing', { cat: slug })
                      }}
                    >
                      {sub}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
}

function TilesSlider({ tiles, onNavigate }) {
  const trackRef = useRef(null)
  const [itemW, setItemW] = useState(320)
  const measure = () => {
    const el = trackRef.current?.querySelector('.tile-item')
    if (el) setItemW(el.offsetWidth + 12)
  }
  const scrollByTiles = (n) => {
    trackRef.current?.scrollBy({ left: n * itemW, behavior: 'smooth' })
  }
  const goTo = (slug) => {
    if (typeof onNavigate === 'function') onNavigate('productListing', { cat: slug })
    else {
      const hash = `#/productListing?cat=${slug}`
      if (window.location.hash !== hash) window.location.hash = hash
      else window.location.hash = hash
    }
  }
  return (
    <section className="tiles-section container">
      <div className="tiles-viewport" onMouseEnter={measure} onFocus={measure}>
        <div className="tiles-track" ref={trackRef}>
          {tiles.map((t, i) => (
            <div key={i} className="tile-item">
              <article className="tile-card" role="button" tabIndex={0} onClick={() => goTo(t.slug)}>
                <div className="tile-thumb">
                  <img src={t.image} alt={t.label} />
                </div>
                <div className="tile-label">{t.label}</div>
              </article>
            </div>
          ))}
        </div>
        <div className="tiles-arrows">
          <button type="button" className="slider-arrow left" onClick={() => scrollByTiles(-1)}>
            <FiChevronLeft />
          </button>
          <button type="button" className="slider-arrow right" onClick={() => scrollByTiles(1)}>
            <FiChevronRight />
          </button>
        </div>
      </div>
    </section>
  )
}

function FootwearBanner({ gender }) {
  const url =
    gender === 'men'
      ? "url('/assets/images/MENS.jfif')"
      : gender === 'women'
      ? "url('/assets/images/WOMENS.jfif')"
      : "url('/assets/images/KIDS.jfif')"
  return (
    <section
      className="home-hero-section position-relative"
      style={{ ['--hero-url']: url }}
    />
  )
}

function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const canSubmit = String(email || '').trim().length > 0
  const onSubmit = (e) => {
    e.preventDefault()
    if (canSubmit) {
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 4000)
    }
  }
  return (
    <section className="container text-center py-5">
      <h2 className="cat-title">Get the latest trends first</h2>
      <form className="d-flex justify-content-center mt-3" onSubmit={onSubmit}>
        <div className="position-relative" style={{ maxWidth: '420px', width: '100%' }}>
          <input
            type="email"
            className="form-control newsletter-input text-center border-0 border-bottom rounded-0"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ paddingRight: '2.5rem' }}
          />
          <button
            type="submit"
            aria-label="Submit"
            className="newsletter-submit"
            style={{ opacity: canSubmit ? 1 : 0.5, cursor: canSubmit ? 'pointer' : 'default' }}
          >
            <FiArrowRight />
          </button>
        </div>
      </form>
      {submitted && (
        <div className="mt-3 text-success fw-semibold d-flex justify-content-center align-items-center gap-2">
          <FiCheckCircle />
          <span>Thanks for subscribing</span>
        </div>
      )}
      <div className="mt-3 text-muted fw-semibold">
        <span>Facebook</span>
        <span className="mx-2">|</span>
        <span>Instagram</span>
        <span className="mx-2">|</span>
        <span>TikTok</span>
        <span className="mx-2">|</span>
        <span>YouTube</span>
        <span className="mx-2">|</span>
        <span>Pinterest</span>
      </div>
    </section>
  )
}

export function SiteFooter({ brand }) {
  const [footerEmail, setFooterEmail] = useState('')
  const [footerSubmitted, setFooterSubmitted] = useState(false)
  const footerCanSubmit = String(footerEmail || '').trim().length > 0
  const onFooterSubmit = (e) => {
    e.preventDefault()
    if (footerCanSubmit) {
      setFooterSubmitted(true)
      setFooterEmail('')
      setTimeout(() => setFooterSubmitted(false), 4000)
    }
  }
  return (
    <footer className="site-footer mt-5">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
          <div className="h4 fw-bold m-0 text-white">{brand}</div>
          <div className="d-flex gap-2 text-white">
            <a href="#" aria-label="Facebook" className="footer-icon"><FaFacebookF /></a>
            <a href="#" aria-label="Instagram" className="footer-icon"><FaInstagram /></a>
            <a href="#" aria-label="Twitter" className="footer-icon"><FaTwitter /></a>
            <a href="#" aria-label="YouTube" className="footer-icon"><FaYoutube /></a>
            <a href="#" aria-label="Pinterest" className="footer-icon"><FaPinterest /></a>
          </div>
        </div>
        <div className="row gy-4">
          <div className="col-12 col-md-3">
            <div className="fw-bold text-white-50 mb-2">Quick Links</div>
            <div className="d-grid gap-2">
              <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); window.location.hash = '#/home' }}>Home</a>
              <a href="#" className="footer-link">Collections</a>
              <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); window.location.hash = '#/home?gender=men' }}>Men</a>
              <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); window.location.hash = '#/home?gender=women' }}>Women</a>
              <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); window.location.hash = '#/home?gender=kids' }}>Juniors</a>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="fw-bold text-white-50 mb-2">Shop</div>
            <div className="d-grid gap-2">
              <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); window.location.hash = '#/productListing?cat=tshirts' }}>T-Shirts</a>
              <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); window.location.hash = '#/productListing?cat=polos' }}>Polos</a>
              <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); window.location.hash = '#/productListing?cat=shirts' }}>Shirts</a>
              <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); window.location.hash = '#/productListing?cat=jeans' }}>Jeans</a>
              <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); window.location.hash = '#/productListing?cat=trousers' }}>Trousers</a>
              <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); window.location.hash = '#/productListing?cat=footwear' }}>Footwear</a>
              <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); window.location.hash = '#/productListing?cat=accessories' }}>Accessories</a>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="fw-bold text-white-50 mb-2">Contact Us</div>
            <div className="d-grid gap-2">
              <div className="footer-contact"><FiMapPin /> <span>Karachi, Pakistan</span></div>
              <div className="footer-contact"><FiPhone /> <span>+92 000 0000000</span></div>
              <div className="footer-contact"><FiMail /> <span>support@marhas.local</span></div>
            </div>
            <div className="fw-bold text-white-50 mt-3 mb-2">Remain Updated</div>
            <form className="footer-form position-relative" onSubmit={onFooterSubmit}>
              <input
                type="email"
                className="form-control footer-input rounded-1"
                placeholder="Your email address"
                value={footerEmail}
                onChange={(e) => setFooterEmail(e.target.value)}
                style={{ paddingRight: '2.75rem' }}
              />
              <button
                type="submit"
                aria-label="Submit"
                className="footer-submit"
                style={{ opacity: footerCanSubmit ? 1 : 0.35, cursor: footerCanSubmit ? 'pointer' : 'default' }}
              >
                <FiArrowRight />
              </button>
            </form>
            {footerSubmitted && (
              <div className="text-success fw-semibold d-flex align-items-center gap-2 mt-2">
                <FiCheckCircle />
                <span>Thanks for subscribing</span>
              </div>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-4 text-white-50 small">
          <div>© {new Date().getFullYear()} {brand}. All rights reserved.</div>
          <div>Designed by {brand}</div>
        </div>
      </div>
    </footer>
  )
}
