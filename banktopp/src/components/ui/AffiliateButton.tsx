import { ExternalLink } from 'lucide-react'
import { trackAffiliateClick } from '../../lib/analytics'

interface AffiliateButtonProps {
  url: string | null
  bankSlug: string
  label?: string
}

export default function AffiliateButton({ url, bankSlug, label = 'Åpne konto' }: AffiliateButtonProps) {
  if (!url) return null

  return (
    <div className="flex flex-col items-start gap-1">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={() => trackAffiliateClick(bankSlug)}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105"
        style={{ background: '#F5C842', color: '#04040A' }}
      >
        {label} <ExternalLink size={14} />
      </a>
      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
        Affiliatlenke — vi kan motta provisjon
      </span>
    </div>
  )
}
