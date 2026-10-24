'use client'

import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

const metrics = [
  {
    position: 'stat-hours',
    label: 'Hours',
    value: '1.5',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    position: 'stat-sets',
    label: 'Sets',
    value: '5',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 5v14M18 5v14M3 8v8M21 8v8M6 12h12" />
      </svg>
    ),
  },
  {
    position: 'stat-kcal',
    label: 'Kcal',
    value: '550',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    ),
  },
  {
    position: 'stat-poses',
    label: 'Poses',
    value: '20',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="15" cy="5" r="2.5" />
        <path d="m9 20 3-6 4 2 3-5M6 14l3-3 3 2 4-4" />
      </svg>
    ),
  },
]

const partners = [
  {
    name: 'Adidas',
    svg: (
      <svg viewBox="0 0 64 40" className="partner-logo" fill="currentColor" aria-label="Adidas">
        <polygon points="6,34 16,34 23,22 13,22" />
        <polygon points="20,34 30,34 43,12 33,12" />
        <polygon points="34,34 44,34 63,2 53,2" />
      </svg>
    ),
  },
  {
    name: 'Puma',
    svg: (
      <svg viewBox="0 0 24 24" className="partner-logo partner-logo-puma" fill="currentColor" aria-label="Puma">
        <path d="M23.845 3.008c-.417-.533-1.146-.106-1.467.08-2.284 1.346-2.621 3.716-3.417 5.077-.626 1.09-1.652 1.89-2.58 1.952-.686.049-1.43-.084-2.168-.405-1.807-.781-2.78-1.792-3.017-1.97-.487-.37-4.23-4.015-7.28-4.164 0 0-.372-.75-.465-.763-.222-.025-.45.451-.616.501-.15.053-.413-.512-.565-.487-.153.02-.302.586-.6.877-.22.213-.486.2-.637.463-.052.096-.034.265-.093.42-.127.32-.551.354-.555.697 0 .381.357.454.669.72.248.212.265.362.554.461.258.088.632-.187.964-.088.277.081.543.14.602.423.054.256 0 .658-.34.613-.112-.015-.598-.174-1.198-.11-.725.077-1.553.309-1.634 1.11-.041.447.514.97 1.055.866.371-.071.196-.506.399-.716.267-.27 1.772.944 3.172.944.593 0 1.031-.15 1.467-.605.04-.029.093-.102.155-.11a.632.632 0 01.195.088c1.131.897 1.984 2.7 6.13 2.721.582.007 1.25.279 1.796.777.48.433.764 1.125 1.037 1.825.418 1.053 1.161 2.069 2.292 3.203.06.068.99.78 1.06.833.012.01.084.167.053.255-.02.69-.123 2.67 1.365 2.753.366.02.275-.231.275-.41-.005-.341-.065-.685.113-1.04.253-.478-.526-.709-.509-1.756.019-.784-.645-.651-.984-1.25-.19-.343-.368-.532-.35-.946.073-2.38-.517-3.948-.805-4.327-.227-.294-.423-.403-.207-.54 1.24-.815 1.525-1.574 1.525-1.574.66-1.541 1.256-2.945 2.075-3.57.166-.12.589-.44.852-.56.763-.362 1.173-.578 1.388-.788.356-.337.635-1.053.294-1.48z" />
      </svg>
    ),
  },
  {
    name: 'The North Face',
    svg: (
      <svg viewBox="0 0 24 24" className="partner-logo partner-logo-tnf" fill="currentColor" aria-label="The North Face">
        <path d="M15.816 6.36v3.36h.228a4.847 4.847 0 0 1 4.764 4.764v3.036H24v-3.132c0-4.428-3.6-8.028-8.028-8.028H15.9Zm-9.06.012v.6h1.008V9.72h.696V6.972h1.008v-.6zm2.964 0V9.72h.696v-1.5h1.308v1.5h.696V6.372h-.696v1.272h-1.308V6.372Zm3 0V9.72h2.4v-.588h-1.752v-.876h1.548v-.588h-1.548V6.96h1.752v-.588ZM4.644 10.14c-.444 0-1.608.192-1.608 1.752s1.164 1.752 1.608 1.752c.444 0 1.608-.192 1.608-1.752S5.088 10.14 4.644 10.14zM0 10.236v3.336h.648v-2.376H.66l1.368 2.376h.696v-3.336h-.648v2.316h-.012L.732 10.236Zm6.54 0 .012 3.336h.684v-1.308h.72c.516 0 .54.18.54.636 0 .348.024.516.072.672h.768v-.084c-.144-.048-.144-.168-.144-.66 0-.624-.144-.732-.42-.852.324-.108.516-.42.516-.792 0-.288-.168-.948-1.056-.948zm2.916 0v.588h1.02v2.748h.696v-2.748h1.008v-.588zm2.976 0v3.336h.696v-1.5h1.296v1.5h.696v-3.336h-.696v1.26h-1.296v-1.26zm3.372 0v3.348h.156c1.08 0 1.944.876 1.944 1.944v1.992h2.388v-2.988c-.012-2.316-1.86-4.2-4.152-4.296h-.252Zm-11.16.504c.372 0 .9.228.9 1.164 0 .936-.528 1.164-.9 1.164s-.912-.228-.912-1.164c0-.936.54-1.164.912-1.164zm2.58.072h.864c.408 0 .492.252.492.432 0 .324-.18.456-.54.456h-.816Zm3.684 3.204c-.876 0-1.572.612-1.572 1.812 0 1.188.648 1.8 1.56 1.8.864 0 1.344-.516 1.488-1.26h-.72c-.084.42-.36.648-.756.648-.612 0-.852-.552-.852-1.164 0-.972.504-1.2.852-1.2.588 0 .696.384.756.588v-.012h.72c-.036-.504-.456-1.212-1.476-1.212zm-6.696.084v3.432h.708v-1.44h1.512v-.612H4.92v-.768h1.728V14.1Zm3.228 0-1.224 3.432h.756l.228-.708h1.284l.216.708h.78L8.268 14.1Zm5.232 0v3.432h2.46v-.612h-1.8v-.888h1.596v-.6h-1.596v-.72h1.8V14.1Zm3.144.012v3.432h1.596v-1.992c0-.792-.648-1.44-1.44-1.44zm-7.98.768h.012l.42 1.356h-.876Zm-4.92.912a.927.927 0 0 0-.936.924c0 .528.432.924.936.924a.917.917 0 0 0 .924-.924.917.917 0 0 0-.924-.924zm0 .144c.42 0 .756.336.756.78 0 .456-.324.792-.756.792s-.768-.348-.768-.792c0-.444.336-.78.768-.78zm-.36.24v1.092h.168V16.8h.18l.3.468h.18l-.312-.48c.168-.024.288-.108.288-.3 0-.216-.132-.312-.384-.312zm.168.132h.228c.12 0 .24.024.24.168 0 .168-.144.18-.288.18h-.18z" />
      </svg>
    ),
  },
  {
    name: 'Under Armour',
    svg: (
      <svg viewBox="0 0 24 24" className="partner-logo partner-logo-ua" fill="currentColor" aria-label="Under Armour">
        <path d="M15.954 12c-.089.066-.195.142-.324.233-.826.585-2.023.985-3.58.985h-.104c-1.556 0-2.755-.4-3.58-.985A36.43 36.43 0 018.042 12c.09-.067.196-.143.324-.234.825-.584 2.024-.985 3.58-.985h.104c1.557 0 2.756.401 3.58.985.129.09.235.167.325.234M24 7.181s-.709-.541-2.95-1.365c-1.968-.721-3.452-.883-3.452-.883l.006 4.243c0 .598-.162 1.143-.618 1.765-1.672-.61-3.254-.985-4.981-.985-1.728 0-3.308.375-4.98.985-.457-.619-.62-1.168-.62-1.765l.007-4.243s-1.494.16-3.463.883C.709 6.642 0 7.181 0 7.181c.093 1.926 1.78 3.638 4.435 4.82C1.777 13.18.09 14.887 0 16.818c0 0 .709.54 2.949 1.365 1.968.721 3.453.883 3.453.883l-.007-4.244c0-.597.164-1.143.619-1.764 1.672.61 3.252.983 4.98.983 1.727 0 3.309-.374 4.98-.983.457.62.62 1.167.62 1.764l-.006 4.244s1.484-.16 3.452-.883c2.241-.826 2.95-1.365 2.95-1.365-.093-1.927-1.78-3.64-4.435-4.819 2.657-1.182 4.343-2.888 4.435-4.82" />
      </svg>
    ),
  },
  {
    name: 'Reebok',
    svg: (
      <svg viewBox="0 0 24 24" className="partner-logo partner-logo-reebok" fill="currentColor" aria-label="Reebok">
        <path d="M14.991 11.48C17.744 10.38 19.458 9.748 24 8.64c-2.467.163-7.922.537-11.682 1.271l2.673 1.57m-8.56 3.651h3.6c.713-1.08 1.422-1.606 2.248-2.191a71.382 71.382 0 00-1.892-.701c-2.297 1.014-3.575 2.375-3.953 2.892m.709-3.928c-3.21 1.147-4.994 2.393-6.199 3.928h3.975c.387-.539 1.862-2.093 4.633-3.174a57.092 57.092 0 00-2.41-.754M8.79 8.788H0c8.862 1.6 13.133 3.66 20 6.572-.587-.439-10.051-6.013-11.209-6.572" />
      </svg>
    ),
  },
]

