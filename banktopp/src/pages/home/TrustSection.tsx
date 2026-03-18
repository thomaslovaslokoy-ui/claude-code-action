import { Shield, Lock, Star, Award } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface TrustItem {
  icon: LucideIcon
  title: string
  description: string
}

const trustItems: TrustItem[] = [
  {
    icon: Shield,
    title: 'Innskuddsgaranti',
    description: 'Alle norske banker dekket opp til 2 mill. kr',
  },
  {
    icon: Lock,
    title: 'BankID-sikkerhet',
    description: 'Sikker innlogging med Norges ledende ID-løsning',
  },
  {
    icon: Star,
    title: 'Uavhengige rangeringer',
    description: 'Ingen betalt påvirkning av plasseringer',
  },
  {
    icon: Award,
    title: '60+ banker',
    description: 'Norges mest komplette banksammenligning',
  },
]

export default function TrustSection() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trustItems.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.title}
              className="flex flex-col items-center text-center gap-3 p-6 rounded-xl"
              style={{
                background: '#0F0F1A',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <Icon size={28} style={{ color: '#F5C842' }} aria-hidden="true" />
              <h3
                className="text-sm font-semibold"
                style={{ color: '#F0F0FA', fontFamily: 'var(--font-display)' }}
              >
                {item.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {item.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
