import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const rateData = [
  { month: 'Jan', DNB: 3.8, Bulder: 4.5, Bransjesnitt: 3.6 },
  { month: 'Feb', DNB: 3.85, Bulder: 4.55, Bransjesnitt: 3.65 },
  { month: 'Mar', DNB: 3.9, Bulder: 4.6, Bransjesnitt: 3.7 },
  { month: 'Apr', DNB: 3.95, Bulder: 4.7, Bransjesnitt: 3.75 },
  { month: 'Mai', DNB: 4.0, Bulder: 4.8, Bransjesnitt: 3.8 },
  { month: 'Jun', DNB: 4.05, Bulder: 4.85, Bransjesnitt: 3.85 },
]

export default function RateChartSection() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-2xl md:text-3xl font-bold text-center mb-2"
          style={{ fontFamily: 'var(--font-display)', color: '#F0F0FA' }}
        >
          Rentehistorikk
        </h2>

        <p
          className="text-center text-xs mb-8"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          Ikke finansiell rådgivning.
        </p>

        <div
          className="rounded-xl p-6"
          style={{
            background: '#0F0F1A',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={rateData}>
              <XAxis
                dataKey="month"
                tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={['dataMin - 0.2', 'dataMax + 0.2']}
                tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `${v}%`}
              />
              <Tooltip
                contentStyle={{
                  background: '#0F0F1A',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 8,
                  color: '#F0F0FA',
                  fontSize: 13,
                }}
                formatter={(value) => `${value}%`}
              />
              <Line
                type="monotone"
                dataKey="DNB"
                stroke="#F5C842"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="Bulder"
                stroke="#2DD4BF"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="Bransjesnitt"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth={2}
                dot={false}
                strokeDasharray="4 4"
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="flex items-center justify-center gap-6 mt-4 text-xs">
            <span className="flex items-center gap-2">
              <span className="inline-block w-3 h-0.5" style={{ background: '#F5C842' }} />
              <span style={{ color: 'rgba(255,255,255,0.45)' }}>DNB</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block w-3 h-0.5" style={{ background: '#2DD4BF' }} />
              <span style={{ color: 'rgba(255,255,255,0.45)' }}>Bulder Bank</span>
            </span>
            <span className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-0.5"
                style={{ background: 'rgba(255,255,255,0.3)' }}
              />
              <span style={{ color: 'rgba(255,255,255,0.45)' }}>Bransjesnitt</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
