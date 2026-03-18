import { useEffect, useState } from 'react'

interface AdBannerProps {
  slot: string
  format?: string
}

export default function AdBanner({ slot, format = 'auto' }: AdBannerProps) {
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('banktopp-cookie-consent')
    setConsented(consent === 'accepted')
  }, [])

  if (!consented) return null

  const clientId = import.meta.env.VITE_ADSENSE_CLIENT_ID
  if (!clientId) return null

  return (
    <div className="w-full flex justify-center py-4">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
