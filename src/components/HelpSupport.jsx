import { useEffect, useRef, useState } from 'react'
import { FiSearch, FiFilter, FiUploadCloud, FiMail, FiMessageSquare, FiPhone } from 'react-icons/fi'
import HeaderBar from './HeaderBar.jsx'
import DashSidebar from './DashSidebar.jsx'
import Footer from './Footer.jsx'

export default function HelpSupport({ onNavigate }) {
  const brand = 'MARHAS'
  const [q, setQ] = useState('')
  const base = [
    { title: 'How to process a refund', cat: 'Orders', status: 'Published', content: 'Go to Orders, open the order, click Refund. Choose items and amount, confirm the refund. Customer will be notified automatically.' },
    { title: 'Setting up shipping zones', cat: 'Shipping', status: 'Published', content: 'Navigate to Store Settings > Shipping. Add zones with codes and rates. Set default method. Save to apply.' },
    { title: 'Managing user roles', cat: 'Account', status: 'Published', content: 'Open Account settings. Create users and assign roles such as Admin, Manager, Support. Roles control access to features.' },
    { title: 'Connecting a payment gateway', cat: 'Payment', status: 'Published', content: 'In Store Settings > Payment, enable Card Payments and paste keys. Test and save to start accepting payments.' },
  ]
  const [rows, setRows] = useState(base)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('kb_articles_v1') || '[]') || []
      if (Array.isArray(saved) && saved.length) setRows(prev => [...saved, ...prev])
    } catch {}
  }, [])
  const [filterOpen, setFilterOpen] = useState(false)
  const [catFilter, setCatFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const kbArticles = rows.filter(a => {
    const s = q.toLowerCase()
    const byQuery =
      a.title.toLowerCase().includes(s) ||
      a.content.toLowerCase().includes(s) ||
      a.cat.toLowerCase().includes(s)
    const byCat = catFilter ? a.cat === catFilter : true
    const byStatus = statusFilter ? a.status === statusFilter : true
    return byQuery && byCat && byStatus
  })
  const cats = Array.from(new Set(rows.map(r => r.cat)))
  const [openIdx, setOpenIdx] = useState(null)
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [files, setFiles] = useState([])
  const fileRef = useRef(null)
  const onPickFiles = () => fileRef.current?.click()
  const onFiles = (e) => {
    const list = Array.from(e.target.files || [])
    setFiles(list.map(f => ({ name: f.name, size: f.size })))
  }
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)
  const supportEmail = 'support@marhas.com'
  const supportPhone = '+92 300 1234567'
  const openEmail = () => {
    const sub = encodeURIComponent(subject || '')
    const body = encodeURIComponent(message || '')
    const mailto = `mailto:${supportEmail}?subject=${sub}&body=${body}`
    try { window.location.href = mailto } catch {}
  }
  const copyPhone = () => {
    try { window.navigator?.clipboard?.writeText(supportPhone) } catch {}
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  const callPhone = () => {
    try { window.location.href = `tel:${supportPhone.replace(/\s+/g,'')}` } catch {}
  }
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState('')
  const [sending, setSending] = useState(false)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('support_chat_v1') || '[]') || []
      setChatMessages(Array.isArray(saved) ? saved : [])
    } catch {}
  }, [])
  const saveChat = (list) => {
    try { localStorage.setItem('support_chat_v1', JSON.stringify(list)) } catch {}
  }
  const sendChat = () => {
    const text = chatInput.trim()
    if (!text) return
    const msg = { from: 'you', text, at: Date.now() }
    const next = [...chatMessages, msg]
    setChatMessages(next)
    saveChat(next)
    setChatInput('')
    setSending(true)
    setTimeout(() => {
      const bot = { from: 'support', text: 'Thanks! We will get back to you shortly.', at: Date.now() }
      const after = [...next, bot]
      setChatMessages(after)
      saveChat(after)
      setSending(false)
    }, 800)
  }
  const submit = () => {
    const article = { title: subject || 'Untitled Article', cat: 'Support', status: 'Pending Review', content: message || '', files, at: Date.now() }
    try {
      const list = JSON.parse(localStorage.getItem('kb_articles_v1') || '[]') || []
      list.unshift(article)
      localStorage.setItem('kb_articles_v1', JSON.stringify(list))
    } catch {}
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    setSubject(''); setMessage(''); setFiles([])
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
        <DashSidebar onNavigate={onNavigate} open={true} active="helpSupport" />
        <section className="dash-content">
          <div className="dash-head">
            <div className="dash-title">Help & Support</div>
            <div className="dash-sub">Find answers and get assistance with your store</div>
          </div>
          <div className="dash-cards">
            <div className="dash-card">
              <div className="dash-card-key">Knowledge Base Articles</div>
              <div className="dash-card-val">150+</div>
            </div>
            <div className="dash-card">
              <div className="dash-card-key">Active Tickets</div>
              <div className="dash-card-val">5</div>
            </div>
            <div className="dash-card">
              <div className="dash-card-key">Average Response Time</div>
              <div className="dash-card-val">2h 15m</div>
            </div>
          </div>
          <div className="dash-panels" style={{gridTemplateColumns:'2fr 1fr'}}>
            <div className="dash-panel">
              <div className="dash-table-head">
                <div className="dash-search">
                  <FiSearch />
                  <input className="dash-input" placeholder="Search for help articles..." value={q} onChange={(e) => setQ(e.target.value)} />
                </div>
              <div className="dash-actions">
                  <button className="btn-soft" onClick={() => setFilterOpen(v => !v)}><FiFilter /> Filter</button>
              </div>
            </div>
              {filterOpen && (
                <div className="dash-filters">
                  <div className="form-field">
                    <label className="form-label">Category</label>
                    <select className="form-select" value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
                      <option value="">All</option>
                      {cats.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-field">
                    <label className="form-label">Status</label>
                    <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                      <option value="">All</option>
                      <option>Published</option>
                      <option>Pending Review</option>
                    </select>
                  </div>
                  <button className="btn-soft" onClick={() => { setCatFilter(''); setStatusFilter('') }}>Clear</button>
                </div>
              )}
              <div className="kb-list">
                <div className="kb-title">Popular Articles</div>
                {kbArticles.map((a, i) => {
                  const idx = i
                  const open = openIdx === idx
                  return (
                    <div key={`${a.title}-${idx}`} className="kb-item-wrap">
                      <button className="kb-item" onClick={() => setOpenIdx(open ? null : idx)}>
                        {a.title}
                      </button>
                      {open && (
                        <div className="kb-content">
                          <div className="kb-meta">
                            <span className="badge">{a.cat}</span>
                            <span className={`status ${/Published/i.test(a.status) ? 'ok' : 'warn'}`} style={{marginLeft:8}}>{a.status}</span>
                          </div>
                          <div className="kb-body">{a.content}</div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="dash-panel">
              <div className="dash-panel-title">Contact Support</div>
              {saved && <div className="mb-2" style={{fontWeight:700,color:'#27ae60'}}>Article submitted</div>}
              <div className="form-grid" style={{gridTemplateColumns:'1fr'}}>
                <div className="form-field">
                  <label className="form-label">Subject</label>
                  <input className="form-input" value={subject} onChange={(e) => setSubject(e.target.value)} />
                </div>
                <div className="form-field">
                  <label className="form-label">Message</label>
                  <textarea className="form-textarea" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>
                <div className="form-field">
                  <label className="form-label">Attachments</label>
                  <div className="logo-box">
                    <button className="btn-soft" onClick={onPickFiles}><FiUploadCloud /> Upload</button>
                    <input ref={fileRef} type="file" multiple onChange={onFiles} style={{display:'none'}} />
                    <div className="attachments">
                      {files.map((f, i) => <div key={i} className="attach">{f.name}</div>)}
                    </div>
                  </div>
                </div>
                <div className="form-actions">
                  <button className="btn-soft primary" onClick={submit}>Submit Article</button>
                </div>
              </div>
              <div className="contact-ways">
                <button className="contact-item btn-soft" onClick={openEmail}><FiMail /> Email</button>
                <button className="contact-item btn-soft" onClick={() => setChatOpen(v => !v)}><FiMessageSquare /> Live Chat</button>
                <div className="d-flex gap-2 align-items-center">
                  <button className="contact-item btn-soft" onClick={callPhone}><FiPhone /> Phone</button>
                  <button className="btn-soft" onClick={copyPhone}>Copy</button>
                  {copied && <span className="status ok">Copied</span>}
                </div>
              </div>
              {chatOpen && (
                <div className="dash-panel" style={{marginTop:12}}>
                  <div className="dash-panel-title">Live Chat</div>
                  <div className="chat-box">
                    <div className="chat-messages">
                      {chatMessages.map((m, i) => (
                        <div key={i} className={`chat-msg ${m.from === 'you' ? 'me' : 'support'}`}>
                          <div className="chat-text">{m.text}</div>
                          <div className="chat-time">{new Date(m.at).toLocaleTimeString()}</div>
                        </div>
                      ))}
                      {sending && <div className="chat-msg support"><div className="chat-text">Typing...</div></div>}
                    </div>
                    <div className="chat-input-row">
                      <input className="form-input" placeholder="Type a message..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} />
                      <button className="btn-soft" onClick={sendChat} disabled={sending}>Send</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <Footer brand={brand} />
        </section>
      </main>
    </div>
  )
}
