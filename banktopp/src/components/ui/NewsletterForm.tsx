import { useState } from 'react'
import { z } from 'zod'
import { Send } from 'lucide-react'
import { supabase } from '../../lib/supabase'

const emailSchema = z.string().email('Ugyldig e-postadresse')

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg('')

    const result = emailSchema.safeParse(email)
    if (!result.success) {
      setErrorMsg(result.error.issues[0].message)
      return
    }

    setStatus('loading')
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email })

      if (error) {
        if (error.code === '23505') {
          setErrorMsg('Denne e-postadressen er allerede registrert.')
        } else {
          setErrorMsg('Noe gikk galt. Prøv igjen.')
        }
        setStatus('error')
        return
      }

      setStatus('success')
      setEmail('')
    } catch {
      setErrorMsg('Noe gikk galt. Prøv igjen.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="text-sm font-medium" style={{ color: '#2DD4BF' }}>
        Takk for påmeldingen! Du hører fra oss snart.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <div className="flex-1">
        <label htmlFor="newsletter-email" className="sr-only">E-postadresse</label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="din@epost.no"
          aria-label="E-postadresse for nyhetsbrev"
          className="w-full px-4 py-2.5 rounded-lg text-sm"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#F0F0FA',
          }}
        />
        {errorMsg && <p className="text-xs mt-1" style={{ color: '#FF4D2B' }}>{errorMsg}</p>}
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105 disabled:opacity-50"
        style={{ background: '#F5C842', color: '#04040A' }}
      >
        <Send size={14} />
        {status === 'loading' ? 'Sender...' : 'Meld deg på'}
      </button>
    </form>
  )
}
