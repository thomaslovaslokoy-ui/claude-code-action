export default function AboutPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '3rem 1.5rem' }}>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          color: '#F0F0FA',
          fontSize: '2.5rem',
          marginBottom: '2rem',
        }}
      >
        Om BankTopp
      </h1>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            color: '#F0F0FA',
            fontSize: '1.5rem',
            marginBottom: '1rem',
          }}
        >
          Vår misjon
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.0625rem', lineHeight: 1.7 }}>
          BankTopp hjelper norske forbrukere med å finne den beste banken for sine behov.
          Vi sammenligner sparerenter, gebyrer, apper og kundeservice på tvers av alle norske
          banker — fra de største forretningsbankene til lokale sparebanker og nye digitale utfordrere.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.0625rem', lineHeight: 1.7, marginTop: '1rem' }}>
          Vårt mål er å gjøre det enkelt å ta informerte valg om personlig økonomi.
          Alle sammenligninger er basert på offentlig tilgjengelige data, og vi oppdaterer
          informasjonen jevnlig for å sikre at du alltid har tilgang til de nyeste tallene.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            color: '#F0F0FA',
            fontSize: '1.5rem',
            marginBottom: '1rem',
          }}
        >
          Metodikk
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.0625rem', lineHeight: 1.7 }}>
          Våre vurderinger er basert på en kombinasjon av kvantitative data og kvalitativ analyse.
          Vi evaluerer banker på seks hovedkategorier: app-kvalitet, gebyrer, avkastning,
          tilgjengelighet, kundeservice og sikkerhet. Hver kategori vektes likt i den samlede
          ratingen, som gir en score fra 1 til 5.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.0625rem', lineHeight: 1.7, marginTop: '1rem' }}>
          Sponsede banker er tydelig merket med ⚡-ikonet. Sponsing påvirker ikke vurderingene
          våre, men kan påvirke plasseringen i listene. Vi mottar provisjon når du klikker på
          affiliatlenker og åpner konto hos en bank gjennom BankTopp.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            color: '#F0F0FA',
            fontSize: '1.5rem',
            marginBottom: '1rem',
          }}
        >
          Teamet
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.0625rem', lineHeight: 1.7 }}>
          BankTopp drives av et lite team med bakgrunn fra finans og teknologi.
          Vi er lidenskapelig opptatt av å gjøre finansiell informasjon tilgjengelig
          for alle, og jobber kontinuerlig med å forbedre sammenligningsverktøyene våre.
        </p>
      </section>

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
            marginBottom: '1.25rem',
          }}
        >
          Kontaktinformasjon
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', margin: 0 }}>
            <strong style={{ color: '#F0F0FA' }}>Selskap:</strong> NorwegianSpark SA
          </p>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', margin: 0 }}>
            <strong style={{ color: '#F0F0FA' }}>Org.nr:</strong> 834 984 172
          </p>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', margin: 0 }}>
            <strong style={{ color: '#F0F0FA' }}>E-post:</strong>{' '}
            <a href="mailto:norwegianspark@gmail.com" style={{ color: '#F5C842' }}>
              norwegianspark@gmail.com
            </a>
          </p>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', margin: 0 }}>
            <strong style={{ color: '#F0F0FA' }}>Telefon:</strong>{' '}
            <a href="tel:+4799737467" style={{ color: '#F5C842' }}>
              +47 99 73 74 67
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
