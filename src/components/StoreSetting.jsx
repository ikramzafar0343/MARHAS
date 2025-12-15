import { useEffect, useRef, useState } from 'react'
import { FiSearch, FiSettings, FiCreditCard, FiTruck, FiUser } from 'react-icons/fi'
import HeaderBar from './HeaderBar.jsx'
import DashSidebar from './DashSidebar.jsx'
import Footer from './Footer.jsx'

export default function StoreSetting({ onNavigate }) {
  const brand = 'MARHAS'
  const [tab, setTab] = useState('general')
  const defaultForm = {
    name: 'MARHAS Store',
    description: 'Official MARHAS online store for fashion and accessories.',
    address: '123 Commerce St, Suite 101, Lahore, PK',
    email: 'support@marhas.com',
    phone: '+92 300 1234567',
    currency: 'PKR (₨)',
    timezone: '(GMT+05:00) Pakistan Standard Time',
    logo: '',
    codEnabled: true,
    cardEnabled: false,
    stripeKey: '',
    paypalClientId: '',
    defaultShipMethod: 'Flat rate',
    flatRate: 249,
    shippingZones: [
      { label: 'Pakistan', code: 'PK', rate: 249 },
    ],
  }
  const [form, setForm] = useState(defaultForm)
  const setField = (k, v) => setForm(prev => ({ ...prev, [k]: v }))
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef(null)
  const onPickLogo = () => fileRef.current?.click()
  const onLogoFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new window.FileReader()
    reader.onload = () => setField('logo', String(reader.result || ''))
    reader.readAsDataURL(file)
  }
  const importRef = useRef(null)
  const onPickImport = () => importRef.current?.click()
  const onImportFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new window.FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result || '{}'))
        setForm({
          name: String(data.name || defaultForm.name),
          description: String(data.description || defaultForm.description),
          address: String(data.address || defaultForm.address),
          email: String(data.email || defaultForm.email),
          phone: String(data.phone || defaultForm.phone),
          currency: String(data.currency || defaultForm.currency),
          timezone: String(data.timezone || defaultForm.timezone),
          logo: String(data.logo || ''),
          codEnabled: Boolean(data.codEnabled ?? defaultForm.codEnabled),
          cardEnabled: Boolean(data.cardEnabled ?? defaultForm.cardEnabled),
          stripeKey: String(data.stripeKey || ''),
          paypalClientId: String(data.paypalClientId || ''),
          defaultShipMethod: String(data.defaultShipMethod || defaultForm.defaultShipMethod),
          flatRate: Number(data.flatRate ?? defaultForm.flatRate),
          shippingZones: Array.isArray(data.shippingZones) ? data.shippingZones.map(z => ({
            label: String(z.label || ''),
            code: String(z.code || ''),
            rate: Number(z.rate || 0),
          })) : defaultForm.shippingZones,
        })
        setError('')
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      } catch {
        setError('Invalid JSON file')
      }
    }
    reader.readAsText(file)
  }
  const [zoneName, setZoneName] = useState('')
  const [zoneRate, setZoneRate] = useState(0)
  const addZone = () => {
    if (!zoneName) return
    setForm(prev => ({ ...prev, shippingZones: [...prev.shippingZones, { label: zoneName, code: zoneName.slice(0,2).toUpperCase(), rate: Number(zoneRate || 0) }] }))
    setZoneName('')
    setZoneRate(0)
  }
  const removeZone = (i) => {
    setForm(prev => ({ ...prev, shippingZones: prev.shippingZones.filter((_, idx) => idx !== i) }))
  }
  const validate = () => {
    const issues = []
    if (!form.name.trim()) issues.push('Store name is required')
    if (!form.email.trim() || !/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(form.email)) issues.push('Valid contact email is required')
    if (!form.currency.trim()) issues.push('Currency is required')
    if (!form.timezone.trim()) issues.push('Timezone is required')
    return issues
  }
  const save = () => {
    const issues = validate()
    if (issues.length) {
      setError(issues[0])
      return
    }
    try {
      localStorage.setItem('store_settings_v1', JSON.stringify(form))
      setError('')
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {
      setError('Failed to save settings')
    }
  }
  const loadSaved = () => {
    try {
      const savedStr = localStorage.getItem('store_settings_v1')
      if (!savedStr) {
        setError('No saved settings found')
        return
      }
      const data = JSON.parse(savedStr)
      setForm(data)
      setError('')
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {
      setError('Failed to load settings')
    }
  }
  const reset = () => {
    setForm(defaultForm)
    setError('')
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }
  const exportJson = () => {
    try {
      const blob = new window.Blob([JSON.stringify(form, null, 2)], { type: 'application/json' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'store_settings.json'
      a.click()
      window.URL.revokeObjectURL(url)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {
      setError('Failed to export settings')
    }
  }
  useEffect(() => {
    try {
      const savedStr = localStorage.getItem('store_settings_v1')
      if (savedStr) {
        const data = JSON.parse(savedStr)
        setForm(data)
      }
      const pref = sessionStorage.getItem('store_settings_tab')
      if (pref) setTab(pref)
    } catch {}
  }, [])
  return (
    <div className="bag-dark position-relative">
      <HeaderBar
        brand={brand}
        onMenuClick={() => {}}
        onBrandClick={() => { window.location.hash = '#/landing' }}
        onWishlistClick={() => {}}
        onProfileClick={() => {}}
        onCartClick={() => {}}
        renderSearch={() => <FiSearch aria-label="Search" className="fs-5 header-icon icon-hover" role="button" tabIndex={0} />}
      />
      <main className="dash-main">
        <DashSidebar onNavigate={onNavigate} open={true} active="storeSetting" />
        <section className="dash-content">
          <div className="dash-head">
            <div className="dash-title">Store Settings</div>
            <div className="dash-sub">Manage your store details and configuration</div>
          </div>
          <div className="settings-tabs">
            <button className={`settings-tab ${tab === 'general' ? 'active' : ''}`} onClick={() => setTab('general')}><FiSettings /> General</button>
            <button className={`settings-tab ${tab === 'payment' ? 'active' : ''}`} onClick={() => setTab('payment')}><FiCreditCard /> Payment</button>
            <button className={`settings-tab ${tab === 'shipping' ? 'active' : ''}`} onClick={() => setTab('shipping')}><FiTruck /> Shipping</button>
            <button className={`settings-tab ${tab === 'account' ? 'active' : ''}`} onClick={() => setTab('account')}><FiUser /> Account</button>
          </div>
          <div className="settings-card">
            {saved && <div className="mb-2" style={{fontWeight:700,color:'#27ae60'}}>Saved</div>}
            {error && <div className="mb-2" style={{fontWeight:700,color:'#e74c3c'}}>{error}</div>}
            {tab === 'general' && (
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">Store Name</label>
                  <input className="form-input" value={form.name} onChange={(e) => setField('name', e.target.value)} />
                </div>
                <div className="form-field">
                  <label className="form-label">Store Description</label>
                  <input className="form-input" value={form.description} onChange={(e) => setField('description', e.target.value)} />
                </div>
                <div className="form-field">
                  <label className="form-label">Store Logo</label>
                  <div className="logo-box">
                    <div className="logo-img"><img src={form.logo || '/assets/images/WOMENS.jfif'} alt="Logo" /></div>
                    <button className="btn-soft" onClick={onPickLogo}>Upload New</button>
                    <input ref={fileRef} type="file" accept="image/*" onChange={onLogoFile} style={{display:'none'}} />
                  </div>
                </div>
                <div className="form-field">
                  <label className="form-label">Address</label>
                  <textarea className="form-textarea" rows={3} value={form.address} onChange={(e) => setField('address', e.target.value)} />
                </div>
                <div className="form-field">
                  <label className="form-label">Contact Email</label>
                  <input className="form-input" type="email" value={form.email} onChange={(e) => setField('email', e.target.value)} />
                </div>
                <div className="form-field">
                  <label className="form-label">Phone Number</label>
                  <input className="form-input" value={form.phone} onChange={(e) => setField('phone', e.target.value)} />
                </div>
                <div className="form-field">
                  <label className="form-label">Currency</label>
                  <select className="form-select" value={form.currency} onChange={(e) => setField('currency', e.target.value)}>
                    <option>PKR (₨)</option>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Timezone</label>
                  <select className="form-select" value={form.timezone} onChange={(e) => setField('timezone', e.target.value)}>
                    <option>(GMT+05:00) Pakistan Standard Time</option>
                    <option>(GMT+00:00) UTC</option>
                    <option>(GMT+05:30) India Standard Time</option>
                  </select>
                </div>
              </div>
            )}
            {tab === 'payment' && (
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">COD</label>
                  <select className="form-select" value={form.codEnabled ? 'Enabled' : 'Disabled'} onChange={(e) => setField('codEnabled', e.target.value === 'Enabled')}>
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Card Payments</label>
                  <select className="form-select" value={form.cardEnabled ? 'Enabled' : 'Disabled'} onChange={(e) => setField('cardEnabled', e.target.value === 'Enabled')}>
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Stripe Publishable Key</label>
                  <input className="form-input" type="password" placeholder="pk_live_..." value={form.stripeKey} onChange={(e) => setField('stripeKey', e.target.value)} />
                </div>
                <div className="form-field">
                  <label className="form-label">PayPal Client ID</label>
                  <input className="form-input" type="password" placeholder="AExx..." value={form.paypalClientId} onChange={(e) => setField('paypalClientId', e.target.value)} />
                </div>
              </div>
            )}
            {tab === 'shipping' && (
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">Default Method</label>
                  <select className="form-select" value={form.defaultShipMethod} onChange={(e) => setField('defaultShipMethod', e.target.value)}>
                    <option>Flat rate</option>
                    <option>Free shipping</option>
                    <option>Pickup</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Flat Rate (PKR)</label>
                  <input className="form-input" type="number" value={form.flatRate} onChange={(e) => setField('flatRate', Number(e.target.value || 0))} />
                </div>
                <div className="form-field" style={{gridColumn:'1 / -1'}}>
                  <label className="form-label">Shipping Zones</label>
                  <div className="zone-table">
                    <div className="zone-row zone-header">
                      <div>Zone</div><div>Code</div><div>Rate (PKR)</div><div>Action</div>
                    </div>
                    {form.shippingZones.map((z, i) => (
                      <div className="zone-row" key={`${z.label}-${i}`}>
                        <div>{z.label}</div><div>{z.code}</div><div>{z.rate}</div>
                        <div className="zone-actions"><button className="btn-soft" onClick={() => removeZone(i)}>Remove</button></div>
                      </div>
                    ))}
                  </div>
                  <div className="zone-add">
                    <input className="form-input" placeholder="Zone name" value={zoneName} onChange={(e) => setZoneName(e.target.value)} />
                    <input className="form-input" type="number" placeholder="Rate" value={zoneRate} onChange={(e) => setZoneRate(e.target.value)} />
                    <button className="btn-soft" onClick={addZone}>Add Zone</button>
                  </div>
                </div>
              </div>
            )}
            {tab === 'account' && (
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">Owner Name</label>
                  <input className="form-input" defaultValue="Ikram Zafar" />
                </div>
                <div className="form-field">
                  <label className="form-label">Contact Email</label>
                  <input className="form-input" type="email" defaultValue="ikram@example.com" />
                </div>
              </div>
            )}
            <div className="form-actions">
              <button className="btn-soft" onClick={() => onNavigate?.('sellerDashboard')}>Cancel</button>
              <button className="btn-soft" onClick={loadSaved}>Load Saved</button>
              <button className="btn-soft" onClick={reset}>Reset To Default</button>
              <button className="btn-soft" onClick={onPickImport}>Import JSON</button>
              <button className="btn-soft" onClick={exportJson}>Export JSON</button>
              <button className="btn-soft primary" onClick={save}>Save Changes</button>
              <input ref={importRef} type="file" accept="application/json" onChange={onImportFile} style={{display:'none'}} />
            </div>
          </div>
          <Footer brand={brand} />
        </section>
      </main>
    </div>
  )
}
