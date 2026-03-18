export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '3rem 1.5rem' }}>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          color: '#F0F0FA',
          fontSize: '2.5rem',
          marginBottom: '0.5rem',
        }}
      >
        Personvernerklæring
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem', marginBottom: '2.5rem' }}>
        Sist oppdatert: Mars 2026
      </p>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={h2Style}>Behandlingsansvarlig</h2>
        <p style={pStyle}>
          Behandlingsansvarlig for personopplysninger innsamlet via BankTopp er:
        </p>
        <div style={{ ...cardStyle, marginTop: '1rem' }}>
          <p style={{ ...pStyle, margin: 0 }}>
            <strong style={{ color: '#F0F0FA' }}>NorwegianSpark SA</strong>
          </p>
          <p style={{ ...pStyle, margin: '0.25rem 0 0' }}>Org.nr: 834 984 172</p>
          <p style={{ ...pStyle, margin: '0.25rem 0 0' }}>
            E-post:{' '}
            <a href="mailto:norwegianspark@gmail.com" style={{ color: '#F5C842' }}>
              norwegianspark@gmail.com
            </a>
          </p>
        </div>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={h2Style}>Hvilke data samler vi inn?</h2>

        <h3 style={h3Style}>E-postadresse (nyhetsbrev)</h3>
        <p style={pStyle}>
          Dersom du melder deg på vårt nyhetsbrev, lagrer vi e-postadressen din.
          Denne brukes utelukkende til å sende deg nyhetsbrev om banksammenligning og
          sparetips. Du kan når som helst melde deg av via lenken i nyhetsbrevet.
        </p>

        <h3 style={h3Style}>Klikkdata (anonyme)</h3>
        <p style={pStyle}>
          Vi registrerer anonyme klikkhendelser på affiliatlenker for å måle
          effektiviteten til tjenesten vår. Disse dataene kan ikke knyttes tilbake
          til enkeltpersoner.
        </p>

        <h3 style={h3Style}>Informasjonskapsler (cookies)</h3>
        <p style={pStyle}>
          BankTopp bruker informasjonskapsler for å forbedre brukeropplevelsen.
          Vi skiller mellom nødvendige informasjonskapsler (som er påkrevd for at
          nettsiden skal fungere) og analytiske informasjonskapsler (som krever
          ditt samtykke).
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={h2Style}>Tredjeparter</h2>

        <h3 style={h3Style}>Supabase</h3>
        <p style={pStyle}>
          Vi bruker Supabase som database- og autentiseringsløsning.
          Data lagres på servere innenfor EU/EØS.
        </p>

        <h3 style={h3Style}>Stripe</h3>
        <p style={pStyle}>
          Betalinger for annonseringstjenester håndteres av Stripe.
          Stripe behandler betalingsinformasjon i henhold til PCI DSS-standarden.
          Vi lagrer aldri kortnumre eller betalingsdetaljer selv.
        </p>

        <h3 style={h3Style}>Google Analytics</h3>
        <p style={pStyle}>
          Vi bruker Google Analytics for å forstå hvordan besøkende bruker
          nettsiden. Google Analytics aktiveres kun etter at du har gitt ditt
          samtykke via vår cookiebanner (consent-gated). IP-adresser anonymiseres.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={h2Style}>Datatilsynet</h2>
        <p style={pStyle}>
          Datatilsynet er den norske tilsynsmyndigheten for personvern.
          Dersom du mener at behandlingen av dine personopplysninger ikke er i
          samsvar med personvernregelverket, har du rett til å klage til
          Datatilsynet. Mer informasjon finner du på{' '}
          <a
            href="https://www.datatilsynet.no"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#F5C842' }}
          >
            datatilsynet.no
          </a>
          .
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={h2Style}>Dine rettigheter</h2>
        <p style={pStyle}>
          I henhold til personopplysningsloven og GDPR har du følgende rettigheter:
        </p>
        <ul style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
          <li>
            <strong style={{ color: '#F0F0FA' }}>Innsyn:</strong> Du har rett til å få vite
            hvilke personopplysninger vi har lagret om deg.
          </li>
          <li>
            <strong style={{ color: '#F0F0FA' }}>Sletting:</strong> Du har rett til å be om at
            vi sletter dine personopplysninger.
          </li>
          <li>
            <strong style={{ color: '#F0F0FA' }}>Portabilitet:</strong> Du har rett til å motta
            dine personopplysninger i et strukturert, alminnelig brukt og maskinlesbart format.
          </li>
        </ul>
        <p style={pStyle}>
          For å utøve dine rettigheter, ta kontakt med oss på{' '}
          <a href="mailto:norwegianspark@gmail.com" style={{ color: '#F5C842' }}>
            norwegianspark@gmail.com
          </a>
          .
        </p>
      </section>
    </div>
  )
}

const h2Style: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  color: '#F0F0FA',
  fontSize: '1.5rem',
  marginBottom: '1rem',
}

const h3Style: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  color: '#F0F0FA',
  fontSize: '1.125rem',
  marginBottom: '0.5rem',
  marginTop: '1.25rem',
}

const pStyle: React.CSSProperties = {
  color: 'rgba(255,255,255,0.65)',
  fontSize: '1rem',
  lineHeight: 1.7,
}

const cardStyle: React.CSSProperties = {
  background: '#0F0F1A',
  borderRadius: 8,
  padding: '1.25rem',
  border: '1px solid rgba(255,255,255,0.06)',
}
