import { useState } from 'react'
import { z } from 'zod'
import { supabase } from '../lib/supabase'

const formSchema = z.object({
  name: z.string().min(1, 'Navn er påkrevd'),
  company: z.string().min(1, 'Selskap er påkrevd'),
  email: z.string().email('Ugyldig e-postadresse'),
  tier: z.enum(['standard', 'featured']),
  message: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

export default function AdvertisePage() {
  const [form, setForm] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    tier: 'standard',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    const result = formSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FormData
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message
        }
      }
      setErrors(fieldErrors)
      return
    }

    setSubmitting(true)
    try {
      const { error } = await supabase.from('advertise_inquiries').insert({
        name: result.data.name,
        company: result.data.company,
        email: result.data.email,
        tier: result.data.tier,
        message: result.data.message ?? null,
      })
      if (error) throw error
      setSubmitted(true)
    } catch {
      setSubmitError('Noe gikk galt. Vennligst prøv igjen senere.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            color: '#F0F0FA',
            fontSize: '2rem',
            marginBottom: '1rem',
          }}
        >
          Takk for din henvendelse!
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.0625rem' }}>
          Vi tar kontakt innen 1–2 virkedager.
        </p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem' }}>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          color: '#F0F0FA',
          fontSize: '2.5rem',
          marginBottom: '0.75rem',
        }}
      >
        Annonsere på BankTopp
      </h1>
      <p
        style={{
          color: 'rgba(255,255,255,0.45)',
          fontSize: '1.0625rem',
          marginBottom: '2.5rem',
          maxWidth: 600,
        }}
      >
        Nå tusenvis av nordmenn som aktivt sammenligner banker. Velg en plan som passer dine behov.
      </p>

      {/* Pricing Tiers */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}
      >
        {/* Standard */}
        <div
          style={{
            background: '#0F0F1A',
            borderRadius: 12,
            padding: '2rem',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              color: '#F0F0FA',
              fontSize: '1.5rem',
              marginBottom: '0.5rem',
            }}
          >
            Standard
          </h2>
          <div
            style={{
              color: '#F5C842',
              fontSize: '2rem',
              fontWeight: 700,
              marginBottom: '1.25rem',
            }}
          >
            2 490 kr
            <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', fontWeight: 400 }}>
              /mnd
            </span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            <li style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9375rem' }}>
              <span style={{ color: '#F5C842', marginRight: '0.5rem' }}>⚡</span>
              Sponset-badge på bankkort
            </li>
            <li style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9375rem' }}>
              <span style={{ color: '#2DD4BF', marginRight: '0.5rem' }}>✓</span>
              Øverst i relevant kategori
            </li>
          </ul>
        </div>

        {/* Featured */}
        <div
          style={{
            background: '#0F0F1A',
            borderRadius: 12,
            padding: '2rem',
            border: '1px solid rgba(245,200,66,0.3)',
            position: 'relative',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: -12,
              left: 24,
              background: '#F5C842',
              color: '#04040A',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '4px 12px',
              borderRadius: 4,
            }}
          >
            Populær
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              color: '#F0F0FA',
              fontSize: '1.5rem',
              marginBottom: '0.5rem',
            }}
          >
            Featured
          </h2>
          <div
            style={{
              color: '#F5C842',
              fontSize: '2rem',
              fontWeight: 700,
              marginBottom: '1.25rem',
            }}
          >
            7 490 kr
            <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', fontWeight: 400 }}>
              /mnd
            </span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            <li style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9375rem' }}>
              <span style={{ color: '#2DD4BF', marginRight: '0.5rem' }}>✓</span>
              Forsideplassering
            </li>
            <li style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9375rem' }}>
              <span style={{ color: '#2DD4BF', marginRight: '0.5rem' }}>✓</span>
              Kategoritopp i alle relevante kategorier
            </li>
            <li style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9375rem' }}>
              <span style={{ color: '#F5C842', marginRight: '0.5rem' }}>★</span>
              &quot;Redaktørens valg&quot;-merke
            </li>
          </ul>
        </div>
      </div>

      {/* Contact Form */}
      <section
        style={{
          background: '#0F0F1A',
          borderRadius: 12,
          padding: '2rem',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            color: '#F0F0FA',
            fontSize: '1.5rem',
            marginBottom: '1.5rem',
          }}
        >
          Kontakt oss
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <FormField
            label="Navn"
            error={errors.name}
            value={form.name}
            onChange={(v) => updateField('name', v)}
          />
          <FormField
            label="Selskap"
            error={errors.company}
            value={form.company}
            onChange={(v) => updateField('company', v)}
          />
          <FormField
            label="E-post"
            type="email"
            error={errors.email}
            value={form.email}
            onChange={(v) => updateField('email', v)}
          />

          <div>
            <label
              style={{
                color: 'rgba(255,255,255,0.65)',
                fontSize: '0.875rem',
                display: 'block',
                marginBottom: '0.375rem',
              }}
            >
              Plan
            </label>
            <select
              value={form.tier}
              onChange={(e) => updateField('tier', e.target.value as 'standard' | 'featured')}
              style={{
                width: '100%',
                background: '#04040A',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                padding: '0.75rem 1rem',
                color: '#F0F0FA',
                fontSize: '0.9375rem',
              }}
            >
              <option value="standard">Standard — 2 490 kr/mnd</option>
              <option value="featured">Featured — 7 490 kr/mnd</option>
            </select>
          </div>

          <div>
            <label
              style={{
                color: 'rgba(255,255,255,0.65)',
                fontSize: '0.875rem',
                display: 'block',
                marginBottom: '0.375rem',
              }}
            >
              Melding (valgfritt)
            </label>
            <textarea
              value={form.message}
              onChange={(e) => updateField('message', e.target.value)}
              rows={4}
              style={{
                width: '100%',
                background: '#04040A',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                padding: '0.75rem 1rem',
                color: '#F0F0FA',
                fontSize: '0.9375rem',
                resize: 'vertical',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {submitError && (
            <p style={{ color: '#ef4444', fontSize: '0.875rem', margin: 0 }}>{submitError}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            style={{
              background: '#F5C842',
              color: '#04040A',
              border: 'none',
              borderRadius: 8,
              padding: '0.875rem 2rem',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: submitting ? 'not-allowed' : 'pointer',
              opacity: submitting ? 0.6 : 1,
              alignSelf: 'flex-start',
            }}
          >
            {submitting ? 'Sender...' : 'Send forespørsel'}
          </button>
        </form>
      </section>
    </div>
  )
}

function FormField({
  label,
  value,
  onChange,
  error,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  type?: string
}) {
  return (
    <div>
      <label
        style={{
          color: 'rgba(255,255,255,0.65)',
          fontSize: '0.875rem',
          display: 'block',
          marginBottom: '0.375rem',
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          background: '#04040A',
          border: `1px solid ${error ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: 8,
          padding: '0.75rem 1rem',
          color: '#F0F0FA',
          fontSize: '0.9375rem',
          boxSizing: 'border-box',
        }}
      />
      {error && (
        <p style={{ color: '#ef4444', fontSize: '0.75rem', margin: '0.25rem 0 0' }}>{error}</p>
      )}
    </div>
  )
}
