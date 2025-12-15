import { useEffect, useState } from 'react'
import { routes } from './routes.js'
export default function App() {
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
      setRouteState(next)
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
      setRouteState({ view, params })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  const route = routes[routeState.view] || routes['notFound'] || routes['landing']
  const Comp = route.component
  const props = route.makeProps(navigate, routeState.view, routeState.params)
  return <Comp {...props} />
}
