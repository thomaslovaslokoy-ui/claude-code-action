import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center px-6 py-24 md:py-36 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(245,200,66,0.12) 0%, transparent 70%), #04040A',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-3xl mx-auto flex flex-col items-center gap-6"
      >
        <h1
          className="text-4xl md:text-6xl font-bold leading-tight"
          style={{ fontFamily: 'var(--font-display)', color: '#F0F0FA' }}
        >
          Finn den beste norske banken.
        </h1>

        <p
          className="text-lg md:text-xl max-w-2xl"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          Sammenlign 60+ norske banker på rente, gebyrer og app-opplevelse.
          Gratis og uavhengig siden 2024.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          <Link
            to="/banker"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-base font-semibold transition-all hover:scale-105"
            style={{ background: '#F5C842', color: '#04040A' }}
          >
            Se alle banker &rarr;
          </Link>
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-base font-semibold transition-all hover:scale-105"
            style={{
              border: '1px solid rgba(255,255,255,0.07)',
              color: '#F0F0FA',
              background: '#0F0F1A',
            }}
          >
            Ta quiz
          </Link>
        </div>

        <div
          className="flex flex-wrap items-center justify-center gap-3 md:gap-6 mt-8 text-sm"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          <span>60+ banker</span>
          <span aria-hidden="true">|</span>
          <span>8 kategorier</span>
          <span aria-hidden="true">|</span>
          <span>Oppdatert mars 2026</span>
          <span aria-hidden="true">|</span>
          <span>4.8/5 brukersnitt</span>
        </div>
      </motion.div>
    </section>
  )
}
