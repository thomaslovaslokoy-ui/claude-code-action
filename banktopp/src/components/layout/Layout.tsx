import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import TickerBar from './TickerBar'
import Footer from './Footer'
import CookieBanner from '../ui/CookieBanner'
import { useAnalytics } from '../../hooks/useAnalytics'

export default function Layout() {
  useAnalytics()

  return (
    <>
      <a href="#main-content" className="skip-nav">
        Hopp til hovedinnhold
      </a>
      <TickerBar />
      <header role="banner">
        <Navigation />
      </header>
      <main id="main-content" role="main" className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}
