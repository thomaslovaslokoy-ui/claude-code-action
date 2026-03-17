"use client";

import { useState } from "react";
import Link from "next/link";
import { BANKS } from "@/lib/banks";
import type { Bank } from "@/lib/banks";
import BankCard from "@/components/banks/BankCard";

const questions = [
  {
    q: "What is your primary goal?",
    options: [
      { label: "Save money", value: "save" },
      { label: "Earn commission", value: "commission" },
      { label: "International transfers", value: "fx" },
      { label: "Investment banking", value: "invest" },
      { label: "Islamic banking", value: "islamic" },
    ],
  },
  {
    q: "Which region do you prefer?",
    options: [
      { label: "North America", value: "north-america" },
      { label: "Europe", value: "europe" },
      { label: "Asia-Pacific", value: "asia-pacific" },
      { label: "Middle East", value: "middle-east" },
      { label: "Any", value: "any" },
    ],
  },
  {
    q: "What's your monthly deposit amount?",
    options: [
      { label: "< $1,000", value: "low" },
      { label: "$1,000 - $10,000", value: "mid" },
      { label: "$10,000 - $100,000", value: "high" },
      { label: "$100,000+", value: "ultra" },
    ],
  },
  {
    q: "Do you need Shariah-compliant banking?",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    q: "What matters most?",
    options: [
      { label: "Highest APY", value: "apy" },
      { label: "Lowest fees", value: "fees" },
      { label: "Best app", value: "app" },
      { label: "Commission rate", value: "commission" },
    ],
  },
];

function scoreBank(bank: Bank, answers: string[]): number {
  let score = 0;
  const [goal, region, deposit, shariah, priority] = answers;

  if (goal === "save" && bank.savingsApy >= 4) score += 3;
  if (goal === "commission" && bank.commission >= 2) score += 3;
  if (goal === "fx" && bank.type === "digital") score += 3;
  if (goal === "invest" && bank.type === "investment") score += 3;
  if (goal === "islamic" && bank.type === "islamic") score += 5;

  if (region !== "any" && bank.region === region) score += 2;

  if (deposit === "ultra" && bank.type === "private") score += 2;
  if (deposit === "low" && bank.minDeposit === 0) score += 1;

  if (shariah === "yes" && bank.type === "islamic") score += 5;
  if (shariah === "yes" && bank.type !== "islamic") score -= 3;

  if (priority === "apy") score += bank.savingsApy / 2;
  if (priority === "fees" && bank.ratingBreakdown.fees >= 4) score += 2;
  if (priority === "app" && bank.ratingBreakdown.app >= 5) score += 2;
  if (priority === "commission") score += bank.commission;

  score += bank.rating;
  return score;
}

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (value: string) => {
    const next = [...answers, value];
    setAnswers(next);
    setStep(step + 1);
  };

  const results =
    step >= questions.length
      ? BANKS.map((b) => ({ bank: b, score: scoreBank(b, answers) }))
          .sort((a, b) => b.score - a.score)
          .slice(0, 3)
          .map((r) => r.bank)
      : [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-2 font-display text-3xl font-bold">
        Find Your Perfect Bank
      </h1>
      <p className="mb-8 text-sm" style={{ color: "var(--text-muted)" }}>
        Answer 5 questions and we&apos;ll match you with the best banks
      </p>

      {step < questions.length ? (
        <div
          className="rounded-xl border p-8"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
          }}
        >
          <div className="mb-4 flex gap-1">
            {questions.map((_, i) => (
              <div
                key={i}
                className="h-1 flex-1 rounded-full"
                style={{
                  backgroundColor:
                    i <= step ? "var(--gold)" : "var(--bg-elevated)",
                }}
              />
            ))}
          </div>
          <p className="mb-2 text-sm" style={{ color: "var(--text-subtle)" }}>
            Question {step + 1} of {questions.length}
          </p>
          <h2 className="mb-6 font-display text-xl font-bold">
            {questions[step].q}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {questions[step].options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(opt.value)}
                className="rounded-lg border px-4 py-3 text-left text-sm transition-colors hover:bg-bg-elevated"
                style={{ borderColor: "var(--border)" }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="mb-6 font-display text-2xl font-bold">
            Your Top 3 Matches
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {results.map((bank) => (
              <BankCard key={bank.id} bank={bank} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setStep(0);
                setAnswers([]);
              }}
              className="rounded-full border px-6 py-2 text-sm font-bold transition-colors hover:bg-bg-elevated"
              style={{
                borderColor: "var(--gold)",
                color: "var(--gold)",
              }}
            >
              Retake Quiz
            </button>
            <Link
              href="/banks"
              className="ml-4 inline-block rounded-full px-6 py-2 text-sm font-bold text-black"
              style={{ backgroundColor: "var(--gold)" }}
            >
              Browse All Banks
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
