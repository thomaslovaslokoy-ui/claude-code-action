import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { CATEGORIES } from '../../lib/banks-data'

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(false)

  return (
    <nav
      className="sticky top-0 z-50 w-full"
      style={{
        background: 'rgba(4, 4, 10, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
          <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#F5C842' }}>
            BankTopp
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/banker" className="text-sm font-medium hover:text-amber-400 transition-colors" style={{ color: '#F0F0FA' }}>
            Banker
          </Link>
          <div className="relative" onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)}>
            <button
              className="flex items-center gap-1 text-sm font-medium hover:text-amber-400 transition-colors"
              style={{ color: '#F0F0FA', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
              aria-expanded={catOpen}
              aria-haspopup="true"
            >
              Kategorier <ChevronDown size={14} />
            </button>
            {catOpen && (
              <div
                className="absolute top-full left-0 mt-2 p-4 grid grid-cols-2 gap-2 rounded-lg"
                style={{
                  background: '#0F0F1A',
                  border: '1px solid rgba(255,255,255,0.07)',
                  minWidth: 320,
                }}
              >
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/category/${cat.slug}`}
                    className="block px-3 py-2 rounded text-sm hover:bg-white/5 transition-colors"
                    style={{ color: '#F0F0FA' }}
                    onClick={() => setCatOpen(false)}
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/sammenlign" className="text-sm font-medium hover:text-amber-400 transition-colors" style={{ color: '#F0F0FA' }}>
            Sammenlign
          </Link>
          <Link to="/quiz" className="text-sm font-medium hover:text-amber-400 transition-colors" style={{ color: '#F0F0FA' }}>
            Quiz
          </Link>
          <Link
            to="/annonsere"
            className="text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            style={{ background: '#F5C842', color: '#04040A' }}
          >
            Annonsere
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Lukk meny' : 'Åpne meny'}
          style={{ background: 'none', border: 'none', color: '#F0F0FA', cursor: 'pointer' }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2" style={{ background: 'rgba(4, 4, 10, 0.98)' }}>
          <Link to="/banker" className="block py-2 text-sm" style={{ color: '#F0F0FA' }} onClick={() => setMobileOpen(false)}>Banker</Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="block py-2 text-sm pl-4"
              style={{ color: 'rgba(255,255,255,0.7)' }}
              onClick={() => setMobileOpen(false)}
            >
              {cat.label}
            </Link>
          ))}
          <Link to="/sammenlign" className="block py-2 text-sm" style={{ color: '#F0F0FA' }} onClick={() => setMobileOpen(false)}>Sammenlign</Link>
          <Link to="/quiz" className="block py-2 text-sm" style={{ color: '#F0F0FA' }} onClick={() => setMobileOpen(false)}>Quiz</Link>
          <Link to="/annonsere" className="block py-2 text-sm" style={{ color: '#F5C842' }} onClick={() => setMobileOpen(false)}>Annonsere</Link>
        </div>
      )}
    </nav>
  )
}
