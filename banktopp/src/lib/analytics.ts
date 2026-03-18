export function trackEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as Window & { gtag: (...args: unknown[]) => void }).gtag('event', eventName, params)
  }
}

export function trackPageView(path: string) {
  trackEvent('page_view', { page_path: path })
}

export function trackAffiliateClick(bankSlug: string) {
  trackEvent('affiliate_click', { bank_slug: bankSlug })
}
