import { TrendingUp } from 'lucide-react'

const TICKER_ITEMS = [
  { label: 'NIBOR 3M', value: '4.35%' },
  { label: 'NOK/EUR', value: '11.82' },
  { label: 'NOK/USD', value: '10.58' },
  { label: 'Boliglånsrente', value: '5.4%' },
  { label: 'Innskuddsgaranti', value: '2 000 000 kr' },
]

export default function TickerBar() {
  return (
    <div
      className="ticker-bar w-full overflow-hidden"
      style={{
        height: 36,
        background: 'linear-gradient(90deg, #0F0F1A 0%, #1a1a2e 50%, #0F0F1A 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div className="flex items-center h-full px-4 gap-8 overflow-x-auto whitespace-nowrap">
        <TrendingUp size={14} style={{ color: '#2DD4BF', flexShrink: 0 }} />
        {TICKER_ITEMS.map((item) => (
          <span key={item.label} className="flex items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
            <span>{item.label}:</span>
            <span style={{ color: '#F5C842', fontFamily: 'var(--font-mono)' }}>{item.value}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
