import { lazy, Suspense } from 'react'
import HeroSection from './home/HeroSection'
import LiveStatsBar from './home/LiveStatsBar'
import Top3Section from './home/Top3Section'

const WeeklyPick = lazy(() => import('./home/WeeklyPick'))
const ComparisonTablePreview = lazy(() => import('./home/ComparisonTablePreview'))
const CategoryGrid = lazy(() => import('./home/CategoryGrid'))
const RateChartSection = lazy(() => import('./home/RateChartSection'))
const TrustSection = lazy(() => import('./home/TrustSection'))
const NewsletterCTA = lazy(() => import('./home/NewsletterCTA'))

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <LiveStatsBar />
      <Top3Section />
      <Suspense fallback={<div style={{ height: 400 }} />}>
        <WeeklyPick />
        <ComparisonTablePreview />
        <CategoryGrid />
        <RateChartSection />
        <TrustSection />
        <NewsletterCTA />
      </Suspense>
    </div>
  )
}
