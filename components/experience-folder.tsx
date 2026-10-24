'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

const stories = [
  { number: '01', label: 'YOUR MEMBERSHIP', title: 'A plan that meets you here.', detail: 'Four ways to train. One place to make it yours.', image: '/assets/savyora-strength-detail.webp', href: '/membership' },
  { number: '02', label: 'THE SPACES', title: 'Room for every kind of strength.', detail: 'Explore twelve distinct zones, built around how you move.', image: '/assets/savyora-strength-floor.webp', href: '/facilities' },
  { number: '03', label: 'YOUR PEOPLE', title: 'Good energy changes everything.', detail: 'A welcoming community, with dedicated women-only hours.', image: '/assets/savyora-women-training.webp', href: '/about' },
]

export default function ExperienceFolder() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const y1 = useTransform(scrollYProgress, [0, .12, .5], [205, 10, -20])
  const y2 = useTransform(scrollYProgress, [0, .28, .68], [245, 15, -14])
  const y3 = useTransform(scrollYProgress, [0, .44, .85], [285, 16, -8])
  const ys = [y1, y2, y3]
  return <section className="experience-folder" ref={ref} aria-labelledby="folder-title">
    <div className="folder-sticky">
      <div className="folder-copy">
        <span className="eyebrow"><i/>A CLUB WITH MORE INSIDE</span>
        <h2 id="folder-title">Open the door<br/>to <em>your next.</em></h2>
        <p>Take a closer look at the details that make training here feel different.</p>
      </div>
      <div className="folder-stage">
        <div className="folder-shadow" aria-hidden="true"/>
        <div className="folder-back" aria-hidden="true"/>
        <div className="folder-cards-tray">
          {stories.map((story, index) => <motion.a key={story.number} href={story.href} className={`folder-card folder-card-${index + 1}`} style={reduced ? undefined : { y: ys[index], rotate: [-8, 0, 8][index], z: [-70, 0, 65][index] }}>
            <div className="folder-card-image" style={{ backgroundImage: `linear-gradient(180deg, transparent 23%, rgba(10, 9, 14, 0.95)), url(${story.image})` }} />
            <div className="folder-card-copy"><span>{story.label} <b>{story.number}</b></span><h3>{story.title}</h3><p>{story.detail}</p><i aria-hidden="true">↗</i></div>
          </motion.a>)}
        </div>
        <div className="folder-pocket" aria-hidden="true"><div className="folder-pocket-sheen"/><div className="folder-tab">THE SAVYORA EDIT <span>SCROLL TO UNFOLD ↓</span></div></div>
      </div>
    </div>
  </section>
}
