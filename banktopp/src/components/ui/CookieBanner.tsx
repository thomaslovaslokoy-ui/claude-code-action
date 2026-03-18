import { useState, useEffect } from 'react'
import { Cookie, X } from 'lucide-react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('banktopp-cookie-consent')
    if (!consent) {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem('banktopp-cookie-consent', 'accepted')
    setVisible(false)
    // Load GA4 after consent
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID
    if (gaId) {
      const script = document.createElement('script')
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
      script.async = true
      document.head.appendChild(script)
      script.onload = () => {
        const w = window as unknown as Window & { dataLayer: unknown[]; gtag: (...args: unknown[]) => void }
        w.dataLayer = w.dataLayer || []
        w.gtag = function () { w.dataLayer.push(arguments) }
        w.gtag('js', new Date())
        w.gtag('config', gaId)
      }
    }
  }

  function decline() {
    localStorage.setItem('banktopp-cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4"
      style={{ background: 'rgba(15, 15, 26, 0.98)', borderTop: '1px solid rgba(255,255,255,0.07)' }}
      role="dialog"
      aria-label="Informasjonskapsler"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <Cookie size={20} style={{ color: '#F5C842', flexShrink: 0, marginTop: 2 }} />
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Vi bruker informasjonskapsler for å analysere trafikk og forbedre opplevelsen din.
            Les mer i vår <a href="/personvern" className="underline" style={{ color: '#F5C842' }}>personvernerklæring</a>.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={decline}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ color: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.05)' }}
          >
            Avslå
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            style={{ background: '#F5C842', color: '#04040A' }}
          >
            Godta
          </button>
          <button onClick={decline} aria-label="Lukk" style={{ color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
