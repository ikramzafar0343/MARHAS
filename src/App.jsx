import { useEffect, useState } from 'react'
import { routes } from './routes.js'
export default function App() {
  const protectedViews = new Set([
    'sellerDashboard',
    'customerDetails',
    'manageInventory',
    'storeSetting',
    'orders',
    'orderDetail',
    'shipment',
    'shipmentDetail',
    'platformPartner',
    'partnerDetail',
    'feedback',
    'helpSupport',
    'addProduct',
  ])
  const isAuthed = () => {
    try { return !!JSON.parse(localStorage.getItem('auth_user_v1') || 'null') } catch { return false }
  }
  const parseHash = () => {
    const h = window.location.hash || '#/landing'
    const parts = h.replace(/^#\/?/, '').split('?')
    const view = parts[0] || 'landing'
    const search = new URLSearchParams(parts[1] || '')
    const params = Object.fromEntries(search.entries())
    return { view, params }
  }
  const [routeState, setRouteState] = useState(parseHash())
  useEffect(() => {
    const onHash = () => {
      const next = parseHash()
      const authed = isAuthed()
      if (!authed && protectedViews.has(next.view)) {
        const hash = '#/login'
        if (window.location.hash !== hash) {
          window.location.hash = hash
          return
        } else {
          setRouteState({ view: 'login', params: {} })
        }
      } else {
        setRouteState(next)
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.addEventListener('hashchange', onHash)
    if (!window.location.hash) window.location.hash = '#/landing'
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  const navigate = (view, params = {}) => {
    const search = new URLSearchParams(params).toString()
    const hash = `#/` + view + (search ? `?${search}` : '')
    if (window.location.hash !== hash) window.location.hash = hash
    else {
      const authed = isAuthed()
      if (!authed && protectedViews.has(view)) {
        setRouteState({ view: 'login', params: {} })
        window.location.hash = '#/login'
      } else {
        setRouteState({ view, params })
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  const route = routes[routeState.view] || routes['notFound'] || routes['landing']
  const Comp = route.component
  const props = route.makeProps(navigate, routeState.view, routeState.params)
  return <Comp {...props} />
}
