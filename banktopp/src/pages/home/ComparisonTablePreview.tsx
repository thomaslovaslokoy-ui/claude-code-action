import { Link } from 'react-router-dom'
import { BANKS } from '../../lib/banks-data'
import type { Bank } from '../../lib/banks-data'
import StarRating from '../../components/ui/StarRating'

const top5: Bank[] = [...BANKS].sort((a, b) => b.rating - a.rating).slice(0, 5)

export default function ComparisonTablePreview() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-2xl md:text-3xl font-bold text-center mb-10"
          style={{ fontFamily: 'var(--font-display)', color: '#F0F0FA' }}
        >
          Sammenlign Banker
        </h2>

        <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
          <table
            className="w-full text-sm"
            aria-label="Banksammenligning"
            style={{ background: '#0F0F1A' }}
          >
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <th
                  scope="col"
                  className="text-left px-4 py-3 font-semibold"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  Bank
                </th>
                <th
                  scope="col"
                  className="text-left px-4 py-3 font-semibold"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  Rating
                </th>
                <th
                  scope="col"
                  className="text-left px-4 py-3 font-semibold"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  Sparerente
                </th>
                <th
                  scope="col"
                  className="text-left px-4 py-3 font-semibold"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  Månedspris
                </th>
                <th
                  scope="col"
                  className="text-left px-4 py-3 font-semibold"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  Innskuddsgaranti
                </th>
              </tr>
            </thead>
            <tbody>
              {top5.map((bank) => (
                <tr
                  key={bank.id}
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <td className="px-4 py-3 font-medium" style={{ color: '#F0F0FA' }}>
                    <span className="mr-2">{bank.flag}</span>
                    {bank.name}
                  </td>
                  <td className="px-4 py-3">
                    <StarRating rating={bank.rating} size={14} />
                  </td>
                  <td className="px-4 py-3" style={{ color: '#F5C842' }}>
                    {bank.savings_rate}%
                  </td>
                  <td className="px-4 py-3" style={{ color: '#F0F0FA' }}>
                    {bank.monthly_fee} kr
                  </td>
                  <td className="px-4 py-3">
                    {bank.deposit_insured ? (
                      <span style={{ color: '#2DD4BF' }} aria-label="Ja">
                        &#10003;
                      </span>
                    ) : (
                      <span style={{ color: 'rgba(255,255,255,0.25)' }} aria-label="Nei">
                        &#10007;
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-6">
          <Link
            to="/banker"
            className="inline-flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ color: '#F5C842' }}
          >
            Se alle banker &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
