import { useState } from 'react'
import { FiSearch, FiStar, FiMail, FiLock } from 'react-icons/fi'
import { FaGoogle, FaFacebookF, FaApple, FaTwitter } from 'react-icons/fa'
import { MenuDrawer } from './HomePage.jsx'
import HeaderBar from './HeaderBar.jsx'

export default function LoginPage({ currentRoute, onNavigate, onLogin, onCreateAccount }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const brand = 'MARHAS'
  const bgLocal = '/assets/images/MENS.jfif'
  const bgFallback = '/assets/images/MENS.jfif'
  const [drawerOpen, setDrawerOpen] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const ok = email.trim().toLowerCase() === 'seller@marhas.com' && password === 'seller123'
      if (ok) {
        try {
          localStorage.setItem('auth_user_v1', JSON.stringify({ email, role: 'seller', at: Date.now() }))
        } catch {}
        onLogin?.()
      } else {
        setError('Invalid credentials. Use seller@marhas.com / seller123')
      }
    }, 1200)
  }

  return (
    <div
      className="landing position-relative"
      style={{ ['--bg-url']: `url(${bgLocal}), url(${bgFallback})` }}
    >
      <div className="overlay"></div>
      <HeaderBar
        brand={brand}
        onMenuClick={() => setDrawerOpen(true)}
        onBrandClick={() => { window.location.hash = '#/landing' }}
        onWishlistClick={() => {}}
        onProfileClick={() => {}}
        onCartClick={() => {}}
        renderSearch={() => <FiSearch aria-label="Search" className="fs-5 header-icon icon-hover" role="button" tabIndex={0} />}
      />

      <main className="h-100 d-flex align-items-center justify-content-center text-center">
        <div className="login-card anim-zoom-in">
          <div className="h4 fw-bold mb-3">WELCOME BACK</div>
          <form onSubmit={submit} className="text-start">
            <div className="mb-3">
              <div className="input-group login-input">
                <span className="input-group-text"><FiMail /></span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group login-input">
                <span className="input-group-text"><FiLock /></span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <div className="text-danger small mb-2">{error}</div>}
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-light fw-semibold rounded-pill px-4">
                {loading ? 'LOGGING IN…' : 'LOGIN'}
              </button>
            </div>
          </form>
          <div className="social-login mt-3">
            <div className="text-uppercase small mb-2 opacity-75">Or continue with</div>
            <div className="d-flex justify-content-center gap-2">
              <button className="social-btn google" type="button"><FaGoogle /></button>
              <button className="social-btn facebook" type="button"><FaFacebookF /></button>
              <button className="social-btn apple" type="button"><FaApple /></button>
              <button className="social-btn twitter" type="button"><FaTwitter /></button>
            </div>
          </div>
          <div className="d-flex justify-content-between login-actions">
            <a href="#" className="text-decoration-none" onClick={(e) => { e.preventDefault(); window.location.hash = '#/helpSupport' }}>Forgot Password?</a>
            <a href="#" className="text-decoration-none" onClick={(e) => { e.preventDefault(); onCreateAccount?.() }}>Create Account</a>
          </div>
        </div>
      </main>

      <footer className="position-absolute bottom-0 w-100 text-center text-white-50 small pb-3">
        Copyright © {new Date().getFullYear()} MARHAS. All rights reserved.
      </footer>

      <div className="corner-star">
        <FiStar />
      </div>
      <MenuDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onNavigate={onNavigate} currentRoute={currentRoute} />
    </div>
  )
}
