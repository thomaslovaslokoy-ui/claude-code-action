import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { BANKS } from '../lib/banks-data'
import StarRating from '../components/ui/StarRating'
import AffiliateButton from '../components/ui/AffiliateButton'

type FilterType = 'Alle' | 'retail' | 'digital' | 'savings'
type SortOption = 'rating' | 'savings_rate' | 'monthly_fee'

export default function BanksPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterType>('Alle')
  const [sort, setSort] = useState<SortOption>('rating')

  const bankTypes: FilterType[] = ['Alle', 'retail', 'digital', 'savings']
  const filterLabels: Record<FilterType, string> = { Alle: 'Alle', retail: 'Retail', digital: 'Digital', savings: 'Sparebank' }

  const filteredBanks = useMemo(() => {
    let result = [...BANKS]

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.norwegian_label.toLowerCase().includes(q)
      )
    }

    if (filter !== 'Alle') {
      result = result.filter((b) => b.type === filter)
    }

    result.sort((a, b) => {
      switch (sort) {
        case 'rating':
          return b.rating - a.rating
        case 'savings_rate':
          return b.savings_rate - a.savings_rate
        case 'monthly_fee':
          return a.monthly_fee - b.monthly_fee
        default:
          return 0
      }
    })

    return result
  }, [search, filter, sort])

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 1.5rem' }}>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          color: '#F0F0FA',
          fontSize: '2.5rem',
          marginBottom: '2rem',
        }}
      >
        Alle Banker i Norge
      </h1>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem',
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          aria-label="Søk etter banker"
          placeholder="Søk etter banker..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            background: '#0F0F1A',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8,
            padding: '0.75rem 1rem',
            color: '#F0F0FA',
            fontSize: '1rem',
            flex: '1 1 300px',
            minWidth: 200,
          }}
        />

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {bankTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: 6,
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.875rem',
                background: filter === type ? '#F5C842' : '#0F0F1A',
                color: filter === type ? '#04040A' : 'rgba(255,255,255,0.45)',
              }}
            >
              {filterLabels[type]}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          style={{
            background: '#0F0F1A',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8,
            padding: '0.75rem 1rem',
            color: '#F0F0FA',
            fontSize: '0.875rem',
          }}
        >
          <option value="rating">Rating</option>
          <option value="savings_rate">Sparerente</option>
          <option value="monthly_fee">Månedspris</option>
        </select>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {filteredBanks.map((bank) => (
          <div
            key={bank.id}
            style={{
              background: '#0F0F1A',
              borderRadius: 12,
              padding: '1.5rem',
              border: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              position: 'relative',
            }}
          >
            {bank.is_sponsored && (
              <span
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  background: '#F5C842',
                  color: '#04040A',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 4,
                }}
              >
                ⚡ Sponset
              </span>
            )}

            <Link
              to={`/bank/${bank.slug}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.25rem',
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{bank.flag}</span>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: '#F0F0FA',
                    fontSize: '1.25rem',
                    margin: 0,
                  }}
                >
                  {bank.name}
                </h2>
              </div>
            </Link>

            <StarRating rating={bank.rating} />

            <div
              style={{
                display: 'flex',
                gap: '1.5rem',
                fontSize: '0.875rem',
                color: 'rgba(255,255,255,0.45)',
              }}
            >
              <span>
                Rente: <strong style={{ color: '#2DD4BF' }}>{bank.savings_rate}%</strong>
              </span>
              <span>
                Gebyr: <strong style={{ color: '#F0F0FA' }}>{bank.monthly_fee} kr/mnd</strong>
              </span>
            </div>

            <p
              style={{
                color: 'rgba(255,255,255,0.45)',
                fontSize: '0.875rem',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {bank.description.length > 120
                ? bank.description.slice(0, 120) + '...'
                : bank.description}
            </p>

            <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
              <AffiliateButton url={bank.affiliate_url} bankSlug={bank.slug} />
            </div>
          </div>
        ))}
      </div>

      {filteredBanks.length === 0 && (
        <p
          style={{
            color: 'rgba(255,255,255,0.45)',
            textAlign: 'center',
            padding: '3rem 0',
            fontSize: '1.125rem',
          }}
        >
          Ingen banker funnet.
        </p>
      )}
    </div>
  )
}
