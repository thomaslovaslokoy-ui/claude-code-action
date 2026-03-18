import { BANKS } from '../../lib/banks-data'
import type { Bank } from '../../lib/banks-data'
import StarRating from '../../components/ui/StarRating'
import AffiliateButton from '../../components/ui/AffiliateButton'

const top3: Bank[] = [...BANKS].sort((a, b) => b.rating - a.rating).slice(0, 3)

export default function Top3Section() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-2xl md:text-3xl font-bold text-center mb-10"
          style={{ fontFamily: 'var(--font-display)', color: '#F0F0FA' }}
        >
          Topp 3 Banker i Norge
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {top3.map((bank, index) => (
            <div
              key={bank.id}
              className="card relative flex flex-col gap-4 p-6 rounded-xl"
              style={{
                background: '#0F0F1A',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {/* Rank badge */}
              <span
                className="absolute -top-3 -left-3 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold"
                style={{ background: '#F5C842', color: '#04040A' }}
              >
                {index + 1}
              </span>

              {bank.is_sponsored && (
                <span
                  className="self-end text-xs px-2 py-0.5 rounded"
                  style={{ background: 'rgba(245,200,66,0.15)', color: '#F5C842' }}
                >
                  Sponsored
                </span>
              )}

              <div>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: '#F0F0FA', fontFamily: 'var(--font-display)' }}
                >
                  {bank.name}
                </h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {bank.norwegian_label}
                </p>
              </div>

              <StarRating rating={bank.rating} />

              <div className="flex items-center gap-4 text-sm">
                <div>
                  <span style={{ color: 'rgba(255,255,255,0.45)' }}>Sparerente</span>{' '}
                  <span className="font-semibold" style={{ color: '#F5C842' }}>
                    {bank.savings_rate}%
                  </span>
                </div>
                <div>
                  <span style={{ color: 'rgba(255,255,255,0.45)' }}>Månedspris</span>{' '}
                  <span className="font-semibold" style={{ color: '#F0F0FA' }}>
                    {bank.monthly_fee} kr
                  </span>
                </div>
              </div>

              {bank.pros.length > 0 && (
                <ul className="text-sm flex flex-col gap-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {bank.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-2">
                      <span style={{ color: '#2DD4BF' }}>+</span> {pro}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto pt-4">
                <AffiliateButton url={bank.affiliate_url} bankSlug={bank.slug} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
