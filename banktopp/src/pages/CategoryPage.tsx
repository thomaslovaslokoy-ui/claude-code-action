import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { BANKS, CATEGORIES } from '../lib/banks-data'
import type { Bank } from '../lib/banks-data'
import StarRating from '../components/ui/StarRating'
import AffiliateButton from '../components/ui/AffiliateButton'

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const category = CATEGORIES.find((c) => c.slug === slug)

  if (!category) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', color: '#F0F0FA', fontSize: '2rem' }}>
          Kategori ikke funnet
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.45)', marginTop: '1rem' }}>
          Kategorien du leter etter finnes ikke.
        </p>
        <Link to="/" style={{ color: '#F5C842', textDecoration: 'underline', marginTop: '1rem', display: 'inline-block' }}>
          Tilbake til forsiden
        </Link>
      </div>
    )
  }

  const sortedBanks = [...BANKS].sort((a, b) => {
    const key = category.sortKey as keyof Bank
    const aVal = a[key]
    const bVal = b[key]
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return category.sortDir === 'asc' ? aVal - bVal : bVal - aVal
    }
    return 0
  })

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 1.5rem' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            color: '#F0F0FA',
            fontSize: '2.5rem',
            marginBottom: '0.75rem',
          }}
        >
          {category.headline}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1.125rem', maxWidth: 700 }}>
          {category.subheadline}
        </p>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#0F0F1A',
            border: '1px solid rgba(245,200,66,0.3)',
            borderRadius: 8,
            padding: '0.5rem 1rem',
            marginTop: '1rem',
          }}
        >
          <span style={{ color: '#F5C842', fontWeight: 700, fontSize: '1.25rem' }}>
            {category.statValue}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem' }}>
            {category.statLabel}
          </span>
          {category.statCompare && (
            <span style={{ color: '#2DD4BF', fontSize: '0.75rem' }}>
              {category.statCompare}
            </span>
          )}
        </div>
      </header>

      <div style={{ overflowX: 'auto', marginBottom: '3rem' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            background: '#0F0F1A',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>#</th>
              <th style={{ ...thStyle, textAlign: 'left' }}>Bank</th>
              {category.columns.map((col) => (
                <th key={col} style={thStyle}>
                  {col}
                </th>
              ))}
              <th style={thStyle}>Rating</th>
              <th style={thStyle}></th>
            </tr>
          </thead>
          <tbody>
            {sortedBanks.map((bank, index) => (
              <tr
                key={bank.id}
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <td style={tdStyle}>{index + 1}</td>
                <td style={{ ...tdStyle, textAlign: 'left' }}>
                  <Link
                    to={`/bank/${bank.slug}`}
                    style={{
                      color: '#F0F0FA',
                      textDecoration: 'none',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <span>{bank.flag}</span>
                    {bank.name}
                    {bank.is_sponsored && (
                      <span
                        style={{
                          background: '#F5C842',
                          color: '#04040A',
                          fontSize: '0.625rem',
                          fontWeight: 700,
                          padding: '1px 5px',
                          borderRadius: 3,
                        }}
                      >
                        ⚡
                      </span>
                    )}
                  </Link>
                </td>
                {category.columns.map((col) => (
                  <td key={col} style={tdStyle}>
                    {getCellValue(bank, col)}
                  </td>
                ))}
                <td style={tdStyle}>
                  <StarRating rating={bank.rating} />
                </td>
                <td style={tdStyle}>
                  <AffiliateButton url={bank.affiliate_url} bankSlug={bank.slug} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {category.faq && category.faq.length > 0 && (
        <section style={{ marginBottom: '3rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              color: '#F0F0FA',
              fontSize: '1.75rem',
              marginBottom: '1.5rem',
            }}
          >
            Vanlige spørsmål
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {category.faq.map((item, index) => (
              <div
                key={index}
                style={{
                  background: '#0F0F1A',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.06)',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem 1.25rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#F0F0FA',
                    fontWeight: 600,
                    fontSize: '1rem',
                    textAlign: 'left',
                  }}
                >
                  {item.q}
                  <span
                    style={{
                      transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                      fontSize: '0.75rem',
                    }}
                  >
                    ▼
                  </span>
                </button>
                {openFaq === index && (
                  <div
                    style={{
                      padding: '0 1.25rem 1rem',
                      color: 'rgba(255,255,255,0.45)',
                      fontSize: '0.9375rem',
                      lineHeight: 1.6,
                    }}
                  >
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {category.methodology && (
        <section style={{ marginBottom: '3rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              color: '#F0F0FA',
              fontSize: '1.75rem',
              marginBottom: '1rem',
            }}
          >
            Metodikk
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: '0.9375rem',
              lineHeight: 1.7,
              maxWidth: 800,
            }}
          >
            {category.methodology}
          </p>
        </section>
      )}

      <p
        style={{
          color: 'rgba(255,255,255,0.3)',
          fontSize: '0.8125rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '1.5rem',
          fontStyle: 'italic',
        }}
      >
        Ikke finansiell rådgivning.
      </p>
    </div>
  )
}

const thStyle: React.CSSProperties = {
  padding: '0.875rem 1rem',
  color: 'rgba(255,255,255,0.45)',
  fontSize: '0.75rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  textAlign: 'center',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
}

const tdStyle: React.CSSProperties = {
  padding: '0.875rem 1rem',
  color: '#F0F0FA',
  fontSize: '0.875rem',
  textAlign: 'center',
  verticalAlign: 'middle',
}

function getCellValue(bank: Bank, column: string): string {
  const col = column.toLowerCase()
  if (col.includes('rente') || col.includes('rate')) return `${bank.savings_rate}%`
  if (col.includes('gebyr') || col.includes('fee') || col.includes('pris')) return `${bank.monthly_fee} kr`
  if (col.includes('minsteinnskudd') || col.includes('min')) return `${bank.min_balance} kr`
  if (col.includes('type')) return bank.type
  if (col.includes('region')) return bank.region
  return ''
}
