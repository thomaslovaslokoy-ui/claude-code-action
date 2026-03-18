import NewsletterForm from '../../components/ui/NewsletterForm'

export default function NewsletterCTA() {
  return (
    <section className="px-6 py-16">
      <div
        className="max-w-2xl mx-auto rounded-xl p-8 text-center flex flex-col items-center gap-4"
        style={{
          background: '#0F0F1A',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <h2
          className="text-2xl md:text-3xl font-bold"
          style={{ fontFamily: 'var(--font-display)', color: '#F0F0FA' }}
        >
          Hold deg oppdatert
        </h2>

        <p className="text-sm max-w-md" style={{ color: 'rgba(255,255,255,0.45)' }}>
          Få ukentlige oppdateringer om de beste bankrentene i Norge.
        </p>

        <div className="w-full max-w-sm mt-2">
          <NewsletterForm />
        </div>
      </div>
    </section>
  )
}
