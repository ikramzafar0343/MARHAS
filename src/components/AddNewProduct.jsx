import { useRef, useState } from 'react'
import { FiSearch, FiUploadCloud, FiTag } from 'react-icons/fi'
import HeaderBar from './HeaderBar.jsx'
import DashSidebar from './DashSidebar.jsx'
import Footer from './Footer.jsx'

export default function AddNewProduct({ onNavigate }) {
  const brand = 'MARHAS'
  const [form, setForm] = useState({
    name: '',
    sku: '',
    category: 'Accessories',
    price: 0,
    stock: 0,
    status: 'Draft',
    description: '',
    tags: '',
    img: '',
  })
  const setField = (k, v) => setForm(prev => ({ ...prev, [k]: v }))
  const fileRef = useRef(null)
  const onPickImage = () => fileRef.current?.click()
  const onImageFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new window.FileReader()
    reader.onload = () => setField('img', String(reader.result || ''))
    reader.readAsDataURL(file)
  }
  const [saved, setSaved] = useState(false)
  const save = () => {
    const payload = { ...form, createdAt: Date.now() }
    try {
      const prev = JSON.parse(localStorage.getItem('new_products_v1') || '[]') || []
      localStorage.setItem('new_products_v1', JSON.stringify([payload, ...prev]))
    } catch {}
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
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
        <DashSidebar onNavigate={onNavigate} open={true} active="addProduct" />
        <section className="dash-content">
          <div className="dash-head d-flex justify-content-between align-items-center">
            <div>
              <div className="dash-title">Add New Product</div>
              <div className="dash-sub">Create a new product and publish to your catalog</div>
            </div>
            <div className="d-flex gap-2">
              <button className="btn-soft" onClick={() => onNavigate?.('manageInventory')}>Cancel</button>
              <button className="btn-soft primary" onClick={save}>Save Product</button>
            </div>
          </div>
          <div className="settings-card">
            {saved && <div className="mb-2" style={{fontWeight:700,color:'#27ae60'}}>Saved</div>}
            <div className="form-grid">
              <div className="form-field">
                <label className="form-label">Product Name</label>
                <input className="form-input" value={form.name} onChange={(e) => setField('name', e.target.value)} />
              </div>
              <div className="form-field">
                <label className="form-label">SKU</label>
                <input className="form-input" value={form.sku} onChange={(e) => setField('sku', e.target.value)} />
              </div>
              <div className="form-field">
                <label className="form-label">Category</label>
                <select className="form-select" value={form.category} onChange={(e) => setField('category', e.target.value)}>
                  <option>Accessories</option>
                  <option>Electronics</option>
                  <option>Footwear</option>
                  <option>Apparel</option>
                </select>
              </div>
              <div className="form-field">
                <label className="form-label">Price</label>
                <input className="form-input" type="number" min="0" step="0.01" value={form.price} onChange={(e) => setField('price', Number(e.target.value || 0))} />
              </div>
              <div className="form-field">
                <label className="form-label">Stock</label>
                <input className="form-input" type="number" min="0" value={form.stock} onChange={(e) => setField('stock', Number(e.target.value || 0))} />
              </div>
              <div className="form-field">
                <label className="form-label">Status</label>
                <select className="form-select" value={form.status} onChange={(e) => setField('status', e.target.value)}>
                  <option>Draft</option>
                  <option>Published</option>
                  <option>Archived</option>
                </select>
              </div>
              <div className="form-field" style={{gridColumn:'1 / -1'}}>
                <label className="form-label">Product Image</label>
                <div className="logo-box">
                  <div className="logo-img"><img src={form.img || '/assets/images/MENS.jfif'} alt="Product" /></div>
                  <button className="btn-soft" onClick={onPickImage}><FiUploadCloud /> Upload</button>
                  <input ref={fileRef} type="file" accept="image/*" onChange={onImageFile} style={{display:'none'}} />
                </div>
              </div>
              <div className="form-field" style={{gridColumn:'1 / -1'}}>
                <label className="form-label">Description</label>
                <textarea className="form-textarea" rows={4} value={form.description} onChange={(e) => setField('description', e.target.value)} />
              </div>
              <div className="form-field" style={{gridColumn:'1 / -1'}}>
                <label className="form-label">Tags</label>
                <div className="d-flex gap-2">
                  <div className="input-group flex-grow-1">
                    <span className="input-group-text"><FiTag /></span>
                    <input className="form-input" value={form.tags} onChange={(e) => setField('tags', e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer brand={brand} />
        </section>
      </main>
    </div>
  )
}
