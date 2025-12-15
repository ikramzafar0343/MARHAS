import { FiGrid, FiBox, FiUsers, FiShoppingBag, FiTruck, FiSettings, FiShare2, FiMessageSquare, FiHelpCircle, FiLogOut } from 'react-icons/fi'

export default function DashSidebar({ onNavigate, open = true, active }) {
  const go = (view) => {
    if (typeof onNavigate === 'function') onNavigate(view)
    else {
      const hash = `#/${view}`
      if (window.location.hash !== hash) window.location.hash = hash
      else window.location.hash = hash
    }
  }
  const logout = () => {
    try { localStorage.removeItem('auth_user_v1') } catch {}
    if (typeof onNavigate === 'function') onNavigate('login')
    else window.location.hash = '#/login'
  }
  const parseView = () => {
    if (active) return active
    const h = window.location.hash || '#/landing'
    const view = h.replace(/^#\/?/, '').split('?')[0] || 'landing'
    return view
  }
  const current = (() => {
    const v = parseView()
    return v === 'addProduct' ? 'manageInventory' : v
  })()
  return (
    <aside className={`dash-sidebar ${open ? 'open' : ''}`}>
      <nav className="dash-nav">
        <button className={`dash-nav-item ${current === 'sellerDashboard' ? 'active' : ''}`} onClick={() => go('sellerDashboard')}><FiGrid /> Overview</button>
        <button className={`dash-nav-item ${current === 'manageInventory' ? 'active' : ''}`} onClick={() => go('manageInventory')}><FiBox /> Products</button>
        <button className={`dash-nav-item ${current === 'customerDetails' ? 'active' : ''}`} onClick={() => go('customerDetails')}><FiUsers /> Customer</button>
        <button className={`dash-nav-item ${current === 'orders' ? 'active' : ''}`} onClick={() => go('orders')}><FiShoppingBag /> Orders</button>
        <button className={`dash-nav-item ${current === 'shipment' ? 'active' : ''}`} onClick={() => go('shipment')}><FiTruck /> Shipment</button>
        <button className={`dash-nav-item ${current === 'storeSetting' ? 'active' : ''}`} onClick={() => go('storeSetting')}><FiSettings /> Store Setting</button>
        <button className={`dash-nav-item ${current === 'platformPartner' ? 'active' : ''}`} onClick={() => go('platformPartner')}><FiShare2 /> Platform Partner</button>
        <button className={`dash-nav-item ${current === 'feedback' ? 'active' : ''}`} onClick={() => go('feedback')}><FiMessageSquare /> Feedback</button>
        <button className={`dash-nav-item ${current === 'helpSupport' ? 'active' : ''}`} onClick={() => go('helpSupport')}><FiHelpCircle /> Help & Support</button>
        <div className="dash-divider"></div>
        <button className="dash-nav-item" onClick={logout}><FiLogOut /> Logout</button>
      </nav>
    </aside>
  )
}
