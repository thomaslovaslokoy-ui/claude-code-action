import { useParams, Link } from 'react-router-dom'
import { BANKS } from '../lib/banks-data'
import StarRating from '../components/ui/StarRating'
import AffiliateButton from '../components/ui/AffiliateButton'
import { buildBankSchema } from '../lib/schema'

export default function BankDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const bank = BANKS.find((b) => b.slug === slug)

  if (!bank) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', color: '#F0F0FA', fontSize: '2rem' }}>
          Bank ikke funnet
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.45)', marginTop: '1rem' }}>
          Banken du leter etter finnes ikke.
        </p>
        <Link to="/banker" style={{ color: '#F5C842', textDecoration: 'underline', marginTop: '1rem', display: 'inline-block' }}>
          Se alle banker
        </Link>
      </div>
    )
  }

  const ratingEntries: { key: string; label: string; value: number }[] = [
    { key: 'app', label: 'App', value: bank.ratings.app },
    { key: 'fees', label: 'Gebyrer', value: bank.ratings.fees },
    { key: 'returns', label: 'Avkastning', value: bank.ratings.returns },
    { key: 'access', label: 'Tilgjengelighet', value: bank.ratings.access },
    { key: 'support', label: 'Kundeservice', value: bank.ratings.support },
    { key: 'security', label: 'Sikkerhet', value: bank.ratings.security },
  ]

  const schemaData = buildBankSchema(bank)

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <header style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '2.5rem' }}>{bank.flag}</span>
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                color: '#F0F0FA',
                fontSize: '2.25rem',
                margin: 0,
              }}
            >
              {bank.name}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.45)', margin: '0.25rem 0 0', fontSize: '1rem' }}>
              {bank.norwegian_label}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span
            style={{
              background: '#0F0F1A',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 6,
              padding: '0.25rem 0.75rem',
              color: '#2DD4BF',
              fontSize: '0.8125rem',
              fontWeight: 600,
            }}
          >
            {bank.type}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem' }}>
            {bank.region}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <StarRating rating={bank.rating} />
            <span style={{ color: '#F5C842', fontWeight: 700, fontSize: '1.125rem' }}>
              {bank.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </header>

      <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
        {bank.description}
      </p>

      {/* Key Metrics */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', color: '#F0F0FA', fontSize: '1.5rem', marginBottom: '1rem' }}>
          Nøkkeltall
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
          }}
        >
          <MetricCard label="Sparerente" value={`${bank.savings_rate}%`} />
          <MetricCard label="Månedspris" value={`${bank.monthly_fee} kr`} />
          <MetricCard label="Minsteinnskudd" value={`${bank.min_balance} kr`} />
          <MetricCard label="Etablert" value={String(bank.established)} />
        </div>
      </section>

      {/* Ratings Breakdown */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', color: '#F0F0FA', fontSize: '1.5rem', marginBottom: '1rem' }}>
          Detaljerte vurderinger
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {ratingEntries.map((entry) => (
            <div key={entry.key} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', width: 120, flexShrink: 0 }}>
                {entry.label}
              </span>
              <div
                style={{
                  flex: 1,
                  height: 8,
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${(entry.value / 5) * 100}%`,
                    height: '100%',
                    background: entry.value >= 4 ? '#2DD4BF' : entry.value >= 3 ? '#F5C842' : '#ef4444',
                    borderRadius: 4,
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
              <span style={{ color: '#F0F0FA', fontWeight: 600, fontSize: '0.875rem', width: 32, textAlign: 'right' }}>
                {entry.value.toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Pros & Cons */}
      <section style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', color: '#2DD4BF', fontSize: '1.25rem', marginBottom: '0.75rem' }}>
              Fordeler
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {bank.pros.map((pro, i) => (
                <li key={i} style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9375rem' }}>
                  <span style={{ color: '#2DD4BF', marginRight: '0.5rem' }}>+</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', color: '#ef4444', fontSize: '1.25rem', marginBottom: '0.75rem' }}>
              Ulemper
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {bank.cons.map((con, i) => (
                <li key={i} style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9375rem' }}>
                  <span style={{ color: '#ef4444', marginRight: '0.5rem' }}>-</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', color: '#F0F0FA', fontSize: '1.5rem', marginBottom: '1rem' }}>
          Funksjoner
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '0.75rem',
          }}
        >
          <FeatureItem label="Innskuddsgaranti" value={bank.deposit_insured} />
          <FeatureItem label="BankID" value={bank.bankid_support} />
          <FeatureItem label="Vipps" value={bank.vipps_support} />
          <div
            style={{
              background: '#0F0F1A',
              borderRadius: 8,
              padding: '0.875rem 1rem',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', display: 'block', marginBottom: '0.25rem' }}>
              SWIFT-kode
            </span>
            <span style={{ color: '#F0F0FA', fontWeight: 600, fontSize: '0.9375rem' }}>
              {bank.swift_code || 'N/A'}
            </span>
          </div>
        </div>
      </section>

      <div style={{ marginBottom: '2.5rem' }}>
        <AffiliateButton url={bank.affiliate_url} bankSlug={bank.slug} />
      </div>

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

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: '#0F0F1A',
        borderRadius: 8,
        padding: '1.25rem',
        border: '1px solid rgba(255,255,255,0.06)',
        textAlign: 'center',
      }}
    >
      <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </span>
      <div style={{ color: '#F5C842', fontWeight: 700, fontSize: '1.5rem', marginTop: '0.25rem' }}>
        {value}
      </div>
    </div>
  )
}

function FeatureItem({ label, value }: { label: string; value: boolean }) {
  return (
    <div
      style={{
        background: '#0F0F1A',
        borderRadius: 8,
        padding: '0.875rem 1rem',
        border: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem' }}>{label}</span>
      <span style={{ color: value ? '#2DD4BF' : '#ef4444', fontWeight: 600, fontSize: '0.875rem' }}>
        {value ? 'Ja' : 'Nei'}
      </span>
    </div>
  )
}
