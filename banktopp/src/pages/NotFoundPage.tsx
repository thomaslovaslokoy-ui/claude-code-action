import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div
      style={{
        maxWidth: 600,
        margin: '0 auto',
        padding: '6rem 1.5rem',
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          color: '#F0F0FA',
          fontSize: '6rem',
          marginBottom: '1rem',
          lineHeight: 1,
        }}
      >
        404
      </h1>
      <p
        style={{
          color: 'rgba(255,255,255,0.45)',
          fontSize: '1.25rem',
          marginBottom: '2rem',
        }}
      >
        Siden du leter etter finnes ikke.
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          background: '#F5C842',
          color: '#04040A',
          padding: '0.75rem 1.5rem',
          borderRadius: 8,
          fontWeight: 700,
          fontSize: '1rem',
          textDecoration: 'none',
        }}
      >
        Tilbake til forsiden
      </Link>
    </div>
  )
}
