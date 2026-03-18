import { useState, useMemo } from 'react'
import { BANKS } from '../lib/banks-data'
import type { Bank } from '../lib/banks-data'
import StarRating from '../components/ui/StarRating'

export default function ComparePage() {
  const [selectedIds, setSelectedIds] = useState<(string | null)[]>([null, null, null])
  const [searchTerms, setSearchTerms] = useState<string[]>(['', '', ''])
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)

  const selectedBanks = useMemo(() => {
    return selectedIds.map((id) => (id ? BANKS.find((b) => b.id === id) ?? null : null))
  }, [selectedIds])

  const updateSelection = (index: number, bank: Bank) => {
    const next = [...selectedIds]
    next[index] = bank.id
    setSelectedIds(next)
    const nextSearch = [...searchTerms]
    nextSearch[index] = ''
    setSearchTerms(nextSearch)
    setOpenDropdown(null)
  }

  const clearSelection = (index: number) => {
    const next = [...selectedIds]
    next[index] = null
    setSelectedIds(next)
  }

  const getFilteredBanks = (index: number): Bank[] => {
    const term = searchTerms[index].toLowerCase()
    return BANKS.filter((b) => {
      if (selectedIds.includes(b.id)) return false
      if (!term) return true
      return b.name.toLowerCase().includes(term) || b.norwegian_label.toLowerCase().includes(term)
    })
  }

  const metrics: { key: string; label: string; render: (bank: Bank) => React.ReactNode }[] = [
    {
      key: 'rating',
      label: 'Rating',
      render: (bank) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
          <StarRating rating={bank.rating} />
          <span style={{ color: '#F5C842', fontWeight: 700 }}>{bank.rating.toFixed(1)}</span>
        </div>
      ),
    },
    { key: 'savings_rate', label: 'Sparerente', render: (bank) => <span style={{ color: '#2DD4BF', fontWeight: 700 }}>{bank.savings_rate}%</span> },
    { key: 'monthly_fee', label: 'Månedspris', render: (bank) => <span>{bank.monthly_fee} kr/mnd</span> },
    { key: 'min_balance', label: 'Minsteinnskudd', render: (bank) => <span>{bank.min_balance} kr</span> },
    { key: 'deposit_insured', label: 'Innskuddsgaranti', render: (bank) => <span style={{ color: bank.deposit_insured ? '#2DD4BF' : '#ef4444' }}>{bank.deposit_insured ? 'Ja' : 'Nei'}</span> },
    { key: 'bankid_support', label: 'BankID', render: (bank) => <span style={{ color: bank.bankid_support ? '#2DD4BF' : '#ef4444' }}>{bank.bankid_support ? 'Ja' : 'Nei'}</span> },
    { key: 'vipps_support', label: 'Vipps', render: (bank) => <span style={{ color: bank.vipps_support ? '#2DD4BF' : '#ef4444' }}>{bank.vipps_support ? 'Ja' : 'Nei'}</span> },
    { key: 'established', label: 'Etablert', render: (bank) => <span>{bank.established}</span> },
  ]

  const ratingKeys: { key: keyof Bank['ratings']; label: string }[] = [
    { key: 'app', label: 'App' },
    { key: 'fees', label: 'Gebyrer' },
    { key: 'returns', label: 'Avkastning' },
    { key: 'access', label: 'Tilgjengelighet' },
    { key: 'support', label: 'Kundeservice' },
    { key: 'security', label: 'Sikkerhet' },
  ]

  const hasSelection = selectedBanks.some((b) => b !== null)

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
        Sammenlign Banker
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          marginBottom: '3rem',
        }}
      >
        {[0, 1, 2].map((index) => {
          const bank = selectedBanks[index]
          return (
            <div
              key={index}
              style={{
                background: '#0F0F1A',
                borderRadius: 12,
                padding: '1.5rem',
                border: '1px solid rgba(255,255,255,0.06)',
                position: 'relative',
              }}
            >
              {bank ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>{bank.flag}</span>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          color: '#F0F0FA',
                          fontSize: '1.125rem',
                          margin: 0,
                        }}
                      >
                        {bank.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => clearSelection(index)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255,255,255,0.45)',
                        cursor: 'pointer',
                        fontSize: '1.25rem',
                        padding: '0.25rem',
                      }}
                      aria-label={`Fjern ${bank.name}`}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder={`Velg bank ${index + 1}...`}
                    value={searchTerms[index]}
                    onChange={(e) => {
                      const next = [...searchTerms]
                      next[index] = e.target.value
                      setSearchTerms(next)
                      setOpenDropdown(index)
                    }}
                    onFocus={() => setOpenDropdown(index)}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 8,
                      padding: '0.75rem 1rem',
                      color: '#F0F0FA',
                      fontSize: '0.9375rem',
                      boxSizing: 'border-box',
                    }}
                  />
                  {openDropdown === index && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        background: '#0F0F1A',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 8,
                        marginTop: 4,
                        maxHeight: 200,
                        overflowY: 'auto',
                        zIndex: 10,
                      }}
                    >
                      {getFilteredBanks(index).map((b) => (
                        <button
                          key={b.id}
                          onClick={() => updateSelection(index, b)}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.625rem 1rem',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#F0F0FA',
                            fontSize: '0.875rem',
                            textAlign: 'left',
                          }}
                        >
                          <span>{b.flag}</span>
                          {b.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {hasSelection && (
        <>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: '#0F0F1A',
              borderRadius: 12,
              overflow: 'hidden',
              marginBottom: '2rem',
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Metrikk</th>
                {selectedBanks.map((bank, i) =>
                  bank ? (
                    <th key={i} style={thStyle}>
                      {bank.flag} {bank.name}
                    </th>
                  ) : (
                    <th key={i} style={thStyle}>
                      —
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric) => (
                <tr key={metric.key} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ ...tdStyle, textAlign: 'left', fontWeight: 600, color: 'rgba(255,255,255,0.45)' }}>
                    {metric.label}
                  </td>
                  {selectedBanks.map((bank, i) => (
                    <td key={i} style={tdStyle}>
                      {bank ? metric.render(bank) : '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              color: '#F0F0FA',
              fontSize: '1.5rem',
              marginBottom: '1rem',
            }}
          >
            Detaljerte vurderinger
          </h2>
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
                <th style={thStyle}>Kategori</th>
                {selectedBanks.map((bank, i) =>
                  bank ? (
                    <th key={i} style={thStyle}>
                      {bank.name}
                    </th>
                  ) : (
                    <th key={i} style={thStyle}>
                      —
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {ratingKeys.map((rk) => (
                <tr key={rk.key} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ ...tdStyle, textAlign: 'left', fontWeight: 600, color: 'rgba(255,255,255,0.45)' }}>
                    {rk.label}
                  </td>
                  {selectedBanks.map((bank, i) => (
                    <td key={i} style={tdStyle}>
                      {bank ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                          <div
                            style={{
                              width: 80,
                              height: 6,
                              background: 'rgba(255,255,255,0.06)',
                              borderRadius: 3,
                              overflow: 'hidden',
                            }}
                          >
                            <div
                              style={{
                                width: `${(bank.ratings[rk.key] / 5) * 100}%`,
                                height: '100%',
                                background: bank.ratings[rk.key] >= 4 ? '#2DD4BF' : bank.ratings[rk.key] >= 3 ? '#F5C842' : '#ef4444',
                                borderRadius: 3,
                              }}
                            />
                          </div>
                          <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>
                            {bank.ratings[rk.key].toFixed(1)}
                          </span>
                        </div>
                      ) : (
                        '—'
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
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
