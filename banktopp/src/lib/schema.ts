import type { Bank } from './banks-data'

export function buildBankSchema(bank: Bank) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: bank.name,
    description: bank.description,
    foundingDate: bank.established?.toString(),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: bank.rating,
      bestRating: 5,
      worstRating: 1,
    },
  }
}

export function buildFAQSchema(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  }
}
