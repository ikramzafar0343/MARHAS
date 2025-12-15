import { useState } from 'react'
import { FiSearch, FiUser, FiStar, FiMail, FiLock } from 'react-icons/fi'
import { FaGoogle, FaFacebookF, FaApple, FaTwitter } from 'react-icons/fa'
import { MenuDrawer } from './HomePage.jsx'
import HeaderBar from './HeaderBar.jsx'

export default function CreateAccount({ onCreated, onBackToLogin }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const brand = 'MARHAS'
  const bgLocal = '/assets/images/WOMENS.jfif'
  const bgFallback = '/assets/images/WOMENS.jfif'

  const submit = (e) => {
    e.preventDefault()
    if (loading) return
    if (!name || !email || !password || password !== confirm) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onCreated?.()
    }, 1400)
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
          <div className="h4 fw-bold mb-3">CREATE ACCOUNT</div>
          <form onSubmit={submit} className="text-start">
            <div className="mb-3">
              <div className="input-group login-input">
                <span className="input-group-text"><FiUser /></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
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
            <div className="mb-3">
              <div className="input-group login-input">
                <span className="input-group-text"><FiLock /></span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-light fw-semibold rounded-pill px-4">
                {loading ? 'CREATING…' : 'CREATE ACCOUNT'}
              </button>
            </div>
          </form>
          <div className="social-login mt-3">
            <div className="text-uppercase small mb-2 opacity-75">Or continue with</div>
            <div className="d-flex justify-content-center gap-2">
              <button className="social-btn" type="button"><FaGoogle /></button>
              <button className="social-btn" type="button"><FaFacebookF /></button>
              <button className="social-btn" type="button"><FaApple /></button>
              <button className="social-btn" type="button"><FaTwitter /></button>
            </div>
          </div>
          <div className="d-flex justify-content-between login-actions">
            <a href="#" className="text-decoration-none" onClick={(e) => { e.preventDefault(); onBackToLogin?.() }}>Back to Login</a>
            <span className="opacity-75">Welcome to {brand}</span>
          </div>
        </div>
      </main>

      <footer className="position-absolute bottom-0 w-100 text-center text-white-50 small pb-3">
        Copyright © {new Date().getFullYear()} MARHAS. All rights reserved.
      </footer>

      <div className="corner-star">
        <FiStar />
      </div>
      <MenuDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  )
}
