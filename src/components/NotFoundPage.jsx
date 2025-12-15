import { FiHome } from 'react-icons/fi'

export default function NotFoundPage({ onBack }) {
  return (
    <div className="bag-dark position-relative">
      <main className="container text-center" style={{ paddingTop: 120, paddingBottom: 60 }}>
        <div className="display-6 fw-bold">404 — Page Not Found</div>
        <p className="lead" style={{ color: '#555' }}>The page you’re looking for doesn’t exist.</p>
        <div className="d-grid gap-2 justify-content-center mt-3">
          <button className="btn-soft-primary" onClick={onBack}><FiHome /> Back to Home</button>
        </div>
      </main>
    </div>
  )
}
