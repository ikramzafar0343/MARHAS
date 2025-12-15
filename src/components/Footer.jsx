import { useState } from 'react'
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi'
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaPinterest } from 'react-icons/fa'

export default function Footer({ brand = 'MARHAS' }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const canSubmit = String(email || '').trim().length > 0
  const onSubmit = (e) => {
    e.preventDefault()
    if (!canSubmit) return
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 4000)
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
              <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); window.location.hash = '#/productListing?cat=all' }}>Collections</a>
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
            <form className="footer-form position-relative" onSubmit={onSubmit}>
              <input
                className="footer-input"
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="footer-submit" type="submit" disabled={!canSubmit}>
                {submitted ? '✓' : '→'}
              </button>
            </form>
          </div>
        </div>
        <div className="d-flex justify-content-between mt-4 text-white-50 small">
          <div>© {new Date().getFullYear()} MARHAS. All rights reserved.</div>
          <div>Designed by MARHAS</div>
        </div>
      </div>
    </footer>
  )
}
