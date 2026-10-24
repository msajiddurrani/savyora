'use client'

import { useState } from 'react'
import Link from 'next/link'

const questions = [
  ['What is the difference between the membership plans?', 'Cardio Only includes treadmill, cycling and elliptical access. Gym Only includes strength, dumbbells and the machine area. Gym + Cardio includes full gym and cardio access. Student Full Access includes full gym and cardio; confirm eligibility and offer terms with the gym.'],
  ['Does Cardio Only include weights?', 'No. Gym strength-training access is excluded from Cardio Only.'],
  ['Does Gym Only include cardio?', 'No. Cardio is excluded from Gym Only.'],
  ['How does the student offer work?', 'Student Full Access is listed at PKR 6,000 per month, with an advertised saving of PKR 2,000 per month compared with regular full access. Confirm student eligibility and offer terms with the gym.'],
  ['Is the admission promotion a free month of membership?', 'No. The PKR 10,000 admission fee is advertised as waived for the first month. Monthly membership charges still apply.'],
  ['What are the training hours?', 'Morning Prime is 6:00 AM–11:00 AM. The Female-Only Privacy Slot is 11:00 AM–4:30 PM. Evening Co-Time is 4:30 PM–11:30 PM; operations may extend until midnight.'],
  ['Where is Savyora Fitness?', 'Ground Floor, Rabbani Heights, Nasir Bagh Road, Malakandher, Peshawar, near Naseer Teaching Hospital.'],
  ['How do I ask about coaching?', 'Message the team on WhatsApp to enquire about personal training and nutrition with Aiman Hamid.'],
] as const

const cardImages = [
  '/assets/savyora-strength-floor.webp',
  '/assets/savyora-women-training.webp',
  '/assets/savyora-cardio-zone.webp',
  '/assets/savyora-coaching-session.webp',
  '/assets/savyora-club-exterior.webp',
]

export default function FAQList({ limit }: { limit?: number }) {
  const visibleQuestions = questions.slice(0, limit || questions.length)
  const [active, setActive] = useState(0)
  const [question, answer] = visibleQuestions[Math.min(active, visibleQuestions.length - 1)] || questions[0]

  return <div className="faq-gallery">
    <article className="faq-feature-card" style={{ backgroundImage: `linear-gradient(90deg,rgba(7,7,9,.97) 4%,rgba(10,9,14,.88) 55%,rgba(7,7,9,.65)),url('${cardImages[Math.min(active, cardImages.length - 1)]}')` }}>
      <div className="faq-feature-meta">
        <span>ANSWER / {String(active + 1).padStart(2, '0')} — THE SAVYORA GUIDE</span>
      </div>
      <div className="faq-feature-copy" aria-live="polite">
        <span className="eyebrow"><i /> A GOOD PLACE TO START</span>
        <h3>{question}</h3>
        <p>{answer}</p>
        <Link className="faq-contact-link" href="/contact">Still have a question? Talk with our team <span>↗</span></Link>
      </div>
      <div className="faq-feature-index">S / 0{active + 1}</div>
    </article>
    <div className="faq-question-rail" role="group" aria-label="Choose a frequently asked question">
      {visibleQuestions.map(([title], i) => <button key={title} className={`faq-question-card ${i === active ? 'is-active' : ''}`} type="button" aria-pressed={i === active} onClick={() => setActive(i)} style={{ backgroundImage: `linear-gradient(0deg,rgba(7,7,9,.94),rgba(13,11,20,.65)),url('${cardImages[i % cardImages.length]}')` }}>
        <span className="faq-question-count">0{i + 1} / FAQ</span>
        <span className="faq-question-title">{title}</span>
        <span className="faq-question-open" aria-hidden="true">{i === active ? '↙' : '↗'}</span>
      </button>)}
    </div>
  </div>
}
