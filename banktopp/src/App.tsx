import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'

const HomePage = lazy(() => import('./pages/HomePage'))
const BanksPage = lazy(() => import('./pages/BanksPage'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const BankDetail = lazy(() => import('./pages/BankDetailPage'))
const ComparePage = lazy(() => import('./pages/ComparePage'))
const QuizPage = lazy(() => import('./pages/QuizPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const AdvertisePage = lazy(() => import('./pages/AdvertisePage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const NotFound = lazy(() => import('./pages/NotFoundPage'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ height: '100vh', background: '#04040A' }} />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/banker" element={<BanksPage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/bank/:slug" element={<BankDetail />} />
            <Route path="/sammenlign" element={<ComparePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/om-oss" element={<AboutPage />} />
            <Route path="/annonsere" element={<AdvertisePage />} />
            <Route path="/personvern" element={<PrivacyPage />} />
            <Route path="/vilkar" element={<TermsPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
