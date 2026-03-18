const stats = [
  { value: '60+', label: 'Banker sammenlignet' },
  { value: '5.10%', label: 'Høyeste sparerente' },
  { value: '0 kr', label: 'Laveste månedspris' },
  { value: '4.8', label: 'Gjennomsnittlig rating' },
] as const

export default function LiveStatsBar() {
  return (
    <section className="px-6 py-8">
      <div
        className="max-w-5xl mx-auto flex flex-wrap items-center justify-around gap-6 px-6 py-5 rounded-xl"
        style={{
          background: '#0F0F1A',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
            <span
              className="text-2xl md:text-3xl font-bold"
              style={{ color: '#F5C842', fontFamily: 'var(--font-display)' }}
            >
              {stat.value}
            </span>
            <span className="text-xs md:text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
