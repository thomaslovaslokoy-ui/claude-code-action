import { useState, useMemo } from 'react'
import { BANKS } from '../lib/banks-data'
import type { Bank } from '../lib/banks-data'
import StarRating from '../components/ui/StarRating'
import AffiliateButton from '../components/ui/AffiliateButton'

interface Question {
  question: string
  options: string[]
}

const questions: Question[] = [
  {
    question: 'Hva er viktigst for deg?',
    options: ['Høy rente', 'Ingen gebyrer', 'God app', 'Internasjonalt bruk'],
  },
  {
    question: 'Hva skal kontoen brukes til?',
    options: ['Sparing', 'Dagligbank', 'BSU', 'Bedrift'],
  },
  {
    question: 'Hvor mye sparer du per måned?',
    options: ['Under 1 000 kr', '1 000–5 000 kr', 'Over 5 000 kr'],
  },
  {
    question: 'Bruker du Vipps?',
    options: ['Ja, daglig', 'Av og til', 'Nei'],
  },
  {
    question: 'Hva verdsetter du mest?',
    options: ['Norsk bank', 'Beste rente', 'Beste app', 'Lavest pris'],
  },
]

function scoreBank(bank: Bank, answers: (number | null)[]): number {
  let score = 0

  // Q1: Hva er viktigst for deg?
  if (answers[0] === 0) score += bank.savings_rate * 2 // Høy rente
  if (answers[0] === 1) score += bank.monthly_fee === 0 ? 10 : Math.max(0, 10 - bank.monthly_fee) // Ingen gebyrer
  if (answers[0] === 2) score += bank.ratings.app * 2 // God app
  if (answers[0] === 3) score += bank.swift_code ? 5 : 0 // Internasjonalt bruk

  // Q2: Hva skal kontoen brukes til?
  if (answers[1] === 0) score += bank.savings_rate * 2 // Sparing
  if (answers[1] === 1) score += bank.ratings.access * 1.5 // Dagligbank
  if (answers[1] === 2) score += bank.savings_rate * 1.5 // BSU
  if (answers[1] === 3) score += bank.ratings.fees * 1.5 // Bedrift

  // Q3: Hvor mye sparer du per måned?
  if (answers[2] === 0) score += bank.monthly_fee === 0 ? 5 : 0 // Under 1000
  if (answers[2] === 1) score += bank.savings_rate * 1.5 // 1000-5000
  if (answers[2] === 2) score += bank.savings_rate * 2 + bank.ratings.returns * 1.5 // Over 5000

  // Q4: Bruker du Vipps?
  if (answers[3] === 0) score += bank.vipps_support ? 8 : 0 // Ja, daglig
  if (answers[3] === 1) score += bank.vipps_support ? 4 : 0 // Av og til
  // Nei = no score change

  // Q5: Hva verdsetter du mest?
  if (answers[4] === 0) score += bank.country === 'Norge' ? 8 : 0 // Norsk bank
  if (answers[4] === 1) score += bank.savings_rate * 2.5 // Beste rente
  if (answers[4] === 2) score += bank.ratings.app * 2 // Beste app
  if (answers[4] === 3) score += bank.monthly_fee === 0 ? 10 : Math.max(0, 10 - bank.monthly_fee) // Lavest pris

  // Base score from overall rating
  score += bank.rating * 1.5

  return score
}

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null, null, null])

  const isComplete = currentStep >= questions.length

  const topBanks = useMemo(() => {
    if (!isComplete) return []
    return [...BANKS]
      .map((bank) => ({ bank, score: scoreBank(bank, answers) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
  }, [isComplete, answers])

  const selectAnswer = (optionIndex: number) => {
    const next = [...answers]
    next[currentStep] = optionIndex
    setAnswers(next)
    setCurrentStep(currentStep + 1)
  }

  const restart = () => {
    setCurrentStep(0)
    setAnswers([null, null, null, null, null])
  }

  const progress = Math.min(currentStep / questions.length, 1) * 100

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '3rem 1.5rem' }}>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          color: '#F0F0FA',
          fontSize: '2.5rem',
          marginBottom: '0.5rem',
          textAlign: 'center',
        }}
      >
        Finn din bank
      </h1>
      <p
        style={{
          color: 'rgba(255,255,255,0.45)',
          textAlign: 'center',
          marginBottom: '2.5rem',
          fontSize: '1.0625rem',
        }}
      >
        Svar på 5 spørsmål og få en personlig anbefaling.
      </p>

      {/* Progress bar */}
      <div
        style={{
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 4,
          height: 6,
          marginBottom: '2.5rem',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            background: '#F5C842',
            borderRadius: 4,
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      {!isComplete ? (
        <div>
          <p
            style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: '0.8125rem',
              marginBottom: '0.75rem',
            }}
          >
            Spørsmål {currentStep + 1} av {questions.length}
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              color: '#F0F0FA',
              fontSize: '1.5rem',
              marginBottom: '1.5rem',
            }}
          >
            {questions[currentStep].question}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {questions[currentStep].options.map((option, i) => (
              <button
                key={i}
                onClick={() => selectAnswer(i)}
                style={{
                  background: '#0F0F1A',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10,
                  padding: '1rem 1.25rem',
                  color: '#F0F0FA',
                  fontSize: '1rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#F5C842')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
              >
                {option}
              </button>
            ))}
          </div>

          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.45)',
                cursor: 'pointer',
                marginTop: '1.5rem',
                fontSize: '0.875rem',
              }}
            >
              ← Tilbake
            </button>
          )}
        </div>
      ) : (
        <div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              color: '#F0F0FA',
              fontSize: '1.75rem',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            Dine topp 3 banker
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.45)',
              textAlign: 'center',
              marginBottom: '2rem',
              fontSize: '0.9375rem',
            }}
          >
            Basert på dine svar anbefaler vi:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {topBanks.map(({ bank }, index) => (
              <div
                key={bank.id}
                style={{
                  background: '#0F0F1A',
                  borderRadius: 12,
                  padding: '1.5rem',
                  border: index === 0 ? '1px solid rgba(245,200,66,0.4)' : '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.75rem',
                  }}
                >
                  <span
                    style={{
                      background: index === 0 ? '#F5C842' : 'rgba(255,255,255,0.06)',
                      color: index === 0 ? '#04040A' : '#F0F0FA',
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.8125rem',
                      flexShrink: 0,
                    }}
                  >
                    {index + 1}
                  </span>
                  <span style={{ fontSize: '1.25rem' }}>{bank.flag}</span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: '#F0F0FA',
                      fontSize: '1.25rem',
                      margin: 0,
                    }}
                  >
                    {bank.name}
                  </h3>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <StarRating rating={bank.rating} />
                  <span style={{ color: '#F5C842', fontWeight: 700 }}>{bank.rating.toFixed(1)}</span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: '1.5rem',
                    fontSize: '0.875rem',
                    color: 'rgba(255,255,255,0.45)',
                    marginBottom: '1rem',
                  }}
                >
                  <span>
                    Rente: <strong style={{ color: '#2DD4BF' }}>{bank.savings_rate}%</strong>
                  </span>
                  <span>
                    Gebyr: <strong style={{ color: '#F0F0FA' }}>{bank.monthly_fee} kr/mnd</strong>
                  </span>
                  <span>
                    Min: <strong style={{ color: '#F0F0FA' }}>{bank.min_balance} kr</strong>
                  </span>
                </div>

                <AffiliateButton url={bank.affiliate_url} bankSlug={bank.slug} />
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              onClick={restart}
              style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                padding: '0.75rem 1.5rem',
                color: '#F0F0FA',
                fontSize: '0.9375rem',
                cursor: 'pointer',
              }}
            >
              Ta quizen på nytt
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
