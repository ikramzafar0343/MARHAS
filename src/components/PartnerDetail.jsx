import { useEffect, useMemo, useRef, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import HeaderBar from './HeaderBar.jsx'
import DashSidebar from './DashSidebar.jsx'
import Footer from './Footer.jsx'

export default function PartnerDetail({ onNavigate, id }) {
  const brand = 'MARHAS'
  const [partner, setPartner] = useState(null)
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('Not Connected')
  const [apiKey, setApiKey] = useState('')
  const [accountId, setAccountId] = useState('')
  const [webhookUrl, setWebhookUrl] = useState('')
  const [webhookEnabled, setWebhookEnabled] = useState(false)
  const [webhookSecret, setWebhookSecret] = useState('')
  const [logo, setLogo] = useState('')
  const [notes, setNotes] = useState('')
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState('')
  const [lastTestAt, setLastTestAt] = useState('')
  const fileRef = useRef(null)
  const onPickLogo = () => fileRef.current?.click()
  const onLogoFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new window.FileReader()
    reader.onload = () => setLogo(String(reader.result || ''))
    reader.readAsDataURL(file)
  }
  const removeLogo = () => setLogo('')
  const base = useMemo(() => ([
    { name: 'Stripe', type: 'Payment Gateway', status: 'Connected' },
    { name: 'PayPal', type: 'Payment Gateway', status: 'Connected' },
    { name: 'Mailchimp', type: 'Email Marketing', status: 'Not Connected' },
    { name: 'Google Analytics', type: 'Analytics', status: 'Connected' },
    { name: 'Facebook Pixel', type: 'Facebook Pixel', status: 'Not Connected' },
  ]), [])
  useEffect(() => {
    try {
      const sel = sessionStorage.getItem('selected_partner_v1') || id
      const defaults = base.find(p => p.name === sel) || { name: sel || '', type: '', status: 'Not Connected' }
      const savedDetailAll = JSON.parse(localStorage.getItem('partners_detail_v1') || '{}') || {}
      const savedDetail = savedDetailAll[defaults.name] || null
      const savedStatusAll = JSON.parse(localStorage.getItem('partners_status_v1') || '{}') || {}
      const mergedStatus = savedStatusAll[defaults.name] || defaults.status
      setPartner(defaults)
      setName(savedDetail?.name || defaults.name)
      setType(savedDetail?.type || defaults.type)
      setStatus(savedDetail?.status || mergedStatus)
      setApiKey(savedDetail?.apiKey || '')
      setAccountId(savedDetail?.accountId || '')
      setWebhookUrl(savedDetail?.webhookUrl || '')
      setWebhookEnabled(Boolean(savedDetail?.webhookEnabled || false))
      setWebhookSecret(String(savedDetail?.webhookSecret || ''))
      setLogo(savedDetail?.logo || '')
      setNotes(savedDetail?.notes || '')
      const tests = JSON.parse(localStorage.getItem('partners_tests_v1') || '{}') || {}
      const t = tests[defaults.name]
      if (t) { setTestResult(String(t.result || '')); setLastTestAt(String(t.at || '')) }
    } catch {}
  }, [id, base])
  const statusClass = (s) => (/Connected/i.test(s) ? 'ok' : /Failed|Error/i.test(s) ? 'bad' : 'muted')
  const validate = () => {
    const issues = []
    if (!name.trim()) issues.push('Partner name is required')
    if (!type.trim()) issues.push('Partner type is required')
    if (/Payment Gateway/i.test(type) && /Connected/i.test(status)) {
      if (!apiKey.trim()) issues.push('API key is required')
      if (!accountId.trim()) issues.push('Account ID is required')
    }
    if (webhookEnabled && webhookUrl.trim() && !/^https?:\/\//i.test(webhookUrl)) {
      issues.push('Webhook URL must be valid')
    }
    return issues
  }
  const save = () => {
    const issues = validate()
    if (issues.length) { setError(issues[0]); return }
    try {
      const all = JSON.parse(localStorage.getItem('partners_detail_v1') || '{}') || {}
      const rec = { name, type, status, apiKey, accountId, webhookUrl, webhookEnabled, webhookSecret, logo, notes }
      all[name] = rec
      localStorage.setItem('partners_detail_v1', JSON.stringify(all))
      const sts = JSON.parse(localStorage.getItem('partners_status_v1') || '{}') || {}
      sts[name] = status
      localStorage.setItem('partners_status_v1', JSON.stringify(sts))
      setError('')
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {
      setError('Failed to save')
    }
  }
  const connect = () => {
    setStatus('Connected')
  }
  const disconnect = () => {
    setStatus('Not Connected')
  }
  const testConnection = () => {
    setTesting(true)
    setTestResult('')
    setTimeout(() => {
      const ok = apiKey.trim().length >= 10 && accountId.trim().length >= 5
      const result = ok ? 'Success' : 'Failed'
      const at = new Date().toLocaleString()
      setTesting(false)
      setTestResult(result)
      setLastTestAt(at)
      try {
        const tests = JSON.parse(localStorage.getItem('partners_tests_v1') || '{}') || {}
        tests[name] = { result, at }
        localStorage.setItem('partners_tests_v1', JSON.stringify(tests))
      } catch {}
    }, 800)
  }
  const exportJson = () => {
    try {
      const rec = { name, type, status, apiKey, accountId, webhookUrl, webhookEnabled, webhookSecret, logo, notes }
      const blob = new window.Blob([JSON.stringify(rec, null, 2)], { type: 'application/json' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${name || 'partner'}.json`
      a.click()
      window.URL.revokeObjectURL(url)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch { setError('Failed to export') }
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
        setName(String(data.name || name))
        setType(String(data.type || type))
        setStatus(String(data.status || status))
        setApiKey(String(data.apiKey || ''))
        setAccountId(String(data.accountId || ''))
        setWebhookUrl(String(data.webhookUrl || ''))
        setWebhookEnabled(Boolean(data.webhookEnabled || false))
        setWebhookSecret(String(data.webhookSecret || ''))
        setLogo(String(data.logo || ''))
        setNotes(String(data.notes || ''))
        setError('')
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      } catch { setError('Invalid JSON file') }
    }
    reader.readAsText(file)
  }
  const copy = (val) => {
    try { window.navigator?.clipboard?.writeText(String(val || '')) } catch {}
  }
  const generateSecret = () => {
    const token = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
    setWebhookSecret(token)
  }
  const resetDefaults = () => {
    try {
      const defaults = base.find(p => p.name === (partner?.name || name)) || { name, type, status }
      setName(defaults.name || '')
      setType(defaults.type || '')
      setStatus(defaults.status || 'Not Connected')
      setApiKey('')
      setAccountId('')
      setWebhookUrl('')
      setWebhookEnabled(false)
      setWebhookSecret('')
      setLogo('')
      setNotes('')
      setError('')
    } catch {}
  }
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
        <DashSidebar onNavigate={onNavigate} open={true} active="platformPartner" />
        <section className="dash-content">
          <div className="dash-head d-flex justify-content-between align-items-center">
            <div>
              <div className="dash-title">Partner Detail</div>
              <div className="dash-sub">{partner?.name || name}</div>
            </div>
            <div className="d-flex gap-2">
              <button className="btn-soft" onClick={() => onNavigate?.('platformPartner')}>Back to Partners</button>
              <button className="btn-soft" onClick={resetDefaults}>Reset</button>
              <button className="btn-soft" onClick={onPickImport}>Import</button>
              <button className="btn-soft" onClick={exportJson}>Export</button>
              <button className="btn-soft primary" onClick={save}>Save</button>
              <input ref={importRef} type="file" accept="application/json" onChange={onImportFile} style={{display:'none'}} />
            </div>
          </div>
          {saved && <div className="mb-2" style={{fontWeight:700,color:'#27ae60'}}>Saved</div>}
          {error && <div className="mb-2" style={{fontWeight:700,color:'#e74c3c'}}>{error}</div>}
          <div className="form-grid">
            <div className="form-field">
              <label className="form-label">Partner Name</label>
              <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-field">
              <label className="form-label">Type</label>
              <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                <option>Payment Gateway</option>
                <option>Email Marketing</option>
                <option>Analytics</option>
                <option>Facebook Pixel</option>
              </select>
            </div>
            <div className="form-field">
              <label className="form-label">Status</label>
              <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option>Connected</option>
                <option>Not Connected</option>
              </select>
            </div>
            <div className="form-field">
              <label className="form-label">API Key</label>
              <div className="d-flex gap-2">
                <input className="form-input" type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="pk_live_..." />
                <button className="btn-soft" onClick={() => copy(apiKey)}>Copy</button>
              </div>
            </div>
            <div className="form-field">
              <label className="form-label">Account ID</label>
              <input className="form-input" value={accountId} onChange={(e) => setAccountId(e.target.value)} placeholder="acct_..." />
            </div>
            <div className="form-field">
              <label className="form-label">Webhook URL</label>
              <input className="form-input" value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} placeholder="https://..." disabled={!webhookEnabled} />
            </div>
            <div className="form-field">
              <label className="form-label">Webhooks</label>
              <select className="form-select" value={webhookEnabled ? 'Enabled' : 'Disabled'} onChange={(e) => setWebhookEnabled(e.target.value === 'Enabled')}>
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>
            <div className="form-field">
              <label className="form-label">Webhook Secret</label>
              <div className="d-flex gap-2">
                <input className="form-input" value={webhookSecret} onChange={(e) => setWebhookSecret(e.target.value)} placeholder="auto-generated" />
                <button className="btn-soft" onClick={generateSecret}>Generate</button>
                <button className="btn-soft" onClick={() => copy(webhookSecret)}>Copy</button>
              </div>
            </div>
            <div className="form-field">
              <label className="form-label">Logo</label>
              <div className="logo-box">
                <div className="logo-img"><img src={logo || '/assets/images/WOMENS.jfif'} alt="Logo" /></div>
                <button className="btn-soft" onClick={onPickLogo}>Upload New</button>
                <button className="btn-soft" onClick={removeLogo}>Remove</button>
                <input ref={fileRef} type="file" accept="image/*" onChange={onLogoFile} style={{display:'none'}} />
              </div>
            </div>
            <div className="form-field" style={{gridColumn:'1 / -1'}}>
              <label className="form-label">Notes</label>
              <textarea className="form-textarea" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
            <div className="form-actions" style={{gridColumn:'1 / -1'}}>
              <button className="btn-soft" onClick={disconnect}>Disconnect</button>
              <button className="btn-soft" onClick={connect}>Connect</button>
              <button className="btn-soft" onClick={testConnection} disabled={testing}>Test Connection</button>
              {testing && <span className="status proc" style={{marginLeft:8}}>Testing...</span>}
              {!testing && testResult && <span className={`status ${statusClass(testResult)}`} style={{marginLeft:8}}>{testResult}{lastTestAt ? ` • ${lastTestAt}` : ''}</span>}
            </div>
          </div>
          <Footer brand={brand} />
        </section>
      </main>
    </div>
  )
}
