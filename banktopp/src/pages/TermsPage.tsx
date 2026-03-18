export default function TermsPage() {
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
        Vilkår og Betingelser
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem', marginBottom: '2.5rem' }}>
        Sist oppdatert: Mars 2026
      </p>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={h2Style}>Om BankTopp</h2>
        <p style={pStyle}>
          BankTopp er en uavhengig sammenligningstjeneste for norske banker.
          Tjenesten drives av NorwegianSpark SA (org.nr. 834 984 172).
          Ved å bruke BankTopp aksepterer du disse vilkårene.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={h2Style}>Affiliatlenker</h2>
        <div
          style={{
            background: '#0F0F1A',
            borderRadius: 8,
            padding: '1.25rem',
            border: '1px solid rgba(245,200,66,0.3)',
            marginBottom: '1rem',
          }}
        >
          <p style={{ color: '#F5C842', fontWeight: 700, fontSize: '1rem', margin: 0 }}>
            BankTopp inneholder affiliatlenker.
          </p>
        </div>
        <p style={pStyle}>
          Når du klikker på en lenke til en bank og åpner konto eller kjøper et produkt,
          kan BankTopp motta en provisjon fra banken. Dette koster deg ingenting ekstra.
          Affiliatinntekter er med på å finansiere driften av BankTopp slik at vi kan
          fortsette å tilby gratis sammenligning av banker.
        </p>
        <p style={pStyle}>
          Affiliatlenker er merket med en tydelig knapp. Provisjonen vi mottar påvirker
          ikke våre vurderinger eller rangeringer, men kan påvirke rekkefølgen i listene
          der sponsede banker vises.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={h2Style}>Sponset innhold</h2>
        <p style={pStyle}>
          Banker som betaler for synlighet på BankTopp er tydelig merket med
          ⚡-symbolet (Sponset). Sponset innhold er alltid merket og skilt fra
          redaksjonelt innhold. Sponsing påvirker ikke de uavhengige vurderingene
          våre av bankene.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={h2Style}>Ikke finansiell rådgivning</h2>
        <div
          style={{
            background: '#0F0F1A',
            borderRadius: 8,
            padding: '1.25rem',
            border: '1px solid rgba(239,68,68,0.3)',
            marginBottom: '1rem',
          }}
        >
          <p style={{ color: '#ef4444', fontWeight: 700, fontSize: '1rem', margin: 0 }}>
            Ikke finansiell rådgivning.
          </p>
        </div>
        <p style={pStyle}>
          Informasjonen på BankTopp er kun ment som generell informasjon og utgjør
          ikke finansiell rådgivning. Vi anbefaler at du alltid gjør din egen
          undersøkelse og ved behov konsulterer en kvalifisert finansrådgiver
          før du tar økonomiske beslutninger.
        </p>
        <p style={pStyle}>
          BankTopp garanterer ikke at informasjonen på nettsiden er fullstendig,
          nøyaktig eller oppdatert til enhver tid. Renter, gebyrer og vilkår kan
          endres av bankene uten forvarsel. Vi oppfordrer deg til å alltid sjekke
          gjeldende vilkår direkte hos banken.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={h2Style}>Ansvarsbegrensning</h2>
        <p style={pStyle}>
          BankTopp er ikke ansvarlig for tap eller skade som følge av bruk av
          informasjonen på nettsiden, inkludert men ikke begrenset til direkte,
          indirekte eller følgeskader. Bruk av tjenesten skjer på eget ansvar.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={h2Style}>Immaterielle rettigheter</h2>
        <p style={pStyle}>
          Alt innhold på BankTopp, inkludert tekst, grafikk, logoer, bilder og
          programvare, er beskyttet av opphavsrett og tilhører NorwegianSpark SA
          eller våre lisensgivere. Uautorisert bruk av innholdet er forbudt.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={h2Style}>Lovvalg og verneting</h2>
        <p style={pStyle}>
          Disse vilkårene er underlagt norsk lov. Eventuelle tvister som oppstår
          i forbindelse med bruk av BankTopp skal søkes løst i minnelighet.
          Dersom dette ikke fører frem, skal tvisten avgjøres av Bergen tingrett
          som verneting.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={h2Style}>Endringer</h2>
        <p style={pStyle}>
          BankTopp forbeholder seg retten til å endre disse vilkårene når som helst.
          Endringer trer i kraft ved publisering på denne siden. Vi anbefaler at du
          jevnlig sjekker denne siden for oppdateringer.
        </p>
      </section>

      <section
        style={{
          background: '#0F0F1A',
          borderRadius: 8,
          padding: '1.25rem',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9375rem', margin: 0 }}>
          Spørsmål om vilkårene? Kontakt oss på{' '}
          <a href="mailto:norwegianspark@gmail.com" style={{ color: '#F5C842' }}>
            norwegianspark@gmail.com
          </a>
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

const pStyle: React.CSSProperties = {
  color: 'rgba(255,255,255,0.65)',
  fontSize: '1rem',
  lineHeight: 1.7,
}
