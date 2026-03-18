import { BANKS } from '../../lib/banks-data'
import type { Bank } from '../../lib/banks-data'
import StarRating from '../../components/ui/StarRating'
import AffiliateButton from '../../components/ui/AffiliateButton'

const topBank: Bank = [...BANKS].sort((a, b) => b.rating - a.rating)[0]

export default function WeeklyPick() {
  return (
    <section className="px-6 py-16">
      <div
        className="max-w-3xl mx-auto rounded-xl p-8 relative overflow-hidden"
        style={{
          background: '#0F0F1A',
          borderLeft: '4px solid',
          borderImage: 'linear-gradient(180deg, #F5C842, rgba(245,200,66,0.2)) 1',
          border: undefined,
        }}
      >
        {/* Left gold gradient border via pseudo-element approach with inline style */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{
            background: 'linear-gradient(180deg, #F5C842, rgba(245,200,66,0.2))',
          }}
        />

        <div className="flex flex-col gap-5 pl-4">
          <span
            className="self-start text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
            style={{ background: 'rgba(45,212,191,0.15)', color: '#2DD4BF' }}
          >
            Ukens Anbefaling
          </span>

          <h3
            className="text-xl md:text-2xl font-bold"
            style={{ fontFamily: 'var(--font-display)', color: '#F0F0FA' }}
          >
            {topBank.name}
          </h3>

          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
            {topBank.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm">
            <StarRating rating={topBank.rating} />
            <div>
              <span style={{ color: 'rgba(255,255,255,0.45)' }}>Sparerente</span>{' '}
              <span className="font-semibold" style={{ color: '#F5C842' }}>
                {topBank.savings_rate}%
              </span>
            </div>
          </div>

          {topBank.pros.length > 0 && (
            <ul className="text-sm flex flex-col gap-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {topBank.pros.map((pro) => (
                <li key={pro} className="flex items-start gap-2">
                  <span style={{ color: '#2DD4BF' }}>+</span> {pro}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-2">
            <AffiliateButton url={topBank.affiliate_url} bankSlug={topBank.slug} />
          </div>
        </div>
      </div>
    </section>
  )
}
