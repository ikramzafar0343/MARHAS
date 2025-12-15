import { useEffect, useRef, useState } from 'react'
import { FiMenu, FiSearch, FiUser, FiHeart, FiShoppingCart } from 'react-icons/fi'

export default function HeaderBar({ brand = 'MARHAS', onMenuClick, onBrandClick, renderSearch, onWishlistClick, onProfileClick, onCartClick }) {
  const [solid, setSolid] = useState(false)
  const scrollRef = useRef(0)
  const readWishlistCount = () => {
    try { return (JSON.parse(localStorage.getItem('wishlist_v2') || '[]') || []).length } catch { return 0 }
  }
  const readBagCount = () => {
    try {
      const arr = (JSON.parse(localStorage.getItem('bag_v1') || '[]') || [])
      return arr.reduce((n, i) => n + Number(i.qty || 1), 0)
    } catch { return 0 }
  }
  const [wishCount, setWishCount] = useState(readWishlistCount())
  const [bagCount, setBagCount] = useState(readBagCount())
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0
      const nextSolid = y > 24
      if (nextSolid !== solid) setSolid(nextSolid)
      scrollRef.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [solid])
  useEffect(() => {
    let alive = true
    let timer = null
    const tick = () => {
      setWishCount(readWishlistCount())
      setBagCount(readBagCount())
      if (alive) timer = setTimeout(tick, 900)
    }
    timer = setTimeout(tick, 10)
    return () => { alive = false; if (timer) clearTimeout(timer) }
  }, [])
  return (
    <header className={`navbar header-bar fixed-top w-100 ${solid ? 'header-solid' : 'header-transparent'}`}>
      <div className="container-fluid">
        <div className="d-flex align-items-center gap-3">
          <button className="header-icon icon-hover" aria-label="Open menu" onClick={onMenuClick}>
            <FiMenu />
          </button>
          <span className="brand-text header-brand" role="button" tabIndex={0} onClick={onBrandClick}>{brand}</span>
        </div>
        <div className="header-right d-flex align-items-center gap-4">
          <div className="nav-search">
            {renderSearch ? renderSearch(FiSearch) : <FiSearch aria-label="Search" className="fs-5 header-icon icon-hover" role="button" tabIndex={0} />}
          </div>
          <div className="icon-holder" role="button" tabIndex={0} onClick={onWishlistClick} aria-label="Wishlist">
            <FiHeart className="fs-5 header-icon icon-hover" />
            {wishCount > 0 && <span className="icon-badge">{wishCount}</span>}
          </div>
          <FiUser aria-label="Profile" className="fs-5 header-icon icon-hover" role="button" tabIndex={0} onClick={onProfileClick} />
          <div className="icon-holder" role="button" tabIndex={0} onClick={onCartClick} aria-label="Bag">
            <FiShoppingCart className="fs-5 header-icon icon-hover" />
            {bagCount > 0 && <span className="icon-badge">{bagCount}</span>}
          </div>
        </div>
      </div>
    </header>
  )
}
