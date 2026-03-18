import { Link } from 'react-router-dom'
import { CATEGORIES } from '../../lib/banks-data'

export default function CategoryGrid() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-2xl md:text-3xl font-bold text-center mb-10"
          style={{ fontFamily: 'var(--font-display)', color: '#F0F0FA' }}
        >
          Utforsk Kategorier
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              to={`/category/${category.slug}`}
              className="card flex flex-col gap-2 p-5 rounded-xl transition-all hover:scale-[1.02]"
              style={{
                background: '#0F0F1A',
                border: '1px solid rgba(255,255,255,0.07)',
                textDecoration: 'none',
              }}
            >
              <span className="text-sm font-medium" style={{ color: '#F0F0FA' }}>
                {category.label}
              </span>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {category.headline}
              </span>
              <span
                className="text-lg font-bold mt-1"
                style={{ color: '#F5C842', fontFamily: 'var(--font-display)' }}
              >
                {category.statValue}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
