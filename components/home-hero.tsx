'use client'

import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef, useState } from 'react'

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

const socialLinks = [
  {
    name: 'YouTube',
    href: 'https://www.youtube.com',
    className: 'social-item-youtube',
    svg: (
      <svg viewBox="0 0 24 24" className="social-svg" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com',
    className: 'social-item-tiktok',
    svg: (
      <svg viewBox="0 0 24 24" className="social-svg" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.94-4.48V8.34a8.16 8.16 0 0 0 4.83 1.57v-3.22z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/savyora.pk/',
    className: 'social-item-instagram',
    svg: (
      <svg viewBox="0 0 24 24" className="social-svg" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/923400636969',
    className: 'social-item-whatsapp',
    svg: (
      <svg viewBox="0 0 24 24" className="social-svg" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M12.004 2C6.48 2 2 6.48 2 12c0 1.947.558 3.766 1.524 5.306L2 22l4.82-1.503A9.957 9.957 0 0 0 12.004 22C17.524 22 22 17.52 22 12s-4.476-10-9.996-10zm.006 18.25c-1.637 0-3.176-.446-4.508-1.226l-.323-.19-3.342 1.042 1.066-3.256-.208-.335A8.196 8.196 0 0 1 3.75 12c0-4.557 3.693-8.25 8.256-8.25 4.563 0 8.254 3.693 8.254 8.25 0 4.557-3.691 8.25-8.25 8.25zm4.81-6.136c-.264-.132-1.563-.77-1.805-.858-.242-.088-.418-.132-.594.132-.176.264-.682.858-.836 1.034-.154.176-.308.198-.572.066-.264-.132-1.115-.411-2.124-1.31-.785-.7-1.315-1.565-1.469-1.829-.154-.264-.016-.407.116-.538.119-.118.264-.308.396-.462.132-.154.176-.264.264-.44.088-.176.044-.33-.022-.462-.066-.132-.594-1.43-.814-1.958-.214-.515-.432-.445-.594-.453-.154-.008-.33-.01-.506-.01-.176 0-.462.066-.704.33-.242.264-.924.902-.924 2.2 0 1.298.946 2.552 1.078 2.728.132.176 1.862 2.842 4.51 3.987.63.272 1.122.435 1.505.557.633.202 1.21.173 1.665.105.508-.076 1.563-.638 1.783-1.254.22-.616.22-1.144.154-1.254-.066-.11-.242-.176-.506-.308z"/>
      </svg>
    ),
  },
]

export default function HomeHero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -18])

  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduced) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: x * 6, y: -y * 6 })
  }

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <>
      <section
        className="home-hero reference-hero"
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        aria-label="The Savyora Fitness Hero"
      >
        {/* Full-Screen Atmosphere Depth */}
        <div className="hero-atmosphere-depth" aria-hidden="true" />
        <div className="hero-grid-glow" aria-hidden="true" />

        {/* Image 4 Stacked 3D Layered Heading (No capsule, no sub-text) */}
        <motion.div
          className="mint-hero-title"
          style={reduced ? undefined : { y: titleY }}
        >
          <h1 className="hero-headline image4-heading">
            <span className="image4-line-1">Sculpt <em>Your</em> Body</span>
            <span className="image4-line-2">Elevate <em>Your</em> Spirit</span>
          </h1>
        </motion.div>

        {/* 100% Isolated Transparent Cutout Bodybuilder (Zero Background) */}
        <div
          className="mint-hero-center"
          style={
            reduced
              ? undefined
              : {
                  transform: `translateX(-50%) perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                }
          }
        >
          <img
            className="mint-athlete"
            src="/assets/savyora-hero-athlete-cutout.webp"
            alt="The Savyora Fitness athlete"
            width={1024}
            height={1024}
            fetchPriority="high"
          />
        </div>

        {/* 4 Floating 3D Stat Cards */}
        {metrics.map((metric, i) => (
          <div
            key={metric.label}
            className={`hero-stat-card ${metric.position}`}
            style={
              reduced
                ? undefined
                : {
                    transform: `perspective(800px) translateZ(${15 + i * 4}px) rotateY(${tilt.x * 0.7}deg)`,
                  }
            }
          >
            <span className="stat-icon">{metric.icon}</span>
            <small>{metric.label}</small>
            <strong>{metric.value}</strong>
          </div>
        ))}

        {/* Bottom Left: Social proof */}
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

        {/* Bottom Right: Start CTA button */}
        <div className="reference-hero-actions">
          <Link className="reference-start-button" href="/membership">
            Let's Start <span>↗</span>
          </Link>
        </div>
      </section>

      {/* Social Media Bar with All Uniform Logos */}
      <section className="reference-social-bar" aria-label="Connect on Social Media">
        <div className="social-bar-inner">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-link-item ${social.className}`}
              aria-label={`Visit Savyora on ${social.name}`}
            >
              {social.svg}
              <span className="social-label">{social.name}</span>
            </a>
          ))}
        </div>
      </section>
    </>
  )
}
