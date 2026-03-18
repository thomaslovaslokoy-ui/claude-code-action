import { Link } from 'react-router-dom'
import { CATEGORIES } from '../../lib/banks-data'

export default function Footer() {
  return (
    <footer role="contentinfo" className="w-full" style={{ background: '#0F0F1A', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1 - Brand */}
          <div>
            <span className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#F5C842' }}>BankTopp</span>
            <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Finn den beste norske banken. Gratis og uavhengig.
            </p>
          </div>

          {/* Column 2 - Categories */}
          <div>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#F0F0FA' }}>Kategorier</h3>
            <div className="grid grid-cols-2 gap-1">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/category/${cat.slug}`}
                  className="text-sm hover:text-amber-400 transition-colors"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3 - Legal */}
          <div>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#F0F0FA' }}>Informasjon</h3>
            <div className="space-y-1">
              <Link to="/om-oss" className="block text-sm hover:text-amber-400 transition-colors" style={{ color: 'rgba(255,255,255,0.45)' }}>Om oss</Link>
              <Link to="/personvern" className="block text-sm hover:text-amber-400 transition-colors" style={{ color: 'rgba(255,255,255,0.45)' }}>Personvern</Link>
              <Link to="/vilkar" className="block text-sm hover:text-amber-400 transition-colors" style={{ color: 'rgba(255,255,255,0.45)' }}>Vilkår</Link>
              <Link to="/annonsere" className="block text-sm hover:text-amber-400 transition-colors" style={{ color: 'rgba(255,255,255,0.45)' }}>Annonsere</Link>
            </div>
          </div>
        </div>

        {/* Legal footer */}
        <div className="pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
            NorwegianSpark SA | Org no. 834 984 172 | norwegianspark@gmail.com | +47 99 73 74 67
          </p>
          <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
            BankTopp inneholder affiliatlenker. Vi kan motta provisjon når du åpner konto via våre lenker.
            Sponsede banker er merket ⚡. Rangeringer er uavhengige.
          </p>
          <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Ikke finansiell rådgivning.
          </p>
        </div>
      </div>
    </footer>
  )
}