export default function HomeHero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -18])

  return (
    <>
      <section className="home-hero reference-hero" ref={ref} aria-label="The Savyora Fitness Hero">
        {/* Ambient radial lighting behind athlete and title */}
        <div className="hero-grid-glow" aria-hidden="true" />
        <div className="athlete-ground-glow" aria-hidden="true" />

        {/* Central headline matching Image 2 */}
        <motion.div className="mint-hero-title" style={reduced ? undefined : { y: titleY }}>
          <h1>
            Sculpt <em>Your</em> Body
            <br />
            Elevate <em>Your</em> Spirit
          </h1>
        </motion.div>

        {/* 4K Chiseled Athlete with Specular Lighting & Green Rim Highlights */}
        <div className="mint-hero-center">
          <img
            className="mint-athlete"
            src="/assets/savyora-hero-athlete-4k.jpg"
            alt="4K high-definition chiseled bodybuilder holding a heavy dumbbell plate with intense focus and emerald rim lighting"
            width={1024}
            height={1024}
            fetchPriority="high"
          />
        </div>

        {/* 4 Radial Stat Cards framing the athlete's shoulders & arms */}
        {metrics.map((metric) => (
          <div key={metric.label} className={`hero-stat-card ${metric.position}`}>
            <span className="stat-icon">{metric.icon}</span>
            <small>{metric.label}</small>
            <strong>{metric.value}</strong>
          </div>
        ))}

        {/* Bottom Left: Social proof with 3 member avatars and 15k+ counter */}
        <div className="reference-proof">
          <div className="reference-avatars">
            <img src="/assets/savyora-community.webp" alt="Savyora member avatar" />
            <img src="/assets/savyora-women-training.webp" alt="Savyora athlete avatar" />
            <img src="/assets/savyora-group-training.webp" alt="Savyora community avatar" />
          </div>
          <div className="reference-proof-text">
            <strong>15k+</strong>
            <span>Happy Spirits</span>
          </div>
        </div>

        {/* Bottom Right: Luminous green CTA button */}
        <div className="reference-hero-actions">
          <Link className="reference-start-button" href="/membership">
            Lets Start <span>›››</span>
          </Link>
        </div>
      </section>

      {/* Brand Partner Rail across the bottom (Adidas, Puma, The North Face, Under Armour, Reebok) */}
      <section className="reference-partner-rail" aria-label="Official Partner Brands">
        <div className="partner-rail-inner">
          {partners.map((partner) => (
            <div key={partner.name} className="partner-item" title={partner.name}>
              {partner.svg}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
